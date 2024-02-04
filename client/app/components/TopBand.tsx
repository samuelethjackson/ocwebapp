import React from "react";
import { motion } from "framer-motion";
import ArrowNextIcon from "./icons/arrowNextIcon";
import ArrowBackIcon from "./icons/arrowBackIcon";

interface TopBandProps {
  pageName: string;
  onArrowClick?: (direction: "next" | "back") => void;
  onTopBandClick: () => void;
  isAboutHovered: boolean;
}

const TopBand: React.FC<TopBandProps> = ({
  pageName,
  onArrowClick,
  onTopBandClick,
  isAboutHovered,
}) => {
  const bandVariants = {
    fadeIn: { opacity: 1 },
    fadeOut: { opacity: 0 },
  };

  return (
    <div className={`flex flex-col gap-4`}>
      <motion.div
        onClick={onTopBandClick}
        animate={isAboutHovered ? "fadeOut" : "fadeIn"}
        variants={bandVariants}
        initial="fadeOut"
        exit="fadeOut"
        transition={{ ease: "easeInOut", duration: 1 }}
        className="dark:bg-black bg-white text-black dark:text-white fixed top-0 md:h-8 flex flex-row w-full px-0 md:px-5 py-2 justify-between items-center gap-2 z-30 pb-10 md:pb-2"
      >
        <div
          className="md:hidden flex justify-end w-12 px-4 py-1"
          onClick={() => onArrowClick?.("back")}
        >
          {pageName !== "Precedents of" && <ArrowBackIcon />}
        </div>
        <div className="md:max-w-1/3 flex flex-row w-full gap-0 z-30">
          <motion.div
            key={pageName}
            className="w-full cursor-pointer text-base font-normal leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ ease: "easeInOut", duration: 1 }}
          >
            {pageName}
          </motion.div>
        </div>
        <div
          className="md:hidden flex justify-start w-12 px-4 py-1"
          onClick={() => onArrowClick?.("next")}
        >
          {pageName !== "Responding to" && <ArrowNextIcon />}
        </div>
      </motion.div>
      <div className="w-full fixed top-9 pl-[52px] z-40 md:hidden">
        Oceanic Refractions
      </div>
    </div>
  );
};

export default TopBand;
