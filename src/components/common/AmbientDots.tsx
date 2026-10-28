import { useEffect, useRef } from 'react';

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
 * above it. Hidden from assistive tech; under reduced motion the dots aren't
 * animated, so they stay invisible.
 *
 * Motion uses the Web Animations API with concrete pixel keyframes (rebuilt
 * when the section resizes): CSS keyframes built from custom properties and
 * container units kept Firefox from compositing them, and the dots stuttered.
 * The layer pauses its own animations offscreen, since usePauseOffscreen's
 * CSS rule only reaches CSS animations.
 *
 * `--clip-top` tracks how far the layer has scrolled under the viewport top,
 * so the clip that hides dots behind the fixed glass navbar follows the
 * viewport rather than the page.
 */
const AmbientDots = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Keep the navbar clip pinned to the viewport top.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = el.getBoundingClientRect();
      // Past the section the value no longer matters; skip the style write.
      if (-top > height) return;
      el.style.setProperty('--clip-top', `${Math.max(0, -top)}px`);
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

  // Drive the dots with pixel keyframes; pause them while offscreen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof el.animate !== 'function') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animations: Animation[] = [];
    let visible = true;

    const build = () => {
      animations.forEach((a) => a.cancel());
      const height = el.clientHeight;
      animations = Array.from(el.children).map((child, i) => {
        const dot = dots[i];
        const end = `translate(${dot.dx}px, ${-(dot.rise / 100) * height}px) scale(1)`;
        const animation = child.animate(
          [
            { opacity: 0, transform: 'translate(0, 0) scale(0.6)' },
            { opacity: 1, offset: 0.12 },
            { opacity: 1, offset: 0.75 },
            { opacity: 0, transform: end },
          ],
          { duration: dot.duration * 1000, delay: dot.delay * 1000, iterations: Infinity, easing: 'ease-in-out' },
        );
        if (!visible) animation.pause();
        return animation;
      });
    };

    build();
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(build) : null;
    resize?.observe(el);
    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      animations.forEach((a) => (visible ? a.play() : a.pause()));
    });
    view.observe(el);

    return () => {
      resize?.disconnect();
      view.disconnect();
      animations.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div ref={ref} className="ambient-dots pointer-events-none absolute inset-0" aria-hidden="true">
      {dots.map((dot, i) => (
        <i key={i} style={{ left: `${dot.x}%`, width: dot.size, height: dot.size }} />
      ))}
    </div>
  );
};

export default AmbientDots;
