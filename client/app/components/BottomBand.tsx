import { motion } from 'framer-motion';
import React from 'react';

interface BottomBandProps {
  pageName: string;
}

const BottomBand: React.FC<BottomBandProps> = ({ pageName }) => {

  return (
    <div className="bg-black fixed bottom-0 flex flex-row w-screen px-5 py-2 justify-between z-50">
      <div className='w-1/3 flex flex-row gap-0'>
      <motion.div
          key={pageName}
          className="w-full text-base font-normal leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ ease: "backIn", duration: 1 }}
        >
          {pageName}
        </motion.div>
      </div>
    </div>
  );
};

export default BottomBand;