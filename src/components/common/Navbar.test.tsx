import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';
import MobileDock from './MobileDock';

const renderAt = (path: string, ui: JSX.Element) =>
  render(<MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{ui}</MemoryRouter>);

describe('Navbar', () => {
  it('marks project detail routes as part of Projects', () => {
    renderAt('/projects/stack-game', <Navbar />);
    const projectLinks = screen.getAllByRole('link', { name: 'Projects' });
    expect(projectLinks).toHaveLength(1);
    projectLinks.forEach((link) => expect(link).toHaveAttribute('aria-current', 'page'));
  });

  it('has no hamburger menu; phones use the dock instead', () => {
    renderAt('/', <Navbar />);
    expect(screen.queryByRole('button', { name: 'Toggle menu' })).not.toBeInTheDocument();
  });
});

describe('MobileDock', () => {
  it('links every page, with Contact in the middle slot', () => {
    renderAt('/projects/blockprint', <MobileDock />);
    const dock = within(screen.getByRole('navigation', { name: 'Mobile' }));

    const links = dock.getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/', '/about', '/contact', '/projects']);
    expect(dock.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
    expect(dock.getByRole('link', { name: 'Contact' })).not.toHaveAttribute('aria-current');
    expect(dock.getByRole('button', { name: 'Top' })).toBeInTheDocument();
  });
});
