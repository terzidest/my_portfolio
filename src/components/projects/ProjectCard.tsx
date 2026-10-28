import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import ProjectShot from './ProjectShot';
import TechBadge from '../common/TechBadge';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

// The whole card opens the case study; demo and source links live there.
const ProjectCard = ({ project }: ProjectCardProps) => {
  const { id, title, label, description, image, techStack } = project;

  return (
    <Link
      to={`/projects/${id}`}
      aria-label={`${title}: read the case study`}
      className="hover-neon group flex h-full flex-col overflow-hidden rounded-[20px] border border-line/15 bg-surface/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-ground"
    >
      <ProjectShot image={image} zoomOnHover sheen className="h-[180px] md:h-[300px]" />
      <div className="flex flex-grow flex-col gap-2 px-[18px] pb-[18px] pt-4 md:gap-3 md:p-6">
        <div className="flex items-baseline justify-between gap-2 md:items-center">
          <h2 className="font-display text-[20px] font-bold text-ink md:text-[22px]">{title}</h2>
          <span className="whitespace-nowrap font-mono text-[11px] text-signal md:text-xs">{label}</span>
        </div>
        <p className="line-clamp-2 text-[14px] leading-[1.55] text-ink-soft md:line-clamp-3 md:text-[15px] md:leading-relaxed">{description}</p>
        {/* Badges bob in a staggered wave while the card is hovered (.float-wave). */}
        <div className="float-wave hidden flex-wrap gap-1.5 md:flex">
          {techStack.slice(0, 5).map((tech, index) => (
            <span key={tech} className="flex" style={{ '--i': index } as CSSProperties}>
              <TechBadge label={tech} />
            </span>
          ))}
        </div>
        <span className="mt-auto pt-0.5 text-[14px] font-semibold md:pt-1 md:text-[15px] text-link group-hover:text-link-hover">
          Read the case study <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
