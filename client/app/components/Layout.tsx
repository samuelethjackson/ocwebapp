import React from 'react';
import TitleBand from './TitleBand';

interface LayoutProps {
  pageName: string;
  highRes: boolean;
  setHighRes: (value: boolean) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageName, highRes, setHighRes, children }) => {
  return (
    <>
      <div className='fade-in dark:bg-black bg-white'>
        <TitleBand pageName={pageName} highRes={highRes} setHighRes={setHighRes} />
        {children}
      </div>
    </>
  );
};

export default Layout;