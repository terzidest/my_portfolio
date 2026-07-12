import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = { light: '#ffffff', dark: '#0f172a' };

/**
 * Light/dark theme with system-preference default. No stored override →
 * follow the OS live; a manual toggle writes 'light' | 'dark' to
 * localStorage and pins the choice. The anti-FOUC script in index.html
 * has already set the initial <html> class before React mounts.
 */
const useTheme = (): { theme: Theme; toggleTheme: () => void } => {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  // Apply to <html> and keep the browser-chrome color in sync.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme]);
  }, [theme]);

  // Follow live OS changes only while no override is stored.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY) !== null) return;
      } catch {
        // Storage unavailable — treat as no override.
      }
      setTheme(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private mode: the theme still flips for this session.
      }
      return next;
    });
  };

  return { theme, toggleTheme };
};

export default useTheme;
