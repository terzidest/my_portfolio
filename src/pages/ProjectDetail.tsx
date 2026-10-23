import { useParams, Link } from 'react-router-dom';
import { getProjectById, getAdjacentProjectIds } from '../data/projects';
import { findSkill } from '../data/skills';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';
import SkillChip from '../components/common/SkillChip';
import ProjectShot from '../components/projects/ProjectShot';
import usePageMeta from '../hooks/usePageMeta';

// Split a multi-paragraph string on blank-line breaks so single newlines
// inside a paragraph don't produce empty <p> tags.
const toParagraphs = (text: string): string[] =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

const panelLabel = 'font-mono text-[13px] uppercase tracking-[0.06em] text-signal';
const cardLink =
  'hover-neon flex flex-col gap-1.5 rounded-[18px] border border-line/15 bg-surface/60 px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon';

const BackLink = ({ children }: { children: string }) => (
  <Link
    to="/projects"
    className="inline-flex min-h-[44px] items-center gap-2 self-start text-[15px] font-medium text-link hover:text-link-hover"
  >
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
    {children}
  </Link>
);

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;
  const adjacentProjects = id ? getAdjacentProjectIds(id) : { prevId: null, nextId: null };
  const prev = adjacentProjects.prevId ? getProjectById(adjacentProjects.prevId) : undefined;
  const next = adjacentProjects.nextId ? getProjectById(adjacentProjects.nextId) : undefined;

  usePageMeta(
    project
      ? { title: project.title, description: project.description }
      : { title: 'Project Not Found', description: 'This project does not exist.', noindex: true }
  );

  if (!project) {
    return (
      <div className="spotlight min-h-screen">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5 px-6 pb-24 pt-40 text-center">
          <h1 className="font-display text-4xl font-bold text-ink">Project Not Found</h1>
          <p className="text-ink-soft">Sorry, the project you're looking for doesn't exist.</p>
          <Button to="/projects" variant="energy" size="lg">
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const [primaryLink, ...otherLinks] = project.links ?? [];
  const heroIsPortrait = project.image.height > project.image.width;

  return (
    <div className="spotlight">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 pb-24 pt-32 md:pt-36">
        <BackLink>All projects</BackLink>

        <header className="flex flex-wrap items-end justify-between gap-7">
          <div className="rise-stagger flex min-w-0 flex-[999_1_560px] flex-col gap-4">
            <span className="self-start rounded-full bg-signal/15 px-3 py-1 font-mono text-xs text-signal">{project.label}</span>
            <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.03em] text-ink">
              {project.title}
            </h1>
            <p className="max-w-[680px] text-lg leading-relaxed text-ink-soft md:text-[19px]">{project.description}</p>
          </div>
          <div className="flex flex-[1_1_280px] flex-wrap gap-3 md:justify-end">
            {primaryLink && (
              <Button href={primaryLink.href} variant="energy" size="lg">
                {primaryLink.label} <span aria-hidden="true">↗</span>
              </Button>
            )}
            <Button href={project.github} variant="ghost" size="lg" aria-label={`View ${project.title} on GitHub`}>
              GitHub
            </Button>
            {otherLinks.map((link) => (
              <Button key={link.href} href={link.href} variant="ghost" size="lg">
                {link.label}
              </Button>
            ))}
          </div>
        </header>

        <div className="overflow-hidden rounded-3xl border border-line/15 shadow-[0_30px_80px_rgb(0_0_0/0.35),0_0_60px_rgb(var(--neon)/0.18)]">
          <ProjectShot
            image={project.image}
            loading="eager"
            natural
            sizes="(min-width: 1280px) 1152px, 92vw"
            className={heroIsPortrait ? 'h-[420px] sm:h-[540px]' : 'h-full'}
          />
        </div>

        <div className="flex flex-wrap items-start gap-10">
          <article className="flex min-w-0 flex-[999_1_560px] flex-col gap-9">
            {[
              { title: 'Problem', body: project.problem },
              { title: 'Outcome', body: project.outcome },
            ].map((section, index) => (
              <section key={section.title} className="flex flex-col gap-3.5">
                <h2 className="flex items-center gap-3 font-display text-[28px] font-bold text-ink">
                  <span className="font-mono text-sm font-medium text-signal">{String(index + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                {toParagraphs(section.body).map((p, i) => (
                  <p key={i} className="text-[17px] leading-[1.75] text-ink-soft">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </article>

          <aside className="glass flex min-w-0 flex-[1_1_320px] flex-col gap-6 rounded-[22px] border border-line/20 p-7">
            <div className="flex flex-col gap-2">
              <h2 className={panelLabel}>Role</h2>
              <p className="text-[15px] leading-relaxed text-ink">{project.role}</p>
            </div>
            <div className="flex flex-col gap-2.5">
              <h2 className={panelLabel}>Stack</h2>
              <ul className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <SkillChip key={tech} skill={findSkill(tech) ?? { name: tech }} />
                ))}
              </ul>
            </div>
            <div className="flex flex-col">
              <h2 className={`${panelLabel} mb-1`}>Links</h2>
              {[{ label: 'Source on GitHub', href: project.github }, ...(project.links ?? [])].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[40px] items-center gap-1.5 text-[15px] text-link hover:text-link-hover"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </aside>
        </div>

        {project.additionalImages.length > 0 && (
          <section className="flex flex-col gap-5">
            <Reveal>
              <h2 className="font-display text-[28px] font-bold text-ink">Gallery</h2>
            </Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
              {project.additionalImages.map((image) => (
                <figure key={image.src} className="hover-neon overflow-hidden rounded-[18px] border border-line/15 bg-surface/60">
                  <ProjectShot image={image} className="h-72" />
                  <figcaption className="px-[18px] py-3.5 text-sm text-ink-soft">{image.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <nav aria-label="Project navigation" className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 pt-2">
          {prev ? (
            <Link to={`/projects/${prev.id}`} className={cardLink}>
              <span className="text-[13px] text-ink-muted">← Previous project</span>
              <span className="font-display text-xl font-semibold text-ink">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/projects/${next.id}`} className={`${cardLink} items-end text-right`}>
              <span className="text-[13px] text-ink-muted">Next project →</span>
              <span className="font-display text-xl font-semibold text-ink">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default ProjectDetail;
