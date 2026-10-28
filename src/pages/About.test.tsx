import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { mockDesktopViewport } from '../test/viewport';
import About from './About';

const renderAbout = () =>
  render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><About /></MemoryRouter>);

describe('About', () => {
  it('opens the current role by default and toggles the others (desktop)', async () => {
    mockDesktopViewport();
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

  it('lists every skill group, practices included (desktop)', () => {
    mockDesktopViewport();
    renderAbout();
    const engineering = screen.getByRole('heading', { name: 'Engineering' }).closest('div')!.parentElement!;
    expect(within(engineering).getByText('SSR')).toBeInTheDocument();
    expect(within(engineering).getByText('Docker')).toBeInTheDocument();
  });

  it('shows one skill group at a time on phones', async () => {
    const user = userEvent.setup();
    renderAbout();
    const frontend = screen.getByRole('tab', { name: 'Frontend' });
    expect(frontend).toHaveAttribute('aria-selected', 'true');
    expect(within(screen.getByRole('tabpanel')).getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Docker')).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Engineering' }));
    const panel = within(screen.getByRole('tabpanel', { name: 'Engineering' }));
    expect(panel.getByText('Docker')).toBeInTheDocument();
    expect(panel.getByText('SSR')).toBeInTheDocument();
    expect(panel.queryByText('React')).not.toBeInTheDocument();

    // Arrow keys move along the tab list and wrap around.
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Engineering' }), { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Frontend' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Frontend' })).toHaveFocus();
  });

  it('opens a role in a sheet on phones and steps through the others', async () => {
    const user = userEvent.setup();
    renderAbout();
    const sheet = () => document.querySelector('dialog')!;
    expect(sheet().open).toBe(false);

    await user.click(screen.getByRole('button', { name: /Frontend Engineer.*Digitech Marketing/ }));
    expect(screen.getByRole('dialog', { name: 'Frontend Engineer' })).toBeInTheDocument();
    expect(within(sheet()).getByText('Current role')).toBeInTheDocument();
    expect(within(sheet()).getByText(/CMS & Page Builder/)).toBeInTheDocument();
    expect(within(sheet()).getByRole('button', { name: '← Previous' })).toBeDisabled();

    await user.click(within(sheet()).getByRole('button', { name: 'Next role →' }));
    expect(screen.getByRole('dialog', { name: 'React & React Native Developer' })).toBeInTheDocument();
    expect(within(sheet()).queryByText('Current role')).not.toBeInTheDocument();

    await user.click(within(sheet()).getByRole('button', { name: 'Next role →' }));
    expect(within(sheet()).getByRole('button', { name: 'Next role →' })).toBeDisabled();

    await user.click(within(sheet()).getByRole('button', { name: 'Close' }));
    expect(sheet().open).toBe(false);
  });

  it('links certifications externally with safe attributes', () => {
    renderAbout();
    const cert = screen.getByRole('link', { name: /React Native Specialization/ });
    expect(cert).toHaveAttribute('target', '_blank');
    expect(cert).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
