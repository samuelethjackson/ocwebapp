import React, { forwardRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

    const videoVariants = {
      zoomIn: { scale: 1.1 },
      zoomOut: { scale: 1 },
    };

    const textVariants = {
      fadeIn: { opacity: 1 },
      fadeOut: { opacity: 0 },
    };

    return (
      <section
        id={id.toString()}
        ref={ref}
        className={`relative w-full h-screen bg-white dark:bg-black snap-start grid grid-cols-6 md:grid-cols-24 px-5 overflow-hidden`}
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
            className="absolute top-0 left-0 h-screen w-screen object-cover opacity-70"
            animate={isAboutHovered ? "zoomIn" : "zoomOut"}
            variants={videoVariants}
            transition={{ ease: "easeInOut", duration: 1 }}
          />
        )}
        <motion.p
          className={`text-black dark:text-white text-base text-left col-start-1 pl-8 md:pl-0 absolute bottom-8 md:relative md:self-start col-end-6 md:col-end-10 max-w-[700px] md:min-w-[400px] font-normal leading-normal mt-32 z-10`}
          animate={isAboutHovered ? "fadeOut" : "fadeIn"}
          variants={textVariants}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          {text.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </motion.p>
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
