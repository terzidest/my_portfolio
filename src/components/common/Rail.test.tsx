import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Rail from './Rail';

describe('Rail', () => {
  it('wraps each child in a list item and skips empty children', () => {
    render(
      <Rail label="Services">
        <span>One</span>
        {null}
        <span>Two</span>
      </Rail>,
    );
    const list = screen.getByRole('list', { name: 'Services' });
    expect(list.querySelectorAll('li')).toHaveLength(2);
  });

  it('moves the active dot as the rail scrolls', async () => {
    const { container } = render(
      <Rail label="Services" dots>
        <span>One</span>
        <span>Two</span>
        <span>Three</span>
      </Rail>,
    );
    const list = screen.getByRole('list', { name: 'Services' });
    const dots = () => [...container.querySelectorAll('[aria-hidden="true"] > span')];
    expect(dots()).toHaveLength(3);
    expect(dots()[0]).toHaveClass('bg-neon');

    Object.defineProperty(list.firstElementChild, 'offsetWidth', { value: 288 });
    list.scrollLeft = 300;
    fireEvent.scroll(list);
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => setTimeout(r, 0));
    expect(dots()[1]).toHaveClass('bg-neon');
    expect(dots()[0]).not.toHaveClass('bg-neon');
  });
});
