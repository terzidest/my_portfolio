import { useRef, useState } from 'react';
import useForm from '../../hooks/useForm';
import { validateContactForm } from '../../utils/validation';
import Button from '../common/Button';
import type { ContactFormValues } from '../../types';
import { CONTACT_LIMITS } from '../../../shared/contact';
import { EMAIL } from '../../data/contact';
import type { ContactErrors } from '../../../shared/contact';

const SUBMIT_ERROR = 'Sorry, something went wrong sending your message.';

const labelClass = 'mb-2 block text-sm font-medium text-ink-soft';
const fieldBase =
  'block w-full rounded-[14px] border border-line/20 bg-ground/60 px-4 py-3.5 text-base text-ink placeholder:text-ink-muted outline-none transition-[border-color,box-shadow] duration-200 focus:border-neon/90 focus:shadow-[0_0_0_1px_rgb(var(--neon)/0.7),0_0_18px_rgb(var(--neon)/0.4)]';
const fieldError = 'border-red-500 dark:border-red-400';

const ContactForm = () => {
  const initialValues: ContactFormValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const {
    values,
    errors,
    isSubmitting,
    submitted,
    handleChange,
    handleSubmit,
    setSubmitted
  } = useForm<ContactFormValues>(initialValues, validateContactForm);

  const [submitError, setSubmitError] = useState<string | null>(null);
  // Honeypot: hidden field humans don't see but bots will fill. The function
  // silently drops submissions where this is non-empty.
  const [honeypot, setHoneypot] = useState('');
  const fieldRefs = useRef<Partial<Record<keyof ContactFormValues, HTMLElement | null>>>({});

  const focusFirstInvalidField = (validationErrors: ContactErrors) => {
    const firstInvalid = (['name', 'email', 'subject', 'message'] as const).find(
      (field) => validationErrors[field],
    );
    if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
  };

  const onSubmit = async (formData: ContactFormValues) => {
    setSubmitError(null);
    try {
      const response = await fetch('/.netlify/functions/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: honeypot })
      });
      if (!response.ok) throw new Error(`send-contact failed: ${response.status}`);
    } catch (error) {
      setSubmitError(SUBMIT_ERROR);
      throw error;
    }
  };

  return (
    <div className="glass rounded-[22px] border border-line/20 px-[18px] py-[22px] shadow-[0_30px_80px_rgb(0_0_0/0.25)] sm:p-9 md:rounded-[26px]">
      {submitted ? (
        <div role="status" className="rounded-md p-4 mb-6 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Thank you! Your message has been sent successfully.</p>
            </div>
          </div>
          <div className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </Button>
          </div>
        </div>
      ) : (
        <form noValidate onSubmit={(e) => handleSubmit(e, onSubmit, focusFirstInvalidField)}>
          {/* Phones: the form follows the quick actions, so it gets its own heading. */}
          <h2 className="mb-4 font-display text-[20px] font-bold text-ink md:hidden">Send a message</h2>
          {/* Honeypot: positioned off-screen so humans never see it.
              tabIndex/autoComplete/aria-hidden keep keyboard, password
              managers and screen readers from touching it either. */}
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <label>
              Leave this field empty
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
          </div>
          {submitError && (
            <div role="alert" className="rounded-md p-4 mb-6 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M12 19a7 7 0 110-14 7 7 0 010 14z" />
                  </svg>
                </div>
                <p className="ml-3 text-sm font-medium">
                  {submitError}{' '}
                  <a href={`mailto:${EMAIL}`} className="underline hover:no-underline">
                    Email me directly instead.
                  </a>
                </p>
              </div>
            </div>
          )}
          <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Name <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                ref={(element) => { fieldRefs.current.name = element; }}
                value={values.name}
                onChange={handleChange}
                required
                maxLength={CONTACT_LIMITS.name}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`${fieldBase} ${
                  errors.name ? fieldError : ''
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                ref={(element) => { fieldRefs.current.email = element; }}
                value={values.email}
                onChange={handleChange}
                required
                maxLength={CONTACT_LIMITS.email}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`${fieldBase} ${
                  errors.email ? fieldError : ''
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="subject" className={labelClass}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              ref={(element) => { fieldRefs.current.subject = element; }}
              value={values.subject}
              onChange={handleChange}
              maxLength={CONTACT_LIMITS.subject}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              className={`${fieldBase} ${
                errors.subject ? fieldError : ''
              }`}
              placeholder="What is this about?"
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="message" className={labelClass}>
              Message <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              ref={(element) => { fieldRefs.current.message = element; }}
              rows={5}
              value={values.message}
              onChange={handleChange}
              required
              maxLength={CONTACT_LIMITS.messageMax}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`${fieldBase} ${
                errors.message ? fieldError : ''
              }`}
              placeholder="Your message here..."
            ></textarea>
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink-muted max-md:hidden">
              Or email me directly at{' '}
              <a href={`mailto:${EMAIL}`} className="text-link hover:text-link-hover">{EMAIL}</a>
            </p>
            <Button
              type="submit"
              variant="energy"
              size="lg"
              className="max-md:w-full"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : 'Send message'}
            </Button>
            <span className="sr-only" role="status" aria-live="polite">
              {isSubmitting ? 'Sending message' : ''}
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
