"use client";

import { useRef, useEffect, useState } from "react";
import BottomBand from "./components/BottomBand";
import StorySection from "./components/StorySection";
import TopBand from "./components/TopBand";
import Layout from "./components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SwipeableViews from "react-swipeable-views";
import BlogArticle from "./components/BlogArticle";
import { storyOverview } from "./lib/interface";
import { useData } from "./components/StorySectionHelper";

export default function Home() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const ref6 = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState(1);
  const [highRes, setHighRes] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(1);

  const [isAnimateClicked, setIsAnimateClicked] = useState(false);
  const [isAnimateFinished, setIsAnimateFinished] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          // Handle up arrow key press
          handleTopBandClick();
          break;
        case "ArrowDown":
          // Handle down arrow key press
          handleBottomBandClick();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSection]); // Re-run the effect when activeSection changes

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimateFinished(isAnimateClicked);
    }, 1000); // 3 seconds delay

    // Cleanup function to clear the timeout when the component unmounts or isAnimateClicked changes
    return () => clearTimeout(timer);
  }, [isAnimateClicked]);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const [isAboutHovered, setIsAboutHovered] = useState(false);

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

  function getRandomVideoNumber() {
    const totalVideos = 3; // Change this to the total number of videos in each folder
    return Math.floor(Math.random() * totalVideos) + 1;
  }

  const [randomVideoNumber, setRandomVideoNumber] = useState(
    getRandomVideoNumber()
  );

  const [selectedStorySlug, setSelectedStorySlug] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    null
  );

  const [selectedStory, setSelectedStory] = useState<storyOverview | null>(
    null
  );

  const renderStorySection = (
    ref: React.RefObject<HTMLDivElement>,
    id: number,
    video: string
  ) => {
    if (
      !isAnimateClicked ||
      selectedSectionId === null ||
      selectedSectionId === id
    ) {
      return (
        <StorySection
          ref={ref}
          id={id}
          video={highRes ? `${video}.gif` : `${video}.mp4`}
          isAboutHovered={isAboutHovered}
          highRes={highRes}
          setHighRes={setHighRes}
          setSelectedStorySlug={setSelectedStorySlug}
          setSelectedSectionId={setSelectedSectionId}
          isAnimateClicked={isAnimateClicked}
          setIsAnimateClicked={setIsAnimateClicked}
          isAnimateFinished={isAnimateFinished}
          setIsAnimateFinished={setIsAnimateFinished}
          selectedStory={selectedStory}
          setSelectedStory={setSelectedStory}
        />
      );
    }
    return <div />; // return an empty div instead of null
  };

  const router = useRouter();

  const searchParams = useSearchParams();

  const data = useData();

  console.log(data);


  useEffect(() => {
    const param = searchParams.get("article");
    if (param) {
      const story = data?.find((story) => story.currentSlug === param);
      if (story !== selectedStory) {
        setIsAnimateClicked(true);
        setSelectedStorySlug(param);
        setSelectedStory(story || null);
      }
    }
  }, [selectedStory]);

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
      <AnimatePresence>
        <main className="w-screen h-dvh md:h-screen">
          {isAnimateFinished && isAnimateClicked && selectedStorySlug && (
            <motion.div
              initial="fadeOut" // Add this line
              animate="fadeIn"
              exit="fadeOut" // Add this line
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              <BlogArticle
                params={{ slug: selectedStorySlug }}
                highRes={highRes}
                setHighRes={setHighRes}
                isAboutHovered={isAboutHovered}
                setIsAboutHovered={setIsAboutHovered}
                isAnimateClicked={isAnimateClicked}
                setIsAnimateClicked={setIsAnimateClicked}
              />
            </motion.div>
          )}
          <TopBand
            pageName={windowWidth <= 680 ? mobileTopBandText : topBandText}
            onArrowClick={handleArrowClick}
            onTopBandClick={handleTopBandClick}
            isAboutHovered={isAboutHovered}
            isAnimateClicked={isAnimateClicked}
            setIsAnimateClicked={setIsAnimateClicked}
          />
          <motion.div
            variants={bandVariants}
            initial="fadeOut" // Add this line
            animate="fadeIn"
            exit="fadeOut" // Add this line
            transition={{ ease: "easeInOut", duration: 1 }}
            className="hidden absolute no-scrollbar bottom-0 left-0 w-full h-full md:snap-y md:overflow-y-scroll md:block snap-always snap-mandatory"
          >
            {renderStorySection(ref1, 1, `precedents/${randomVideoNumber}`)}
            {renderStorySection(ref2, 2, `witnessing/${randomVideoNumber}`)}
            {renderStorySection(ref3, 3, `responding/${randomVideoNumber}`)}
          </motion.div>
          <motion.div
            layout
            transition={{ duration: 2 }}
            id="mobile"
            className={`md:hidden no-scrollbar w-full ${
              !isAnimateClicked
                ? "bottom-0"
                : "absolute bottom-[65dvh] md:static md:bottom-auto"
            }`}
          >
            <SwipeableViews
              index={activeMobileSection - 1}
              onChangeIndex={(index: number) =>
                setActiveMobileSection(index + 1)
              }
            >
              {renderStorySection(ref4, 1, `precedents/${randomVideoNumber}`)}
            {renderStorySection(ref5, 2, `witnessing/${randomVideoNumber}`)}
            {renderStorySection(ref6, 3, `responding/${randomVideoNumber}`)}
            </SwipeableViews>
          </motion.div>
          {!isAboutHovered && !isAnimateClicked && (
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
          <AnimatePresence>
            {isAnimateClicked && (
              <div className="hidden md:grid half-grid h-[60vh] w-[50vw] fixed right-0 top-0 z-[900]">
                <motion.div
                  onClick={() => {
                    setIsAnimateClicked(false);
                    router.push(`/`);
                  }}
                  className="col-start-2 row-start-2 row-end-4 flex cursor-pointer h-full w-full back-position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0 }}
                >
                  {isAnimateClicked && (
                    <div className="hidden md:flex h-full w-full center fade-in-quick">
                      <p className="text-base text-black cloud-shadow-white">
                        All Contributions
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </AnimatePresence>
    </Layout>
  );
}
