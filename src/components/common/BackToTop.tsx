import { useEffect, useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/**
 * Floating button that fades in after the user scrolls down and smoothly
 * returns them to the top. Hidden until ~500px of scroll, and again at the
 * footer. Desktop only: on phones the dock's "Top" button does this.
 */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Hidden near the bottom, where the footer's own "Back to top" takes over.
    const onScroll = () => {
      const nearBottom = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 280;
      setVisible(window.scrollY > 500 && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`glass hover-neon fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full border border-line/25 text-ink shadow-lg hidden md:flex items-center justify-center transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-ground ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default BackToTop;
