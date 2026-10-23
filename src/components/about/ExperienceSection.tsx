import { useState } from 'react';
import { experiences } from '../../data/experience';
import Reveal from '../common/Reveal';

const panelId = (index: number) => `role-${index}`;

// Compact timeline: each role is a disclosure. The current role starts open,
// so the most relevant detail is visible without a click.
const ExperienceSection = () => {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <section className="flex flex-col gap-6 pb-20">
      <Reveal>
        <h2 className="font-display text-[32px] font-bold tracking-[-0.02em] text-ink">Where I've worked</h2>
      </Reveal>

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
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div id={panelId(index)} hidden={!isOpen} className="pt-3">
                <div className="rounded-[20px] border border-line/15 bg-surface/60 p-6">
                  {exp.description && <p className="mb-4 leading-relaxed text-ink-soft">{exp.description}</p>}
                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start leading-relaxed text-ink-soft">
                        <span className="mr-3 mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-neon" aria-hidden="true" />
                        <span>
                          {bullet.label && <strong className="font-semibold text-ink">{bullet.label}: </strong>}
                          {bullet.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ExperienceSection;
