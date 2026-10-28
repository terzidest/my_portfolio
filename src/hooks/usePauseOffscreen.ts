import { useEffect, useRef } from 'react';

/**
 * Sets `data-offscreen` on the element while it's out of the viewport; a
 * rule in index.css pauses every animation inside it. Decorative loops (the
 * hero's dots, ring and CTA glow) then cost nothing once scrolled past.
 */
const usePauseOffscreen = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) delete el.dataset.offscreen;
      else el.dataset.offscreen = '';
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};

export default usePauseOffscreen;
