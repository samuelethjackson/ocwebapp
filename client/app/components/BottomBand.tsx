import { motion } from "framer-motion";
import React from "react";
import ArrowBackIcon from "./icons/arrowBackIcon";

interface BottomBandProps {
  pageName: string;
  onBottomBandClick: () => void;
}

const BottomBand: React.FC<BottomBandProps> = ({
  pageName,
  onBottomBandClick,
}) => {
  return (
    <div onClick={onBottomBandClick} className={`hidden md:flex dark:bg-black bg-white text-black dark:text-white fixed bottom-0 md:h-8 flex-row w-screen px-5 py-2 z-50 gap-2`}>
      {(pageName === "Responding to" || pageName === "Witnessing via") &&
        <div className="h-4 w-3 flex center mr-1 cursor-pointer">
          <div className="-rotate-90 opacity-50">
            <ArrowBackIcon />
          </div>
        </div>
        }
      <div className="max-w-1/3 flex flex-row gap-0">
        <motion.div
          key={pageName}
          className="cursor-pointer w-full text-base dark:text-white text-black font-normal leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          {pageName}
        </motion.div>
      </div>
    </div>
  );
};

export default BottomBand;
