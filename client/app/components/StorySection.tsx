import React, { forwardRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useData } from "./StorySectionHelper";
import { storyOverview } from "../lib/interface"; // Add this line
import { useAnimate } from "./context/AnimateContext";

interface StorySectionProps {
  video: string;
  id: number;
  isAboutHovered: boolean;
  highRes: boolean;
  setHighRes: (value: boolean) => void;
  setSelectedStorySlug: (slug: string) => void;
  setSelectedSectionId: (id: number) => void;
  isAnimateClicked: boolean;
  setIsAnimateClicked: (value: boolean) => void;
  isAnimateFinished: boolean;
  setIsAnimateFinished: (value: boolean) => void;
  setSelectedStory: (story: storyOverview) => void;
  selectedStory: storyOverview | null;
}

const StorySection = forwardRef<HTMLDivElement, StorySectionProps>(
  (
    {
      video,
      id,
      isAboutHovered,
      highRes,
      setHighRes,
      setSelectedStorySlug,
      setSelectedSectionId,
      isAnimateClicked,
      setIsAnimateClicked,
      isAnimateFinished,
      setIsAnimateFinished,
      setSelectedStory,
      selectedStory,
    },
    ref
  ) => {
    // Check the file extension to determine if it's a GIF
    const isGif = video.endsWith(".gif");
    const videoPath = `/videos/${video}`; // Assuming the videos folder is in the public directory

    const { isMenuClicked, setIsMenuClicked } = useAnimate();


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

    useEffect(() => {
      const videoElement = document.getElementById("backgroundvideo") as HTMLVideoElement;
    
      if (videoElement) {
        videoElement
          .play()
          .then(() => {
            // Video is playing
          })
          .catch((error) => {
            // Video failed to play, show GIF instead
            setHighRes(true);
          });
      }
    }, []);

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

    const fixedPositions = [
      { top: "20vh", left: "20vw" },
      { top: "30vh", left: "60vw" },
      { top: "50vh", left: "30vw" },
      { top: "70vh", left: "70vw" },
      { top: "45vh", left: "45vw" },
      { top: "30vh", left: "10vw" },
    ];

    return (
      <div className="snap-start"
      style={{ overflow: isAnimateClicked ? 'hidden' : 'auto', pointerEvents: isAnimateClicked ? 'none' : 'auto' }}>
      {selectedStory && isAnimateClicked && (
        <div className="absolute h-28 flex bottom-2 left-4 md:top-40 md:left-24 flex-col gap-1 px-2 !z-[1000] justify-center fade-in">
          <h1 className="text-white cloud-shadow-black dark:cloud-shadow-white dark:text-black text-base md:text-[21px] font-normal leading-normal max-w-64 md:max-w-80 z-10">
            {selectedStory.title.split("\\n").map((line, i) => (
              <React.Fragment key={i}>
                <span dangerouslySetInnerHTML={{ __html: line }} />
                {i !== selectedStory.title.split("\\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="cloud-shadow-grey !text-white pl-8 md:text-[21px]">
            {selectedStory.author}
          </p>
        </div>
      )}
      <section
        id={id.toString()}
        ref={ref}
        className={`relative w-full h-dvh md:h-screen grid-parent px-0 md:px-5 overflow-hidden no-scrollbar ${ !isAnimateClicked ? "" : "mb-14"
      }`}
      >
        <div
          className={`absolute left-0 w-screen h-screen video-grid place-items-stretch`}
        >
          {isGif ? (
            <motion.img
              src={videoPath}
              alt={""}
              className={`dark:brightness-50 dark:contrast-100 brightness-[1.1] contrast-[0.7] object-cover object-bottom  ${
                !isAnimateClicked
                  ? "col-start-1 col-end-6 row-span-3 md:col-span-5 md:row-start-1"
                  : "col-start-1 col-end-6 row-span-3 justify-self-start md:col-start-4 md:col-span-1 md:row-start-2 md:row-span-1"
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
            id="backgroundvideo"
              src={videoPath}
              className={`dark:brightness-50 dark:contrast-100 brightness-[1.1] contrast-[0.6] object-cover object-bottom ${
                !isAnimateClicked
                  ? "col-start-1 col-end-6 row-span-3 md:col-span-5 md:row-start-1"
                  : "col-start-1 col-end-6 row-span-3 justify-self-start md:col-start-4 md:col-span-1 md:row-start-2 md:row-span-1"
              }`}
              muted={true}
              layout
              autoPlay
              playsInline
              loop={true}
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
          variants={textVariants}
          transition={{ ease: "easeInOut", duration: 2, delay: 2 }}
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
                    className={`flex flex-col gap-2 max-w-64 cursor-pointer !opacity-100 dark:!opacity-60 hover:dark:!opacity-100 ${
                      !highRes ? "" : "dark:!opacity-100 !opacity-100"
                    } transition-opacity duration-1000 ease-in-out`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedStorySlug(post.currentSlug);
                      handleMouseLeave();
                      setIsAnimateClicked(!isAnimateClicked);
                      setSelectedSectionId(id);
                      router.push(`/?article=${post.currentSlug}`);
                      setSelectedStory(post); // Set the selected story
                      setIsMenuClicked(false);
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
                    <p className="cloud-shadow-grey text-white text-sm md:text-base pl-8">
                      {post?.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
        {!isAnimateClicked && (
          <motion.p
            id="aboutText"
            className={`text-black dark:text-white text-base absolute bottom-0 col-start-1 col-end-6 md:col-start-4 pl-12 md:col-end-24 text-left self-end font-normal leading-normal mb-10 z-10 fade-in-quick`}
            animate={!isAboutHovered ? "fadeOut" : "fadeIn"}
            initial={{ opacity: 0 }}
            variants={textVariants}
            transition={{ ease: "easeInOut", duration: 1 }}
          >
            Oceanic Refractions Mangrove, Image: Laisiasa Dave Lavaki
          </motion.p>
        )}
        </AnimatePresence>
      </section>
      </div>
    );
  }
);

StorySection.displayName = "StorySection";

export default React.memo(StorySection);
