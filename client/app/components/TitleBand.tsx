"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import CloseIcon from './icons/closeIcon';
import InvertIcon from './icons/InvertIcon';
import ResolutionIcon from './icons/resolutionIcon';

interface TitleBandProps {
  pageName: string;
}

const TitleBand: React.FC<TitleBandProps> = ({ pageName }) => {
  const pathname = usePathname()
  const isAboutPage = pathname === '/about';

  return (
    <div className="absolute top-8 flex flex-row w-screen p-5 justify-between">
      <div className='w-1/3 flex flex-row gap-0'>
        <div className="w-full text-base font-normal leading-tight">{pageName}</div>
        <div className="w-full text-base font-normal leading-tight">Oceanic Refractions</div>
      </div>
      <div className='w-1/6 flex flex-col md:flex-row justify-between items-center gap-4'>
        {isAboutPage ? <div className='opacity-0'>
          <CloseIcon/>
        </div> : <div className="w-full text-base font-normal leading-tight">About</div>}
        <div className='flex flex-col md:flex-row gap-3 center md:opacity-100 opacity-50 hover:opacity-100'>
          <InvertIcon/>
          <ResolutionIcon highRes={true}/>
        </div>
      </div>
    </div>
  );
};

export default TitleBand;