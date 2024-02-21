"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import TopBand from "../components/AboutTopBand";
import Layout from "../components/Layout";

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  const [highRes, setHighRes] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

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
      { threshold: 0.2 }
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

  return (
    <Layout
      pageName="About"
      highRes={highRes}
      setHighRes={setHighRes}
      isAboutHovered={isAboutHovered}
      setIsAboutHovered={setIsAboutHovered}
    >
      <div className="flex flex-col items-center justify-center min-h-dvh md:min-h-screen">
        <TopBand pageName="About" />
        <main className="w-full h-full grid-parent px-5">
          <div className="col-start-1 col-end-6 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 about flex flex-col gap-20 pt-40 pb-40">
            <div id="connect" className="grid md:hidden grid-cols-10 gap-8">
              <h2 className="col-start-2 col-end-10">Connect with us</h2>
              <div className="flex flex-col w-full col-span-10 gap-8">
                <p className="flex flex-col gap-0"><a className="!no-underline" href="mailto:oceanicrefractions@gmail.com">oceanicrefractions@gmail.com</a>
                <a className="!no-underline" href="https://www.instagram.com/oceanicrefractions/">Instagram</a></p>
              </div>
            </div>
            <div id="about" className="grid grid-cols-10 gap-8">
              <h2 className="col-start-2 col-end-10">Who we are</h2>
              <div className="flex flex-col w-full col-span-10 gap-8">
                <p className="!indent-0">
                  Oceanic Refractions emerges from a long-standing friendship
                  and collaboration between us - AM Kanngieser
                  (Germany/Australia) and Mere Nailatikau (Fiji). Beginning in
                  2018 with an audio storytelling class at The University of
                  South Pacific’s Oceania Center in Suva, Fiji, we have worked
                  together to centre Indigenous Pacific storytelling in climate
                  art and communication across the Pacific Islands/Oceania, in
                  Europe and so-called Australia. The community radio
                  broadcasting workshops and interviews have since developed
                  into a series of commissioned documentaries for international
                  broadcast (
                  <a href="https://www.hoerspielundfeature.de/listening-across-fault-linses-folge-01-englisch-100.html">
                    Listening Across Fault Lines, 2023
                  </a>
                  ) and a feature exhibition for a European sound art biennale (
                  <a href="https://struertracks.dk/project/am-kanngieser-mere-nailatikau-eliki-reade">
                    Crenulations—Pacific Drift, 2023
                  </a>
                  ), both co-produced with Eliki Reade (Australia/Fiji). 
                </p>
                <p>
                  Oceanic Refractions was conceived as a multisensory
                  installation by AM Kanngieser, Mere Nailatikau, and Eliki
                  Reade. It features videography from Laisiasa Dave Lavaki
                  (Fiji), Tumeli Tuqota (Fiji) and Mere Nailatikau, and sound
                  design by Joseph Kamaru (Kenya/ Berlin) and AM Kanngieser. The
                  European installation is built with technical production
                  managers and fabricators Space Forms (Ireland), projection
                  specialists FrameWorks (Ireland), and olfactory artist Smell
                  Art (Australia).
                </p>
              </div>
            </div>
            <div id="background" className="grid grid-cols-10 gap-8">
              <h2 className="col-start-2 col-end-10">
                Our background and approach
              </h2>
              <div className="flex flex-col w-full col-span-10 gap-8">
              <p className="!indent-0">
                  Oceanic Refractions has been created to convey testimonies of
                  the everyday lives, practices and world views of Pacific
                  people and their environments, bearing witness to ongoing and
                  accelerating ecocide.
                </p>
                <p>
                  With backgrounds in communication, public policy and
                  international relations (Nailatikau), and climate research,
                  geography and arts (Kanngieser), our interdisciplinary
                  approaches form the foundation on which we learn from and
                  amplify the sovereignty of Oceanic peoples. Through Oceanic
                  Refractions, we foreground interconnecting and divergent
                  perspectives held by the Pacific communities with whom we have
                  the privilege of working. In embracing their complexity, we
                  move away from universalised and dehumanising descriptions of
                  Indigeneity that seek to depict communities as ‘heroes’ or
                  ‘victims’ of the climate crisis.
                </p>
                <p>
                  The catastrophic ecosystemic changes experienced across the
                  region derive from legacies of European colonisation,
                  imperialism, and resource extraction – and post-independence,
                  from neo-colonial capitalism. We recognise these violences and
                  centre liberation and self-determination. It is crucial for us
                  to expand beyond the ‘deficit’ and trauma narratives prevalent
                  in arts, NGO, aid and academic discourses by focusing on
                  knowledges and experiences usually left out of international
                  environmental conversations, particularly those of transgender
                  and queer communities, women and older custodians. 
                </p>
                <p>
                  We will always prioritise collaborating with and highlighting
                  creators and artists in the Pacific Islands. The western
                  concept of Indigeneity holds significant social cachet within
                  artistic circles of white settler-coloniser societies, where
                  it is often exoticised and patronised. For Indigenous artists
                  residing in their home countries without the support of a
                  publicly funded arts sector, creative opportunities are
                  frequently limited to performative cultural representation and
                  influenced by themes imposed by development and aid agencies.
                </p>
                <p>
                  Recognising the complex inequities they confront, we
                  purposefully showcase Pacific Islands-based creators and
                  artists and ensure equitable pay. This commitment is the
                  foundation upholding our decision to bring Oceanic Refractions
                  back to the region. The project must benefit the communities
                  we work with; our plan is to co-design ongoing interactions of
                  the project with local communities, creators, and artists on a
                  long-term basis and establish a community-led trust to support
                  local initiatives without reporting.
                </p>
                <p>
                  Our work progresses in close consultation with an Advisory
                  Group comprising Joey Tau (Papua New Guinea/ Fiji) from
                  Pacific Network on Globalisation - PANG; Fleur Ramsay (Samoa/
                  Australia) from Blue Ocean Law; Indigenous culturalist Simione
                  Sevudredre (Fiji); and environmental scientist and curator
                  Sana Balai (Bouganville/ Australia). 
                </p>
              </div>
            </div>
            <div id="relationship" className="grid grid-cols-10 gap-8">
              <h2 className="col-start-2 col-end-10">
                Relationships and circulation
              </h2>
              <div className="flex flex-col w-full col-span-10 gap-8">
              <p className="!indent-0">
                  The foundation of our artistic and professional collaboration
                  lies in our friendship, which has flourished through the time
                  we`ve dedicated—both individually and together—to
                  contemplating the integrity of our work and its purpose. As a
                  white creator, Amer knows there is no truly ethical way for
                  them to do this work, and we are continuously reflecting on
                  how to navigate as well as possible the vastly differential
                  economic, racial and social capital and power between diverse
                  Indigenous and non-Indigenous communities. All material in
                  Oceanic Refractions has been recorded consensually, in
                  consultation with, and invitation by, the speakers and
                  environments. We are explicitly dedicated to anti-colonial
                  approaches and the centralisation of Indigenous knowledge and
                  relational values. Our actions and protocols as Indigenous and
                  non-Indigenous artists are outlined in the Oceanic Refractions
                  project philosophy.
                </p>
                <p>
                  Following overseas exhibitions, Oceanic Refractions will be
                  brought back to Fiji. We are fostering partnerships with local
                  institutions, including a program involving skill-sharing and
                  cultural exchange activities. We hope to do the same in other
                  Pacific Island countries. It is crucial for Oceanic
                  Refractions to extend beyond formalised and exclusive arts
                  spaces. Creativity knows no bounds, and we firmly believe that
                  the right to enjoy, contribute to, and engage with the arts
                  belongs to everyone.
                </p>
                <p>
                  We are in the process of setting up a trust with any future
                  income from Oceanic Refractions exhibitions. Guided by the
                  Advisory Group, this trust will support workshops, dialogues,
                  and collaborations with communities and creators in the
                  Pacific Islands.
                </p>
                <h3 className="paragraph-title">
                  How we choose to work and why 
                </h3>
                <p>
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
                    through workshops, skill-sharing and creative opportunities.
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
                  align ourselves with people, places and communities that share
                  Oceanic Refractions’ ethos and values. Conversely, we refrain
                  from engaging with institutions and actors that have shown a
                  lack of good faith. Recognising the extractive and colonialist
                  frameworks of aid-funded development and academia, both of
                  which we have extensive experience in, we make a deliberate
                  choice to demote these spaces in our work. 
                </p>
              </div>
            </div>
            <div id="community" className="grid grid-cols-10 gap-8">
              <h2 className="col-start-2 col-end-10">Community</h2>
              <div className="flex flex-col w-full col-span-10 gap-8">
              <p className="!indent-0">
                  We acknowledge the many generous individuals, communities and
                  institutions who have contributed to making Oceanic
                  Refractions possible. Our gratitude goes to the following for
                  their creativity, expertise, goodwill, testimonials and
                  resourcing: 
                </p>
                <ul>
                  <li>
                    Lydia Jacob and Philip Tacom (Duke of York Islands, Papua
                    New Guinea), Teweiariki Teaero (Kiribati), Simione
                    Sevudredre and Unaisi Nabobo-Baba (Fiji)
                  </li>
                  <li>Eliki Reade (early collaborator)</li>
                  <li>Joseph Kamaru</li>
                  <li>Tumeli Tuqota and Dave Lavaki</li>
                  <li>Sara Murphy and Frank Pendergast </li>
                  <li>Olan Clarke</li>
                  <li>
                    Joey Tau, Sana Balai, Fleur Ramsay, Simione Sevudredre
                  </li>
                  <li>Elise Misao Hunchuck</li>
                  <li>
                    Sandra Kraushaar and Cynthia Ramirez - The Asia Foundation -
                    Pacific Islands
                  </li>
                  <li>CTM Festival and transmediale - Exhibiting Partners</li>
                  <li>
                    acob Eriksen and Matilde Best - Sound Art Lab, Struer Tracks
                    Sound Art Biennale
                  </li>
                  <li>Bang and Olufsen</li>
                  <li>Verenike</li>
                  <li>Daniel Jenatsch</li>
                  <li>Deutschland Radio</li>
                  <li>Creative Australia</li>
                  <li>Australian Cultural Foundation</li>
                </ul>
              </div>
            </div>
            <div id="philosophies" className="grid grid-cols-10 gap-8">
              <h2 className="col-start-2 col-end-10">
                Collective philosophies, values and ethics
              </h2>
              <div className="w-full grid grid-cols-10 col-span-10 gap-8">
              <p className="!indent-0">
                  As a collective, our shared principles shape why and how we
                  work together. These principles guide how we relate to one
                  another and how we also hope to relate to project partners.
                  They also reflect the prioritisation of integrity and care in
                  our working methods.
                </p>
                <h3 className="paragraph-title">
                  Centering Indigenous knowledge and practices
                </h3>
                <p>
                  We are working with a variety of cultural materials that hold
                  great significance and need to be treated respectfully. We
                  view the materials we are working with as being a part of the
                  places they are taken from, containing spiritual and emotional
                  attributes and connections. We do not use these materials
                  lightly. Acknowledging the immeasurable value of the
                  recordings and the contributions of the Pacific people
                  featured in the work, this endeavour incorporates the informed
                  consent of its participants and the guidance and advice of
                  Pacific practitioners of art, culture and development for a
                  generative experience. 
                </p>
                <h3 className="paragraph-title">
                  What this looks like in practice:
                </h3>
                <ul>
                  <li>
                    We defer to Indigenous partners` perspectives and
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
                    make material public, and the use of material is aligned
                    with community protocols;
                  </li>
                  <li>
                    We commit to being aware of the ways in which extractive
                    systems have shaped our outlooks and our relationships. We
                    commit to continual open dialogue with each other, our
                    Advisory Board and our community partners in this process;
                  </li>
                  <li>
                    We acknowledge the multiple realities our Indigenous project
                    partners and collaborators hold and will create pathways for
                    clear communication around mutually agreed expectations,
                    timelines and needs;
                  </li>
                  <li>
                    We will not foreground non-Indigenous presentation partners
                    or funders in our public presentation materials. We will
                    work with non-Indigenous project partners to find
                    alternative ways to respectfully acknowledge their input.
                  </li>
                </ul>
                <h3 className="paragraph-title">
                  Mutuality and circular economy
                </h3>
                <p>
                  A key priority of the collective is that when we produce work
                  about places and communities, the works and resources produced
                  by the work are returned to those places and communities in
                  different ways. This is important to ensure that the work
                  comes to rest in its rightful home and that the communities it
                  draws from are included in the economies the works generate.
                </p>
                <h3 className="paragraph-title">
                  What this looks like in practice:
                </h3>
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
                    reciprocity, and will follow Pacific protocols for
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
                <h3 className="paragraph-title">Clarity of communication</h3>
                <p>
                  In order to minimise Western capitalist cultures of urgency
                  and stress, we practise clear and direct communication. We do
                  so within our team and with project partners.
                </p>
                <h3 className="paragraph-title">
                  Honouring different capacities and disability justice
                </h3>
                <p>
                  As collaborators in a team with various chronic illnesses,
                  pain and disabilities, we honour our interdependence and
                  co-existence within systems of care. We prioritise rest and
                  pacing; everyone has different capacities and needs. We treat
                  each other with grace and dignity. In our work relations, we
                  seek to transform rather than avoid mistakes and conflict. We
                  honour non-conventional ways of collaborating that are not
                  based on urgency, demand, and stress.
                </p>
              </div>
            </div>
            <a
              className="!no-underline opacity-50"
              href="https://www.studiofolder.it"
            >
              Design: Studio Folder
            </a>
          </div>
          <div className="hidden h-screen col-start-15 col-end-24 md:flex items-start py-8 pt-36">
            <div className="flex fixed flex-col dark:text-white text-black text-xs font-normal leading-tight tracking-wide gap-2 uppercase">
              <a
                href="#about"
                onClick={(e) => handleScroll(e, "about")}
                className={
                  activeSection === "about" ? "opacity-100" : "opacity-50"
                }
              >
                Who we are
              </a>
              <a
                href="#background"
                onClick={(e) => handleScroll(e, "background")}
                className={
                  activeSection === "background" ? "opacity-100" : "opacity-50"
                }
              >
                Our Background and Approach
              </a>
              <a
                href="#relationship"
                onClick={(e) => handleScroll(e, "relationship")}
                className={
                  activeSection === "relationship"
                    ? "opacity-100"
                    : "opacity-50"
                }
              >
                Relationships and circulation
              </a>
              <a
                href="#community"
                onClick={(e) => handleScroll(e, "community")}
                className={
                  activeSection === "community" ? "opacity-100" : "opacity-50"
                }
              >
                Community
              </a>
              <a
                href="#philosophies"
                onClick={(e) => handleScroll(e, "philosophies")}
                className={
                  activeSection === "philosophies"
                    ? "opacity-100"
                    : "opacity-50"
                }
              >
                Collective philosophies, values and ethics
              </a>
            </div>
            <div id="connect" className="fixed self-end	flex flex-col w-full gap-2">
              <h2 className="w-full dark:text-white text-black text-xs font-normal leading-tight tracking-wide gap-2 uppercase">Connect with us</h2>
              <div className="flex flex-col w-full col-span-10 gap-8">
                <p className="flex flex-col gap-0 opacity-50"><a className="!no-underline" href="mailto:oceanicrefractions@gmail.com">oceanicrefractions@gmail.com</a>
                <a className="!no-underline" href="https://www.instagram.com/oceanicrefractions/">Instagram</a></p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default AboutPage;
