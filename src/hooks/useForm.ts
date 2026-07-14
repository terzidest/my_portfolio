import { useState } from 'react';

type FormErrors<T> = Partial<Record<keyof T, string | null>>;

const useForm = <T extends object>(
  initialValues: T,
  validate?: (values: T) => Partial<Record<keyof T, string>>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value
    }));

    // Clear the field's error as soon as the user edits it.
    setErrors((currentErrors) => currentErrors[name as keyof T]
      ? { ...currentErrors, [name]: null }
      : currentErrors);
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (values: T) => void | Promise<unknown>,
    onInvalid?: (errors: Partial<Record<keyof T, string>>) => void
  ) => {
    e.preventDefault();

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        onInvalid?.(validationErrors);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      await onSubmit(values);
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    submitted,
    handleChange,
    handleSubmit,
    setSubmitted
  };
};

export default useForm;
