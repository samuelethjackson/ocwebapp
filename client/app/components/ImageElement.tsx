import React from 'react';

interface ImageElementProps {
  image: string;
  citation: string;
}

const ImageElement: React.FC<ImageElementProps> = ({ image, citation }) => {

  return (
    <div className='md:-ml-[12vw] -ml-5 w-screen gridParent !p-0'>
      <div className="col-start-1 col-end-7 md:col-start-1 md:col-end-12 lg:col-start-1 lg:col-end-25 gridParent !p-0 gap-4 md:gap-0">
        <div className="col-start-1 col-end-7 lg:col-end-18 aspect-video row-start-1">
          <img
            src={image}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className="col-start-1 col-end-7 md:col-start-19 lg:col-end-24 row-start-2 md:row-start-1 h-full w-full flex items-end citation p-3">
          <p className="citation">
            {citation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageElement;
