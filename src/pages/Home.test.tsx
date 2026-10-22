import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from './Home';

describe('Home', () => {
  it('features the three leading projects and ends with a contact CTA', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Home /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument();
    for (const title of ['blockprint', 'EtherealNature', 'InfoVault']) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    expect(screen.queryByRole('heading', { name: 'Stack Game' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', '/contact');
  });
});
