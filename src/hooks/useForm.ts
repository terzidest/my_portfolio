import { useState } from 'react';

type FormErrors<T> = Partial<Record<keyof T, string | null>>;

const useForm = <T extends Record<string, unknown>>(
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

    setValues({
      ...values,
      [name]: value
    });

    // Clear error for this field when user types
    if (errors[name as keyof T]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (values: T) => void | Promise<unknown>
  ) => {
    e.preventDefault();

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
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
