import { Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const iconProps = {
  className: 'h-[22px] w-[22px]',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

const icons: Record<string, ReactNode> = {
  home: <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  about: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </>
  ),
  contact: (
    <>
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  projects: (
    <>
      <rect x="3" y="4" width="7" height="7" rx="1.5" />
      <rect x="14" y="4" width="7" height="7" rx="1.5" />
      <rect x="3" y="15" width="7" height="6" rx="1.5" />
      <rect x="14" y="15" width="7" height="6" rx="1.5" />
    </>
  ),
  top: <path d="M12 19V5M5 12l7-7 7 7" />,
};

const item =
  'flex min-h-[56px] flex-col items-center justify-end gap-1 pb-2.5 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-neon rounded-xl';

/**
 * Phone navigation (below md), modeled on the prototype's dock: a frosted bar
 * fixed to the bottom with Contact as a raised energy button in the middle.
 * "Top" fills the fifth slot so Contact stays centered.
 */
const MobileDock = () => {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  const isActive = (path: string) =>
    path === '/projects'
      ? location.pathname === path || location.pathname.startsWith('/projects/')
      : location.pathname === path;

  const navLink = (path: string, label: string, icon: string) => {
    const active = isActive(path);
    return (
      <Link
        to={path}
        aria-current={active ? 'page' : undefined}
        className={`${item} ${active ? 'font-semibold text-ink' : 'text-ink-muted hover:text-ink'}`}
      >
        <svg {...iconProps}>{icons[icon]}</svg>
        {label}
      </Link>
    );
  };

  const contactActive = isActive('/contact');

  return (
    <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="glass grid grid-cols-5 items-end rounded-t-[44px_30px] border-t border-line/15 bg-surface/90 px-1.5 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgb(0_0_0/0.3)]">
        {navLink('/', 'Home', 'home')}
        {navLink('/about', 'About', 'about')}
        <Link
          to="/contact"
          aria-current={contactActive ? 'page' : undefined}
          className={`${item} gap-1.5 font-semibold text-ink`}
        >
          <span className="cta-energy -mt-[30px] flex h-[52px] w-[52px] items-center justify-center">
            <span className="cta-energy__rim" aria-hidden="true" />
            <span className="cta-energy__fx" aria-hidden="true" />
            <svg {...iconProps} className="relative z-[3] h-[22px] w-[22px]">{icons.contact}</svg>
          </span>
          Contact
        </Link>
        {navLink('/projects', 'Projects', 'projects')}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
          className={`${item} text-ink-muted hover:text-ink`}
        >
          <svg {...iconProps}>{icons.top}</svg>
          Top
        </button>
      </div>
    </nav>
  );
};

export default MobileDock;
