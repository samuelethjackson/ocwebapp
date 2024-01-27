import React from 'react';

const VideoElement: React.FC = () => {

  return (
    <section className={"flex w-full h-full"}>
      <video src="/videos/waves.mp4" autoPlay muted loop className='absolute top-0 w-full h-full object-cover'/>
    </section>
  );
};

export default VideoElement;