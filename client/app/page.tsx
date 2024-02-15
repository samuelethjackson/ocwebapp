"use client";

import { useRef, useEffect, useState } from "react";
import BottomBand from "./components/BottomBand";
import StorySection from "./components/StorySection";
import TopBand from "./components/TopBand";
import Layout from "./components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSearchParams } from "next/navigation";
import SwipeableViews from "react-swipeable-views";

export default function Home() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState(1);
  const [highRes, setHighRes] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(1);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const [isAboutHovered, setIsAboutHovered] = useState(false);

  const searchParams = useSearchParams();
  const param = searchParams.get("param");

  const handleBottomBandClick = () => {
    if (activeSection === 1 && ref2.current) {
      ref2.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeSection === 2 && ref3.current) {
      ref3.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTopBandClick = () => {
    if (activeSection === 2 && ref1.current) {
      ref1.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeSection === 3 && ref2.current) {
      ref2.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleArrowClick = (direction: "next" | "back") => {
    setActiveMobileSection((prev) => {
      if (direction === "next") {
        return prev < 3 ? prev + 1 : 3;
      } else {
        return prev > 1 ? prev - 1 : 1;
      }
    });
  };

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

  if (activeSection === 1) {
    topBandText = "";
    titleBandText = "Precedents of";
    bottomBandText = "Witnessing via";
  } else if (activeSection === 2) {
    topBandText = "Precedents of";
    titleBandText = "Witnessing via";
    bottomBandText = "Responding to";
  } else if (activeSection === 3) {
    topBandText = "Witnessing via";
    titleBandText = "Responding to";
    bottomBandText = "";
  }

  let mobileTopBandText = "";
  let mobileVideo = "";
  let mobileText = "";

  if (activeMobileSection === 1) {
    mobileTopBandText = "Precedents of";
    mobileVideo = highRes ? "precedents.gif" : "precedents.mp4";
  } else if (activeMobileSection === 2) {
    mobileTopBandText = "Witnessing via";
    mobileVideo = highRes ? "witnessing.gif" : "witnessing.mp4";
  } else if (activeMobileSection === 3) {
    mobileTopBandText = "Responding to";
    mobileVideo = highRes ? "responding.gif" : "responding.mp4";
  }

  useEffect(() => {
    if (param) {
      switch (param) {
        case "1":
          setActiveMobileSection(1);
          if (ref1.current) {
            ref1.current.scrollIntoView({ behavior: "auto", block: "start" });
          }
          break;
        case "2":
          setActiveMobileSection(2);
          if (ref2.current) {
            ref2.current.scrollIntoView({ behavior: "auto", block: "start" });
          }
          break;
        case "3":
          setActiveMobileSection(3);
          if (ref3.current) {
            ref3.current.scrollIntoView({ behavior: "auto", block: "start" });
          }
          break;
        default:
          break;
      }
    } else {
      setActiveMobileSection(1);
      if (ref1.current) {
        ref1.current.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }
  }, [param]);

  const bandVariants = {
    fadeIn: { opacity: 1 },
    fadeOut: { opacity: 0 },
  };

  return (
    <Layout
      pageName={titleBandText}
      highRes={highRes}
      setHighRes={setHighRes}
      isAboutHovered={isAboutHovered}
      setIsAboutHovered={setIsAboutHovered}
    >
      <main className="w-screen h-dvh md:h-screen">
        <TopBand
          pageName={windowWidth <= 680 ? mobileTopBandText : topBandText}
          onArrowClick={handleArrowClick}
          onTopBandClick={handleTopBandClick}
          isAboutHovered={isAboutHovered}
        />
        <motion.div
          variants={bandVariants}
          initial="fadeOut" // Add this line
          animate="fadeIn"
          exit="fadeOut" // Add this line
          transition={{ ease: "easeInOut", duration: 1 }}
          className="hidden absolute no-scrollbar bottom-0 left-0 w-full h-full md:snap-y md:overflow-y-scroll md:block snap-always snap-mandatory"
        >
          <StorySection
            ref={ref1}
            id={1}
            video={highRes ? "precedents.gif" : "precedents.mp4"}
            isAboutHovered={isAboutHovered}
            highRes={highRes}
          />
          <StorySection
            ref={ref2}
            id={2}
            video={highRes ? "witnessing.gif" : "witnessing.mp4"}
            isAboutHovered={isAboutHovered}
            highRes={highRes}
          />
          <StorySection
            ref={ref3}
            id={3}
            video={highRes ? "responding.gif" : "responding.mp4"}
            isAboutHovered={isAboutHovered}
            highRes={highRes}
          />
        </motion.div>
        <div id="mobile" className="md:hidden no-scrollbar w-full">
          <SwipeableViews
            index={activeMobileSection - 1}
            onChangeIndex={(index: number) => setActiveMobileSection(index + 1)}
          >
            <StorySection
              ref={ref1}
              id={1}
              video={highRes ? "precedents.gif" : "precedents.mp4"}
              isAboutHovered={isAboutHovered}
              highRes={highRes}
            />
            <StorySection
              ref={ref2}
              id={2}
              video={highRes ? "witnessing.gif" : "witnessing.mp4"}
              isAboutHovered={isAboutHovered}
              highRes={highRes}
            />
            <StorySection
              ref={ref3}
              id={3}
              video={highRes ? "responding.gif" : "responding.mp4"}
              isAboutHovered={isAboutHovered}
              highRes={highRes}
            />
          </SwipeableViews>
        </div>
        <AnimatePresence>
          {!isAboutHovered && (
            <motion.div
              key="bottomBand"
              variants={bandVariants}
              initial="fadeOut" // Add this line
              animate="fadeIn"
              exit="fadeOut" // Add this line
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              <BottomBand
                pageName={bottomBandText}
                onBottomBandClick={handleBottomBandClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
}
