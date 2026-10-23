import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Footer from './Footer';

const renderFooter = () =>
  render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Footer /></MemoryRouter>);

describe('Footer', () => {
  it('links every page and the external profiles safely', () => {
    renderFooter();
    const nav = screen.getByRole('navigation', { name: 'Footer' });
    expect(nav.querySelectorAll('a')).toHaveLength(4);

    const github = screen.getByRole('link', { name: 'GitHub' });
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:terzidest@gmail.com');
  });

  it('scrolls back to the top', async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    vi.stubGlobal('scrollTo', scrollTo);
    renderFooter();

    await user.click(screen.getByRole('button', { name: 'Back to top' }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    vi.unstubAllGlobals();
  });
});
