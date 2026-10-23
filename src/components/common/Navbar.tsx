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

// Floating frosted-glass bar, the same on every route. Below md the page
// links move to MobileDock at the bottom; this bar keeps logo + theme.
const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/projects'
      ? location.pathname === path || location.pathname.startsWith('/projects/')
      : location.pathname === path;

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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
