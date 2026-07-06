import type { ContactFormValues } from '../types';

/**
 * Validates a contact form
 */
export const validateContactForm = (
  values: ContactFormValues
): Partial<Record<keyof ContactFormValues, string>> => {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  const nameError = validateRequired(values.name, 'Name');
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const messageError =
    validateRequired(values.message, 'Message') ?? validateMinLength(values.message, 10, 'Message');
  if (messageError) errors.message = messageError;

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
