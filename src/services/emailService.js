import emailjs from '@emailjs/browser';

// Vite only exposes variables that start with VITE_ to the browser.
// These are PUBLIC values. Never put a password or private key in them.
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

// Shown on the page as a "write to me directly" link. Empty = hidden.
export const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || '';

export function isEmailConfigured() {
  return Boolean(serviceId && templateId && publicKey);
}

// Always returns { ok: true } or { ok: false, reason }.
// ok is true ONLY when EmailJS itself reports success.
export async function sendContactEmail({ name, email, subject, message }) {
  if (!isEmailConfigured()) {
    return { ok: false, reason: 'not-configured' };
  }

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        // These names must match the {{variables}} in your EmailJS template.
        from_name: name,
        from_email: email,
        reply_to: email,
        subject,
        message,
      },
      {
        publicKey,
        blockHeadless: true, // refuses requests from headless/automated browsers
      },
    );

    return response.status === 200
      ? { ok: true }
      : { ok: false, reason: 'failed' };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('EmailJS error:', error);
    }
    if (error?.status === 429) {
      return { ok: false, reason: 'rate-limited' };
    }
    return { ok: false, reason: 'failed' };
  }
}
