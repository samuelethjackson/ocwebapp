"use client";

import { useRef, useEffect, useState } from "react";
import BottomBand from "./components/BottomBand";
import StorySection from "./components/StorySection";
import TitleBand from "./components/TitleBand";
import TopBand from "./components/TopBand";
import Layout from "./components/Layout";

export default function Home() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState(1);
  const [highRes, setHighRes] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(2);

  const handleBottomBandClick = () => {
    if (activeSection === 1 && ref2.current) {
      ref2.current.scrollIntoView({ behavior: 'smooth' });
    } else if (activeSection === 2 && ref3.current) {
      ref3.current.scrollIntoView({ behavior: 'smooth' });
    } else if (activeSection === 3 && ref1.current) {
      ref1.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTopBandClick = () => {
    if (activeSection === 1 && ref3.current) {
      ref3.current.scrollIntoView({ behavior: 'smooth' });
    } else if (activeSection === 2 && ref1.current) {
      ref1.current.scrollIntoView({ behavior: 'smooth' });
    } else if (activeSection === 3 && ref2.current) {
      ref2.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleArrowClick = (direction: 'next' | 'back') => {
    setActiveMobileSection(prev => {
      let newSection;
      if (direction === 'next') {
        newSection = prev === 3 ? 1 : prev + 1;
      } else {
        newSection = prev === 1 ? 3 : prev - 1;
      }
      console.log('Current activeMobileSection:', newSection);
      return newSection;
    });
  };

  useEffect(() => {
    console.log('activeMobileSection:', activeMobileSection);
  }, [activeMobileSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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

  let Text1 = "First Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
  let Text2 = "Second Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
  let Text3 = "Third Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

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

  let mobileVideo = "";
  let mobileText = "";

  if (activeMobileSection === 1) {
    mobileVideo = highRes ? "precedents.gif" : "precedents.mp4";
    mobileText = Text1;
  } else if (activeMobileSection === 2) {
    mobileVideo = highRes ? "witnessing.gif" : "witnessing.mp4";
    mobileText = Text2;
  } else if (activeMobileSection === 3) {
    mobileVideo = highRes ? "responding.gif" : "responding.mp4";
    mobileText = Text3;
  }

  return (
    <Layout pageName={titleBandText} highRes={highRes} setHighRes={setHighRes}>
    <main className="w-screen h-screen">
      <TopBand pageName={topBandText} onArrowClick={handleArrowClick} onTopBandClick={handleTopBandClick}/>
      <div className="hidden absolute no-scrollbar top-0 left-0 w-full h-full md:snap-y md:overflow-y-scroll md:flex flex-col snap-always snap-mandatory">
        <StorySection
          ref={ref1}
          id={1}
          video={highRes ? "precedents.gif" : "precedents.mp4"}
          text={Text1}
        />
        <StorySection
          ref={ref2}
          id={2}
          video={highRes ? "witnessing.gif" : "witnessing.mp4"}
          text={Text2}
        />
        <StorySection
          ref={ref3}
          id={3}
          video={highRes ? "responding.gif" : "responding.mp4"}
          text={Text3}
        />
      </div>
      <div
        id="mobile"
        className="md:hidden absolute no-scrollbar top-0 left-0 w-full h-full"
      >
        <StorySection
          ref={ref4}
          id={activeMobileSection}
          video={mobileVideo}
          text={mobileText}
        />
      </div>
      <BottomBand pageName={bottomBandText} onBottomBandClick={handleBottomBandClick} />
    </main>
    </Layout>
  );
}
