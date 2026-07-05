import useInView from '../../hooks/useInView';

interface RevealProps {
  children: React.ReactNode;
  /** Transition delay in ms — use to stagger sibling reveals. */
  delay?: number;
  className?: string;
}

/**
 * Fades and slides its children up when they enter the viewport.
 * Reduced-motion users see content immediately (see useInView) and the
 * global CSS guard collapses the transition to instant.
 */
const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-500 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
