"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import CloseIcon from './icons/closeIcon';
import InvertIcon from './icons/InvertIcon';
import ResolutionIcon from './icons/resolutionIcon';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface TitleBandProps {
  pageName: string;
  highRes: boolean;
  setHighRes: (value: boolean) => void;
}

const TitleBand: React.FC<TitleBandProps> = ({ pageName, highRes, setHighRes }) => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const pathname = usePathname()
  const pageTitle = "Oceanic Refractions"
  const isAboutPage = pathname === '/about';

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
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [checkScroll]);

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [isScrolledDown, isScrolledUp, checkScroll]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="fixed top-8 flex flex-row w-screen px-5 py-2 justify-between z-50">
      <div className='w-full md:w-1/3 flex flex-row-reverse md:flex-row gap-0'>
        <div className='w-full hidden md:flex'>
          <motion.div 
            key={pageName}
            className={`hidden md:flex absolute text-base font-normal leading-tight`}
            variants={variants}
            initial="hidden"
            animate={isScrolledDown ? "hidden" : "visible"}
            transition={{ duration: 1, ease: "easeInOut", delay: isScrolledUp ? 0.5 : 0 }}
          >
            {pageName}
          </motion.div>
          <motion.div 
            className={`absolute text-base font-normal leading-tight`}
            variants={variants}
            initial="hidden"
            animate={isScrolledDown ? "visible" : "hidden"}
            transition={{ duration: 1, ease: "easeInOut", delay: isScrolledDown ? 0.5 : 0 }}
          >
            {pageTitle}
          </motion.div>
        </div>
        <motion.div 
          className={`w-full text-base font-normal leading-tight pl-8`}
          variants={variants}
          initial="hidden"
          animate={isScrolledDown ? "hidden" : "visible"}
          transition={{ duration: 1, ease: "easeInOut", delay: isScrolledUp ? 0.5 : 0 }}
        >
          {pageTitle}
        </motion.div>
      </div>
      <div className='w-1/6 flex flex-col md:flex-row justify-between md:items-center items-end gap-4'>
        {isAboutPage ? <div className='opacity-100'>
          <Link href={"/"}>
            <CloseIcon/>
          </Link >
        </div> : <a href="/about" className="w-full text-base text-right md:text-left font-normal leading-tight">About</a>}
        <div className='flex flex-col md:flex-row gap-3 center md:opacity-100 opacity-50 hover:opacity-100'>
          <ResolutionIcon highRes={highRes} setHighRes={setHighRes}/>
          <InvertIcon/>
        </div>
      </div>
    </div>
  );
};

export default TitleBand;