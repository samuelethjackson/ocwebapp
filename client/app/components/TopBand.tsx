import React from "react";
import { motion } from "framer-motion";
import ArrowNextIcon from "./icons/arrowNextIcon";
import ArrowBackIcon from "./icons/arrowBackIcon";

interface TopBandProps {
  pageName: string;
  onArrowClick?: (direction: "next" | "back") => void;
  onTopBandClick: () => void;
}

const TopBand: React.FC<TopBandProps> = ({
  pageName,
  onArrowClick,
  onTopBandClick,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div
        onClick={onTopBandClick}
        className="dark:bg-black bg-white cursor-pointer text-black dark:text-white fixed top-0 flex flex-row w-full px-0 md:px-5 py-2 justify-between items-center gap-2 z-30 pb-10 md:pb-2"
      >
        <div className="md:hidden flex justify-end w-12 px-4">
          <ArrowBackIcon onClick={() => onArrowClick?.("back")} />
        </div>
        <div className="md:w-1/3 flex flex-row w-full gap-0">
          <motion.div
            key={pageName}
            className="w-full text-base font-normal leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 0.5 }}
          >
            {pageName}
          </motion.div>
        </div>
        <div className="md:hidden flex justify-start w-12 px-4">
          <ArrowNextIcon onClick={() => onArrowClick?.("next")} />
        </div>
      </div>
      <div className="fixed top-9 pl-[52px] z-40 md:hidden">Oceanic Refractions</div>
    </div>
  );
};

export default TopBand;
