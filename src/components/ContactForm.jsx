import { useEffect, useRef, useState } from 'react';
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react';
import { contactContent } from '../data/contact.js';
import { contactEmail, sendContactEmail } from '../services/emailService.js';
import { getCooldownSecondsLeft, markMessageSent } from '../utils/cooldown.js';
import { LIMITS, validateContactForm } from '../utils/validation.js';

// "website" is a honeypot: a hidden field that real people never see or fill.
const emptyValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

// A real person needs a few seconds to type. Faster submits look like bots.
const MIN_FILL_TIME_MS = 3000;

const directEmailHint = contactEmail
  ? ` You can also email me directly at ${contactEmail}.`
  : '';

const failureMessages = {
  'not-configured': `The contact form is not set up yet.${directEmailHint}`,
  'rate-limited': 'Too many attempts. Please wait a minute and try again.',
  failed: `Sorry, your message could not be sent. Please try again.${directEmailHint}`,
};

const inputBase =
  'w-full rounded-xl border bg-ink px-4 py-3 text-base text-white transition-colors placeholder:text-muted/80';

function FormField({
  id,
  label,
  error,
  multiline = false,
  counter,
  ...inputProps
}) {
  const errorId = `${id}-error`;
  const Control = multiline ? 'textarea' : 'input';

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-white"
      >
        {label}{' '}
        <span aria-hidden="true" className="text-accent">
          *
        </span>
      </label>
      <Control
        id={id}
        name={id}
        required
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} ${
          error
            ? 'border-red-400'
            : 'border-line hover:border-muted/50 focus:border-accent'
        } ${multiline ? 'min-h-36 resize-y' : ''}`}
        {...inputProps}
      />
      <div className="mt-1.5 flex items-start justify-between gap-4 text-xs">
        {error ? (
          <p id={errorId} className="text-red-300">
            {error}
          </p>
        ) : (
          <span />
        )}
        {counter && <span aria-hidden="true">{counter}</span>}
      </div>
    </div>
  );
}

function ContactForm() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [feedback, setFeedback] = useState('');

  const startedAt = useRef(0);
  const isSendingRef = useRef(false); // blocks double clicks instantly

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const isSending = status === 'sending';

  const showError = (text) => {
    setStatus('error');
    setFeedback(text);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
    if (status === 'success' || status === 'error') {
      setStatus('idle');
      setFeedback('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSendingRef.current) return;
    const form = event.currentTarget;

    // 1. Validate and focus the first invalid field
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setStatus('idle');
      setFeedback('');
      form.elements[firstInvalid]?.focus();
      return;
    }

    // 2. Spam checks
    if (values.website) return; // honeypot filled: a bot. Do nothing.

    if (Date.now() - startedAt.current < MIN_FILL_TIME_MS) {
      showError(
        'That was very fast. Please check your message and send it again.',
      );
      return;
    }

    const secondsLeft = getCooldownSecondsLeft();
    if (secondsLeft > 0) {
      showError(
        `You sent a message a moment ago. Please wait ${secondsLeft} seconds before sending another.`,
      );
      return;
    }

    // 3. Send
    isSendingRef.current = true;
    setStatus('sending');
    setFeedback('');

    const result = await sendContactEmail({
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    });

    isSendingRef.current = false;

    if (result.ok) {
      markMessageSent();
      setValues(emptyValues);
      setErrors({});
      setStatus('success');
      setFeedback(contactContent.successMessage);
    } else {
      showError(failureMessages[result.reason] ?? failureMessages.failed);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSending}
      className="space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="name"
          label="Name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name}
          placeholder="Your name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          maxLength={LIMITS.email}
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>

      <FormField
        id="subject"
        label="Subject"
        type="text"
        autoComplete="off"
        maxLength={LIMITS.subject}
        placeholder="What is this about?"
        value={values.subject}
        onChange={handleChange}
        error={errors.subject}
      />

      <FormField
        id="message"
        label="Message"
        multiline
        rows={6}
        maxLength={LIMITS.message}
        placeholder="Write your message here..."
        value={values.message}
        onChange={handleChange}
        error={errors.message}
        counter={`${values.message.length} / ${LIMITS.message}`}
      />

      {/* Honeypot: hidden from people and screen readers, bots tend to fill it */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100 sm:w-auto"
      >
        {isSending ? (
          <>
            <LoaderCircle
              size={18}
              className="motion-safe:animate-spin"
              aria-hidden="true"
            />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            Send Message
          </>
        )}
      </button>

      {/* Result messages. Success is shown ONLY after EmailJS confirms it. */}
      {status === 'success' && (
        <p
          role="status"
          className="flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-white"
        >
          <CircleCheck
            size={20}
            className="mt-0.5 shrink-0 text-accent"
            aria-hidden="true"
          />
          <span>{feedback}</span>
        </p>
      )}
      {status === 'error' && (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-400/50 bg-red-400/10 p-4 text-sm text-white"
        >
          <CircleAlert
            size={20}
            className="mt-0.5 shrink-0 text-red-300"
            aria-hidden="true"
          />
          <span>{feedback}</span>
        </p>
      )}

      <p className="text-xs">
        Fields marked <span className="text-accent">*</span> are required.
      </p>
    </form>
  );
}

export default ContactForm;
