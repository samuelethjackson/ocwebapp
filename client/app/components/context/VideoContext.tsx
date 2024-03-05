"use client"

// context/VideoContext.tsx
import { createContext, useState, useContext } from 'react';

interface VideoContextProps {
  isVideoPlaying: boolean;
  setIsVideoPlaying: (value: boolean) => void;
}

export const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  return (
    <VideoContext.Provider value={{ isVideoPlaying, setIsVideoPlaying }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};