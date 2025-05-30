import React from "react";

interface VimeoElementProps {
  src: string;
  citation: string;
}

const VimeoElement: React.FC<VimeoElementProps> = ({ src, citation }) => {
  return (
    <div className="md:-ml-[12vw] -ml-5 w-screen gridParent !p-0">
      <div className="col-start-1 col-end-7 md:col-start-1 md:col-end-12 lg:col-start-1 lg:col-end-25 gridParent !p-0 gap-4 md:gap-0">
        <div className="col-start-1 col-end-7 lg:col-end-17 aspect-video row-start-1">
          <iframe
            src={src}
            title="vimeo-player"
            allowFullScreen
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div className="col-start-1 col-end-7 md:col-start-1 lg:col-end-12 row-start-2 h-full w-full flex items-end citation px-3 md:p-0 md:!pt-6 !pb-8">
          <p className="!-mt-2 pl-0">{citation}</p>
        </div>
      </div>
    </div>
  );
};

export default VimeoElement;
