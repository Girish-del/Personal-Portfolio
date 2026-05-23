import { Hero } from "@/components/sections/Hero";
import { WhoWhat } from "@/components/sections/WhoWhat";
import { About } from "@/components/sections/About";
import { Impact } from "@/components/sections/Impact";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Publications } from "@/components/sections/Publications";
import { Community } from "@/components/sections/Community";
import { Talks } from "@/components/sections/Talks";
import { Education } from "@/components/sections/Education";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWhat />
      <About />
      <Projects />
      <Impact />
      <Experience />
      <Publications />
      <Community />
      <Talks />
      <Education />
    </>
  );
}
