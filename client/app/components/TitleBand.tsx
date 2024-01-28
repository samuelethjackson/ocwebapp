"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CloseIcon from './icons/closeIcon';
import InvertIcon from './icons/InvertIcon';
import ResolutionIcon from './icons/resolutionIcon';

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

  return (
    <div className="fixed top-8 flex flex-row w-screen px-5 py-0 justify-between z-50">
      <div className='w-1/3 flex flex-row gap-0'>
        <div className='w-full'>
          <div className={`absolute text-base font-normal leading-tight transition-opacity ${isScrolledDown ? 'duration-1000 ease-in-out opacity-0' : isScrolledUp ? 'delay-1000 duration-1000 ease-in-out opacity-100' : 'opacity-0'}`}>{pageName}</div>
          <div className={`absolute text-base font-normal leading-tight transition-opacity ${isScrolledDown ? 'delay-1000 duration-1000 ease-in-out opacity-100' : isScrolledUp ? 'duration-1000 ease-in-out opacity-0' : 'opacity-0'}`}>{pageTitle}</div>
        </div>
        <div className={`w-full text-base font-normal leading-tight transition-opacity ${isScrolledDown ? 'duration-1000 ease-in-out opacity-0' : isScrolledUp ? 'delay-1000 duration-1000 ease-in-out opacity-100' : 'opacity-0'}`}>{pageTitle}</div>
      </div>
      <div className='w-1/6 flex flex-col md:flex-row justify-between items-center gap-4'>
        {isAboutPage ? <div className='opacity-0'>
          <CloseIcon/>
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