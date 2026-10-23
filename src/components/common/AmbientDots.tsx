import type { CSSProperties } from 'react';

const COUNT = 28;

// Deterministic spread (golden-ratio steps, not Math.random) so the layer
// looks the same on every visit and in tests. Every dot starts at the bottom
// edge and rises a share of the section's height (`rise`, in % of it).
const dots = Array.from({ length: COUNT }, (_, i) => {
  const duration = 9 + ((i * 37) % 8); // 9–16s
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
 */
const AmbientDots = () => (
  <div className="ambient-dots pointer-events-none absolute inset-0" aria-hidden="true">
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

export default AmbientDots;
