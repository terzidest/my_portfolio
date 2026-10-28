import { Children, useEffect, useRef, useState, type ReactNode } from 'react';

interface RailProps {
  children: ReactNode;
  /** Accessible name for the list. */
  label: string;
  /** Classes for the scroller, e.g. `md:grid md:grid-cols-3` to stop scrolling on desktop. */
  className?: string;
  /** Show page dots under the rail (one per item). */
  dots?: boolean;
  /** Fade the right edge to hint there's more to swipe. */
  fade?: boolean;
}

/**
 * Horizontal, snap-scrolling row for phones. Children become list items
 * that snap to the left edge; the rail bleeds to the screen edge while its
 * first item lines up with the page gutter (px-5 / scroll-px-5).
 */
const Rail = ({ children, label, className = '', dots = false, fade = false }: RailProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = ref.current;
    if (!dots || !el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const first = el.firstElementChild as HTMLElement | null;
        if (!first) return;
        const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0');
        setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / (step || 1))));
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [dots, items.length]);

  return (
    <>
      <ul
        ref={ref}
        aria-label={label}
        className={`no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 ${
          fade ? 'rail-fade' : ''
        } ${className}`}
      >
        {items.map((child, i) => (
          <li key={i} className="flex shrink-0 snap-start md:shrink">
            {child}
          </li>
        ))}
      </ul>
      {dots && (
        <div aria-hidden="true" className="mt-4 flex justify-center gap-1.5 md:hidden">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === active ? 'w-[18px] bg-neon' : 'w-1.5 bg-line/30'
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Rail;
