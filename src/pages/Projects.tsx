import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../data/projects";
import usePageMeta from "../hooks/usePageMeta";
import type { ProjectFilter } from "../types";

const filters: Array<{ value: ProjectFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
];

const pillBase =
  'min-h-[44px] rounded-full px-5 text-[15px] transition-[box-shadow,background-color,color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-ground';
const pillOn =
  'bg-gradient-to-r from-[#4559f0] to-[#6e86ff] font-semibold text-white shadow-[inset_0_3px_8px_rgb(73_181_245/0.5),inset_0_-3px_8px_rgb(73_181_245/0.5)]';
const pillOff = 'font-medium text-ink-soft hover:text-ink hover:shadow-[0_0_0_1px_rgb(var(--neon)/0.6),0_0_16px_rgb(var(--neon)/0.4)]';

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
    <div className="spotlight">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 pb-24 pt-36 md:pt-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="rise-stagger flex max-w-[620px] flex-col gap-3.5">
            <p className="font-mono text-sm uppercase tracking-[0.08em] text-signal">Projects</p>
            <h1 className="font-display text-[clamp(2.375rem,5vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink">
              Things I've built
            </h1>
            <p className="text-lg leading-relaxed text-ink-soft">
              Personal and open-source work: the problem each one solves, my role, and how it's put together.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div
              role="group"
              aria-label="Filter projects by platform"
              className="flex gap-1.5 rounded-full border border-line/15 bg-surface/70 p-[5px]"
            >
              {filters.map((filter) => {
                const selected = selectedFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`${pillBase} ${selected ? pillOn : pillOff}`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
            <p aria-live="polite" className="text-sm text-ink-muted">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
        </div>

        {/* MotionConfig reducedMotion="user" disables framer-motion's
            transforms for users with prefers-reduced-motion set. */}
        <MotionConfig reducedMotion="user">
          {filteredProjects.length > 0 ? (
            <motion.div layout className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,440px),1fr))] gap-6">
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
            <div className="rounded-[20px] border border-line/15 bg-surface/60 p-10 text-center">
              <h2 className="font-display text-xl font-semibold text-ink">No projects found</h2>
              <p className="mt-2 text-ink-soft">Try another platform filter.</p>
            </div>
          )}
        </MotionConfig>
      </div>
    </div>
  );
};

export default Projects;
