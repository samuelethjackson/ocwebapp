"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import TopBand from "../components/AboutTopBand";
import Layout from "../components/Layout";
import AnchorBubble from "../components/AnchorBubble";

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  const [highRes, setHighRes] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

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
      threshold: 0.5,
    });
  
    const observerLong = new IntersectionObserver(callback, {
      threshold: 0.2,
    });

    const observerLonger = new IntersectionObserver(callback, {
      threshold: 0.1,
    });
  
    const sectionsShort = document.querySelectorAll(".short");
    sectionsShort.forEach((section) => observerShort.observe(section as Element));
  
    const sectionsLong = document.querySelectorAll(".long");
    sectionsLong.forEach((section) => observerLong.observe(section as Element));

    const sectionsLonger = document.querySelectorAll(".longer");
    sectionsLonger.forEach((section) => observerLonger.observe(section as Element));
  
    return () => {
      // Cleanup observer on component unmount
      sectionsShort.forEach((section) => observerShort.unobserve(section as Element));
      sectionsLong.forEach((section) => observerLong.unobserve(section as Element));
      sectionsLonger.forEach((section) => observerLonger.unobserve(section as Element));
    };
  }, []);

  return (
    <Layout
      pageName="About"
      highRes={highRes}
      setHighRes={setHighRes}
      isAboutHovered={isAboutHovered}
      setIsAboutHovered={setIsAboutHovered}
    >
      <div className="flex flex-col items-center justify-center min-h-dvh md:min-h-screen">
        <div className="md:hidden"></div>
        <TopBand pageName="About" />
        <main className="w-full h-full gridParent px-5 fade-in-quick">
          <div className="col-start-1 col-end-6 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 article flex flex-col gap-20 pt-40 pb-8">
            <div id="connect" className="grid md:hidden grid-cols-10 gap-8 short pt-12">
              <h2 className="col-start-1 col-end-10">Connect with us</h2>
              <div className="flex flex-col w-full col-span-12 pr-2 md:col-span-10 gap-8">
                <p className="flex flex-col gap-0">
                  <a
                    className="!no-underline"
                    href="mailto:oceanicrefractions@gmail.com"
                  >
                    oceanicrefractions@gmail.com
                  </a>
                  <a
                    className="!no-underline"
                    href="https://www.instagram.com/oceanicrefractions/"
                  >
                    Instagram
                  </a>
                </p>
              </div>
            </div>
            <div id="about" className="grid grid-cols-10 gap-8 short">
              <h2 className="col-start-2 col-end-10 !indent-0">Who We Are</h2>
              <div className="flex flex-col w-full col-span-12 pr-2 md:col-span-10 gap-8">
                <p className="!indent-0">
                  <i>Oceanic Refractions</i> emerges from a long-standing
                  friendship and collaboration between us —{" "}
                  <a href="https://amkanngieser.com/" target="_blank">
                    AM Kanngieser
                  </a>{" "}
                  (Australia) and{" "}
                  <a href="https://www.merenailatikau.com/" target="_blank">
                    Mere Nailatikau
                  </a>{" "}
                  (Fiji). Beginning in 2018 with an audio storytelling class at
                  The University of South Pacific’s Oceania Center in Suva,
                  Fiji, we have slowly been developing workshops, creative
                  practices and writing that centres Indigenous Pacific
                  storytelling in climate art and communication. Since 2023 we
                  have launched a series of commissioned documentaries for
                  international broadcast (
                  <a
                    href="https://www.hoerspielundfeature.de/listening-across-fault-linses-folge-01-englisch-100.html"
                    target="_blank"
                  >
                    Listening Across Fault Lines, 2023
                  </a>
                  ) a feature exhibition for a European sound art biennale (
                  <a
                    href="https://struertracks.dk/project/am-kanngieser-mere-nailatikau-eliki-reade"
                    target="_blank"
                  >
                    Crenulations – Pacific Drift, 2023
                  </a>
                  ), both co-produced with Eliki Reade (Australia/Fiji), and a
                  major immersive installation (Oceanic Refractions, 2024).
                </p>
                <p>
                  Oceanic Refractions is a multisensory audio-visual work
                  featuring videography from Laisiasa Dave Lavaki (Fiji),{" "}
                  <a href="https://tuqota.com/" target="_blank">
                    Tumeli Tuqota
                  </a>{" "}
                  (Fiji) and Mere Nailatikau, and sound design by{" "}
                  <a href="https://kmru.info/" target="_blank">
                    Joseph Kamaru
                  </a>{" "}
                  (Kenya/ Germany) and AM Kanngieser. The European installation
                  is built with technical production managers and fabricators{" "}
                  <a href="https://www.spaceforms.ie/" target="_blank">
                    Space Forms
                  </a>{" "}
                  (Ireland), projection specialists FrameWorks (Ireland), and
                  olfactory artist{" "}
                  <a href="https://www.smellart.com.au/" target="_blank">
                    Smell Art
                  </a>{" "}
                  (Australia).
                </p>
              </div>
            </div>
            <div id="background" className="grid grid-cols-10 gap-8 long">
              <h2 className="col-start-2 col-end-10 !indent-0">
                Our Background and Approach
              </h2>
              <div className="flex flex-col w-full col-span-12 pr-2 md:col-span-10 gap-8">
                <p className="!indent-0">
                  <i>Oceanic Refractions</i> has been created to convey
                  testimonies from the everyday lives of diverse Oceanic
                  communities and their environments, bearing witness to ongoing
                  and accelerating ecocide.
                </p>
                <p>
                  With backgrounds in communication, advocacy, and international
                  relations (Nailatikau), and climate geography and art
                  (Kanngieser), our interdisciplinary approaches form the
                  foundation from which we amplify the sovereignty of Oceanic
                  peoples. Through <i>Oceanic Refractions</i>, we foreground
                  interdependence and connection across the many experiences
                  held by the Pacific communities with whom we have the
                  privilege of working. In embracing their complexity, we move
                  away from universalised and dehumanising descriptions of
                  Indigenous resilience that seek to depict communities as
                  simply ‘heroes’ or ‘victims’ of the climate crisis.
                </p>
                <p>
                  The ecosystemic changes experienced across the region derive
                  from legacies of European colonisation, imperialism, and
                  resource extraction — and post-independence — from
                  neo-colonial capitalism. We recognise these violences and work
                  from narratives and practices of liberation and
                  self-determination. In our view, it is crucial for us to
                  expand beyond the ‘deficit’ and trauma narratives prevalent in
                  arts, NGO, aid, and academic discourses by focusing on
                  knowledges and perspectives usually left out of international
                  environmental conversations, particularly those of transgender
                  and queer communities, women and older custodians.
                </p>
                <p>
                  In line with our approach, we prioritise collaborating with
                  and highlighting creators and artists living across the
                  Pacific region. The Western concept of Indigeneity holds
                  significant social cachet within artistic circles of
                  settler-coloniser societies, where it is often tokenised,
                  taking away the dignity of producers and forcing them to make
                  work legible to white audiences. For Indigenous artists
                  residing in their home countries without the support of a
                  publicly funded arts sector, creative opportunities are
                  frequently limited to performative cultural representation and
                  influenced by themes imposed by development and aid agencies.
                </p>
                <p>
                  Recognising the inequities they confront, we purposefully
                  showcase Pacific Islands-based creators and artists and ensure
                  equitable pay. This commitment upholds our decision to bring
                  Oceanic Refractions back to the region. The project must
                  benefit the communities we work with; we plan to co-design
                  ongoing interactions of the project with local communities,
                  creators, and artists on a long-term basis and establish a
                  community-led trust to support local initiatives without the
                  burden of reporting.
                </p>
                <p>
                  Our work progresses in close consultation with an Advisory
                  Group comprising Joey Tau (Papua New Guinea/ Fiji) from{" "}
                  <a href="http://www.pang.org.fj/" target="_blank">
                    Pacific Network on Globalisation (PANG)
                  </a>
                  ; Fleur Ramsay (Samoa/ Australia) from{" "}
                  <a href="https://www.blueoceanlaw.com/" target="_blank">
                    Blue Ocean Law
                  </a>
                  ; Indigenous culturalist Simione Sevudredre (Fiji); and
                  environmental scientist and curator Sana Balai (Bouganville/
                  Australia).
                </p>
              </div>
            </div>
            <div id="relationship" className="grid grid-cols-10 gap-8 longer">
              <h2 className="col-start-2 col-end-10 !indent-0">
                Relationships and Circulation
              </h2>
              <div className="flex flex-col w-full col-span-12 pr-2 md:col-span-10 gap-8">
                <p className="!indent-0">
                  The foundation of our artistic and professional collaboration
                  lies in our friendship, which has flourished through the time
                  we&#39;ve dedicated — both individually and together — to
                  contemplating the integrity of our work and its purpose. As a
                  white Anglo-European creator, AM knows there is no absolutely
                  ethical way for them to do this work, and we are continuously
                  reflecting on how to navigate as well as possible the vastly
                  differential economic, racial, and social capital and power
                  held between diverse Indigenous and non-Indigenous
                  communities. All material in <i>Oceanic Refractions</i> has
                  been recorded consensually, in consultation with, and
                  invitation by, the speakers and environments. We are
                  explicitly dedicated to anti-colonial approaches and the
                  centralisation of Indigenous knowledge and relational values.
                  Our actions and protocols as Indigenous and non-Indigenous
                  artists are outlined in the <i>Oceanic Refractions</i> project
                  philosophy.
                </p>
                <p>
                  Following overseas exhibitions, <i>Oceanic Refractions</i>{" "}
                  will be brought back to Fiji. We are fostering partnerships
                  with local institutions, including a program involving
                  skill-sharing and cultural exchange activities. We hope to do
                  the same in other Pacific Island countries. It is crucial for{" "}
                  <i>Oceanic Refractions</i> to extend beyond formalised and
                  exclusive arts spaces. Creativity knows no bounds, and we
                  firmly believe that the right to enjoy, contribute to, and
                  engage with the arts belongs to everyone.
                </p>
                <p>
                  We are setting up a trust with any future income from{" "}
                  <i>Oceanic Refractions</i> exhibitions. Guided by the Advisory
                  Group, this trust will support workshops, dialogues, and
                  collaborations with communities and creators in the Pacific
                  Islands.
                </p>
                <h3 className="paragraph-title">
                  How We Choose to Work and Why 
                </h3>
                <p className="!indent-0">
                  Our mission is to transmit testimonies of Pacific people and
                  their environments responding to anthropogenic ecosystemic
                  crises.
                </p>
                <p>Our commitments include to:</p>
                <ul>
                  <li>
                    Create a community-led trust to distribute income from
                    commissions to Pacific communities;
                  </li>
                  <li>
                    Equitably pay collaborators for their time and showcase
                    their contributions, prioritising Pacific Islands-based
                    creators at every opportunity;
                  </li>
                  <li>
                    Archive recordings in their countries and with their
                    communities of origin;
                  </li>
                  <li>
                    Bring the installation to the Pacific region with an
                    emphasis on engaging long-term with communities and schools
                    through workshops, skill-sharing, and creative
                    opportunities.
                  </li>
                </ul>
                <p>
                  We work closely with our Advisory Group to ensure we are
                  always accountable to Pacific communities. Our project
                  philosophy captures how we commit to working based on our
                  reflections on methods, co-design, listening, and emphasising
                  Indigenous knowledge and perspectives.
                </p>
                <p>
                  Informed by our individual and collective experiences, we
                  align ourselves with people, places, and communities that
                  share <i>Oceanic Refractions</i>’ ethos and values.
                  Conversely, we refrain from engaging with institutions and
                  actors that have shown a lack of good faith. Recognising the
                  extractive systems of aid-funded development, arts, and
                  academia, of which we have extensive experience, we make a
                  deliberate choice to demote these spaces in our work.
                </p>
              </div>
            </div>
            <div id="community" className="grid grid-cols-10 gap-8 long">
              <h2 className="col-start-2 col-end-10 !indent-0">Community</h2>
              <div className="flex flex-col w-full col-span-12 pr-2 md:col-span-10 gap-8">
                <p className="!indent-0">
                  We acknowledge the many generous individuals, communities, and
                  institutions who have contributed to making{" "}
                  <i>Oceanic Refractions</i> possible. Our gratitude goes to the
                  following for their creativity, expertise, goodwill,
                  testimonials, and resourcing:
                </p>
                <h3 className="paragraph-title">Participants</h3>
                <ul>
                  <li>
                    Lydia Jacob and Philip Tacom (Duke of York Islands, Papua
                    New Guinea)
                  </li>
                  <li>Teweiariki Teaero (Kiribati)</li>
                  <li>
                    Simione Sevudredre and{" "}
                    <a
                      href="https://unaisinabobobaba.wordpress.com/"
                      target="_blank"
                    >
                      Unaisi Nabobo-Baba
                    </a>{" "}
                    (Fiji)
                  </li>
                </ul>
                <h3 className="paragraph-title">Family and Friends</h3>
                <ul>
                  <li>Krystelle Lavaki (Fiji)</li>
                </ul>
                <h3 className="paragraph-title">Artistic Collaborators</h3>
                <ul>
                  <li>
                    Eliki Reade (Australia/ Fiji) (
                    <i>Listening Across Faultlines</i>)
                  </li>
                  <li>
                    <a href="https://jenatsch.net/" target="_blank">
                      Daniel Jenatsch
                    </a>{" "}
                    (Australia) (<i>Listening Across Faultlines</i>)
                  </li>
                  <li>
                    <a
                      href="https://robbiewingcom.wordpress.com/"
                      target="_blank"
                    >
                      Robbie Wing
                    </a>{" "}
                    (Cherokee Nation, Oklahoma) (
                    <i>Crenulations – Pacific Drift</i>)
                  </li>
                  <li>
                    <a href="https://kmru.info/" target="_blank">
                      Joseph Kamaru
                    </a>{" "}
                    (<i>Oceanic Refractions</i>)
                  </li>
                  <li>
                    Tumeli Tuqota and Dave Lavaki (<i>Oceanic Refractions</i>)
                  </li>
                  <li>
                    Sara Murphy and Frank Pendergast at{" "}
                    <a href="https://www.spaceforms.ie/" target="_blank">
                      SpaceForms
                    </a>{" "}
                    (<i>Oceanic Refractions</i>)
                  </li>
                  <li>
                    Olan Clarke at FrameWorks (<i>Oceanic Refractions</i>)
                  </li>
                  <li>
                    Erin Adams of{" "}
                    <a href="https://www.smellart.com.au/" target="_blank">
                      Smell Art
                    </a>{" "}
                    (<i>Oceanic Refractions</i>)
                  </li>
                  <li>
                    <a href="https://elisehunchuck.com/" target="_blank">
                      Elise Misao Hunchuck
                    </a>{" "}
                    (Canada/Germany), Website Concept, Design, and Editing (
                    <i>Oceanic Refractions</i>)
                  </li>
                  <li>
                    Marco Ferrari (Italy) of{" "}
                    <a href="https://www.studiofolder.it/" target="_blank">
                      Studio Folder
                    </a>
                    , Website Design and Build (<i>Oceanic Refractions</i>)
                  </li>
                  <li>Zoe Todd (Métis, Alberta), Conceptual Design</li>
                </ul>
                <h3 className="paragraph-title">Advisory Board</h3>
                <ul>
                  <li>Joey Tau (Papua New Guinea/ Fiji)</li>
                  <li>
                    Sana Balai (Autonomous Region of Bougainville/ Australia)
                  </li>
                  <li>Fleur Ramsay (Samoa/ Australia)</li>
                  <li>Simione Sevudredre (Fiji)</li>
                </ul>
                <h3 className="paragraph-title">
                  Exhibiting Partners, Funders, and Support
                </h3>
                <ul>
                  <li>
                    <a
                      href="https://asiafoundation.org/people/sandra-kraushaar/"
                      target="_blank"
                    >
                      Sandra Kraushaar
                    </a>{" "}
                    and Cynthia Ramirez of{" "}
                    <a
                      href="https://asiafoundation.org/where-we-work/pacific-islands/"
                      target="_blank"
                    >
                      The Asia Foundation
                    </a>{" "}
                    (Pacific Islands)
                  </li>
                  <li>
                    <a href="https://www.ctm-festival.de/" target="_blank">
                      CTM Festival
                    </a>{" "}
                    and{" "}
                    <a href="https://transmediale.de/en" target="_blank">
                      transmediale
                    </a>{" "}
                    (Germany)
                  </li>
                  <li>
                    <a href="https://soundartlab.org/" target="_blank">
                      Sound Art Lab
                    </a>{" "}
                    and{" "}
                    <a href="https://struertracks.dk/" target="_blank">
                      Struer Tracks Sound Art Biennale
                    </a>{" "}
                    (Denmark)
                  </li>
                  <li>
                    <a href="https://www.bang-olufsen.com/" target="_blank">
                      Bang and Olufsen
                    </a>{" "}
                    (Denmark)
                  </li>
                  <li>
                    <a href="https://www.deutschlandradio.de/" target="_blank">
                      Deutschland Radio
                    </a>{" "}
                    (Germany)
                  </li>
                  <li>
                    <a href="https://creative.gov.au/" target="_blank">
                      Creative Australia
                    </a>{" "}
                    (Australia)
                  </li>
                  <li>
                    <a
                      href="https://australianculturalfund.org.au/"
                      target="_blank"
                    >
                      Australian Cultural Foundation
                    </a>{" "}
                    (Australia)
                  </li>
                  <li>
                    <a
                      href="https://commission.europa.eu/index_en"
                      target="_blank"
                    >
                      European Commission
                    </a>{" "}
                    (MSCA)
                  </li>
                </ul>
              </div>
            </div>
            <div id="philosophies" className="grid grid-cols-10 gap-8 longer">
              <h2 className="col-start-2 col-end-10 !indent-0">
                Collective Philosophies, Values, and Ethics
              </h2>
              <div className="flex flex-col w-full col-span-12 pr-2 md:col-span-10 gap-8">
                <p className="!indent-0">
                  As a collective, our shared principles shape why and how we
                  work together. These principles guide how we relate to one
                  another and how we also hope to relate to project partners.
                  They also reflect the prioritisation of integrity and care in
                  our working methods.
                </p>
                <h3 className="paragraph-title">
                  Centering Indigenous Knowledge and Practices
                </h3>
                <p className="!indent-0">
                  We are working with a variety of cultural materials that hold
                  great significance and need to be treated respectfully. We
                  view the materials we are working with as being a part of the
                  places they are taken from, containing spiritual and emotional
                  attributes and connections. We do not use these materials
                  lightly. Acknowledging the immeasurable value of the
                  recordings and the contributions of the Pacific people
                  featured in our work, this endeavour incorporates the informed
                  consent of its participants and the guidance and advice of
                  Pacific practitioners of art, culture, and development for a
                  generative experience.
                </p>
                <p>What this looks like in practice:</p>
                <ul>
                  <li>
                    We defer to Indigenous partners&#39; perspectives and
                    approaches. We consult with and inform ourselves how best to
                    work with the materials we have. This involves ongoing
                    conversations with community members. If this is in conflict
                    with Western perspectives and approaches, we are open to
                    finding ways to navigate conflicting viewpoints where
                    possible. However, our priority is to amplify the Indigenous
                    perspective;
                  </li>
                  <li>
                    We consult with Indigenous partners and collaborators to
                    ensure we have consent and permission to gather material, to
                    make material public, and the use of any material is aligned
                    with community protocols;
                  </li>
                  <li>
                    We commit to being aware of the ways in which extractive
                    systems have shaped our outlooks and our relationships. We
                    commit to continual open dialogue with each other, our
                    Advisory Board, and our community partners in this process;
                  </li>
                  <li>
                    We acknowledge the multiple realities our Indigenous project
                    partners and collaborators hold and will create pathways for
                    clear communication around mutually agreed expectations,
                    timelines, and needs;
                  </li>
                  <li>
                    We will not foreground non-Indigenous presentation partners
                    or funders in our public presentation materials. We will
                    work with non-Indigenous project partners to find
                    alternative ways to respectfully acknowledge their input.
                  </li>
                </ul>
                <h3 className="paragraph-title">
                  Mutuality and Circular Economy
                </h3>
                <p className="!indent-0">
                  A key priority of the collective is that when we produce work
                  about places and communities, the works and resources produced
                  by the work are returned to those places and communities in
                  different ways. This is important to ensure that the work
                  comes to rest in its rightful home and that the communities it
                  draws from are included in the economies the works generate.
                </p>
                <p>What this looks like in practice:</p>
                <ul>
                  <li>We are respectful of the land that we’re on;</li>
                  <li>
                    We redistribute resources through opportunities, bringing in
                    and working with Pacific partners at every possible scale;
                  </li>
                  <li>
                    We pay project partners at rates equitable to our own;
                  </li>
                  <li>
                    All recordings and material will be properly attributed as
                    desired by project partners;
                  </li>
                  <li>
                    We work with community Elders and organisations to return
                    the artistic material to the lands they were taken from
                    through national and local archives;
                  </li>
                  <li>
                    We make the material free and available for educational
                    resources without constraint;
                  </li>
                  <li>
                    We work with communities to make the material relevant to
                    them in the ways they see fit;
                  </li>
                  <li>
                    We prioritise building long-term relationships of trust and
                    reciprocity and will follow Pacific protocols for
                    engagement;
                  </li>
                  <li>
                    We work with a cultural Advisory Board and will receive
                    ongoing communication and advice from them;
                  </li>
                  <li>
                    We establish a long-term financial trust guided by the
                    Advisory Board with money incoming from the presentation of
                    work distributed to Pacific communities directly without the
                    burden of reporting.
                  </li>
                </ul>
                <h3 className="paragraph-title">Clarity of Communication</h3>
                <p className="!indent-0">
                  In order to minimise Western capitalist cultures of urgency
                  and stress, we practise clear and direct communication. We do
                  so within our team and with project partners.
                </p>
                <h3 className="paragraph-title">
                  Honouring Different Capacities and Disability Justice
                </h3>
                <p className="!indent-0">
                  As collaborators in a team with various chronic illnesses and
                  disabilities, we honour our interdependence and co-existence
                  within systems of care. We prioritise rest and pacing;
                  everyone has different capacities and needs. We treat each
                  other with grace and dignity. In our work relations, we seek
                  to transform rather than avoid mistakes and conflict. We
                  honour non-conventional ways of collaborating that are not
                  based on urgency, demand, and stress.
                </p>
              </div>
            </div>
            <div id="donations" className="grid grid-cols-10 gap-8 short">
              <h2 className="col-start-2 col-end-10 !indent-0">
                Donate to Pacific Organisations
              </h2>
              <div className="flex flex-col w-full col-span-12 pr-2 md:col-span-10 gap-8">
                <p className="!indent-0">
                  Explore and engage with the impactful initiatives of various
                  community organizations in Oceania. Discover opportunities to
                  learn more about their work and contribute to meaningful
                  causes. We invite suggestions and additions and are open to
                  potential collaborations in the future.
                </p>
                <ul>
                  <li>
                    <a
                      href="https://divafiji.org/get-involved/"
                      target="_blank"
                    >
                      DIVA
                    </a>{" "}
                    (Fiji)
                  </li>
                  <li>
                    <a href="https://www.afgfiji.org/donate" target="_blank">
                      Alliance for Future Generations
                    </a>{" "}
                    (Fiji)
                  </li>
                  <li>
                    <a
                      href="https://tips.pinecast.com/jar/deeppacific"
                      target="_blank"
                    >
                      Deep Pacific Podcast
                    </a>{" "}
                    (North Pacific)
                  </li>
                  <li>
                    <a
                      href="https://kirican.wordpress.com/2014/12/01/donations/"
                      target="_blank"
                    >
                      Kiribati Climate Action Network (KiriCAN)
                    </a>{" "}
                    (Kiribati)
                  </li>
                  <li>
                    <a href="https://www.thevoicepng.org/shop" target="_blank">
                      The Voice Inc PNG: Book Shop and Merchandise
                    </a>{" "}
                    (Papua New Guinea)
                  </li>
                </ul>
              </div>
            </div>
            <a
              className="!no-underline opacity-50"
              href="https://www.studiofolder.it"
            >
              Design: Studio Folder
            </a>
          </div>
          <div className="fixed md:relative left-0 top-8 md:top-28 h-screen col-start-18 col-end-24 md:flex items-start py-8 z-[999999] overflow-visible">
            <div className="flex w-full h-12 md:h-min items-center md:items-start fixed flex-row md:flex-col dark:text-white text-black text-xs font-normal leading-tight tracking-wide px-12 md:pl-0 gap-8 md:gap-2 uppercase overflow-y-scroll overflow-x-visible bg-white dark:bg-black whitespace-nowrap no-scrollbar anchor-bubble-parent">

              <AnchorBubble
                section="about"
                title="Who we are"
                handleScroll={handleScroll}
                activeSection={activeSection}
              />
              <AnchorBubble
                section="background"
                title="Our Background and Approach"
                handleScroll={handleScroll}
                activeSection={activeSection}
              />
              <AnchorBubble
                section="relationship"
                title="Relationships and circulation"
                handleScroll={handleScroll}
                activeSection={activeSection}
              />
              <AnchorBubble
                section="community"
                title="Community"
                handleScroll={handleScroll}
                activeSection={activeSection}
              />
              <AnchorBubble
                section="philosophies"
                title="Collective philosophies, values and ethics"
                handleScroll={handleScroll}
                activeSection={activeSection}
              />
              <AnchorBubble
                section="donations"
                title="Donate to Pacific Organisations"
                handleScroll={handleScroll}
                activeSection={activeSection}
              />
            </div>
            <div
              id="connect"
              className="hidden fixed bottom-12 self-end md:flex flex-col w-full gap-2"
            >
              <h2 className="w-full dark:text-white text-black text-xs font-normal leading-tight tracking-wide gap-2 uppercase">
                Connect with us
              </h2>
              <div className="flex flex-col w-full col-span-12 pr-2 md:col-span-10 gap-8">
                <p className="flex flex-col gap-0 opacity-50">
                  <a
                    className="!no-underline"
                    href="mailto:oceanicrefractions@gmail.com"
                  >
                    oceanicrefractions@gmail.com
                  </a>
                  <a
                    className="!no-underline"
                    href="https://www.instagram.com/oceanicrefractions/"
                    target="_blank"
                  >
                    Instagram
                  </a>
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
