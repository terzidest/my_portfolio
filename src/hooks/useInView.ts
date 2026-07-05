import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and a boolean that flips to true (once) when the element
 * scrolls into view. Users with prefers-reduced-motion get `true`
 * immediately so content never waits on an animation.
 */
const useInView = <T extends HTMLElement>(threshold = 0.15) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

export default useInView;
