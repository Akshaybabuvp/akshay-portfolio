import { motion as Motion } from 'motion/react';
import { Mail } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { contactContent } from '../data/contact.js';
import { contactEmail } from '../services/emailService.js';

// Fade in and slide up when the element scrolls into view (only once).
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-b border-line"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-5 lg:gap-14">
        {/* Left: heading and direct email */}
        <Motion.div {...reveal()} className="lg:col-span-2">
          <SectionHeading
            id="contact-heading"
            eyebrow={contactContent.eyebrow}
            title={contactContent.heading}
            description={contactContent.description}
          />

          {/* Shown only when VITE_CONTACT_EMAIL is set in your .env file */}
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="mt-8 flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/50"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-ink text-accent">
                <Mail size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-[0.15em]">
                  Email
                </span>
                <span className="mt-1 block break-all text-base font-semibold text-white">
                  {contactEmail}
                </span>
              </span>
            </a>
          )}
        </Motion.div>

        {/* Right: the form */}
        <Motion.div {...reveal(0.1)} className="lg:col-span-3">
          <ContactForm />
        </Motion.div>
      </div>
    </section>
  );
}

export default Contact;
