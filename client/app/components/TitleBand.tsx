"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CloseIcon from './icons/closeIcon';
import InvertIcon from './icons/InvertIcon';
import ResolutionIcon from './icons/resolutionIcon';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface TitleBandProps {
  pageName: string;
}

const TitleBand: React.FC<TitleBandProps> = ({ pageName }) => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const pathname = usePathname()
  const pageTitle = "Oceanic Refractions"
  const isAboutPage = pathname === '/about';

  const checkScroll = () => {
    if (window.scrollY > 0 && !isScrolledDown) {
      setIsScrolledDown(true);
      setIsScrolledUp(false);
    } else if (window.scrollY === 0 && !isScrolledUp) {
      setIsScrolledUp(true);
      setIsScrolledDown(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [isScrolledDown, isScrolledUp]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="fixed top-8 flex flex-row w-screen px-5 py-2 justify-between z-50">
      <div className='w-1/3 flex flex-row gap-0'>
        <div className='w-full'>
          <motion.div 
            key={pageName}
            className={`absolute text-base font-normal leading-tight`}
            variants={variants}
            initial="hidden"
            animate={isScrolledDown ? "hidden" : "visible"}
            transition={{ duration: 1, ease: "easeInOut", delay: isScrolledUp ? 1 : 0 }}
          >
            {pageName}
          </motion.div>
          <motion.div 
            className={`absolute text-base font-normal leading-tight`}
            variants={variants}
            initial="hidden"
            animate={isScrolledDown ? "visible" : "hidden"}
            transition={{ duration: 1, ease: "easeInOut", delay: isScrolledDown ? 1 : 0 }}
          >
            {pageTitle}
          </motion.div>
        </div>
        <motion.div 
          className={`w-full text-base font-normal leading-tight`}
          variants={variants}
          initial="hidden"
          animate={isScrolledDown ? "hidden" : "visible"}
          transition={{ duration: 1, ease: "easeInOut", delay: isScrolledUp ? 1 : 0 }}
        >
          {pageTitle}
        </motion.div>
      </div>
      <div className='w-1/6 flex flex-col md:flex-row justify-between items-center gap-4'>
        {isAboutPage ? <div className='opacity-100'>
          <Link href={"/"}>
            <CloseIcon/>
          </Link >
        </div> : <a href="/about" className="w-full text-base font-normal leading-tight">About</a>}
        <div className='flex flex-col md:flex-row gap-3 center md:opacity-100 opacity-50 hover:opacity-100'>
          <InvertIcon/>
          <ResolutionIcon highRes={true}/>
        </div>
      </div>
    </div>
  );
};

export default TitleBand;