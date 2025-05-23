"use client"

// context/AnimateContext.tsx
import { createContext, useState, useContext } from 'react';

interface AnimateContextProps {
  isAnimateClicked: boolean;
  setIsAnimateClicked: (value: boolean) => void;
  isMenuClicked: boolean;
  setIsMenuClicked: (value: boolean) => void;
}

export const AnimateContext = createContext<AnimateContextProps | undefined>(undefined);

export const AnimateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [isAnimateClicked, setIsAnimateClicked] = useState(false);
    const [isMenuClicked, setIsMenuClicked] = useState(false);

  return (
    <AnimateContext.Provider value={{ isAnimateClicked, setIsAnimateClicked, isMenuClicked, setIsMenuClicked }}>
      {children}
    </AnimateContext.Provider>
  );
};

export const useAnimate = () => {
  const context = useContext(AnimateContext);
  if (context === undefined) {
    throw new Error('useAnimate must be used within a AnimateProvider');
  }
  return context;
};