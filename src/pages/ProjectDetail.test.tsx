import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { mockDesktopViewport } from '../test/viewport';
import ProjectDetail from './ProjectDetail';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>,
  );

describe('ProjectDetail links', () => {
  it('renders every live link next to GitHub, opening in a new tab (desktop)', () => {
    mockDesktopViewport();
    renderAt('/projects/blockprint');

    expect(screen.getByRole('link', { name: 'View blockprint on GitHub' })).toHaveAttribute('href', 'https://github.com/terzidest/blockprint');
    // Each live link appears as a header button and again in the side panel.
    const demos = screen.getAllByRole('link', { name: 'Live demo' });
    expect(demos).toHaveLength(2);
    for (const demo of demos) {
      expect(demo).toHaveAttribute('href', 'https://blockprint.terzidest.com');
      expect(demo).toHaveAttribute('target', '_blank');
      expect(demo).toHaveAttribute('rel', 'noopener noreferrer');
    }
    expect(screen.getAllByRole('link', { name: 'npm' })[0]).toHaveAttribute('href', 'https://www.npmjs.com/package/blockprint');
  });

  it('links the neighbouring case studies by title', () => {
    renderAt('/projects/blockprint');

    expect(screen.queryByText('← Previous project')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Next project.*EtherealNature/ })).toHaveAttribute('href', '/projects/ethereal-nature');
  });

  it('puts the main link and GitHub up front on phones, the rest in a sheet', async () => {
    const user = userEvent.setup();
    renderAt('/projects/blockprint');
    const sheet = () => document.querySelector('dialog')!;

    // Header: the primary link and a GitHub square; npm only lives in the sheet.
    const header = screen.getAllByRole('link', { name: /Live demo/ }).filter((link) => !sheet().contains(link));
    expect(header).toHaveLength(1);
    expect(header[0]).toHaveAttribute('href', 'https://blockprint.terzidest.com');
    expect(screen.getByRole('link', { name: 'View blockprint on GitHub' })).toHaveAttribute('target', '_blank');

    expect(sheet().open).toBe(false);
    await user.click(screen.getByRole('button', { name: 'Role, stack & links' }));
    expect(screen.getByRole('dialog', { name: 'blockprint' })).toBeInTheDocument();
    expect(within(sheet()).getByRole('link', { name: /npm/ })).toHaveAttribute('href', 'https://www.npmjs.com/package/blockprint');
    expect(within(sheet()).getByRole('heading', { name: 'Stack' })).toBeInTheDocument();
  });

  it('starts the phone case study with Problem open and Outcome collapsed', async () => {
    const user = userEvent.setup();
    renderAt('/projects/blockprint');
    const problem = screen.getByRole('button', { name: /Problem/ });
    const outcome = screen.getByRole('button', { name: /Outcome/ });
    expect(problem).toHaveAttribute('aria-expanded', 'true');
    expect(outcome).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById(outcome.getAttribute('aria-controls')!)).not.toBeVisible();

    await user.click(outcome);
    expect(outcome).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById(outcome.getAttribute('aria-controls')!)).toBeVisible();
  });

  it('shows the not-found state for a removed project', () => {
    renderAt('/projects/little-lemon');

    expect(screen.getByRole('heading', { name: 'Project Not Found' })).toBeInTheDocument();
  });
});
