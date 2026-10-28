import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import usePauseOffscreen from './usePauseOffscreen';

const Section = () => {
  const ref = usePauseOffscreen<HTMLElement>();
  return <section ref={ref} data-testid="section" />;
};

describe('usePauseOffscreen', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('marks the element offscreen while it is out of view', () => {
    let notify: IntersectionObserverCallback = () => undefined;
    const disconnect = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          notify = callback;
        }
        observe = vi.fn();
        disconnect = disconnect;
      },
    );
    const { unmount } = render(<Section />);
    const section = screen.getByTestId('section');
    const report = (isIntersecting: boolean) =>
      act(() => notify([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver));

    report(false);
    expect(section).toHaveAttribute('data-offscreen');
    report(true);
    expect(section).not.toHaveAttribute('data-offscreen');

    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});
