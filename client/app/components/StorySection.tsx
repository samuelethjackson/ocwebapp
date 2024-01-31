import React, { forwardRef } from "react";

interface StorySectionProps {
  text: string;
  video: string;
  id: number;
}

const StorySection = forwardRef<HTMLDivElement, StorySectionProps>(({ video, text, id }, ref) => {
  return (
    <section
      id={id.toString()}
      ref={ref}
      className={`relative w-full h-full bg-grey snap-start grid grid-cols-24 md:grid-cols-12 px-5`}
    >
      <video
        src={require(`../../public/videos/${video}`)}
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 h-full w-full object-cover opacity-70"
      />
      <div className="relative z-10 grid place-items-center h-full col-start-1 col-end-10 max-w-[700px]">
        <p className="text-white text-base font-normal leading-normal">{text}</p>
      </div>
    </section>
  );
});

StorySection.displayName = "StorySection";

export default StorySection;