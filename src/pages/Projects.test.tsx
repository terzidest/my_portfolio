import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Projects from './Projects';

describe('Projects filters', () => {
  it('uses exclusive accessible filters and updates the result count', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Projects /></MemoryRouter>);

    const all = screen.getByRole('button', { name: 'All' });
    const mobile = screen.getByRole('button', { name: 'Mobile' });
    const web = screen.getByRole('button', { name: 'Web' });

    expect(all).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Showing 4 projects')).toBeInTheDocument();
    // One link per card, straight to the case study; blockprint leads.
    const cards = screen.getAllByRole('link', { name: /read the case study/ });
    expect(cards).toHaveLength(4);
    expect(cards[0]).toHaveAttribute('href', '/projects/blockprint');

    await user.click(mobile);
    expect(all).toHaveAttribute('aria-pressed', 'false');
    expect(mobile).toHaveAttribute('aria-pressed', 'true');
    expect(web).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Showing 2 projects')).toBeInTheDocument();

    await user.click(web);
    expect(mobile).toHaveAttribute('aria-pressed', 'false');
    expect(web).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Showing 2 projects')).toBeInTheDocument();
    expect(screen.queryByText('No projects found')).not.toBeInTheDocument();
  });
});
