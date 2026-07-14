import Hero from "../components/home/Hero";
import FeatureCard from "../components/home/FeatureCard";
//import SkillsSection from "../components/skills/SkillsSection";
import Button from "../components/common/Button";
import Reveal from "../components/common/Reveal";
import usePageMeta from "../hooks/usePageMeta";
import { homeFeatures } from "../data/home";

const Home = () => {
  usePageMeta({
    description:
      "Portfolio of Triantaphilos Terzides — frontend engineer based in Athens, building production React applications for web and mobile.",
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
              Specialized in development of modern apps with cutting-edge
              technologies.
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
