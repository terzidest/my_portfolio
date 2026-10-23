import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('forwards internal-link attributes', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Button to="/projects" aria-label="Browse work">Projects</Button></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'Browse work' })).toHaveAttribute('href', '/projects');
  });

  it('forwards external-link attributes with safe defaults', () => {
    render(<Button href="https://github.com/example" aria-label="GitHub project">GitHub</Button>);
    const link = screen.getByRole('link', { name: 'GitHub project' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps the energy variant layers out of the accessible name', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Button to="/projects" variant="energy">View my projects</Button></MemoryRouter>);
    const link = screen.getByRole('link', { name: 'View my projects' });
    expect(link).toHaveClass('cta-energy');
    expect(link.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
  });

  it('forwards native button attributes', () => {
    render(<Button type="submit" disabled>Submit</Button>);
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });
});
