import { Hero } from "@/components/sections/Hero";
import { WhoIAm } from "@/components/sections/WhoIAm";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { About } from "@/components/sections/About";
import { Impact } from "@/components/sections/Impact";
import { Experience } from "@/components/sections/Experience";
import { SideQuests } from "@/components/sections/SideQuests";
import { Education } from "@/components/sections/Education";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoIAm />
      <WhatIDo />
      <About />
      <Impact />
      <Experience />
      <SideQuests />
      <Education />
    </>
  );
}
