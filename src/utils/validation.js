/**
 * Validates a contact form
 * @param {Object} values - Form values
 * @returns {Object} - Validation errors
 */
export const validateContactForm = (values) => {
  const errors = {};
  
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
 * @param {string} value - Value to check
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} - Error message or null
 */
export const validateRequired = (value, fieldName) => {
  return !value || value.trim() === '' 
    ? `${fieldName} is required` 
    : null;
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {string|null} - Error message or null
 */
export const validateEmail = (email) => {
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
 * @param {string} value - Value to check
 * @param {number} minLength - Minimum allowed length
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} - Error message or null
 */
export const validateMinLength = (value, minLength, fieldName) => {
  return !value || value.trim().length < minLength
    ? `${fieldName} must be at least ${minLength} characters`
    : null;
};