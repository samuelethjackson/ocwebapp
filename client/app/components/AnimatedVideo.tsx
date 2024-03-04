import React from "react";
import { motion } from "framer-motion";
import { useAnimate } from './context/AnimateContext';

interface AnimatedVideoProps {
}

const AnimatedVideo: React.FC<AnimatedVideoProps> = ({
}) => {

  const { isAnimateClicked, setIsAnimateClicked } = useAnimate();
  console.log(isAnimateClicked);

  return (
      <motion.div id='animatedVideo'
        onClick={() => setIsAnimateClicked(!isAnimateClicked)}
        layout
        className={`absolute cursor-pointer opacity-50 z-[100] h-[50vh] w-[50vw] ${
          !isAnimateClicked
            ? "top-0 left-0"
            : "right-0 top-0"
        }`}
        transition={{
          ease: "easeInOut",
          duration: 2,
          layout: { duration: 2, ease: "easeOut" },
        }}
        >
            <motion.video
              src="/videos/precedents.mp4"
              className="object-cover w-full h-full"
              autoPlay
              muted
              layout
              playsInline
              loop
              transition={{
                layout: { duration: 2, ease: "easeOut" },
              }}
            />
        </motion.div>
  );
};

export default AnimatedVideo;
