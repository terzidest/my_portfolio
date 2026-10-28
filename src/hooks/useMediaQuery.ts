import { useEffect, useState } from 'react';

/** Tailwind's `md` breakpoint: phones are everything below it. */
export const DESKTOP = '(min-width: 768px)';

/**
 * Tracks a media query, updating if it changes. Reads it synchronously on the
 * first render so a layout chosen by breakpoint doesn't flash the wrong one.
 * Use only where phone and desktop need different markup; prefer `md:` classes.
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
