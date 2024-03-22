"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import TopBand from "../components/AboutTopBand";
import Layout from "../components/Layout";
import VimeoElement from "../components/VimeoElement";
import ImageElement from "../components/ImageElement";
import { client } from "../lib/sanity";
import { fullBlog } from "../lib/interface";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "../lib/image";
import AnchorElement from "../components/AnchorElement";
import AnchorBubble from "../components/AnchorBubble";


const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  const [highRes, setHighRes] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  const [data, setData] = useState<fullBlog | null>(null);

  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yCoordinate = element.getBoundingClientRect().top + window.scrollY;
      const yOffset = -160; // adjust this value for your offset

      window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        console.log('IntersectionObserver Entry:', entry); // Debugging line
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);

          // Scroll the parent div of AnchorBubbles to the active AnchorBubble
          const anchorBubbleParent = document.querySelector('.anchor-bubble-parent');
          const activeBubble = document.querySelector(`.anchor-bubble[data-id="${entry.target.id}"]`);

          console.log('Active Bubble:', activeBubble); // Debugging line

          if (anchorBubbleParent && activeBubble) {
            const scrollOffset = (activeBubble as HTMLElement).offsetLeft - (anchorBubbleParent as HTMLElement).offsetLeft;
            const centeredOffset = scrollOffset - (anchorBubbleParent as HTMLElement).clientWidth / 2 + (activeBubble as HTMLElement).clientWidth / 2;
            (anchorBubbleParent as HTMLElement).scrollLeft = centeredOffset;

            console.log('Scrolling to:', centeredOffset); // Debugging line
          }
        }
      });
    };

    const observerShort = new IntersectionObserver(callback, {
      threshold: 1,
    });

    const sectionsShort = document.querySelectorAll(".short");
    sectionsShort.forEach((section) => observerShort.observe(section as Element));

    return () => {
      // Cleanup observer on component unmount
      sectionsShort.forEach((section) => observerShort.unobserve(section as Element));
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const query = `
        *[_type == "blog" && category == "Installation"] {
          title,
          date,
          content,
        }[0]`;

      const result = await client.fetch(query);

      // Set the data state with the original content, including footnotes
      setData(result);
    };

    getData();
  }, []);

  console.log(data);

  return (
    <Layout
      pageName="Installation"
      highRes={highRes}
      setHighRes={setHighRes}
      isAboutHovered={isAboutHovered}
      setIsAboutHovered={setIsAboutHovered}
    >
      <div className="flex flex-col items-center justify-center min-h-dvh md:min-h-screen">
        <div className="left-0 h-12 top-16 flex w-full md:h-min items-center fixed flex-row md:hidden dark:text-white text-black text-xs font-normal leading-tight tracking-wide px-12 md:pl-0 gap-8 md:gap-2 uppercase overflow-y-scroll overflow-x-visible bg-white dark:bg-black whitespace-nowrap no-scrollbar anchor-bubble-parent z-[999999]">
          <AnchorBubble
            section="credits"
            title="Credits"
            handleScroll={handleScroll}
            activeSection={activeSection}
          />
          <AnchorBubble
            section="press"
            title="Press"
            handleScroll={handleScroll}
            activeSection={activeSection}
          />
        </div>
        <TopBand pageName="Installation" />
        <main className="w-full h-full gridParent px-5 fade-in-quick gap-8 pb-8 overflow-x-hidden">
          <div className="prose col-start-1 col-end-7 pr-2 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 article flex flex-col justify-start items-start gap-4 pt-40 pb-8">
            <PortableText
              value={data?.content}
              components={myPortableTextComponents}
            />
          </div>
          <div className="hidden h-screen col-start-18 col-end-24 md:flex items-start py-8 pt-36">
            <div className="flex w-full fixed flex-col dark:text-white text-black text-xs font-normal leading-tight tracking-wide gap-2 uppercase">
              <div className="absolute -top-10 -left-2 bg-white dark:bg-black blur-sm h-64 w-full opacity-90 z-0"></div>
              <AnchorBubble
                section="credits"
                title="Credits"
                handleScroll={handleScroll}
                activeSection={activeSection}
              />
              <AnchorBubble
                section="press"
                title="Press"
                handleScroll={handleScroll}
                activeSection={activeSection}
              />
            </div>
            <div
              id="connect"
              className="fixed self-end	flex flex-col gap-2 w-full"
            >
              <div className="absolute -top-10 -left-2 bg-white dark:bg-black blur-sm h-64 w-full opacity-90 z-0"></div>
              <h2 className="w-full dark:text-white text-black text-xs font-normal leading-tight tracking-wide gap-2 uppercase z-10">
                Media
              </h2>
              <div className="flex flex-col w-full col-span-12 pr-2 md:col-span-10 gap-8 z-10">
                <p className="flex flex-col gap-0 opacity-50">
                  <a className="!no-underline" href="https://www.oceanicrefractions.org/Oceanic-Refractions-Media-Pack.zip">Media Pack (50 MB)</a>
                  <a className="!no-underline" href="https://vimeo.com/user216391456" target="_blank">Trailer and Promos</a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default AboutPage;

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <ImageElement image={urlForImage(value).url()} citation={value.caption} />
    ),
    video: ({ value }: any) => (
      <VimeoElement src={value.url} citation={value.caption} />
    ),
    anchor: ({ value }: any) => <AnchorElement anchor={value.anchor} />,
  },
};
