import AmbientDots from '../common/AmbientDots';
import Button from '../common/Button';
import ResponsiveImage from '../common/ResponsiveImage';
import { hero } from '../../data/home';
import { profileImage } from '../../data/about';
import usePauseOffscreen from '../../hooks/usePauseOffscreen';

// Phones put the two CTAs side by side at half width each.
const phoneCta = 'max-md:min-h-[50px] max-md:flex-1 max-md:px-4 max-md:text-[15px]';

const Hero = () => {
  const ref = usePauseOffscreen<HTMLElement>();

  return (
    <section ref={ref} className="spotlight relative overflow-hidden">
      <AmbientDots />
      <div className="starfield relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-8 px-5 pb-12 pt-28 md:gap-14 md:px-6 md:pb-20 md:pt-40">
        <div className="rise-stagger flex min-w-0 flex-[999_1_520px] flex-col items-center gap-4 text-center md:items-stretch md:gap-6 md:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal md:text-sm">{hero.eyebrow}</p>
          <h1 className="font-display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.03em] text-ink md:text-[clamp(2.75rem,6vw,4.75rem)] md:leading-[1.02]">
            {hero.name}
          </h1>
          <p className="max-w-[560px] text-base leading-relaxed text-ink-soft md:text-[19px]">{hero.intro}</p>
          <div className="mt-1.5 flex w-full gap-2.5 md:mt-2 md:w-auto md:flex-wrap md:gap-3.5">
            <Button to="/projects" variant="energy" size="lg" className={phoneCta}>
              View my projects
            </Button>
            <Button to="/contact" variant="ghost" size="lg" className={phoneCta}>
              Contact me
            </Button>
          </div>
        </div>

        {/* Portrait in the rotating conic ring; on phones it sits above the name. */}
        <div className="relative order-first flex h-[184px] min-w-0 flex-[1_1_340px] items-center justify-center md:order-none md:h-[460px]">
          <div className="conic-ring h-[168px] w-[168px] rounded-full md:h-[280px] md:w-[280px]">
            <ResponsiveImage
              source={profileImage}
              loading="eager"
              containerClassName="h-full w-full rounded-full"
              imageClassName="h-full w-full object-cover object-[50%_12%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
