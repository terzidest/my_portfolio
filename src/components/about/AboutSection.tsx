import ConicRing from '../common/ConicRing';
import ResponsiveImage from '../common/ResponsiveImage';
import Reveal from '../common/Reveal';
import { approach, intro, profileImage } from '../../data/about';
import usePauseOffscreen from '../../hooks/usePauseOffscreen';

const AboutSection = () => {
  const introRef = usePauseOffscreen<HTMLElement>();

  return (
    // Layout-neutral: the About page owns the outer padding/background.
    <>
      <section ref={introRef} className="flex flex-wrap items-start gap-16 pb-20">
        <ConicRing className="mx-auto h-[380px] w-[300px] flex-none rounded-[28px] lg:mx-0">
          <ResponsiveImage
            source={profileImage}
            loading="eager"
            sizes="300px"
            containerClassName="h-full w-full rounded-[28px]"
            imageClassName="h-full w-full object-cover object-[50%_15%]"
          />
        </ConicRing>
        <div className="rise-stagger flex min-w-0 flex-[999_1_480px] flex-col gap-5">
          <p className="font-mono text-sm uppercase tracking-[0.08em] text-signal">About me</p>
          <h1 className="font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink">
            {intro.heading}
          </h1>
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-[1.7] text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 pb-20">
        <Reveal>
          <h2 className="font-display text-[32px] font-bold tracking-[-0.02em] text-ink">My approach</h2>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {approach.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 100} className="h-full">
              <div className="hover-neon flex h-full flex-col gap-2.5 rounded-[20px] border border-line/15 bg-surface/60 p-7">
                <span className="font-mono text-[13px] text-signal">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[22px] font-bold text-ink">{principle.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{principle.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutSection;
