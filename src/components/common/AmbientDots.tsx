import { useEffect, useRef, type CSSProperties } from 'react';

const COUNT = 28;

// Deterministic spread (golden-ratio steps, not Math.random) so the layer
// looks the same on every visit and in tests. Every dot starts at the bottom
// edge and rises a share of the section's height (`rise`, in % of it).
const dots = Array.from({ length: COUNT }, (_, i) => {
  const duration = 16 + ((i * 37) % 11); // 16–26s: a slow drift
  return {
    x: ((i * 0.618034) % 1) * 100,
    size: 2 + (i % 3), // 2–4px
    duration,
    delay: -((i * 1.37) % duration), // negative: already mid-flight on load
    rise: 65 + ((i * 29) % 45), // 65–109% of the section height
    dx: (i % 2 ? -1 : 1) * (4 + (i % 4) * 3), // ±4–13px sideways sway
  };
});

/**
 * Faint dots drifting up from the bottom of a section, behind its content.
 * Place inside a `relative overflow-hidden` parent and raise the content
 * above it. Hidden from assistive tech; under reduced motion the dots stay
 * invisible.
 *
 * The layer's top fade must follow the viewport, not the page: the fixed
 * glass navbar blurs dots away, and they'd reappear in the gap above it. So
 * `--fade-top` tracks how far the layer has scrolled under the viewport top.
 */
const AmbientDots = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = el.getBoundingClientRect();
      // Past the section the value no longer matters; skip the style write.
      if (-top > height) return;
      el.style.setProperty('--fade-top', `${Math.max(0, -top)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="ambient-dots pointer-events-none absolute inset-0" aria-hidden="true">
      {dots.map((dot, i) => (
        <i
          key={i}
          style={
            {
              left: `${dot.x}%`,
              width: dot.size,
              height: dot.size,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
              '--dx': `${dot.dx}px`,
              '--rise': `${dot.rise}cqh`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default AmbientDots;
