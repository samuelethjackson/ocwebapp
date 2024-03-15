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

  const observer = useRef<IntersectionObserver | null>(null);

  const observeSections = useCallback(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(entry); // Log the entry to see what's being returned
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("div[id]");
    sections.forEach((section) => observer.current!.observe(section));
  }, []);

  useEffect(() => {
    observeSections();
    return () => {
      // Cleanup observer on component unmount
      const sections = document.querySelectorAll("div[id]");
      sections.forEach((section) => observer.current!.unobserve(section));
    };
  }, [observeSections]);

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
        <TopBand pageName="Installation" />
        <main className="w-full h-full gridParent px-5 fade-in-quick gap-8 pb-8 overflow-x-hidden">
          <div className="prose col-start-1 col-end-7 pr-2 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 article flex flex-col justify-start items-start gap-4 pt-40 pb-8">
            <PortableText
              value={data?.content}
              components={myPortableTextComponents}
            />
          </div>
          <div className="hidden h-screen col-start-18 col-end-24 md:flex items-start py-8 pt-36 pl-8">
            <div className="flex w-full fixed flex-col dark:text-white text-black text-xs font-normal leading-tight tracking-wide gap-2 uppercase">
            <div className="absolute -top-10 -left-2 bg-white dark:bg-black blur-sm h-64 w-full opacity-90 z-0"></div>
              <a
                href="#credits"
                onClick={(e) => handleScroll(e, "credits")}
                className={
                  activeSection === "credits" ? "opacity-100 z-10" : "opacity-50 z-10"
                }
              >
                Credits
              </a>
              <a
                href="#press"
                onClick={(e) => handleScroll(e, "press")}
                className={
                  activeSection === "press" ? "opacity-100 z-10" : "opacity-50 z-10"
                }
              >
                Press
              </a>
            </div>
            <div
              id="connect"
              className="fixed self-end	flex flex-col gap-2 w-full"
            >
              <div className="absolute -top-10 -left-2 bg-white dark:bg-black blur-sm h-64 w-full opacity-90 z-0"></div>
              <h2 className="w-full dark:text-white text-black text-xs font-normal leading-tight tracking-wide gap-2 uppercase z-10">
                Download
              </h2>
              <div className="flex flex-col w-full col-span-12 pr-2 md:col-span-10 gap-8 z-10">
                <p className="flex flex-col gap-0 opacity-50">
                  <a className="!no-underline">Media Pack (PDF)</a>
                  <a className="!no-underline">Gallery Pack (PDF)</a>
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
