import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
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
  it('renders every live link next to GitHub, opening in a new tab', () => {
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

  it('shows the not-found state for a removed project', () => {
    renderAt('/projects/little-lemon');

    expect(screen.getByRole('heading', { name: 'Project Not Found' })).toBeInTheDocument();
  });
});
