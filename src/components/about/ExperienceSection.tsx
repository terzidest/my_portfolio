import { useState } from 'react';
import { experiences } from '../../data/experience';
import useMediaQuery, { DESKTOP } from '../../hooks/useMediaQuery';
import type { Experience } from '../../types';
import BottomSheet from '../common/BottomSheet';
import Reveal from '../common/Reveal';

const panelId = (index: number) => `role-${index}`;

const badge = 'self-start rounded-full bg-signal/15 px-2 py-[3px] font-mono text-[10px] uppercase text-signal';

const chevron = (path: string, className: string) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d={path} />
  </svg>
);

// Description and bullets; the phone sheet uses a smaller type scale.
const RoleDetails = ({ exp, compact = false }: { exp: Experience; compact?: boolean }) => (
  <>
    {exp.description && (
      <p className={`leading-relaxed text-ink-soft ${compact ? 'mb-3.5 text-[15px]' : 'mb-4'}`}>{exp.description}</p>
    )}
    <ul className={compact ? 'space-y-3' : 'space-y-2.5'}>
      {exp.bullets.map((bullet, bulletIndex) => (
        <li key={bulletIndex} className={`flex items-start leading-relaxed text-ink-soft ${compact ? 'text-sm' : ''}`}>
          <span
            className={`mr-3 h-1.5 w-1.5 flex-none rounded-full bg-neon ${compact ? 'mt-2' : 'mt-[9px]'}`}
            aria-hidden="true"
          />
          <span>
            {bullet.label && <strong className="font-semibold text-ink">{bullet.label}: </strong>}
            {bullet.text}
          </span>
        </li>
      ))}
    </ul>
  </>
);

// Desktop: compact timeline where each role is a disclosure. The current role
// starts open, so the most relevant detail is visible without a click.
const Timeline = () => {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <ol className="ml-1.5 border-l-2 border-neon/40">
      {experiences.map((exp, index) => {
        const isOpen = open.has(index);
        const isCurrent = index === 0;
        return (
          <li key={`${exp.company}-${exp.title}`} className="relative pb-7 pl-7 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[7px] top-[18px] h-3 w-3 rounded-full ${
                isCurrent ? 'bg-signal shadow-[0_0_12px_rgb(var(--signal))]' : 'bg-neon'
              }`}
            />
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId(index)}
                onClick={() => toggle(index)}
                className="group flex w-full items-start justify-between gap-4 rounded-xl py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-display text-xl font-semibold text-ink">
                    {exp.title} · {exp.company}
                  </span>
                  <span className="text-sm font-normal text-ink-muted">{exp.dates}</span>
                </span>
                <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line/20 text-ink-soft group-hover:border-line/50 group-hover:text-ink">
                  {chevron('M6 9l6 6 6-6', `h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`)}
                </span>
              </button>
            </h3>

            <div id={panelId(index)} hidden={!isOpen} className="pt-3">
              <div className="rounded-[20px] border border-line/15 bg-surface/60 p-6">
                <RoleDetails exp={exp} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

const navButton =
  'min-h-[46px] rounded-[14px] border border-line/25 bg-surface/70 text-sm font-semibold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon disabled:border-line/10 disabled:bg-transparent disabled:text-ink-muted/60';

// Phones: one compact row per role; tapping opens the role in a bottom sheet,
// where Previous/Next step through the list without closing it.
const RoleList = () => {
  const [active, setActive] = useState<number | null>(null);
  const role = active === null ? null : experiences[active];

  return (
    <>
      <ul className="flex flex-col gap-3">
        {experiences.map((exp, index) => (
          <li key={`${exp.company}-${exp.title}`}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setActive(index)}
              className="flex min-h-16 w-full items-center gap-3 rounded-2xl border border-line/15 bg-surface/60 px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
            >
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 flex-none rounded-full ${
                  index === 0 ? 'bg-signal shadow-[0_0_10px_rgb(var(--signal))]' : 'bg-neon'
                }`}
              />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="font-display text-base font-semibold text-ink">{exp.title}</span>
                {/* Dates without the location, which the sheet shows. */}
                <span className="text-[13px] text-ink-muted">
                  {exp.company} · <span className="whitespace-nowrap">{exp.dates.split(' · ')[0]}</span>
                </span>
              </span>
              {index === 0 && <span className={badge}>Now</span>}
              {chevron('M9 6l6 6-6 6', 'h-4 w-4 flex-none text-ink-muted')}
            </button>
          </li>
        ))}
      </ul>

      <BottomSheet
        open={role !== null}
        onClose={() => setActive(null)}
        title={role?.title ?? ''}
        eyebrow={active === 0 ? <span className={badge}>Current role</span> : undefined}
        subtitle={role ? `${role.company} · ${role.dates}` : undefined}
        footer={
          active !== null && (
            <div className="grid grid-cols-2 gap-2.5">
              <button type="button" disabled={active === 0} onClick={() => setActive(active - 1)} className={navButton}>
                ← Previous
              </button>
              <button
                type="button"
                disabled={active === experiences.length - 1}
                onClick={() => setActive(active + 1)}
                className={navButton}
              >
                Next role →
              </button>
            </div>
          )
        }
      >
        {role && <RoleDetails exp={role} compact />}
      </BottomSheet>
    </>
  );
};

const ExperienceSection = () => {
  const desktop = useMediaQuery(DESKTOP);

  return (
    <section className="flex flex-col gap-3.5 pb-9 md:gap-6 md:pb-20">
      <Reveal>
        <h2 className="font-display text-[24px] font-bold tracking-[-0.02em] text-ink md:text-[32px]">Where I've worked</h2>
      </Reveal>
      {desktop ? <Timeline /> : <RoleList />}
    </section>
  );
};

export default ExperienceSection;
