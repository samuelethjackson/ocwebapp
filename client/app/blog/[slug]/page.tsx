"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fullBlog } from "../../lib/interface";
import { client } from "../../lib/sanity";
import AboutTopBand from "../../components/AboutTopBand";
import { PortableText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PortableTextMarkComponentProps } from "@portabletext/react";

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

  return (
    <Layout
      pageName={data?.category || "default"}
      highRes={highRes}
      setHighRes={setHighRes}
      isAboutHovered={isAboutHovered}
      setIsAboutHovered={setIsAboutHovered}
    >
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 4 }}
      >
        <AboutTopBand pageName={data?.category || "default"} />
        <main className="w-full h-dvh md:h-screen gridParent px-5 z-10">
          <article className="col-start-1 col-end-6 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 article flex flex-col gap-20 pt-40 pb-40">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-white cloud-shadow-black dark:cloud-shadow-white dark:text-black text-[21px] font-normal leading-normal z-10 max-w-[400px]">
                {data?.title}
              </h1>
              <p className="cloud-shadow-grey inset-8">{data?.author}</p>
            </div>
            <div className="prose dark:text-white prose-headings:indent-8 z-30">
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
          </article>
          <div className="fixed top-0 left-0 w-full h-dvh md:h-screen gridParent px-5 -z-5">
            <aside className="sticky place-self-start top-40 lg:col-start-15 col-end-25 flex flex-col w-full center">
              <Link href={"/"} className="relative w-full">
                {isGif ? (
                  <motion.div
                    className="w-full h-full object-cover opacity-50"
                    variants={videoVariants}
                    transition={{ ease: "easeInOut", duration: 1 }}
                  >
                    <Image
                      src={videoPath}
                      alt={"Moving Background video"}
                      className="w-full h-full object-cover opacity-70"
                      layout="fill"
                      objectFit="cover"
                    />
                  </motion.div>
                ) : (
                  <motion.video
                    src={videoPath}
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="w-full h-full object-cover opacity-70"
                    variants={videoVariants}
                    transition={{ ease: "easeInOut", duration: 1 }}
                  />
                )}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p>All contributions</p>
                </div>
              </Link>
            </aside>
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
                        >
                          <span>{footnote.number}. </span>
                          <span>{footnote.text}</span>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              )}
            </footer>
          </div>
        </main>
      </motion.div>
    </Layout>
  );
}
