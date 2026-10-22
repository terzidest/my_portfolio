import Hero from "../components/home/Hero";
import FeatureCard from "../components/home/FeatureCard";
//import SkillsSection from "../components/skills/SkillsSection";
import Button from "../components/common/Button";
import Reveal from "../components/common/Reveal";
import TechBadge from "../components/common/TechBadge";
import usePageMeta from "../hooks/usePageMeta";
import { homeFeatures } from "../data/home";
import { skillGroups } from "../data/skills";

const Home = () => {
  usePageMeta({
    description:
      "Portfolio of Triantaphilos Terzides — senior frontend engineer in Athens with 7+ years building production React, TypeScript and Next.js applications. Open to remote roles across Europe.",
  });

  return (
    <div>
      <Hero />

      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Expertise
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
              From component architecture to production releases — and the
              tooling that keeps them reliable.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 120} className="h-full">
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-20 mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Core Skills
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 80} className="h-full">
                <div className="h-full bg-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-700 rounded-lg p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <TechBadge key={skill} label={skill} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-16" delay={200}>
            <Button to="/about" variant="primary" size="md">
              Learn More About Me →
            </Button>
          </Reveal>
        </div>
      </section>

      {/*<SkillsSection />*/}
    </div>
  );
};

export default Home;
