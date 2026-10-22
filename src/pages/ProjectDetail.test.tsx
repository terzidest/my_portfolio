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

    expect(screen.getByRole('link', { name: /View on GitHub/ })).toHaveAttribute('href', 'https://github.com/terzidest/blockprint');
    const demo = screen.getByRole('link', { name: 'Live demo' });
    expect(demo).toHaveAttribute('href', 'https://blockprint.terzidest.com');
    expect(demo).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: 'npm' })).toHaveAttribute('href', 'https://www.npmjs.com/package/blockprint');
  });

  it('shows the not-found state for a removed project', () => {
    renderAt('/projects/little-lemon');

    expect(screen.getByRole('heading', { name: 'Project Not Found' })).toBeInTheDocument();
  });
});
