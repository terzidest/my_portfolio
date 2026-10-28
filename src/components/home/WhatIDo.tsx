import Rail from '../common/Rail';
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
  <section className="mx-auto flex max-w-[1200px] flex-col gap-4 pb-11 pt-2 md:gap-8 md:px-6 md:pb-24 md:pt-6">
    <Reveal className="flex max-w-[640px] flex-col gap-2 px-5 md:gap-3 md:px-0">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal md:text-sm">What I do</p>
      <h2 className="font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-ink md:text-[clamp(1.875rem,3.6vw,2.625rem)] md:leading-[1.1]">
        Frontend for products that have to keep working.
      </h2>
    </Reveal>
    {/* A swipe rail on phones, the three-column grid from md up. */}
    <Rail
      label="What I do"
      dots
      className="md:grid md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:gap-5 md:overflow-visible md:px-0"
    >
      {focusAreas.map((area, index) => (
        <Reveal key={area.title} delay={index * 100} className="h-full">
          <div className="hover-neon flex h-full w-[288px] flex-col gap-2.5 rounded-[20px] border border-line/15 bg-surface/60 p-[22px] md:w-auto md:gap-3.5 md:rounded-[22px] md:p-7">
            <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl md:h-12 md:w-12 md:rounded-[14px] bg-neon/20 text-signal">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                {icons[area.icon]}
              </svg>
            </span>
            <h3 className="font-display text-[19px] font-bold text-ink md:text-[22px]">{area.title}</h3>
            <p className="text-sm leading-relaxed text-ink-soft md:text-[15px]">{area.text}</p>
          </div>
        </Reveal>
      ))}
    </Rail>
  </section>
);

export default WhatIDo;
