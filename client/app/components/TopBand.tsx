import React from "react";
import { motion } from "framer-motion";
import ArrowNextIcon from "./icons/arrowNextIcon";
import ArrowBackIcon from "./icons/arrowBackIcon";
import CloseIcon from "./icons/closeIcon";
import { useRouter } from "next/navigation";

interface TopBandProps {
  pageName: string;
  onArrowClick?: (direction: "next" | "back") => void;
  onTopBandClick: () => void;
  isAboutHovered: boolean;
  isAnimateClicked: boolean;
  setIsAnimateClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopBand: React.FC<TopBandProps> = ({
  pageName,
  onArrowClick,
  onTopBandClick,
  isAboutHovered,
  isAnimateClicked,
  setIsAnimateClicked,
}) => {
  const bandVariants = {
    fadeIn: { opacity: 1 },
    fadeOut: { opacity: 0 },
  };

  const router = useRouter();

  return (
    <div className={`fixed flex flex-col gap-4 z-[10000]`}>
      <motion.div
        onClick={onTopBandClick}
        animate={isAboutHovered ? "fadeOut" : "fadeIn"}
        variants={bandVariants}
        initial="fadeOut"
        exit="fadeOut"
        transition={{ ease: "easeInOut", duration: 1 }}
        className={`fixed top-0 h-16 md:h-8 flex flex-row w-full px-0 md:px-5 py-2 justify-between items-start gap-2 z-30 pb-6 md:pb-2 ${isAnimateClicked ? 'bg-gradient-to-b dark:from-black from-white to-transparent' : 'dark:bg-black bg-white text-black dark:text-white'}`}
      >
        <div
          className="md:hidden flex justify-start w-12 px-4 py-1"
          onClick={() => onArrowClick?.("back")}
        >
          {pageName !== "Precedents of" && <ArrowBackIcon />}
        </div>
        <div className="md:max-w-1/3 flex flex-row w-full gap-0 z-30 h-8">
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
          className="md:hidden flex justify-end w-12 px-1 py-1"
          onClick={() => onArrowClick?.("next")}
        >
          {!isAnimateClicked && pageName !== "Responding to" && (
            <ArrowNextIcon />
          )}
        </div>
        <div
          onClick={() => {
            setIsAnimateClicked(!isAnimateClicked);
            router.push(`/`);
          }}
          className="md:hidden flex pr-2 -mt-1 z-[1000]"
        >
          {isAnimateClicked && <CloseIcon />}
        </div>
      </motion.div>
      <div className="w-full fixed top-9 pl-[51px] z-40 md:hidden">
        Oceanic Refractions
      </div>
    </div>
  );
};

export default TopBand;
