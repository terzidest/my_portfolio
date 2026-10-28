import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById, getAdjacentProjectIds } from '../data/projects';
import { socials } from '../data/contact';
import { findSkill } from '../data/skills';
import BottomSheet from '../components/common/BottomSheet';
import Button from '../components/common/Button';
import Rail from '../components/common/Rail';
import Reveal from '../components/common/Reveal';
import SkillChip from '../components/common/SkillChip';
import ProjectShot from '../components/projects/ProjectShot';
import useMediaQuery, { DESKTOP } from '../hooks/useMediaQuery';
import usePageMeta from '../hooks/usePageMeta';
import type { Project } from '../types';

// Split a multi-paragraph string on blank-line breaks so single newlines
// inside a paragraph don't produce empty <p> tags.
const toParagraphs = (text: string): string[] =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

const panelLabel = 'font-mono text-[13px] uppercase tracking-[0.06em] text-signal';
const cardLink =
  'hover-neon flex min-w-0 flex-col gap-1 rounded-2xl border border-line/15 bg-surface/60 px-4 py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon md:gap-1.5 md:rounded-[18px] md:px-6 md:py-5';

const BackLink = ({ children }: { children: string }) => (
  <Link
    to="/projects"
    className="-mb-2 inline-flex min-h-[44px] items-center gap-2 self-start text-[14px] font-medium text-link hover:text-link-hover md:mb-0 md:text-[15px]"
  >
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
    {children}
  </Link>
);

const githubPath = socials.find((social) => social.label === 'GitHub')!.path;

const chevron = (path: string, className: string) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d={path} />
  </svg>
);

// Role, stack and every link: the desktop side panel, and the phone sheet.
const ProjectInfo = ({ project }: { project: Project }) => (
  <>
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
  </>
);

// Phones: the case study as disclosures, Problem open so the page starts short.
const CaseStudy = ({ sections }: { sections: { title: string; body: string }[] }) => {
  const [open, setOpen] = useState<Set<string>>(() => new Set([sections[0].title]));
  const toggle = (title: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  return (
    <div className="flex flex-col">
      {sections.map((section, index) => {
        const isOpen = open.has(section.title);
        const id = `case-${section.title.toLowerCase()}`;
        return (
          <section key={section.title} className="border-b border-line/10">
            <h2>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => toggle(section.title)}
                className="flex min-h-14 w-full items-center justify-between gap-3 text-left font-display text-[19px] font-bold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
              >
                <span className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-medium text-signal">{String(index + 1).padStart(2, '0')}</span>
                  {section.title}
                </span>
                {chevron('M6 9l6 6 6-6', `h-4 w-4 text-ink-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`)}
              </button>
            </h2>
            <div id={id} hidden={!isOpen} className="flex flex-col gap-3 pb-4">
              {toParagraphs(section.body).map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.7] text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;
  const adjacentProjects = id ? getAdjacentProjectIds(id) : { prevId: null, nextId: null };
  const prev = adjacentProjects.prevId ? getProjectById(adjacentProjects.prevId) : undefined;
  const next = adjacentProjects.nextId ? getProjectById(adjacentProjects.nextId) : undefined;
  const desktop = useMediaQuery(DESKTOP);
  const [infoOpen, setInfoOpen] = useState(false);
  const [shot, setShot] = useState(0);

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
  const caseStudy = [
    { title: 'Problem', body: project.problem },
    { title: 'Outcome', body: project.outcome },
  ];
  const heroIsPortrait = project.image.height > project.image.width;

  return (
    <div className="spotlight">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 pb-10 pt-24 md:gap-10 md:px-6 md:pb-24 md:pt-36">
        <BackLink>All projects</BackLink>

        <header className="flex flex-wrap items-end justify-between gap-3 md:gap-7">
          <div className="rise-stagger flex min-w-0 flex-[999_1_560px] flex-col gap-3 md:gap-4">
            <span className="self-start rounded-full bg-signal/15 px-2.5 py-1 font-mono text-[11px] text-signal md:px-3 md:text-xs">{project.label}</span>
            <h1 className="font-display text-[40px] font-bold leading-none md:text-[clamp(2.75rem,6vw,4.5rem)] tracking-[-0.03em] text-ink">
              {project.title}
            </h1>
            <p className="max-w-[680px] text-[15px] leading-[1.6] text-ink-soft md:text-[19px] md:leading-relaxed">{project.description}</p>
          </div>
          {desktop && (
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
          )}
        </header>

        <div className="overflow-hidden rounded-[18px] border border-line/15 shadow-[0_20px_50px_rgb(0_0_0/0.35),0_0_40px_rgb(var(--neon)/0.18)] md:rounded-3xl md:shadow-[0_30px_80px_rgb(0_0_0/0.35),0_0_60px_rgb(var(--neon)/0.18)]">
          <ProjectShot
            image={project.image}
            loading="eager"
            natural
            sizes="(min-width: 1280px) 1152px, 92vw"
            className={heroIsPortrait ? 'h-[420px] md:h-[540px]' : 'h-full'}
          />
        </div>

        {desktop ? (
          <div className="flex flex-wrap items-start gap-10">
            <article className="flex min-w-0 flex-[999_1_560px] flex-col gap-9">
              {caseStudy.map((section, index) => (
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
              <ProjectInfo project={project} />
            </aside>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2.5">
                {primaryLink ? (
                  <>
                    <Button href={primaryLink.href} variant="energy" size="lg" className="flex-1 max-md:min-h-[50px] max-md:text-[15px]">
                      {primaryLink.label} <span aria-hidden="true">↗</span>
                    </Button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-[14px] border border-line/25 bg-surface/60 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d={githubPath} />
                      </svg>
                    </a>
                  </>
                ) : (
                  <Button href={project.github} variant="ghost" size="lg" className="flex-1 max-md:min-h-[50px] max-md:text-[15px]">
                    View on GitHub <span aria-hidden="true">↗</span>
                  </Button>
                )}
              </div>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setInfoOpen(true)}
                className="flex min-h-12 items-center justify-between rounded-[14px] border border-line/20 bg-surface/60 px-4 text-[15px] font-semibold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
              >
                Role, stack &amp; links
                {chevron('M9 6l6 6-6 6', 'h-4 w-4 text-ink-muted')}
              </button>
            </div>
            <CaseStudy key={project.id} sections={caseStudy} />
            <BottomSheet
              open={infoOpen}
              onClose={() => setInfoOpen(false)}
              title={project.title}
              eyebrow={<span className="self-start font-mono text-[11px] text-signal">{project.label}</span>}
            >
              <div className="flex flex-col gap-6">
                <ProjectInfo project={project} />
              </div>
            </BottomSheet>
          </>
        )}

        {project.additionalImages.length > 0 && (
          <section className="flex flex-col gap-3 md:gap-5">
            <Reveal className="flex items-baseline justify-between">
              <h2 className="font-display text-[20px] font-bold text-ink md:text-[28px]">Gallery</h2>
              {project.additionalImages.length > 1 && (
                <span className="text-xs text-ink-muted md:hidden">
                  {shot + 1} / {project.additionalImages.length} · swipe
                </span>
              )}
            </Reveal>
            <Rail
              key={project.id}
              label="Gallery"
              onIndexChange={setShot}
              className="-mx-5 md:mx-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] md:gap-5 md:overflow-visible md:px-0"
            >
              {project.additionalImages.map((image) => (
                <figure key={image.src} className="hover-neon w-[300px] overflow-hidden rounded-2xl border border-line/15 bg-surface/60 md:w-full md:rounded-[18px]">
                  <ProjectShot image={image} className="h-[188px] md:h-72" />
                  <figcaption className="px-3.5 py-2.5 text-[13px] text-ink-soft md:px-[18px] md:py-3.5 md:text-sm">{image.alt}</figcaption>
                </figure>
              ))}
            </Rail>
          </section>
        )}

        <nav aria-label="Project navigation" className="grid grid-cols-2 gap-3 pt-2 md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] md:gap-5">
          {prev ? (
            <Link to={`/projects/${prev.id}`} className={cardLink}>
              <span className="text-[12px] text-ink-muted md:text-[13px]">← Previous project</span>
              <span className="truncate font-display text-base font-semibold text-ink md:text-xl">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/projects/${next.id}`} className={`${cardLink} items-end text-right`}>
              <span className="text-[12px] text-ink-muted md:text-[13px]">Next project →</span>
              <span className="max-w-full truncate font-display text-base font-semibold text-ink md:text-xl">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default ProjectDetail;
