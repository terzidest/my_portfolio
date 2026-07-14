import { validateContactValues } from '../../shared/contact';
import type { ContactFormValues } from '../types';

/**
 * Validates a contact form
 */
export const validateContactForm = (
  values: ContactFormValues
): Partial<Record<keyof ContactFormValues, string>> => validateContactValues(values);

/**
 * Validates a string is not empty
 */
export const validateRequired = (value: string, fieldName: string): string | null => {
  return !value || value.trim() === ''
    ? `${fieldName} is required`
    : null;
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return 'Invalid email address';
  }

  return null;
};

/**
 * Validates minimum length
 */
export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string
): string | null => {
  return !value || value.trim().length < minLength
    ? `${fieldName} must be at least ${minLength} characters`
    : null;
};
