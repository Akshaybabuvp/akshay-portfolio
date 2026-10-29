// Maximum lengths are also applied to the inputs with the maxLength attribute.
export const LIMITS = {
  name: 80,
  email: 120,
  subject: 120,
  messageMin: 10,
  message: 2000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Returns an object like { email: 'message' }. An empty object means "all valid".
// The keys are in form order, so the first key is the first field to fix.
export function validateContactForm(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.name = 'Your name must be at least 2 characters.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address, like name@example.com.';
  }

  if (!subject) {
    errors.subject = 'Please enter a subject.';
  }

  if (!message) {
    errors.message = 'Please write a message.';
  } else if (message.length < LIMITS.messageMin) {
    errors.message = `Your message must be at least ${LIMITS.messageMin} characters.`;
  }

  return errors;
}
