"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import TopBand from "../components/AboutTopBand";
import Layout from "../components/Layout";
import VimeoElement from "../components/VimeoElement";
import ImageElement from "../components/ImageElement";
import { useData } from "../components/StorySectionHelper";
import { client } from "../lib/sanity";
import { fullBlog } from "../lib/interface";
import { PortableText } from "@portabletext/react";
import VideoElement from "../components/VideoElement";
import Image from "next/image";
import { urlForImage } from "../lib/image";

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  const [highRes, setHighRes] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  const [data, setData] = useState<fullBlog | null>(null);

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
  });

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
        <main className="w-full h-full gridParent px-5 fade-in-quick gap-8 pb-8">
          <div className="prose col-start-1 col-end-7 pr-7 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 article flex flex-col justify-start items-start gap-4 pt-40 pb-8">
            <PortableText
              value={data?.content}
              components={myPortableTextComponents}
            /> 
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
      <ImageElement image={urlForImage(value).url()} citation={value.alt} />
    ),
    video: ({ value }: any) => (
      <VimeoElement src={value.url} citation={value.caption} />
    ),
  },
};

