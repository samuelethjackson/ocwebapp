"use client";

import React from "react";
import TitleBand from "../components/TitleBand";
import TopBand from "../components/AboutTopBand";

const AboutPage: React.FC = () => {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <TopBand pageName="About" />
      <TitleBand pageName="About" />
      <main className="w-screen h-screen grid grid-cols-24 px-5">
        <div className="col-start-4 col-end-13 about pt-40 flex flex-col gap-20 pb-40">
          <div id="about" className="grid grid-cols-10 gap-8">
            <h2 className="col-start-2 col-end-10 paragraph-title">
              Collective philosophies, values and ethics
            </h2>
            <div className="flex flex-col w-full col-span-10 gap-8">
              <p>
                We are working with a variety of cultural materials that hold
                great significance, and need to be treated respectfully. We view
                the materials we are working with as being a part of the places
                they are taken from containing spiritual and emotional
                attributes and connections. We do not use these materials
                lightly. Acknowledging the immeasurable value of the recordings
                and the contributions of the Pacific people featured in the
                work, this endeavour incorporates the informed consent of its
                participants and the guidance and advice of Pacific
                practitioners of art, culture and development for a generative
                experience.
              </p>
              <p>
                As collaborators in a team with various chronic illnesses, pain
                and disabilities, we honour our interdependence and co-existence
                within systems of care. We prioritise rest and pacing; everyone
                has different capacities and needs. We treat each other with
                grace and dignity. In our work relations we seek to transform
                rather than avoid mistakes and conflict. We honour
                non-conventional ways of collaborating that are not based on
                urgency, demand and stress.
              </p>
            </div>
          </div>
          <div id="background" className="grid grid-cols-10 gap-8">
            <h2 className="col-start-2 col-end-10 paragraph-title">
              Background and Approach
            </h2>
            <div className="flex flex-col w-full col-span-10 gap-8">
              <p>
                We are working with a variety of cultural materials that hold
                great significance, and need to be treated respectfully. We view
                the materials we are working with as being a part of the places
                they are taken from containing spiritual and emotional
                attributes and connections. We do not use these materials
                lightly. Acknowledging the immeasurable value of the recordings
                and the contributions of the Pacific people featured in the
                work, this endeavour incorporates the informed consent of its
                participants and the guidance and advice of Pacific
                practitioners of art, culture and development for a generative
                experience.
              </p>
              <p>
                As collaborators in a team with various chronic illnesses, pain
                and disabilities, we honour our interdependence and co-existence
                within systems of care. We prioritise rest and pacing; everyone
                has different capacities and needs. We treat each other with
                grace and dignity. In our work relations we seek to transform
                rather than avoid mistakes and conflict. We honour
                non-conventional ways of collaborating that are not based on
                urgency, demand and stress.
              </p>
            </div>
          </div>
          <div id="relationship" className="grid grid-cols-10 gap-8">
            <h2 className="col-start-2 col-end-10 paragraph-title">
              Relationship and Circulation
            </h2>
            <div className="flex flex-col w-full col-span-10 gap-8">
              <p>
                We are working with a variety of cultural materials that hold
                great significance, and need to be treated respectfully. We view
                the materials we are working with as being a part of the places
                they are taken from containing spiritual and emotional
                attributes and connections. We do not use these materials
                lightly. Acknowledging the immeasurable value of the recordings
                and the contributions of the Pacific people featured in the
                work, this endeavour incorporates the informed consent of its
                participants and the guidance and advice of Pacific
                practitioners of art, culture and development for a generative
                experience.
              </p>
              <p>
                As collaborators in a team with various chronic illnesses, pain
                and disabilities, we honour our interdependence and co-existence
                within systems of care. We prioritise rest and pacing; everyone
                has different capacities and needs. We treat each other with
                grace and dignity. In our work relations we seek to transform
                rather than avoid mistakes and conflict. We honour
                non-conventional ways of collaborating that are not based on
                urgency, demand and stress.
              </p>
            </div>
          </div>
          <div id="colophon" className="grid grid-cols-10 gap-8">
            <h2 className="col-start-2 col-end-10 paragraph-title">Colophon</h2>
            <div className="flex flex-col w-full col-span-10 gap-8">
              <p>
                We are working with a variety of cultural materials that hold
                great significance, and need to be treated respectfully. We view
                the materials we are working with as being a part of the places
                they are taken from containing spiritual and emotional
                attributes and connections. We do not use these materials
                lightly. Acknowledging the immeasurable value of the recordings
                and the contributions of the Pacific people featured in the
                work, this endeavour incorporates the informed consent of its
                participants and the guidance and advice of Pacific
                practitioners of art, culture and development for a generative
                experience.
              </p>
              <p>
                As collaborators in a team with various chronic illnesses, pain
                and disabilities, we honour our interdependence and co-existence
                within systems of care. We prioritise rest and pacing; everyone
                has different capacities and needs. We treat each other with
                grace and dignity. In our work relations we seek to transform
                rather than avoid mistakes and conflict. We honour
                non-conventional ways of collaborating that are not based on
                urgency, demand and stress.
              </p>
            </div>
          </div>
          <div id="privacy" className="grid grid-cols-10 gap-8">
            <h2 className="col-start-2 col-end-10 paragraph-title">
              Privacy and Terms
            </h2>
            <div className="flex flex-col w-full col-span-10 gap-8">
              <p>
                We are working with a variety of cultural materials that hold
                great significance, and need to be treated respectfully. We view
                the materials we are working with as being a part of the places
                they are taken from containing spiritual and emotional
                attributes and connections. We do not use these materials
                lightly. Acknowledging the immeasurable value of the recordings
                and the contributions of the Pacific people featured in the
                work, this endeavour incorporates the informed consent of its
                participants and the guidance and advice of Pacific
                practitioners of art, culture and development for a generative
                experience.
              </p>
              <p>
                As collaborators in a team with various chronic illnesses, pain
                and disabilities, we honour our interdependence and co-existence
                within systems of care. We prioritise rest and pacing; everyone
                has different capacities and needs. We treat each other with
                grace and dignity. In our work relations we seek to transform
                rather than avoid mistakes and conflict. We honour
                non-conventional ways of collaborating that are not based on
                urgency, demand and stress.
              </p>
            </div>
          </div>
        </div>
        <div className="fixed top-0 w-screen h-screen grid grid-cols-24 px-5">
          <div className="h-screen col-start-15 col-end-20 flex items-end py-8">
            <div className="flex flex-col text-sm font-normal capitalize leading-tight gap-1">
              <a href="#about" onClick={(e) => handleScroll(e, "about")}>
                About
              </a>
              <a
                href="#background"
                onClick={(e) => handleScroll(e, "background")}
              >
                Background and Approach
              </a>
              <a
                href="#relationship"
                onClick={(e) => handleScroll(e, "relationship")}
              >
                Relationship and Circulation
              </a>
              <a href="#colophon" onClick={(e) => handleScroll(e, "colophon")}>
                Colophon
              </a>
              <a href="#privacy" onClick={(e) => handleScroll(e, "privacy")}>
                Privacy and Terms
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
