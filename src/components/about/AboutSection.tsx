import Rail from '../common/Rail';
import ResponsiveImage from '../common/ResponsiveImage';
import Reveal from '../common/Reveal';
import { approach, intro, profileImage } from '../../data/about';
import usePauseOffscreen from '../../hooks/usePauseOffscreen';

const AboutSection = () => {
  const introRef = usePauseOffscreen<HTMLElement>();

  return (
    // Layout-neutral: the About page owns the outer padding/background.
    <>
      {/* Phones: a grid with the portrait beside the eyebrow and heading, the
          paragraphs full width below (the text column is `contents` there). */}
      <section
        ref={introRef}
        className="grid grid-cols-[112px_minmax(0,1fr)] items-center gap-x-[18px] gap-y-2 pb-9 md:flex md:flex-wrap md:items-start md:gap-16 md:pb-20"
      >
        <div className="conic-ring row-span-2 h-[140px] w-[112px] flex-none rounded-[24px] md:mx-auto md:h-[380px] md:w-[300px] md:rounded-[28px] lg:mx-0">
          <ResponsiveImage
            source={profileImage}
            loading="eager"
            sizes="300px"
            containerClassName="h-full w-full rounded-[24px] md:rounded-[28px]"
            imageClassName="h-full w-full object-cover object-[50%_15%]"
          />
        </div>
        <div className="rise-stagger contents md:flex md:min-w-0 md:flex-[999_1_480px] md:flex-col md:gap-5">
          <p className="col-start-2 self-end font-mono text-xs uppercase tracking-[0.08em] text-signal md:text-sm">
            About me
          </p>
          <h1 className="col-start-2 self-start font-display text-[26px] font-bold leading-[1.12] tracking-[-0.02em] text-ink md:text-[clamp(2.25rem,4.6vw,3.5rem)] md:leading-[1.08] md:tracking-[-0.025em]">
            {intro.heading}
          </h1>
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="col-span-2 mt-1.5 text-[15px] leading-[1.7] text-ink-soft md:mt-0 md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3.5 pb-9 md:gap-6 md:pb-20">
        <Reveal>
          <h2 className="font-display text-[24px] font-bold tracking-[-0.02em] text-ink md:text-[32px]">My approach</h2>
        </Reveal>
        <Rail
          label="My approach"
          className="-mx-5 md:mx-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] md:gap-5 md:overflow-visible md:px-0"
        >
          {approach.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 100} className="h-full">
              <div className="hover-neon flex h-full w-[260px] flex-col gap-2 rounded-[18px] border border-line/15 bg-surface/60 p-5 md:w-auto md:gap-2.5 md:rounded-[20px] md:p-7">
                <span className="font-mono text-[12px] text-signal md:text-[13px]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[18px] font-bold text-ink md:text-[22px]">{principle.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft md:text-[15px]">{principle.text}</p>
              </div>
            </Reveal>
          ))}
        </Rail>
      </section>
    </>
  );
};

export default AboutSection;
