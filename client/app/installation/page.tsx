"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import TopBand from "../components/AboutTopBand";
import Layout from "../components/Layout";
import VimeoElement from "../components/VimeoElement";
import ImageElement from "../components/ImageElement";

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  const [highRes, setHighRes] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

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
            <p>
              Listening and &#39;dialogue&#39; are two principles evoked by
              settler colonizers in Canada who swear that they are enacting
              &#39;good relations&#39; with Indigenous peoples and with stolen
              lands and waters across the country. As I watch, as a Red River
              Métis scholar, to an ever-accelerating ecocide unfold across the
              country, I am not convinced that the majority of euro-colonial
              settlers who claim to be &#39;listening&#39; and
              &#39;dialoguing&#39; with Indigenous peoples actually understand
              what listening (or Indigenous sovereignty and self-determination)
              truly entails. And I do not believe settlers here understand what
              listening to fish and water as relatives actually means.
            </p>
            <h3 className="paragraph-title">
                  Credits
            </h3>
            <ul>
              <li>Video production:</li>
              <li>Photography:</li>
              <li>Sound design:</li>
              <li>Texts:</li>
            </ul>
          </div>
          <VimeoElement
            src="https://player.vimeo.com/video/436960717?h=f5b9927bde&title=0&byline=0&portrait=0&pip=false"
            citation='Mere Nailatikau opens each episode with this reminder that can be heard between 00:30 and 00:34. To hear the third episode, “Stories of Oceanic Life,” please see: AM Kanngieser, Mere Nailatikau and Eliki Reade, "Stories of oceanic life,".'
          />
          <VimeoElement
            src="https://player.vimeo.com/video/764297424?h=04309e89de"
            citation='Mere Nailatikau opens each episode with this reminder that can be heard between 00:30 and 00:34. To hear the third episode, “Stories of Oceanic Life,” please see: AM Kanngieser, Mere Nailatikau and Eliki Reade, "Stories of oceanic life,".'
          />
          <ImageElement
            image="example-installation.png"
            citation='Mere Nailatikau opens each episode with this reminder that can be heard between 00:30 and 00:34. To hear the third episode, “Stories of Oceanic Life,” please see: AM Kanngieser, Mere Nailatikau and Eliki Reade, "Stories of oceanic life,".'
          />
        </main>
      </div>
    </Layout>
  );
};

export default AboutPage;