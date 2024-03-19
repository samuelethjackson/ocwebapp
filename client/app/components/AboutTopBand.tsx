import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface AboutTopBandProps {
  pageName: string;
}

const AboutTopBand: React.FC<AboutTopBandProps> = ({ pageName }) => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(true);

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
  }, [isScrolledDown, isScrolledUp, checkScroll]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className={`fixed top-0 flex flex-row w-full px-10 pt-0 pb-2 md:py-2 justify-between z-50'}`}>
      <div className='w-1/3 hidden md:flex flex-row gap-0'>
        <motion.div
          key={pageName}
          className="w-full text-base font-normal leading-tight"
          variants={variants}
          initial="hidden"
          animate={isScrolledDown ? "visible" : "hidden"}
          transition={{ duration: 0.5, ease: "easeInOut", delay: isScrolledDown ? 0.5 : 0 }}
        >
          {pageName}
        </motion.div>
      </div>
      <div className='md:w-1/3 w-full bg-white dark:bg-black absolute top-0 left-0 md:hidden flex flex-row pt-2 pb-10 pl-1'>
        <div
          key={pageName}
          className="w-full text-base font-normal leading-tight pl-[44px] md:pl-0"
        >
          {pageName}
        </div>
      </div>
      <div className='w-1/2 absolute pl-[8px] pt-9 md:hidden pb-1'>
        Oceanic Refractions
      </div>
    </div>
  );
};

export default AboutTopBand;