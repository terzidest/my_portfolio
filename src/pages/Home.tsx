import Hero from "../components/home/Hero";
import ProjectCard from "../components/projects/ProjectCard";
import Button from "../components/common/Button";
import Reveal from "../components/common/Reveal";
import usePageMeta from "../hooks/usePageMeta";
import { getFeaturedProjects } from "../data/projects";

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
              Featured Projects
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
              A few things I've built — each with source code and a live demo.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFeaturedProjects().map((project, index) => (
              <Reveal key={project.id} delay={index * 120} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12" delay={200}>
            <Button to="/projects" variant="primary" size="md">
              View All Projects →
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-800 dark:to-indigo-950 text-white">
        <Reveal className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's talk</h2>
          <p className="text-lg text-blue-100 max-w-xl mx-auto mb-8">
            I'm open to remote roles across Europe, and to the occasional
            freelance project.
          </p>
          <Button
            to="/contact"
            variant="secondary"
            size="lg"
            className="text-primary-dark bg-white hover:bg-gray-100"
          >
            Get in Touch
          </Button>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
