import { describe, expect, it } from 'vitest';
import { CONTACT_LIMITS, parseContactPayload, validateContactValues } from '../../shared/contact';
import type { ContactValues } from '../../shared/contact';

const validValues: ContactValues = {
  name: 'Triantaphilos',
  email: 'triantaphilos@example.com',
  subject: 'Portfolio enquiry',
  message: 'A valid message for the contact form.',
};

describe('contact validation', () => {
  it('accepts valid values at the maximum boundaries', () => {
    const values = {
      name: 'n'.repeat(CONTACT_LIMITS.name),
      email: `${'a'.repeat(CONTACT_LIMITS.email - 12)}@example.com`,
      subject: 's'.repeat(CONTACT_LIMITS.subject),
      message: 'm'.repeat(CONTACT_LIMITS.messageMax),
    };
    expect(validateContactValues(values)).toEqual({});
    expect(parseContactPayload(values)).toEqual(values);
  });

  it('reports required, format, minimum, and maximum errors', () => {
    expect(validateContactValues({ ...validValues, name: ' ' }).name).toBe('Name is required');
    expect(validateContactValues({ ...validValues, name: 'n'.repeat(CONTACT_LIMITS.name + 1) }).name)
      .toContain('or fewer');
    expect(validateContactValues({ ...validValues, email: 'invalid' }).email).toBe('Invalid email address');
    expect(validateContactValues({ ...validValues, email: `${'a'.repeat(CONTACT_LIMITS.email)}@example.com` }).email)
      .toContain('or fewer');
    expect(validateContactValues({ ...validValues, subject: 's'.repeat(CONTACT_LIMITS.subject + 1) }).subject)
      .toContain('or fewer');
    expect(validateContactValues({ ...validValues, message: 'short' }).message)
      .toContain(`at least ${CONTACT_LIMITS.messageMin}`);
    expect(validateContactValues({ ...validValues, message: 'm'.repeat(CONTACT_LIMITS.messageMin) }).message)
      .toBeUndefined();
    expect(validateContactValues({ ...validValues, message: 'm'.repeat(CONTACT_LIMITS.messageMax + 1) }).message)
      .toContain('or fewer');
  });

  it('normalizes an omitted subject and rejects malformed payloads', () => {
    const withoutSubject = {
      name: validValues.name,
      email: validValues.email,
      message: validValues.message,
    };
    expect(parseContactPayload(withoutSubject)?.subject).toBe('');
    expect(parseContactPayload({ ...validValues, email: 42 })).toBeNull();
    expect(parseContactPayload(null)).toBeNull();
  });
});
