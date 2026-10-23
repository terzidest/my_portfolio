import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from './Home';

const renderHome = () =>
  render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Home /></MemoryRouter>);

describe('Home', () => {
  it('leads with the name and points the two CTAs at projects and contact', () => {
    renderHome();

    expect(screen.getByRole('heading', { level: 1, name: 'Triantaphilos Terzides' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View my projects' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Contact me' })).toHaveAttribute('href', '/contact');
    for (const title of ['React architecture', 'Complex UI & dashboards', 'Cross-platform mobile']) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    // Projects live on their own page now.
    expect(screen.queryByRole('heading', { name: 'blockprint' })).not.toBeInTheDocument();
  });

  it('filters the tech tiles by category', async () => {
    const user = userEvent.setup();
    renderHome();
    const tiles = () => within(screen.getByRole('list', { name: 'Technologies' }));

    expect(tiles().getByText('React')).toBeInTheDocument();
    expect(tiles().getByText('Go')).toBeInTheDocument();
    // Practices are listed as text, not tiles.
    expect(tiles().queryByText('SSR')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^Backend/ }));
    expect(screen.getByRole('button', { name: /^Backend/ })).toHaveAttribute('aria-pressed', 'true');
    expect(tiles().getByText('Go')).toBeInTheDocument();
    expect(tiles().queryByText('React')).not.toBeInTheDocument();
  });
});
