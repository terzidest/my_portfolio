import Hero from "../components/home/Hero";
import FeatureCard from "../components/home/FeatureCard";
import SkillsSection from "../components/skills/SkillsSection";
import Button from "../components/common/Button";

const Home = () => {
  const features = [
    {
      title: "Cross-Platform mobile Development with React Native",
      description:
        "Build sleek, native-feeling mobile apps for iOS and Android from a single codebase. Leverage React Native's performance benefits while maintaining rapid development cycles and code reusability across platforms.",
      icon: "mobile",
    },
    {
      title: "Web Development with React",
      description:
        "Create dynamic, responsive web applications with the leading web library, utilizing component based architecture to build interactive UIs that are both maintainable and optimized for performance.",
      icon: "web",
    },
    {
      title: "Firebase Integration",
      description:
        "Power your applications with scalable cloud infrastructure that handles real-time data synchronization and secure user authentication without server management.",
      icon: "firebase",
    },
  ];

  return (
    <div>
      <Hero />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technical Expertise
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized in development of modern apps with cutting-edge
              technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
          <div className="text-center mt-16">
            <Button to="/about" variant="primary" size="md">
              Learn More About Me →
            </Button>
          </div>
        </div>
      </section>

      {/*<SkillsSection />*/}
    </div>
  );
};

export default Home;
