"use client"


import { useState } from 'react';
import TitleBand from './TitleBand';
import { useAnimate } from "./context/AnimateContext";


interface LayoutProps {
  pageName: string;
  highRes: boolean;
  setHighRes: (value: boolean) => void;
  isAboutHovered: boolean; // Add this line
  setIsAboutHovered: (value: boolean) => void; // Add this line
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageName, highRes, setHighRes, isAboutHovered, setIsAboutHovered, children }) => {
  const { isMenuClicked, setIsMenuClicked } = useAnimate();

  return (
      <div className='dark:bg-black bg-white'>
        <TitleBand pageName={pageName} highRes={highRes} setHighRes={setHighRes} onAboutHover={setIsAboutHovered} isMenuClicked={isMenuClicked} setIsMenuClicked={setIsMenuClicked} />
        {children}
      </div>
  );
};

export default Layout;