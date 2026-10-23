import type { CSSProperties } from 'react';

// Fixed positions (not random) so the layer looks the same on every visit
// and in tests. x/y in %, size in px, t = duration (s), d = delay (s),
// dx = sideways drift (px).
const dots = [
  { x: 4, y: 12, s: 3, t: 8.5, d: 0, dx: 8 },
  { x: 11, y: 58, s: 2, t: 7, d: -3.2, dx: -6 },
  { x: 19, y: 30, s: 3, t: 9.5, d: -6.1, dx: 10 },
  { x: 27, y: 74, s: 2, t: 6.5, d: -1.4, dx: -8 },
  { x: 36, y: 18, s: 2, t: 8, d: -4.8, dx: 6 },
  { x: 44, y: 46, s: 3, t: 10, d: -2.2, dx: -10 },
  { x: 52, y: 8, s: 2, t: 7.5, d: -5.5, dx: 8 },
  { x: 59, y: 66, s: 4, t: 9, d: -0.8, dx: -6 },
  { x: 66, y: 28, s: 2, t: 6, d: -3.9, dx: 10 },
  { x: 72, y: 52, s: 3, t: 8.8, d: -7.2, dx: -8 },
  { x: 79, y: 14, s: 2, t: 7.2, d: -2.7, dx: 6 },
  { x: 85, y: 70, s: 3, t: 9.8, d: -5.0, dx: -10 },
  { x: 91, y: 36, s: 2, t: 6.8, d: -1.9, dx: 8 },
  { x: 97, y: 60, s: 3, t: 8.2, d: -6.6, dx: -6 },
];

/**
 * Faint dots drifting up behind a section's content. Place inside a
 * `relative overflow-hidden` parent and raise the content above it. Hidden
 * from assistive tech; under reduced motion the dots stay invisible.
 */
const AmbientDots = () => (
  <div className="ambient-dots pointer-events-none absolute inset-0" aria-hidden="true">
    {dots.map((dot) => (
      <i
        key={`${dot.x}-${dot.y}`}
        style={
          {
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.s,
            height: dot.s,
            animationDuration: `${dot.t}s`,
            animationDelay: `${dot.d}s`,
            '--dx': `${dot.dx}px`,
          } as CSSProperties
        }
      />
    ))}
  </div>
);

export default AmbientDots;
