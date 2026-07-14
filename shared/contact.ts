export const CONTACT_LIMITS = {
  name: 200,
  email: 200,
  subject: 200,
  messageMin: 10,
  messageMax: 5000,
} as const;

export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validateContactValues = (values: ContactValues): ContactErrors => {
  const errors: ContactErrors = {};

  if (values.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (values.name.length > CONTACT_LIMITS.name) {
    errors.name = `Name must be ${CONTACT_LIMITS.name} characters or fewer`;
  }

  if (values.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (values.email.length > CONTACT_LIMITS.email) {
    errors.email = `Email must be ${CONTACT_LIMITS.email} characters or fewer`;
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.subject.length > CONTACT_LIMITS.subject) {
    errors.subject = `Subject must be ${CONTACT_LIMITS.subject} characters or fewer`;
  }

  if (values.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < CONTACT_LIMITS.messageMin) {
    errors.message = `Message must be at least ${CONTACT_LIMITS.messageMin} characters`;
  } else if (values.message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Message must be ${CONTACT_LIMITS.messageMax} characters or fewer`;
  }

  return errors;
};

export const parseContactPayload = (payload: unknown): ContactValues | null => {
  if (!payload || typeof payload !== 'object') return null;
  const value = payload as Record<string, unknown>;
  if (
    typeof value.name !== 'string' ||
    typeof value.email !== 'string' ||
    (value.subject !== undefined && typeof value.subject !== 'string') ||
    typeof value.message !== 'string'
  ) {
    return null;
  }

  const contact: ContactValues = {
    name: value.name,
    email: value.email,
    subject: value.subject ?? '',
    message: value.message,
  };

  return Object.keys(validateContactValues(contact)).length === 0 ? contact : null;
};
