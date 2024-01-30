import React, { useState, useEffect } from 'react';

interface AboutTopBandProps {
  pageName: string;
}

const AboutTopBand: React.FC<AboutTopBandProps> = ({ pageName }) => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(true);

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
    <div className={`fixed top-0 flex flex-row w-screen px-5 py-2 justify-between z-50 transition-opacity ${isScrolledDown ? 'delay-1000 duration-1000 ease-in-out opacity-100 visibility-visible' : isScrolledUp ? 'duration-1000 ease-in-out opacity-0 visibility-hidden' : 'opacity-0 visibility-hidden'}`}>
      <div className='w-1/3 flex flex-row gap-0'>
        <div className="w-full text-base font-normal leading-tight">{pageName}</div>
      </div>
    </div>
  );
};

export default AboutTopBand;