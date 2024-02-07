"use client";

import React, { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { storyOverview } from "../lib/interface";
import { client } from "../lib/sanity";
import Link from "next/link";

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc){
    title,
    "currentSlug": slug.current,
    author,
    category,
  }`;

  const data = await client.fetch(query);
  return data;
}

interface StorySectionProps {
  text: string;
  video: string;
  id: number;
  isAboutHovered: boolean; // Add this line
}

const StorySection = forwardRef<HTMLDivElement, StorySectionProps>(
  ({ video, text, id, isAboutHovered }, ref) => {
    // Check the file extension to determine if it's a GIF
    const isGif = video.endsWith(".gif");
    const videoPath = `/videos/${video}`; // Assuming the videos folder is in the public directory

    const [data, setData] = useState<storyOverview[] | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        const result: storyOverview[] = await getData();
        setData(result);
      };

      fetchData();
    }, []);

    const videoVariants = {
      zoomIn: { scale: 1.1 },
      zoomOut: { scale: 1 },
    };

    const textVariants = {
      fadeIn: { opacity: 1 },
      fadeOut: { opacity: 0 },
    };

    const randomPosition = (maxHeight: number, maxWidth: number) => {
      const x = Math.floor(Math.random() * maxWidth);
      const y = Math.floor(Math.random() * maxHeight);
      return { top: `${y}px`, left: `${x}px` };
    };

    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
      const updateWindowDimensions = () => {
        setWindowWidth(window.innerWidth - 500);
        setWindowHeight(window.innerHeight - 256);
      };

      window.addEventListener("resize", updateWindowDimensions);

      // Call the function initially to set the dimensions
      updateWindowDimensions();

      // Cleanup function to remove the event listener
      return () => window.removeEventListener("resize", updateWindowDimensions);
    }, []);

    const positions = data?.map(() => randomPosition(windowHeight, windowWidth));

    return (
      <section
        id={id.toString()}
        ref={ref}
        className={`relative w-full h-dvh md:h-screen bg-white dark:bg-black snap-start grid grid-cols-6 md:grid-cols-24 px-5 overflow-hidden`}
      >
        {isGif ? (
          <motion.div
            className="absolute top-0 left-0 h-full w-full object-cover opacity-50"
            animate={isAboutHovered ? "zoomIn" : "zoomOut"}
            variants={videoVariants}
            transition={{ ease: "easeInOut", duration: 1 }}
          >
            <Image src={videoPath} alt={text} layout="fill" objectFit="cover" />
          </motion.div>
        ) : (
          <motion.video
            src={videoPath}
            autoPlay
            muted
            playsInline
            loop
            className="absolute top-0 left-0 h-dvh md:h-screen w-screen object-cover opacity-60"
            animate={isAboutHovered ? "zoomIn" : "zoomOut"}
            variants={videoVariants}
            transition={{ ease: "easeInOut", duration: 1 }}
          />
        )}
        <motion.div
          className={``}
          animate={isAboutHovered ? "fadeOut" : "fadeIn"}
          initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 4 }}
          variants={textVariants}
        >
          <div className="absolute top-0 left-0 center w-screen h-dvh md:h-screen flex flex-col gap-16 p-32">
            {data?.map((post, idx) => (
              <div
                className="text-base font-normal leading-[26px] absolute"
                key={idx}
                style={positions ? positions[idx] : {}}
              >
                <Link
                  className="flex flex-col gap-1 opacity-60 hover:opacity-100 transition-opacity duration-1000 ease-in-out"
                  href={`/blog/${post.currentSlug}`}
                >
                  <h3 className="cloud-shadow-white text-black max-w-[300px] z-20">
                    {post?.title}
                  </h3>
                  <p className="cloud-shadow-grey pl-8">{post?.author}</p>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.p
          id="aboutText"
          className={`text-black dark:text-white text-base col-start-1 col-end-6 md:col-start-5 md:col-end-24 text-left self-end font-normal leading-normal mb-10 z-10`}
          animate={!isAboutHovered ? "fadeOut" : "fadeIn"}
          variants={textVariants}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          Oceanic Refractions Mangrove, Image: Laisiasa Dave Lavaki
        </motion.p>
      </section>
    );
  }
);

StorySection.displayName = "StorySection";

export default StorySection;
