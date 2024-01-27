import StorySection from "./components/StorySection";
import TitleBand from "./components/TitleBand";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="w-screen h-screen snap-y snap-mandatory	md:overflow-y-scroll">
        <TitleBand pageName="Whitnessing via"/>
        <StorySection color="black" text="Section 1"/>
        <StorySection color="gray" text="Section 2"/>
        <StorySection color="blue" text="Section 3"/>
      </div>
    </main>
  );
}
