import React from 'react';

interface VimeoElementProps {
  src: string;
  citation: string;
}

const VimeoElement: React.FC<VimeoElementProps> = ({ src, citation }) => {
  return (
    <div className="col-start-1 col-end-7 md:col-start-1 md:col-end-12 lg:col-start-1 lg:col-end-25 gridParent !p-0 gap-4 md:gap-0">
      <div className="col-start-1 col-end-7 lg:col-end-18 aspect-video row-start-1">
        <iframe
          src={src}
          title="vimeo-player"
          allowFullScreen
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className="col-start-1 col-end-7 md:col-start-19 lg:col-end-25 row-start-2 md:row-start-1 h-full w-full flex items-end">
        <div className="citation">
          {citation}
        </div>
      </div>
    </div>
  );
};

export default VimeoElement;
