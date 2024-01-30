"use client";

import { useRef, useEffect, useState } from 'react';
import BottomBand from "./components/BottomBand";
import StorySection from "./components/StorySection";
import TitleBand from "./components/TitleBand";
import TopBand from "./components/TopBand";

export default function Home() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(Number(entry.target.id));
          }
        });
      },
      { threshold: 0.7 } // Adjust this value to control when the callback is fired
    );
  
    if (ref1.current) observer.observe(ref1.current);
    if (ref2.current) observer.observe(ref2.current);
    if (ref3.current) observer.observe(ref3.current);
  
    return () => {
      observer.disconnect();
    };
  }, []);

  let topBandText = "";
  let titleBandText = "";
  let bottomBandText = "";

  if (activeSection === 1) {
    topBandText = "Responding to";
    titleBandText = "Precedents of";
    bottomBandText = "Whitnessing via";
  } else if (activeSection === 2) {
    topBandText = "Precedents of";
    titleBandText = "Whitnessing via";
    bottomBandText = "Responding to";
  } else if (activeSection === 3) {
    topBandText = "Whitnessing via";
    titleBandText = "Responding to";
    bottomBandText = "Precedents of";
  }

  return (
    <main className="w-screen h-screen">
      <TopBand pageName={topBandText} />
      <TitleBand pageName={titleBandText} />
      <div className="absolute top-0 left-0 w-screen h-screen snap-y snap-always snap-mandatory	md:overflow-y-scroll">
        <StorySection
          ref={ref1}
          id={1}
          video="waves.mp4"
          text="Text about the first frame. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <StorySection
          ref={ref2}
          id={2}
          video="trees.mp4"
          text="Text about the second frame. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <StorySection
          ref={ref3}
          id={3}
          video="mountains.mp4"
          text="Text about the third frame. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </div>
      <BottomBand pageName={bottomBandText} />
    </main>
  );
}