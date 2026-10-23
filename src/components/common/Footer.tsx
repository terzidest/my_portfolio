import { Link } from 'react-router-dom';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const pages = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];

const EMAIL = 'terzidest@gmail.com';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/terzidest',
    path: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.934.359.31.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/triantaphilos-terzides-53b9882a3/',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

const label = 'mb-2 font-mono text-xs uppercase tracking-[0.08em] text-signal';
const iconButton =
  'hover-neon flex h-11 w-11 items-center justify-center rounded-xl border border-line/20 bg-surface/70 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <footer className="mt-6 border-t border-line/15 bg-gradient-to-b from-surface/0 to-surface/70">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 pb-6 pt-14">
        <div className="flex flex-wrap justify-between gap-10">
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

          <nav aria-label="Footer" className="flex flex-[0_1_160px] flex-col">
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
            <h2 className={label}>Elsewhere</h2>
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
            <a href={`mailto:${EMAIL}`} className="text-sm text-link hover:text-link-hover">
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/10 pt-4 text-sm text-ink-muted">
          <span>© {currentYear} Triantaphilos Terzides</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md text-ink-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
          >
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
