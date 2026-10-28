import { useEffect, useId, useRef, type PointerEvent, type ReactNode } from 'react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  /** Small line above the title, e.g. "Current role". */
  eyebrow?: ReactNode;
  /** Line under the title, e.g. company and dates. */
  subtitle?: ReactNode;
  children: ReactNode;
  /** Pinned under the scrolling body, e.g. previous/next buttons. */
  footer?: ReactNode;
}

const DISMISS_PX = 80;

/**
 * Phone bottom sheet on the native <dialog>: showModal() gives focus
 * trapping, Esc to close and an inert page behind it for free. Closes on Esc,
 * the close button, a backdrop tap, or dragging the handle down. Page scroll
 * is locked while open.
 */
const BottomSheet = ({ open, onClose, title, eyebrow, subtitle, children, footer }: BottomSheetProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const drag = useRef<{ start: number; dy: number } | null>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      // jsdom has no showModal(); the attribute keeps tests meaningful.
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      document.documentElement.style.overflow = 'hidden';
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
    return () => {
      if (open) document.documentElement.style.overflow = '';
    };
  }, [open]);

  // New content (e.g. the next role) starts at the top.
  useEffect(() => {
    body.current?.scrollTo?.({ top: 0 });
  }, [title]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { start: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !ref.current) return;
    drag.current.dy = Math.max(0, e.clientY - drag.current.start);
    ref.current.style.transform = `translateY(${drag.current.dy}px)`;
  };
  const onPointerUp = () => {
    if (!drag.current || !ref.current) return;
    const { dy } = drag.current;
    drag.current = null;
    ref.current.style.transform = '';
    if (dy > DISMISS_PX) onClose();
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="bottom-sheet"
      // Esc fires `cancel`; keep React state in charge of closing.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // A click whose target is the dialog itself landed on the backdrop.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[85dvh] flex-col">
        <div
          className="flex cursor-grab touch-none justify-center pb-1 pt-2.5"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-hidden="true"
        >
          <span className="h-[5px] w-10 rounded-full bg-line/35" />
        </div>
        <div className="flex items-start justify-between gap-3 border-b border-line/10 px-5 pb-4 pt-2">
          <div className="flex min-w-0 flex-col gap-1">
            {eyebrow}
            <h2 id={titleId} className="font-display text-[22px] font-bold text-ink">
              {title}
            </h2>
            {subtitle && <p className="text-[13px] text-ink-muted">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line/20 text-ink-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
          >
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div ref={body} className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-4">{children}</div>
        {footer && <div className="border-t border-line/10 px-5 pb-5 pt-3">{footer}</div>}
      </div>
    </dialog>
  );
};

export default BottomSheet;
