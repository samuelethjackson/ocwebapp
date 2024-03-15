import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fullBlog } from "../lib/interface";
import { client } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { PortableTextMarkComponentProps } from "@portabletext/react";
import CloseIcon from "./icons/closeIcon";
import React from "react";

interface BlogArticleProps {
  params: { slug: string };
  highRes: boolean;
  setHighRes: React.Dispatch<React.SetStateAction<boolean>>;
  isAboutHovered: boolean;
  setIsAboutHovered: React.Dispatch<React.SetStateAction<boolean>>;
  isAnimateClicked: boolean;
  setIsAnimateClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlogArticle: React.FC<BlogArticleProps> = ({
  params,
  highRes,
  setHighRes,
  isAboutHovered,
  setIsAboutHovered,
  isAnimateClicked,
  setIsAnimateClicked,
}) => {
  const [data, setData] = useState<fullBlog | null>(null);

  const [hoveredFootnote, setHoveredFootnote] = useState<string | null>(null);
  const [clickedFootnote, setClickedFootnote] = useState<string | null>(null);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut", delay: 1 },
    },
  };

  const Footnote = ({
    children,
    markKey,
  }: PortableTextMarkComponentProps<any>) => {
    return (
      <sup
        className="text-xs cursor-pointer dark:cloud-shadow-white-small dark:text-black text-white cloud-shadow-black-small pl-1 pr-2 -z-5"
        onMouseEnter={() => setHoveredFootnote(markKey || null)}
        onMouseLeave={() => {
          if (markKey !== clickedFootnote) {
            setHoveredFootnote(null);
          }
        }}
        onClick={() => {
          if (markKey === clickedFootnote) {
            setClickedFootnote(null);
            setHoveredFootnote(null);
          } else {
            setClickedFootnote(markKey || null);
            setHoveredFootnote(markKey || null);
          }
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

  return (
    <div className="fixed top-0 left-0 h-screen w-screen md:z-[100] grid-parent overflow-y-scroll no-scrollbar">
      <AnimatePresence>
        <article
          className={`h-full fade-in col-start-1 col-end-6 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-12 row-start-2 row-end-auto article flex flex-col gap-20 pb-40 z-50`}
        >
          {data && (
              <AnimatePresence>
                {extractFootnotes(data.content)
                  .filter((footnote) => footnote.markKey === hoveredFootnote)
                  .map((footnote, index) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ ease: "easeInOut", duration: 1 }}
                      key={footnote._key}
                      className="fixed w-screen left-0 p-4 bottom-0 mb-2  text-white dark:text-black md:hidden text-xs flex flex-row gap-2"
                    >
                      <div className="p-2 rounded-lg bg-black dark:bg-white w-full flex flex-row gap-3 items-start justify-start text-sm leading-[1.3rem] !z-[99999]">
                        <span>{footnote.number}</span>
                        <span
                          dangerouslySetInnerHTML={{ __html: footnote.text }}
                        ></span>
                        <div
                          className="w-6 h-6"
                          onClick={() => setHoveredFootnote(null)}
                        >
                          <CloseIcon className="dark:!text-black -mt-2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
          )}
          <div className="prose dark:text-white prose-headings:indent-12 pt-[15dvh] prose-strong:dark:text-white prose-strong:text-black prose-strong:font-bold">
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
                  <p className="!indent-0 !mt-0">Written in {data?.language}</p>
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
                  <div className="!indent-0 prose citation">
                    <span className="text-white text-sm dark:text-black cloud-shadow-black-small dark:cloud-shadow-white-small mr-2">
                      {data?.author}{" "}
                    </span>{" "}
                    <p className="!indent-0 prose citation" dangerouslySetInnerHTML={{ __html: data?.biographyText }}></p>
                  </div>
                )}
              </div>
              <div>
                {data && (
                  <div className="!indent-0 prose citation">
                  <span className="text-white text-sm dark:text-black cloud-shadow-black-small dark:cloud-shadow-white-small mr-2">
                    Cite this article{" "}
                  </span>
                  <p className="!indent-0 prose citation" dangerouslySetInnerHTML={{ __html: data?.citation }}></p>
                </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </AnimatePresence>
      <div className="fixed top-0 left-0 w-full z-10 h-min md:h-screen video-grid px-5 ">
        <footer className="hidden absolute bottom-0 w-full place-self-end pb-4 col-start-4 md:flex flex-col citation !z-[99999]">
          {data && (
            <div>
              <AnimatePresence>
                {extractFootnotes(data.content)
                  .filter((footnote) => footnote.markKey === hoveredFootnote)
                  .map((footnote, index) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ ease: "easeInOut", duration: 1 }}
                      key={footnote._key}
                      className="md:w-full md:pr-8 lg:w-2/3 flex flex-row gap-3"
                    >
                      <p>{footnote.number}</p>
                      <p
                        dangerouslySetInnerHTML={{ __html: footnote.text }}
                      ></p>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default BlogArticle;
