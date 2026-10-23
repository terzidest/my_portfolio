import Hero from "../components/home/Hero";
import WhatIDo from "../components/home/WhatIDo";
import TechStack from "../components/home/TechStack";
import usePageMeta from "../hooks/usePageMeta";

// Hero (with the projects/contact CTAs) → what I do → tech stack. Projects
// and contact each have their own page, so Home doesn't repeat them.
const Home = () => {
  usePageMeta({
    description:
      "Portfolio of Triantaphilos Terzides — senior frontend engineer in Athens with 7+ years building production React, TypeScript and Next.js applications. Open to remote roles across Europe.",
  });

  return (
    <div>
      <Hero />
      <WhatIDo />
      <TechStack />
    </div>
  );
};

export default Home;
