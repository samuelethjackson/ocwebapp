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
          <div className="col-start-1 col-end-6 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 article flex flex-col justify-start items-start gap-8 pt-40 pb-8">
          <PortableText
              value={data?.content}
            />
          </div>
          <ImageElement
            image="OR_screen_run_Image_Laisiasa-Dave-Lavaki_2024.jpg"
            citation='Oceanic Refractions, Berlin, 2024.'
          />
          <ImageElement
            image="OR_full_room_top_Image_Frankie-Casillo_2024.jpg"
            citation='Oceanic Refractions, Berlin, 2024.'
          />
          <ImageElement
            image="OR_full_room_run_Image_Laisiasa-Dave-Lavaki_2024.jpg"
            citation='Oceanic Refractions, Berlin, 2024.'
          />
          <ImageElement
            image="OR_projection_map_Image_Laisiasa-Dave-Lavaki_2024.jpg"
            citation='Oceanic Refractions, Berlin, 2024.'
          />
          <VimeoElement src={""} citation={""}
          />
        </main>
      </div>
    </Layout>
  );
};

export default AboutPage;
