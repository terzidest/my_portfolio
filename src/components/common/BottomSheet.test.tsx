import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import BottomSheet from './BottomSheet';

const Harness = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <BottomSheet open={open} onClose={() => setOpen(false)} title="Senior Frontend Engineer" subtitle="Dreamzino">
        <p>Role details</p>
      </BottomSheet>
    </>
  );
};

const sheet = () => document.querySelector('dialog') as HTMLDialogElement;

describe('BottomSheet', () => {
  it('opens, names itself after the title and locks page scroll', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    expect(sheet().open).toBe(false);

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(sheet().open).toBe(true);
    expect(screen.getByRole('dialog', { name: 'Senior Frontend Engineer' })).toBeInTheDocument();
    expect(document.documentElement.style.overflow).toBe('hidden');

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(sheet().open).toBe(false);
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('closes on Esc (cancel) and on a backdrop click', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole('button', { name: 'Open' }));
    fireEvent(sheet(), new Event('cancel', { cancelable: true }));
    expect(sheet().open).toBe(false);

    await user.click(screen.getByRole('button', { name: 'Open' }));
    fireEvent.click(sheet());
    expect(sheet().open).toBe(false);
  });

  it('ignores clicks inside the sheet', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.click(screen.getByText('Role details'));
    expect(sheet().open).toBe(true);
  });
});
