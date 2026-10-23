import Button from '../components/common/Button';
import usePageMeta from '../hooks/usePageMeta';

const NotFound = () => {
  usePageMeta({
    title: 'Page Not Found',
    description: 'This page does not exist.',
    noindex: true,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden px-6 pb-24 pt-36 text-center">
      {/* Same glow, rays and sparks as the hero portrait, behind the number. */}
      <div className="relative flex h-[260px] w-full max-w-[560px] items-center justify-center">
        <div className="aura w-[420px] sm:w-[560px]" aria-hidden="true">
          <i />
        </div>
        <div className="sparks absolute inset-x-[30%] bottom-5 h-1" aria-hidden="true">
          <i /><i /><i /><i />
        </div>
        <p
          aria-hidden="true"
          className="relative bg-gradient-to-b from-ink from-10% via-signal via-55% to-neon bg-clip-text font-display text-[clamp(7.5rem,18vw,12.5rem)] font-bold leading-none tracking-[-0.05em] text-transparent drop-shadow-[0_0_24px_rgb(var(--neon)/0.55)]"
        >
          404
        </p>
      </div>
      <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-ink">Page not found</h1>
      <p className="max-w-[440px] text-[17px] leading-relaxed text-ink-soft">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <div className="mt-2.5 flex flex-wrap justify-center gap-3">
        <Button to="/" variant="energy" size="lg">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to home
        </Button>
        <Button to="/projects" variant="ghost" size="lg">
          See projects
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
