import Hero from "../components/home/Hero";
import FeatureCard from "../components/home/FeatureCard";
//import SkillsSection from "../components/skills/SkillsSection";
import Button from "../components/common/Button";
import Reveal from "../components/common/Reveal";

const Home = () => {
  const features = [
    {
      title: "React Ecosystem Architecture",
      description:
        "Designing scalable frontend systems with React — feature-based module structure, performant state management, and clean separation between UI and domain logic.",
      icon: "architecture",
    },
    {
      title: "Complex UI & Dashboard Development",
      description:
        "Building data-heavy interfaces, real-time dashboards, and admin platforms that handle scale — with a focus on performance, accessibility, and maintainability.",
      icon: "web",
    },
    {
      title: "Cross-Platform Mobile Development",
      description:
        "Delivering native-feeling iOS and Android apps with React Native and Expo, sharing logic with web codebases where it makes sense.",
      icon: "mobile",
    },
  ];

  return (
    <div>
      <Hero />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technical Expertise
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized in development of modern apps with cutting-edge
              technologies.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Reveal key={index} delay={index * 120}>
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
