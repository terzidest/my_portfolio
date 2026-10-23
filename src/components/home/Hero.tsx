import AmbientDots from '../common/AmbientDots';
import Button from '../common/Button';
import ResponsiveImage from '../common/ResponsiveImage';
import { hero } from '../../data/home';
import { profileImage } from '../../data/about';

const Hero = () => (
  <section className="spotlight relative overflow-hidden">
    <AmbientDots />
    <div className="starfield relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-6 pb-20 pt-36 md:pt-40">
      <div className="rise-stagger flex min-w-0 flex-[999_1_520px] flex-col gap-6">
        <p className="font-mono text-sm uppercase tracking-[0.08em] text-signal">{hero.eyebrow}</p>
        <h1 className="font-display text-[clamp(2.75rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
          {hero.name}
        </h1>
        <p className="max-w-[560px] text-lg leading-relaxed text-ink-soft md:text-[19px]">{hero.intro}</p>
        <div className="mt-2 flex flex-wrap gap-3.5">
          <Button to="/projects" variant="energy" size="lg">
            View my projects
          </Button>
          <Button to="/contact" variant="ghost" size="lg">
            Contact me
          </Button>
        </div>
      </div>

      {/* Portrait in the rotating conic ring. */}
      <div className="relative flex h-[340px] min-w-0 flex-[1_1_340px] items-center justify-center sm:h-[460px]">
        <div className="conic-ring h-[220px] w-[220px] rounded-full sm:h-[280px] sm:w-[280px]">
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

export default Hero;
