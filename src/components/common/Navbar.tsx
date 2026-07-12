import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // The bar is transparent only over the home hero; everywhere else (and on
  // home once scrolled) it's the same frosted-glass treatment.
  const transparent = location.pathname === '/' && !isScrolled;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      transparent ? 'bg-transparent py-4' : 'bg-white/80 backdrop-blur-md shadow-md py-2'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className={`text-xl font-bold transition-colors duration-300 ${
            transparent ? 'text-white' : 'text-primary'
          }`}>
            Triantaphilos Terzides
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-300 ${
                transparent
                  ? (isActive(link.path)
                      ? 'text-white font-semibold'
                      : 'text-blue-100 hover:text-white')
                  : (isActive(link.path)
                      ? 'text-primary font-medium'
                      : 'text-gray-600 hover:text-primary')
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-current transition-colors duration-300 ${
              transparent ? 'text-white hover:text-gray-200' : 'text-gray-500 hover:text-primary'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-down border-t border-gray-200 py-2 shadow-md fixed top-[60px] inset-x-0 z-50 bg-white/95 backdrop-blur-md">
          <div className="container mx-auto px-6 flex flex-col space-y-3 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`${
                  isActive(link.path)
                    ? 'text-primary font-medium'
                    : 'text-gray-700 hover:text-primary'
                } py-3 block w-full text-base`}
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
