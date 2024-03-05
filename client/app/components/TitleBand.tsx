"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import CloseIcon from "./icons/closeIcon";
import InvertIcon from "./icons/InvertIcon";
import ResolutionIcon from "./icons/resolutionIcon";
import Link from "next/link";
import { motion } from "framer-motion";
import NavigationItem from "./NavigationItems";
import MenuNavigationItem from "./MenuNavigationItem";

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
  const isInstallationPage = pathname === "/installation";
  const isHomePage = pathname === "/";
  const [isMenuClicked, setIsMenuClicked] = useState (false);

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 680 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 680);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <div className="fixed top-7 md:top-8 flex-row w-full py-2 gridParent z-[100001]">
      <div id="pageName" className="w-full col-start-1 hidden md:flex">
        {!isAboutHovered && (
          <motion.div
            key={pageName}
            className={`hidden md:flex absolute text-base font-normal leading-tight pl-6`}
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
          </motion.div>
        )}
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
        className={`w-full hidden md:flex text-base font-normal col-start-4 col-end-12 pl-12 leading-tight`}
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
      
      {!isMobile && (
        <div className="w-full col-start-18 col-end-25 flex flex-col md:flex-row justify-between md:items-center items-end gap-8">
          <NavigationItem label="Installation" link="/installation" setIsAboutHovered={setIsAboutHovered} onAboutHover={onAboutHover} />
          <NavigationItem label="About" link="/about" setIsAboutHovered={setIsAboutHovered} onAboutHover={onAboutHover} />
          <div className="flex flex-col md:flex-row gap-3 center">
            <ResolutionIcon highRes={highRes} setHighRes={setHighRes} />
            <InvertIcon />
          </div>
        </div>
      )}
      {isAboutPage && isMobile && (
        <div className="w-full col-start-18 col-end-25 flex flex-col md:flex-row justify-between md:items-center items-end gap-4">
        <NavigationItem label="About" link="/about" setIsAboutHovered={setIsAboutHovered} onAboutHover={onAboutHover} />
        <div className="flex flex-col md:flex-row gap-3 center">
          <ResolutionIcon highRes={highRes} setHighRes={setHighRes} />
          <InvertIcon />
        </div>
      </div>
      )}
      {isInstallationPage && isMobile && (
        <div className="w-full col-start-18 col-end-25 flex flex-col md:flex-row justify-between md:items-center items-end gap-4">
        <NavigationItem label="Installation" link="/installation" setIsAboutHovered={setIsAboutHovered} onAboutHover={onAboutHover} />
        <div className="flex flex-col md:flex-row gap-3 center">
          <ResolutionIcon highRes={highRes} setHighRes={setHighRes} />
          <InvertIcon />
        </div>
      </div>
      )}
      {isHomePage && isMobile && (
        <div className="w-full absolute pl-12 pt-2 z-40 flex flex-row justify-between pr-5 gap-12">
        {isMenuClicked ? (
          <div className="flex flex-row w-full justify-between">
            <Link href="/installation" className="">Installation</Link>
            <Link href="/about" className="">About</Link>
          </div>
        ) : (
          <div>Oceanic Refractions</div>
        )}
        <div className="flex flex-col items-end gap-4">
          <MenuNavigationItem label="Menu" setIsMenuClicked={setIsMenuClicked} isMenuClicked={isMenuClicked} />
          <div className="flex flex-col md:flex-row gap-3 center">
            <ResolutionIcon highRes={highRes} setHighRes={setHighRes} />
            <InvertIcon />
         </div>
      </div>
      </div>
      )}

    </div>
  );
};

export default TitleBand;
