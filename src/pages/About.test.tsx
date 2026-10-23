import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import About from './About';

const renderAbout = () =>
  render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><About /></MemoryRouter>);

describe('About', () => {
  it('opens the current role by default and toggles the others', async () => {
    const user = userEvent.setup();
    renderAbout();

    const current = screen.getByRole('button', { name: /Frontend Engineer · Digitech Marketing/ });
    const freelance = screen.getByRole('button', { name: /React & React Native Developer · Freelance/ });
    expect(current).toHaveAttribute('aria-expanded', 'true');
    expect(freelance).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText(/CMS & Page Builder/)).toBeVisible();

    await user.click(freelance);
    expect(freelance).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById(freelance.getAttribute('aria-controls')!)).toBeVisible();

    await user.click(current);
    expect(current).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText(/CMS & Page Builder/)).not.toBeVisible();
  });

  it('lists every skill group, practices included', () => {
    renderAbout();
    const engineering = screen.getByRole('heading', { name: 'Engineering' }).closest('div')!.parentElement!;
    expect(within(engineering).getByText('SSR')).toBeInTheDocument();
    expect(within(engineering).getByText('Docker')).toBeInTheDocument();
  });

  it('links certifications externally with safe attributes', () => {
    renderAbout();
    const cert = screen.getByRole('link', { name: /React Native Specialization/ });
    expect(cert).toHaveAttribute('target', '_blank');
    expect(cert).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
