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
      <ProjectShot image={image} zoomOnHover className="h-[300px]" />
      <div className="flex flex-grow flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-[22px] font-bold text-ink">{title}</h2>
          <span className="font-mono text-xs text-signal">{label}</span>
        </div>
        <p className="line-clamp-3 text-[15px] leading-relaxed text-ink-soft">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {techStack.slice(0, 5).map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
        <span className="mt-auto pt-1 text-[15px] font-semibold text-link group-hover:text-link-hover">
          Read the case study <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
