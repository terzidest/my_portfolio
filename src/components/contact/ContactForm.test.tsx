import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ContactForm from './ContactForm';
import { CONTACT_LIMITS } from '../../../shared/contact';

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/Name/), 'Triantaphilos');
  await user.type(screen.getByLabelText(/Email/), 'triantaphilos@example.com');
  await user.type(screen.getByLabelText(/Message/), 'A sufficiently long message.');
};

describe('ContactForm', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('exposes limits and focuses the first invalid field', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const name = screen.getByLabelText(/Name/);
    const email = screen.getByLabelText(/Email/);
    const subject = screen.getByLabelText('Subject');
    const message = screen.getByLabelText(/Message/);

    expect(name).toHaveAttribute('maxlength', String(CONTACT_LIMITS.name));
    expect(email).toHaveAttribute('maxlength', String(CONTACT_LIMITS.email));
    expect(subject).toHaveAttribute('maxlength', String(CONTACT_LIMITS.subject));
    expect(message).toHaveAttribute('maxlength', String(CONTACT_LIMITS.messageMax));

    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription('Name is required');
    expect(email).toHaveAccessibleDescription('Email is required');
    expect(message).toHaveAccessibleDescription('Message is required');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ['network error', () => Promise.reject(new TypeError('offline'))],
    ['HTTP error', () => Promise.resolve(new Response('{}', { status: 500 }))],
  ])('shows the direct-email fallback after a %s', async (_label, response) => {
    fetchMock.mockImplementationOnce(response);
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('something went wrong');
    expect(screen.getByRole('link', { name: 'Email me directly instead.' }))
      .toHaveAttribute('href', 'mailto:terzidest@gmail.com');
  });

  it('announces a successful submission', async () => {
    fetchMock.mockResolvedValueOnce(new Response('{}', { status: 200 }));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByRole('status')).toHaveTextContent('sent successfully');
  });
});
