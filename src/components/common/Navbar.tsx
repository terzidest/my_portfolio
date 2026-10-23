import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];

const linkStyles = (active: boolean) =>
  `rounded-[10px] px-3.5 py-2.5 text-[15px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon ${
    active ? 'bg-neon/20 text-ink' : 'text-ink-soft hover:text-ink hover:bg-neon/10'
  }`;

const iconButton =
  'flex h-11 w-11 items-center justify-center rounded-xl border border-line/25 text-ink-soft hover:text-ink hover:border-line/50';

// Floating frosted-glass bar, the same on every route.
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/projects'
      ? location.pathname === path || location.pathname.startsWith('/projects/')
      : location.pathname === path;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  return (
    <nav aria-label="Main" className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="glass mx-auto flex max-w-[1200px] items-center justify-between gap-4 rounded-[18px] border border-line/20 py-2.5 pl-5 pr-2.5 shadow-[0_8px_30px_rgb(0_0_0/0.12)] sm:pr-3">
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon rounded-md"
        >
          terzidest<span className="text-signal">.</span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={linkStyles(isActive(link.path))}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <ThemeToggle className={`ml-1.5 ${iconButton}`} />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-neon transition-colors duration-200 ${iconButton}`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
              {isMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="glass md:hidden animate-slide-down mx-auto mt-2 max-w-[1200px] rounded-[18px] border border-line/20 p-2 shadow-[0_12px_40px_rgb(0_0_0/0.25)]"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`${linkStyles(isActive(link.path))} block w-full px-4 py-3 text-base`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
