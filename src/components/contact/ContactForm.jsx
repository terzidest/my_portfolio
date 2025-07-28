import { useState } from "react";
import useForm from "../../hooks/useForm";
import { validateContactForm } from "../../utils/validation";
import Button from "../common/Button";

const ContactForm = () => {
  const [submitError, setSubmitError] = useState("");
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const {
    values,
    errors,
    isSubmitting,
    submitted,
    handleChange,
    handleSubmit,
    setSubmitted,
  } = useForm(initialValues, validateContactForm);

  const submitToNetlify = async (formData) => {
    try {
      console.log("Submitting form to Netlify...", formData);

      // Create FormData object for Netlify
      const netlifyFormData = new FormData();
      netlifyFormData.append("form-name", "contact");
      netlifyFormData.append("name", formData.name);
      netlifyFormData.append("email", formData.email);
      netlifyFormData.append(
        "subject",
        formData.subject || "Contact Form Submission"
      );
      netlifyFormData.append("message", formData.message);

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(netlifyFormData).toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Form submitted successfully to Netlify!");
      return response;
    } catch (error) {
      console.error("Netlify Form Error:", error);
      throw new Error(
        "Failed to send message. Please try again or contact us directly."
      );
    }
  };

  const onSubmit = async (formData) => {
    try {
      setSubmitError("");
      await submitToNetlify(formData);
      console.log("Form submitted successfully!");
    } catch (error) {
      setSubmitError(error.message);
      throw error; // Re-throw to let useForm handle the isSubmitting state
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      {submitted ? (
        <div className="rounded-md p-4 mb-6 bg-green-50 text-green-800">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                Thank you! Your message has been sent successfully. We'll get
                back to you soon.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSubmitted(false)}
            >
              Go Back
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {/* Hidden form for Netlify detection */}
          <form name="contact" netlify netlify-honeypot="bot-field" hidden>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="text" name="subject" />
            <textarea name="message"></textarea>
          </form>

          {/* Error Message Display */}
          {submitError && (
            <div className="rounded-md p-4 mb-6 bg-red-50 text-red-800">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{submitError}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
            {/* Honeypot field for spam protection */}
            <input type="hidden" name="form-name" value="contact" />
            <div style={{ display: "none" }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="What is this about?"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={values.message}
                onChange={handleChange}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder="Your message here..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            <div className="text-right">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
