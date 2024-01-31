import React from 'react';
import { motion } from 'framer-motion';

interface TopBandProps {
  pageName: string;
}

const TopBand: React.FC<TopBandProps> = ({ pageName }) => {
  return (
    <div className="bg-black fixed top-0 flex flex-row w-screen px-5 py-2 justify-between z-50">
      <div className='w-1/3 flex flex-row gap-0'>
        <motion.div
          key={pageName}
          className="w-full text-base font-normal leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          {pageName}
        </motion.div>
      </div>
    </div>
  );
};

export default TopBand;