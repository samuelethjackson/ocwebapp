import React, { forwardRef } from "react";
import Image from 'next/image';

interface StorySectionProps {
  text: string;
  video: string;
  id: number;
}

const StorySection = forwardRef<HTMLDivElement, StorySectionProps>(({ video, text, id }, ref) => {
  // Check the file extension to determine if it's a GIF
  const isGif = video.endsWith('.gif');
  const videoPath = `/videos/${video}`; // Assuming the videos folder is in the public directory

  return (
    <section
      id={id.toString()}
      ref={ref}
      className={`relative w-screen h-screen md:w-full md:h-full bg-white dark:bg-black md:snap-start grid grid-cols-24 md:grid-cols-12 px-5`}
    >
      {isGif ? (
        // Use the Image component for optimized loading
        <div className="absolute top-0 left-0 h-full w-full object-cover opacity-50">
          <Image
            src={videoPath}
            alt={text}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <video
          src={videoPath}
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 h-full w-full object-cover opacity-50"
        />
      )}
      <div className="relative z-10 grid place-items-center h-full col-start-1 col-end-10 max-w-[700px]">
        <p className="text-black dark:text-white text-base text-left font-normal leading-normal">{text}</p>
      </div>
    </section>
  );
});

StorySection.displayName = "StorySection";

export default StorySection;