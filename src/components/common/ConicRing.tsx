import type { ReactNode } from 'react';

interface ConicRingProps {
  children: ReactNode;
  /** Size and border radius of the framed element (e.g. `h-[280px] w-[280px] rounded-full`). */
  className?: string;
}

// Rotating conic ring around a rounded element. See `.conic-ring` in index.css
// for why the gradient spins as a separate layer behind a still mask.
const ConicRing = ({ children, className = '' }: ConicRingProps) => (
  <div className={`conic-ring ${className}`}>
    <span className="conic-ring__glow" aria-hidden="true" />
    <span className="conic-ring__frame" aria-hidden="true">
      <span className="conic-ring__spin" />
    </span>
    {children}
  </div>
);

export default ConicRing;
