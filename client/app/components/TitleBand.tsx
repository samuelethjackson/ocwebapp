"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import CloseIcon from "./icons/closeIcon";
import InvertIcon from "./icons/InvertIcon";
import ResolutionIcon from "./icons/resolutionIcon";
import Link from "next/link";
import { motion } from "framer-motion";

interface TitleBandProps {
  pageName: string;
  highRes: boolean;
  setHighRes: (value: boolean) => void;
  onAboutHover: (isHovered: boolean) => void;
}

const TitleBand: React.FC<TitleBandProps> = ({
  pageName,
  highRes,
  setHighRes,
  onAboutHover,
}) => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const pathname = usePathname();
  const pageTitle = "Oceanic Refractions";
  const isAboutPage = pathname === "/about";

  const checkScroll = useCallback(() => {
    if (window.scrollY > 0 && !isScrolledDown) {
      setIsScrolledDown(true);
      setIsScrolledUp(false);
    } else if (window.scrollY === 0 && !isScrolledUp) {
      setIsScrolledUp(true);
      setIsScrolledDown(false);
    }
  }, [isScrolledDown, isScrolledUp]);

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll]);

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [isScrolledDown, isScrolledUp, checkScroll]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="fixed top-8 flex flex-row w-full px-5 py-2 justify-between z-50">
      <div className="opacity-0 md:opacity-100 w-full md:w-1/3 flex flex-row-reverse md:flex-row gap-0">
        <div id="pageName" className="w-full hidden md:flex">
        {!isAboutHovered && (
          <motion.div
            key={pageName}
            className={`hidden md:flex absolute text-base font-normal leading-tight`}
            variants={variants}
            initial="hidden"
            animate={isScrolledDown ? "hidden" : "visible"}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: isScrolledUp ? 0.5 : 0,
            }}
          >
            {pageName}
          </motion.div>)}
          <motion.div
            className={`absolute text-base font-normal leading-tight`}
            variants={variants}
            initial="hidden"
            animate={isScrolledDown ? "visible" : "hidden"}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: isScrolledDown ? 0.5 : 0,
            }}
          >
            {pageTitle}
          </motion.div>
        </div>
        <motion.div
          className={`w-full text-base font-normal leading-tight pl-8 md:pl-0`}
          variants={variants}
          initial="hidden"
          animate={isScrolledDown ? "hidden" : "visible"}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            delay: isScrolledUp ? 0.5 : 0,
          }}
        >
          {pageTitle}
        </motion.div>
      </div>
      <div className="w-1/6 flex flex-col md:flex-row justify-between md:items-center items-end gap-4">
        {isAboutPage ? (
          <div className="opacity-100">
            <Link href={"/"}>
              <CloseIcon />
            </Link>
          </div>
        ) : (
          <a
            href="/about"
            onMouseEnter={() => {
              onAboutHover(true);
              setIsAboutHovered(true); // Set hover state to true
            }}
            onMouseLeave={() => {
              onAboutHover(false);
              setIsAboutHovered(false); // Set hover state to false
            }}
            className="w-full text-base text-right md:text-left font-normal leading-tight"
          >
            About
          </a>
        )}
        <div className="flex flex-col md:flex-row gap-3 center">
          <ResolutionIcon highRes={highRes} setHighRes={setHighRes} />
          <InvertIcon />
        </div>
      </div>
    </div>
  );
};

export default TitleBand;
