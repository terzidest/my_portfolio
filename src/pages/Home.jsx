import Hero from "../components/home/Hero";
import FeatureCard from "../components/home/FeatureCard";
import SkillsSection from "../components/skills/SkillsSection";

const Home = () => {
  const features = [
    {
      title: "Cross-Platform mobile Development with React Native",
      description:
        "Create seamless mobile experiences using Expo for both iOS and Android platforms with a single codebase, leveraging powerful native components and simplified deployment.",
      icon: "mobile",
    },
    {
      title: "Web Development with React",
      description:
        "Build lightning-fast web applications with Vite, creating dynamic, responsive user interfaces that efficiently update when your data changes while enjoying an optimized development experience.",
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
        </div>
      </section>

      <SkillsSection />
    </div>
  );
};

export default Home;
