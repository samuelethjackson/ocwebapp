import React from 'react';
import { motion } from 'framer-motion';
import ArrowNextIcon from './icons/arrowNextIcon';
import ArrowBackIcon from './icons/arrowBackIcon copy';

interface TopBandProps {
  pageName: string;
}

const TopBand: React.FC<TopBandProps> = ({ pageName }) => {
  return (
    <div className="dark:bg-black bg-white text-black dark:text-white fixed top-0 flex flex-row w-screen px-0 md:px-5 py-2 justify-between items-center gap-2 z-50 pb-10 md:pb-2">
      <div className='md:hidden flex justify-end w-12 px-4'>
        <ArrowBackIcon/>
      </div>
      <div className='md:w-1/3 flex flex-row w-full gap-0'>
        <motion.div
          key={pageName}
          className="w-full text-base font-normal leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ ease: "easeInOut", duration: 1, delay: 0.5 }}
        >
          {pageName}
        </motion.div>
      </div>
      <div className='md:hidden flex justify-start w-12 px-4'>
      <ArrowNextIcon/>
      </div>
    </div>
  );
};

export default TopBand;