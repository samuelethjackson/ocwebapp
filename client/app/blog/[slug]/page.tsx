"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { fullBlog } from "../../lib/interface";
import { client } from "../../lib/sanity";
import AboutTopBand from "../../components/AboutTopBand";
import { PortableText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PortableTextMarkComponentProps } from "@portabletext/react";
import CloseIcon from "../../components/icons/closeIcon";

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<fullBlog | null>(null);

  const [highRes, setHighRes] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  const [hoveredFootnote, setHoveredFootnote] = useState<string | null>(null);

  const Footnote = ({
    children,
    markKey,
  }: PortableTextMarkComponentProps<any>) => {
    return (
      <sup
        className="text-xs cursor-pointer dark:cloud-shadow-white-small dark:text-black text-white cloud-shadow-black-small pl-1 pr-2"
        onMouseEnter={() => setHoveredFootnote(markKey || null)}
        onMouseLeave={() => setHoveredFootnote(null)}
      >
        {children}
      </sup>
    );
  };

  const formatDate = (dateString: string) => {
    const options = {
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const getData = async () => {
      const query = `
        *[_type == "blog" && slug.current == '${params.slug}'] {
          title,
          "currentSlug": slug.current,
          author,
          biographyText,
          date,
          language,
          citation,
          category,
          content,
          footnotes
        }[0]`;

      const result = await client.fetch(query);

      // Set the data state with the original content, including footnotes
      setData(result);
    };

    getData();
  }, [params.slug]);

  console.log(data);

  // Define the types for your content blocks and mark definitions
  type MarkDef = {
    _key: string;
    _type: string;
    number: number;
    text: string;
  };

  type Block = {
    _key: string;
    _type: string;
    children: any[]; // Replace 'any' with a more specific type if possible
    markDefs: MarkDef[];
  };

  type Content = Block[];

  // Function to extract footnotes from the content
  const extractFootnotes = (content: Content) => {
    return content
      .flatMap((block: Block) => block.markDefs || [])
      .filter((def: MarkDef) => def._type === "footnote")
      .map((def: MarkDef) => ({ ...def, markKey: def._key }));
  };

  let articleCategory = data?.category;
  let backVideo = "";

  if (articleCategory === "Precedents of") {
    backVideo = highRes ? "precedents.gif" : "precedents.mp4";
  } else if (articleCategory === "Witnessing via") {
    backVideo = highRes ? "witnessing.gif" : "witnessing.mp4";
  } else if (articleCategory === "Responding to") {
    backVideo = highRes ? "responding.gif" : "responding.mp4";
  }

  const isGif = backVideo.endsWith(".gif");
  const videoPath = `/videos/${backVideo}`;

  const videoVariants = {
    zoomIn: { scale: 1.1 },
    zoomOut: { scale: 1 },
  };

  const router = useRouter();

  const [isAnimateClicked, setIsAnimateClicked] = useState(false);

  return (
    <Layout
      pageName={data?.category || "default"}
      highRes={highRes}
      setHighRes={setHighRes}
      isAboutHovered={isAboutHovered}
      setIsAboutHovered={setIsAboutHovered}
    >
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AboutTopBand pageName={data?.category || "default"} />
        <div className="fixed md:hidden top-0 left-0 pl-12 pt-2 z-50">{data?.category}</div>
        <div className="fixed md:hidden top-0 left-0 pl-12 pt-9 z-50">Oceanic Refractions</div>
        <main className="w-full h-dvh md:h-screen gridParent px-5 z-10">
          <AnimatePresence>
            {!isAnimateClicked && (
              <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  animate: { duration: 2, ease: "easeInOut", delay: 1 },
                  exit: { duration: 2, ease: "easeInOut", delay: 0 },
                }}
                className={`col-start-1 col-end-6 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 article flex flex-col gap-20 pt-52 md:pt-40 pb-40`}
              >
                <div className="fixed md:relative md:flex flex-col gap-0.5 z-30">
                  <h1 className="text-white cloud-shadow-black dark:cloud-shadow-white dark:text-black text-[21px] font-normal leading-normal z-10 max-w-[400px]">
                    {data?.title}
                  </h1>
                  <p className="cloud-shadow-grey !text-white inset-8">
                    {data?.author}
                  </p>
                </div>
                <div className="prose dark:text-white prose-headings:indent-8 -z-10 md:z-30 pt-32 md:pt-0">
                  <PortableText
                    value={data?.content}
                    components={{
                      marks: {
                        footnote: Footnote, // The component you defined above
                      },
                    }}
                  />
                  <div className="flex flex-col gap-1 pt-20">
                    <div>
                      {data && (
                        <p className="!indent-0 !text-xs">
                          Written in {data?.language}
                        </p>
                      )}
                    </div>
                    <div>
                      {data && (
                        <p className="!indent-0 !text-xs">
                          Published on {formatDate(data?.date)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-8 pt-20">
                    <div>
                      {data && (
                        <p className="!indent-0">
                          <span className="text-white dark:text-black cloud-shadow-black dark:cloud-shadow-white-small mr-2">
                            {data?.author}{" "}
                          </span>{" "}
                          {data?.biographyText}
                        </p>
                      )}
                    </div>
                    <div>
                      {data && (
                        <p className="!indent-0">
                          <span className="text-white dark:text-black cloud-shadow-black dark:cloud-shadow-white-small mr-2">
                            Cite this article{" "}
                          </span>{" "}
                          {data?.citation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
          <div className="fixed top-0 left-0 w-full h-dvh md:h-screen gridParent px-5 -z-5">
            <motion.div
              layout
              transition={{
                layout: { duration: 3, ease: "easeInOut" },
              }}
              className={`${
                isAnimateClicked
                  ? "absolute top-0 left-0 h-dvh !md:h-screen w-screen object-cover md:object-fill md:aspect-video md:opacity-60"
                  : "absolute place-self-start top-0 left-0 md:top-40 lg:col-start-15 w-screen md:col-end-25 flex flex-col md:w-full center object-cover md:object-fill md:aspect-video md:opacity-60"
              }`}
            >
              <Link
                href={"/"}
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  setIsAnimateClicked(true);
                  setTimeout(() => {
                    router.push(`/`);
                  }, 3000);
                }}
              >
                {isGif ? (
                  <Image
                    src={videoPath}
                    alt={"Moving Background video"}
                    className="opacity-60"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <motion.video
                    src={videoPath}
                    autoPlay
                    muted
                    playsInline
                    className={`md:opacity-60 ${
                      isAnimateClicked
                        ? "w-full h-full object-cover md:object-fill md:aspect-video"
                        : "object-cover md:object-fill md:aspect-video"
                    }`}
                    loop
                  />
                )}
                <div className="md:hidden absolute top-0 w-full h-full bg-gradient-to-b from-black to-transparent opacity-20 z-10">
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 1, delay: 1 }}
                  className={`hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                    isAnimateClicked ? "hidden md:hidden" : ""
                  }`}
                >
                  <p>All contributions</p>
                </motion.div>
              </Link>
            </motion.div>
            <Link
                href={"/"}
                className="absolute md:hidden top-0 right-0 pr-2 pt-1"
                onClick={(e) => {
                  e.preventDefault();
                  setIsAnimateClicked(true);
                  setTimeout(() => {
                    router.push(`/`);
                  }, 3000);
                }}
              >
                  <CloseIcon/>
                </Link>
            <footer className="sticky text-xs leading-6 place-self-end pb-4 lg:col-start-15 col-end-25 flex flex-col">
              {data && (
                <div>
                  <AnimatePresence>
                    {extractFootnotes(data.content)
                      .filter(
                        (footnote) => footnote.markKey === hoveredFootnote
                      )
                      .map((footnote, index) => (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ ease: "easeInOut", duration: 1 }}
                          key={footnote._key}
                          className="w-full flex flex-row gap-2"
                        >
                          <span>{footnote.number}</span>
                          <span>{footnote.text}</span>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              )}
            </footer>
          </div>
        </main>
      </div>
    </Layout>
  );
}
