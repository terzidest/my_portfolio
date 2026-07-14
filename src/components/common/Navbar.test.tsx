import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';

const RouteChanger = () => {
  const navigate = useNavigate();
  return <button type="button" onClick={() => navigate('/about')}>Change route</button>;
};

describe('Navbar', () => {
  it('marks project detail routes as part of Projects', () => {
    render(<MemoryRouter initialEntries={['/projects/stack-game']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Navbar /></MemoryRouter>);
    const projectLinks = screen.getAllByRole('link', { name: 'Projects' });
    expect(projectLinks).toHaveLength(1);
    projectLinks.forEach((link) => expect(link).toHaveAttribute('aria-current', 'page'));
  });

  it('reports menu state and closes on Escape or route changes', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
        <RouteChanger />
      </MemoryRouter>,
    );
    const toggle = screen.getByRole('button', { name: 'Toggle menu' });

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-navigation');
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    await user.click(screen.getByRole('button', { name: 'Change route' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
