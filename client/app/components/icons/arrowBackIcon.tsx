import React from "react";

interface ArrowBackIconProps {
  onClick?: () => void;
}

const ArrowBackIcon: React.FC<ArrowBackIconProps> = ({ onClick }) => {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      className='text-black dark:text-white fill-current'
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M5.09735 0L6 0.885416L1.80531 5L6 9.11458L5.09735 10L1.0044e-07 5L5.09735 0Z"
        className='text-black dark:text-white fill-current'
      />
    </svg>
  );
};

export default ArrowBackIcon;
