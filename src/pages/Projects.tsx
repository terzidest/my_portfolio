import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import ProjectCard from "../components/projects/ProjectCard";
import Reveal from "../components/common/Reveal";
import { projects } from "../data/projects";
import usePageMeta from "../hooks/usePageMeta";
import type { ProjectFilter } from "../types";

const filters: Array<{ value: ProjectFilter; label: string }> = [
  { value: 'all', label: 'All Projects' },
  { value: 'mobile', label: 'Mobile Apps' },
  { value: 'web', label: 'Web Apps' },
];

const Projects = () => {
  usePageMeta({
    title: "Projects",
    description:
      "Selected web and mobile projects — React, React Native, and TypeScript case studies covering problem, role, stack, and outcome.",
  });

  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('all');
  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter((project) => project.categories.includes(selectedFilter));

  return (
    <div className="pt-28 pb-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">My Projects</h1>
        <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-center text-gray-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
          Below are some of the projects I've worked on. Each showcases different aspects of my skills
          in both React and React Native development.
        </p>

        <div className="flex flex-col items-center mb-10 gap-3">
          <div
            role="group"
            aria-label="Filter projects by platform"
            className="inline-flex p-1 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 shadow-sm"
          >
            {filters.map((filter) => {
              const selected = selectedFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedFilter(() => filter.value)}
                  className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${
                    selected
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="text-sm text-gray-500 dark:text-slate-400">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* MotionConfig reducedMotion="user" disables framer-motion's
            transforms for users with prefers-reduced-motion set. */}
        <MotionConfig reducedMotion="user">
          <Reveal>
            {filteredProjects.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="h-full"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="rounded-xl bg-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-700 p-10 text-center shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">No projects found</h2>
                <p className="mt-2 text-gray-600 dark:text-slate-300">Try another platform filter.</p>
              </div>
            )}
          </Reveal>
        </MotionConfig>
      </div>
    </div>
  );
};

export default Projects;
