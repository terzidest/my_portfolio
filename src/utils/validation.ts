import type { ContactFormValues } from '../types';

/**
 * Validates a contact form
 */
export const validateContactForm = (
  values: ContactFormValues
): Partial<Record<keyof ContactFormValues, string>> => {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.message || values.message.trim() === '') {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};

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
