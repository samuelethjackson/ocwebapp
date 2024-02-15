import React, { forwardRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useData } from "./StorySectionHelper";

interface StorySectionProps {
  text: string;
  video: string;
  id: number;
  isAboutHovered: boolean;
  highRes: boolean;
}

const StorySection = forwardRef<HTMLDivElement, StorySectionProps>(
  ({ video, text, id, isAboutHovered, highRes }, ref) => {
    // Check the file extension to determine if it's a GIF
    const isGif = video.endsWith(".gif");
    const videoPath = `/videos/${video}`; // Assuming the videos folder is in the public directory

    const data = useData();

    const router = useRouter();

    const textVariants = {
      fadeIn: { opacity: 1 },
      fadeOut: { opacity: 0 },
      fadeOutSlow: { opacity: 0, transition: { duration: 2 } }, // New variant
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

    const [isAnimateClicked, setIsAnimateClicked] = useState(false);

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
        className={`relative w-full h-dvh md:h-screen bg-white dark:bg-black snap-start gridParent px-0 md:px-5 overflow-hidden`}
      >
        {isGif ? (
          <motion.div
            layout
            className={`${
              !isAnimateClicked
                ? "absolute top-0 left-0 h-dvh md:h-screen w-screen object-cover aspect-[9/16] md:object-fill md:aspect-video opacity-50"
                : "absolute place-self-start -top-[56vh] left-0 md:top-40 lg:col-start-15 w-screen md:col-end-25 flex flex-col md:w-full center object-cover  aspect-[9/16] md:object-fill md:aspect-video opacity-50"
            }`}
            animate={videoAnimation}
            transition={{
              ease: "easeInOut",
              duration: 2,
              layout: { duration: 3, ease: "easeInOut" },
            }}
          >
            <Image src={videoPath} alt={text} layout="fill" objectFit="cover" />
          </motion.div>
        ) : (
          <motion.video
            src={videoPath}
            autoPlay
            layout
            muted
            playsInline
            loop
            className={`${
              !isAnimateClicked
                ? "absolute top-0 left-0 h-dvh md:h-screen w-screen object-cover aspect-[9/16] md:object-fill md:aspect-video opacity-60"
                : "absolute place-self-start -top-[56vh] left-0 md:top-40 lg:col-start-15 w-screen md:col-end-25 flex flex-col md:w-full center object-cover  aspect-[9/16] md:object-fill md:aspect-video opacity-60"
            }`}
            animate={videoAnimation}
            transition={{
              ease: "easeInOut",
              duration: 2,
              layout: { duration: 3, ease: "easeInOut" },
            }}
          />
        )}
        <motion.div
          className="w-screen h-dvh md:h-screen"
          animate={
            isAnimateClicked
              ? "fadeOutSlow"
              : isAboutHovered
              ? "fadeOut"
              : "fadeIn"
          }
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 2, delay: 1 }}
          variants={textVariants}
        >
          <div className="absolute top-48 md:top-0 left-0 justify-start items-center w-full min-h-dvh md:h-screen flex flex-col gap-16 p-8 md:absolute overflow-scroll">
            {filteredData?.map((post, idx) => (
              <div
                className="text-base font-normal leading-[26px] static md:absolute"
                key={idx}
                style={fixedPositions[idx % fixedPositions.length]} // Use modulo operator to avoid going out of bounds
              >
                <Link
                  id="storyCloud"
                  className={`flex flex-col gap-2 ${!highRes ? 'opacity-60' : 'opacity-100'} transition-opacity duration-1000 ease-in-out`}
                  href={`/blog/${post.currentSlug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    router.prefetch(`/blog/${post.currentSlug}`);
                    setIsAnimateClicked(true);
                    setTimeout(() => {
                      router.push(`/blog/${post.currentSlug}`);
                    }, 3000);
                    handleMouseLeave(); // Call the function here
                  }}
                  onMouseEnter={(e) => {
                    if (window.innerWidth > 768) {
                      // Change 768 to whatever breakpoint you're using for mobile
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

export default React.memo(StorySection);
