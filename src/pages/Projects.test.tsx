import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Projects from './Projects';

describe('Projects filters', () => {
  it('uses exclusive accessible filters and updates the result count', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Projects /></MemoryRouter>);

    const all = screen.getByRole('button', { name: 'All Projects' });
    const mobile = screen.getByRole('button', { name: 'Mobile Apps' });
    const web = screen.getByRole('button', { name: 'Web Apps' });

    expect(all).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Showing 5 projects')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /on GitHub/ })).toHaveLength(5);

    await user.click(mobile);
    expect(all).toHaveAttribute('aria-pressed', 'false');
    expect(mobile).toHaveAttribute('aria-pressed', 'true');
    expect(web).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Showing 3 projects')).toBeInTheDocument();

    await user.click(web);
    expect(mobile).toHaveAttribute('aria-pressed', 'false');
    expect(web).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Showing 2 projects')).toBeInTheDocument();
    expect(screen.queryByText('No projects found')).not.toBeInTheDocument();
  });
});
