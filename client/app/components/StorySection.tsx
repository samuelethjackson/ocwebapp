import React, { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { storyOverview } from "../lib/interface";
import Link from "next/link";
import { getData, randomPosition, useWindowDimensions, useData } from './StorySectionHelper';

interface StorySectionProps {
  text: string;
  video: string;
  id: number;
  isAboutHovered: boolean;
}

const StorySection = forwardRef<HTMLDivElement, StorySectionProps>(
  ({ video, text, id, isAboutHovered }, ref) => {
    // Check the file extension to determine if it's a GIF
    const isGif = video.endsWith(".gif");
    const videoPath = `/videos/${video}`; // Assuming the videos folder is in the public directory

    const data = useData();

    const videoVariants = {
      zoomIn: { scale: 1.1 },
      zoomOut: { scale: 1 },
    };

    const textVariants = {
      fadeIn: { opacity: 1 },
      fadeOut: { opacity: 0 },
    };

    const { windowWidth, windowHeight } = useWindowDimensions();
    const [positions, setPositions] = useState<{ top: number; left: number }[]>(
      []
    );

    useEffect(() => {
      if (data) {
        setPositions((prevPositions) => {
          const newPositions = data.map(() =>
            randomPosition(windowHeight, windowWidth, prevPositions)
          );
          return [...prevPositions, ...newPositions];
        });
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

    const [videoAnimation, setVideoAnimation] = useState({
      scale: 1,
      x: 0,
      y: 0,
    });

    const [isLinkHovered, setIsLinkHovered] = useState<boolean[]>([]);

    useEffect(() => {
      if (data) {
        setIsLinkHovered(new Array(data.length).fill(false));
      }
    }, [data]);

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
                    setIsLinkHovered(isLinkHovered.map((v, i) => i === idx));
                    const element = e.currentTarget.getBoundingClientRect();
                    const middleOfScreenX = window.innerWidth / 2;
                    const middleOfScreenY = window.innerHeight / 2;
                    if (element.left < middleOfScreenX) {
                      setVideoAnimation({
                        scale: 0.98,
                        x: window.innerWidth * 0.025,
                        y:
                          element.top < middleOfScreenY
                            ? window.innerHeight * 0.025
                            : window.innerHeight * -0.015,
                      });
                    } else {
                      setVideoAnimation({
                        scale: 0.98,
                        x: window.innerWidth * -0.025,
                        y:
                          element.top < middleOfScreenY
                            ? window.innerHeight * 0.025
                            : window.innerHeight * -0.015,
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    setVideoAnimation({ scale: 1, x: 0, y: 0 });
                    setIsLinkHovered(isLinkHovered.map((v, i) => false));
                  }}
                >
                  <p
                    className={`text-opacity-70 text-xs font-normal uppercase transition-opacity ease-in-out duration-1000 leading-tight tracking-wide mb-1
                      ${isLinkHovered[idx] ? "md:opacity-100" : "md:opacity-0"
                    }`}
                  >
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
