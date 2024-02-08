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
    type,
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

    const randomPosition = (
      maxHeight: number,
      maxWidth: number,
      existingPositions: { top: number; left: number }[]
    ) => {
      const boundaryTop = 0.15 * maxHeight;
      const boundaryBottom = 0.1 * maxHeight;
      const boundaryLeft = 0.1 * maxWidth;
      const boundaryRight = 0.1 * maxWidth;

      let x, y, overlap;

      do {
        overlap = false;
        x = Math.floor(
          Math.random() * (maxWidth - boundaryLeft - boundaryRight) +
            boundaryLeft
        );
        y = Math.floor(
          Math.random() * (maxHeight - boundaryTop - boundaryBottom) +
            boundaryTop
        );

        // Check if the new position overlaps with any existing position
        for (let pos of existingPositions) {
          if (Math.abs(pos.left - x) < 50 && Math.abs(pos.top - y) < 50) {
            // 50 is the minimum distance between elements
            overlap = true;
            break;
          }
        }
      } while (overlap);

      return { top: y, left: x };
    };

    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [positions, setPositions] = useState<{ top: number; left: number }[]>(
      []
    );

    useEffect(() => {
      const updateWindowDimensions = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };

      window.addEventListener("resize", updateWindowDimensions);

      // Call the function initially to set the dimensions
      updateWindowDimensions();

      // Cleanup function to remove the event listener
      return () => window.removeEventListener("resize", updateWindowDimensions);
    }, []);

    useEffect(() => {
      if (data) {
        const newPositions = data.map(() =>
          randomPosition(windowHeight, windowWidth, positions)
        );
        setPositions((prevPositions) => [...prevPositions, ...newPositions]);
      }
    }, [data, windowHeight, windowWidth]);

    // Create a mapping between id and category
    const idCategoryMapping: { [key: number]: string } = {
      1: "Precedents of",
      2: "Witnessing via",
      3: "Responding to",
    };

    const filteredData = data?.filter(
      (post) => post.category === idCategoryMapping[id]
    );

    const [videoAnimation, setVideoAnimation] = useState({ scale: 1, x: 0 });

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
            animate={videoAnimation}
            transition={{ ease: "easeInOut", duration: 1 }}
          />
        )}
        <motion.div
          className={``}
          animate={isAboutHovered ? "fadeOut" : "fadeIn"}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 4, delay: 1 }}
          variants={textVariants}
        >
          <div className="absolute top-0 left-0 center w-screen h-dvh md:h-screen flex flex-col gap-16 p-8 md:absolute">
            {filteredData?.map((post, idx) => (
              <div
                className="text-base font-normal leading-[26px] static md:absolute"
                key={idx}
                style={positions ? positions[idx] : {}}
              >
                <Link
                  id="storyCloud"
                  className="flex flex-col gap-2 opacity-60 hover:opacity-100 transition-opacity duration-1000 ease-in-out"
                  href={`/blog/${post.currentSlug}`}
                  onMouseEnter={(e) => {
                    const element = e.currentTarget.getBoundingClientRect();
                    const middleOfScreen = window.innerWidth / 2;
                    if (element.left < middleOfScreen) {
                      setVideoAnimation({ scale: 0.95, x: window.innerWidth * 0.05 });
                    } else {
                      setVideoAnimation({ scale: 0.95, x: -window.innerWidth * 0.05 });
                    }
                  }}
                  onMouseLeave={() => {
                    setVideoAnimation({ scale: 1, x: 0 });
                  }}
                >
                  <p className="text-opacity-70 text-xs font-normal uppercase leading-tight tracking-wide mb-1">
                    {post?.type}
                  </p>
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
