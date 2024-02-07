"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fullBlog } from "../../lib/interface";
import { client } from "../../lib/sanity";
import AboutTopBand from "../../components/AboutTopBand";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<fullBlog | null>(null);
  const [highRes, setHighRes] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const query = `
        *[_type == "blog" && slug.current == '${params.slug}'] {
          "currentSlug": slug.current,
          title,
          author,
          category,
          content
        }[0]`;

      const result = await client.fetch(query);
      setData(result);
    };

    getData();
  }, [params.slug]);

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
        <main className="w-full h-dvh md:h-screen gridParent px-5">
          <article className="col-start-1 col-end-6 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 about flex flex-col gap-20 pt-40 pb-40">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-white cloud-shadow-black dark:cloud-shadow-white dark:text-black text-[21px] font-normal leading-normal z-10 max-w-[400px]">
                {data?.title}
              </h1>
              <p className="cloud-shadow-grey inset-8">{data?.author}</p>
            </div>
            <div className="prose">
              <PortableText value={data?.content} />
            </div>
          </article>
          <aside className="sticky lg:col-start-15 col-end-25 flex flex-col h-dvh md:h-screen w-full center">
            <Link href={"/"} className="relative w-full">
              {isGif ? (
                <motion.div
                  className="w-full h-full object-cover opacity-50"
                  animate={isAboutHovered ? "zoomIn" : "zoomOut"}
                  variants={videoVariants}
                  transition={{ ease: "easeInOut", duration: 1 }}
                >
                  <Image
                    src={videoPath}
                    alt={"Moving Background video"}
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
                  animate={isAboutHovered ? "zoomIn" : "zoomOut"}
                  variants={videoVariants}
                  transition={{ ease: "easeInOut", duration: 1 }}
                />
              )}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p>All contributions</p>
              </div>
            </Link>
          </aside>
        </main>
      </motion.div>
    </Layout>
  );
}
