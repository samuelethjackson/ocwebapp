import React from "react";

interface ArrowNextIconProps {
  onClick?: () => void;
}

const ArrowNextIcon: React.FC<ArrowNextIconProps> = ({ onClick }) => {
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
        d="M0.902655 10L0 9.11458L4.19469 5L0 0.885417L0.902655 0L6 5L0.902655 10Z"
        className='text-black dark:text-white fill-current'
      />
    </svg>
  );
};

export default ArrowNextIcon;
