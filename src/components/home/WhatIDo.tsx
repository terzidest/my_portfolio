import Reveal from '../common/Reveal';
import { focusAreas, type FocusIcon } from '../../data/home';

const icons: Record<FocusIcon, JSX.Element> = {
  architecture: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 17.5h7M17.5 14v7" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 13v4M12 12v5M16 14v3" />
    </>
  ),
  mobile: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
};

const WhatIDo = () => (
  <section className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 pb-24 pt-6">
    <Reveal className="flex max-w-[640px] flex-col gap-3">
      <p className="font-mono text-sm uppercase tracking-[0.08em] text-signal">What I do</p>
      <h2 className="font-display text-[clamp(1.875rem,3.6vw,2.625rem)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
        Frontend for products that have to keep working.
      </h2>
    </Reveal>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
      {focusAreas.map((area, index) => (
        <Reveal key={area.title} delay={index * 100} className="h-full">
          <div className="hover-neon flex h-full flex-col gap-3.5 rounded-[22px] border border-line/15 bg-surface/60 p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-neon/20 text-signal">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                {icons[area.icon]}
              </svg>
            </span>
            <h3 className="font-display text-[22px] font-bold text-ink">{area.title}</h3>
            <p className="text-[15px] leading-relaxed text-ink-soft">{area.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default WhatIDo;
