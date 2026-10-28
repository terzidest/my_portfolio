import { Link } from 'react-router-dom';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { EMAIL, socials } from '../../data/contact';

const pages = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];


const label = 'mb-2 font-mono text-xs uppercase tracking-[0.08em] text-signal';
const iconButton =
  'hover-neon flex h-11 w-11 items-center justify-center rounded-xl border border-line/20 bg-surface/70 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <footer className="mt-6 border-t border-line/15 bg-gradient-to-b from-surface/0 to-surface/70">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 pb-6 pt-8 md:gap-10 md:px-6 md:pt-14">
        <div className="flex flex-wrap justify-between gap-5 md:gap-10">
          <div className="flex flex-[1_1_300px] flex-col gap-3">
            <Link
              to="/"
              className="self-start rounded-md font-display text-2xl font-bold tracking-tight text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
            >
              terzidest<span className="text-signal">.</span>
            </Link>
            <p className="max-w-[340px] text-[15px] leading-relaxed text-ink-soft">
              Senior Frontend Engineer in Athens, Greece. React and TypeScript first.
            </p>
          </div>

          {/* Phones navigate with MobileDock, so the pages column is desktop-only. */}
          <nav aria-label="Footer" className="hidden flex-[0_1_160px] flex-col md:flex">
            <h2 className={label}>Pages</h2>
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="flex min-h-[34px] items-center text-[15px] text-ink-soft hover:text-ink"
              >
                {page.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-[0_1_220px] flex-col gap-2.5">
            <h2 className={`${label} hidden md:block`}>Elsewhere</h2>
            <div className="flex gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={iconButton}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
              <a href={`mailto:${EMAIL}`} aria-label="Email" className={iconButton}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16v12H4z" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
              </a>
            </div>
            <a href={`mailto:${EMAIL}`} className="hidden text-sm text-link hover:text-link-hover md:inline">
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/10 pt-4 text-sm text-ink-muted">
          <span>© {currentYear} Triantaphilos Terzides</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
            className="hidden min-h-[44px] items-center gap-1.5 rounded-md text-ink-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon md:inline-flex"
          >
            {/* Desktop-only: on phones MobileDock's "Top" does this. */}
            Back to top
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
