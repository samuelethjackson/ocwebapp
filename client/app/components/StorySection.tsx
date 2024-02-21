import React, { forwardRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion, spring } from "framer-motion";
import Link from "next/link";
import { useData } from "./StorySectionHelper";

interface StorySectionProps {
  video: string;
  id: number;
  isAboutHovered: boolean;
  highRes: boolean;
  setSelectedStorySlug: (slug: string) => void;
  setSelectedSectionId: (id: number) => void;
  isAnimateClicked: boolean;
  setIsAnimateClicked: (value: boolean) => void;
  isAnimateFinished: boolean;
  setIsAnimateFinished: (value: boolean) => void;
}

const StorySection = forwardRef<HTMLDivElement, StorySectionProps>(
  (
    {
      video,
      id,
      isAboutHovered,
      highRes,
      setSelectedStorySlug,
      setSelectedSectionId,
      isAnimateClicked,
      setIsAnimateClicked,
      isAnimateFinished,
      setIsAnimateFinished,
    },
    ref
  ) => {
    // Check the file extension to determine if it's a GIF
    const isGif = video.endsWith(".gif");
    const videoPath = `/videos/${video}`; // Assuming the videos folder is in the public directory

    const data = useData();

    const router = useRouter();

    const textVariants = {
      fadeIn: {
        opacity: 1,
        transition: { duration: 1 },
        transitionEnd: {
          display: "block",
        },
      }, // Fade in quickly
      fadeOut: {
        opacity: 0,
        transition: { duration: 1 },
        transitionEnd: {
          display: "none",
        },
      }, // Fade out quickly
      idle: { opacity: 1 }, // No animation
    };

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

    const handleMouseLeave = () => {
      setVideoAnimation({ scale: 1, x: 0, y: 0 });
      setIsLinkHovered(isLinkHovered.map((v, i) => false));
    };

    const [ratio, setRatio] = useState("");

    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const gcd = (a: number, b: number): number =>
          b === 0 ? a : gcd(b, a % b); // Function to calculate greatest common divisor
        const divisor = gcd(width, height);
        setRatio(
          `${Math.round(width / divisor / 15)}/${Math.round(
            height / divisor / 15
          )}`
        );
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Call the function initially to set the ratio
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    console.log(ratio);

    const fixedPositions = [
      { top: "20vh", left: "20vw" },
      { top: "30vh", left: "60vw" },
      { top: "50vh", left: "30vw" },
      { top: "70vh", left: "70vw" },
      { top: "45vh", left: "45vw" },
      { top: "30vh", left: "10vw" },
    ];

    return (
      <section
        id={id.toString()}
        ref={ref}
        className={`relative w-full h-dvh md:h-screen snap-start grid-parent px-0 md:px-5 overflow-hidden no-scrollbar`}
      >
        <div className="fixed left-0 w-screen h-screen video-grid place-items-stretch">
          {isGif ? (
            <motion.img
              src={videoPath}
              alt={""}
              className={`opacity-50 object-cover ${
                !isAnimateClicked
                     ? "col-start-1 col-span-5 row-start-1 row-span-3"
                     : "col-start-4 col-span-1 row-start-2 row-span-1"
              }`}
              layout
              animate={videoAnimation}
                 transition={{
                   ease: "easeInOut", 
                   duration: 2,
                   layout: { duration: 2, ease: "easeInOut" },
                 }}
            ></motion.img>
          ) : (
               <motion.video
                 src={videoPath}
                 className={`opacity-50 object-cover ${
                   !isAnimateClicked
                     ? "col-start-1 col-span-5 row-start-1 row-span-3"
                     : "col-start-4 col-span-1 row-start-2 row-span-1"
                 }`}
                 autoPlay
                 muted
                 layout
                 playsInline
                 loop
                 animate={videoAnimation}
                 transition={{
                   ease: "easeInOut",
                   duration: 2,
                   layout: { duration: 2, ease: "easeInOut" },
                 }}
               />
          )}
          </div>
        <motion.div
          id="storyCloudWrapper"
          className="w-screen h-dvh md:h-screen"
          animate={
            isAnimateClicked
              ? "fadeOut"
              : isAboutHovered && !isAnimateFinished
              ? "fadeOut"
              : !isAnimateClicked && !isAnimateFinished
              ? "fadeIn"
              : "idle"
          }
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 2, delay: 2 }}
          variants={textVariants}
        >
          <div className="absolute md:top-0 left-0 center h-dvh overflow-y-scroll w-full md:h-screen md:absolute no-scrollbar">
            <div className="absolute top-40 md:top-0 md:h-screen justify-start items-center flex flex-col w-full gap-16 p-8 overflow-y-scroll no-scrollbar pb-40 md:overflow-clip ">
              {filteredData?.map((post, idx) => (
                <div
                  className="text-base font-normal leading-[26px] static md:absolute"
                  key={idx}
                  style={fixedPositions[idx % fixedPositions.length]} // Use modulo operator to avoid going out of bounds
                >
                  <div
                    id="storyCloud"
                    className={`flex flex-col gap-2 max-w-64 cursor-pointer ${
                      !highRes ? "opacity-60" : "opacity-100"
                    } transition-opacity duration-1000 ease-in-out`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedStorySlug(post.currentSlug);
                      handleMouseLeave();
                      setIsAnimateClicked(!isAnimateClicked);
                      setSelectedSectionId(id);
                      router.push(`/?article=${post.currentSlug}`);
                    }}
                    onMouseEnter={(e) => {
                      if (window.innerWidth > 768) {
                        // Change 768 to whatever breakpoint you're using for mobile
                        setIsLinkHovered(
                          isLinkHovered.map((v, i) => i === idx)
                        );
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
                            x: window.innerWidth * 0.015,
                            y:
                              element.top < middleOfScreenY
                                ? window.innerHeight * 0.025
                                : window.innerHeight * -0.015,
                          });
                        }
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth > 768) {
                        // Change 768 to whatever breakpoint you're using for mobile
                        handleMouseLeave();
                      }
                    }}
                  >
                    <p
                      className={`hidden md:block text-opacity-70 text-xs font-normal uppercase transition-opacity ease-in-out duration-1000 leading-tight tracking-wide mb-1
                        ${
                          isLinkHovered[idx] ? "md:opacity-100" : "md:opacity-0"
                        }`}
                    >
                      {post?.type}
                    </p>
                    <h3 className="cloud-shadow-white text-sm md:text-base text-black max-w-[300px] z-20">
                      {post?.title.split("\\n").map((line, i) => (
                        <React.Fragment key={i}>
                          <span dangerouslySetInnerHTML={{ __html: line }} />
                          {i !== post.title.split("\\n").length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h3>
                    <p className="cloud-shadow-grey text-sm md:text-base pl-8">
                      {post?.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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

export default React.memo(StorySection);
