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
import React from "react";

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<fullBlog | null>(null);

  const [highRes, setHighRes] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  const [hoveredFootnote, setHoveredFootnote] = useState<string | null>(null);
  const [clickedFootnote, setClickedFootnote] = useState<string | null>(null);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut", delay: 1 } },
  };

  const Footnote = ({
    children,
    markKey,
  }: PortableTextMarkComponentProps<any>) => {
    return (
      <sup
        className="text-xs cursor-pointer dark:cloud-shadow-white-small dark:text-black text-white cloud-shadow-black-small pl-1 pr-2"
        onMouseEnter={() => setHoveredFootnote(markKey || null)}
        onMouseLeave={() => {
          if (markKey !== clickedFootnote) {
            setHoveredFootnote(null);
          }
        }}
        onClick={() => {
          setClickedFootnote(markKey || null);
          setHoveredFootnote(markKey || null);
        }}
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

  const categoryMapping = {
    "Precedents of": 1,
    "Witnessing via": 2,
    "Responding to": 3,
  };

  const isGif = backVideo.endsWith(".gif");
  const videoPath = `/videos/${backVideo}`;

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
        <div className="hidden md:flex md:w-full z-50">
          <AboutTopBand pageName={data?.category || "default"} />
        </div>
        <motion.div 
        variants={textVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
         className={`${
          !isAnimateClicked
            ? "fixed w-screen bg-gradient-to-b dark:from-black/40 dark:to-transparent from-white/50 to-transparent md:hidden top-0 left-0 pl-12 pb-16 pt-2 flex flex-col gap-1 z-[49]" 
            : "hidden"
        }`}
          >
          <div 
          className="w-full flex flex-row justify-between">
            <div className="">{data?.category}</div>
            <Link
              href={"/"}
              className="absolute md:hidden top-0 right-0 pr-2 pt-1"
              onClick={(e) => {
                e.preventDefault();
                setIsAnimateClicked(true);
                setTimeout(() => {
                  router.push(
                    `/?param=${
                      categoryMapping[
                        data?.category as keyof typeof categoryMapping
                      ] ?? ""
                    }`
                  );
                }, 3000);
              }}
            >
              <CloseIcon />
            </Link>
          </div>
          <div className="">Oceanic Refractions</div>
        </motion.div>
        <main className="w-full gridParent px-5">
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
                className={`col-start-1 col-end-7 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 article flex flex-col gap-20 pt-40 md:pt-40 pb-40`}
              >
                <motion.div 
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="fixed top-[18vh] md:top-0 md:relative flex flex-col gap-1 z-30 px-2">
                  <h1 className="text-white cloud-shadow-black dark:cloud-shadow-white dark:text-black text-base md:text-[21px] font-normal leading-normal max-w-64 md:max-w-full z-10">
                    {data?.title.split("\\n").map((line, i) => (
                      <React.Fragment key={i}>
                        <span dangerouslySetInnerHTML={{ __html: line }} />
                        {i !== data.title.split("\\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h1>
                  <p className="cloud-shadow-grey !text-white inset-8">
                    {data?.author}
                  </p>
                </motion.div>
                <motion.div 
                variants={textVariants}
                initial="hidden"
                animate="visible" 
                className="prose dark:text-white prose-headings:indent-8 md:z-20 pt-16 md:pt-0 prose-strong:dark:text-white prose-strong:text-black prose-strong:font-bold">
                  <PortableText
                    value={data?.content}
                    components={{
                      marks: {
                        footnote: Footnote, // The component you defined above
                      },
                    }}
                  />
                  <div className="flex flex-col gap-0 pt-20 citation">
                    <div>
                      {data && (
                        <p className="!indent-0 !mt-0">
                          Written in {data?.language}
                        </p>
                      )}
                    </div>
                    <div>
                      {data && (
                        <p className="!indent-0 !mt-0">
                          Published on {formatDate(data?.date)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-3/4 flex flex-col gap-8 pt-20">
                    <div>
                      {data && (
                        <p className="!indent-0 prose citation">
                          <span className="text-white text-sm dark:text-black cloud-shadow-black-small dark:cloud-shadow-white-small mr-2">
                            {data?.author}{" "}
                          </span>{" "}
                          <PortableText
                            value={data?.biographyText}
                          />
                        </p>
                      )}
                    </div>
                    <div>
                      {data && (
                        <p className="!indent-0 prose citation">
                          <span className="text-white text-sm dark:text-black cloud-shadow-black-small dark:cloud-shadow-white-small mr-2">
                            Cite this article{" "}
                          </span>
                          <p dangerouslySetInnerHTML={{ __html: data?.citation }}></p>
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            )}
          </AnimatePresence>
          <div className="fixed top-0 left-0 w-full h-min md:h-screen gridParent z-0 px-5 ">
            <motion.div
              layout
              transition={{
                layout: { duration: 3, ease: "easeOut" },
              }}
              className={`${
                isAnimateClicked
                  ? "absolute top-0 left-0 h-dvh md:h-screen w-screen opacity-50"
                  : "absolute place-self-start -top-[80vh] left-0 md:top-40 lg:col-start-15 w-screen h-screen md:w-full md:h-[300px] md:col-end-25 opacity-100"
              }`}
            >
              <Link
                href={`/`}
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  setIsAnimateClicked(true);
                  setTimeout(() => {
                    router.push(
                      `/?param=${
                        categoryMapping[
                          data?.category as keyof typeof categoryMapping
                        ] ?? ""
                      }`
                    );
                  }, 3000);
                }}
              >
                {isGif ? (
                  <Image
                    src={videoPath}
                    alt={"Moving Background video"}
                    className="object-cover w-full h-full md:opacity-50"
                    layout="fill"
                  />
                ) : (
                  <motion.video
                    src={videoPath}
                    autoPlay
                    muted
                    playsInline
                    className="object-cover w-full h-full md:opacity-50"
                    layout
                    loop
                    transition={{
                      layout: { duration: 3, ease: "easeOut" },
                    }}
                  />
                )}
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
            <footer className="absolute bottom-0 w-full place-self-end pb-4 lg:col-start-15 col-end-25 flex flex-col citation">
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
                          className="w-1/2 flex flex-row gap-3"
                        >
                          <p>{footnote.number}</p>
                          <p dangerouslySetInnerHTML={{ __html: footnote.text }}></p>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              )}
            </footer>
            <div className="">
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
                          className="fixed w-screen left-0 p-4 bottom-0 mb-2  text-white dark:text-black md:hidden text-xs flex flex-row gap-2"
                        >
                          <div className="p-2 rounded-lg bg-black dark:bg-white w-full flex flex-row gap-3 items-start justify-start text-sm leading-[1.3rem]">
                            <span>{footnote.number}</span>
                            <span dangerouslySetInnerHTML={{ __html: footnote.text }}></span>
                            <div
                              className="w-6 h-6"
                              onClick={() => setHoveredFootnote(null)}
                            >
                              <CloseIcon className="dark:!text-black" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
