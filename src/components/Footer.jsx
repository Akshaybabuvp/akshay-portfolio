import { Mail, MapPin, Phone } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './BrandIcons.jsx';
import { getWhatsAppUrl, siteConfig } from '../data/siteConfig.js';
import { profile } from '../data/profile.js';
import { contactEmail } from '../services/emailService.js';

// Only show WhatsApp in the footer when a real number has been entered.
const hasWhatsApp = /^\d{10,15}$/.test(siteConfig.whatsapp.number);

// Each item is shown only when its value is filled in. Nothing is invented.
const contactItems = [
  contactEmail && {
    label: 'Email',
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: Mail,
  },
  profile.phone && {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^\d+]/g, '')}`,
    icon: Phone,
  },
  profile.location && {
    label: 'Location',
    value: profile.location,
    icon: MapPin,
  },
].filter(Boolean);

const socialLinks = [
  profile.github && { label: 'GitHub', href: profile.github, icon: GitHubIcon },
  profile.linkedin && {
    label: 'LinkedIn',
    href: profile.linkedin,
    icon: LinkedInIcon,
  },
  hasWhatsApp && {
    label: 'WhatsApp',
    href: getWhatsAppUrl(),
    icon: WhatsAppIcon,
  },
].filter(Boolean);

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <a
            href="#home"
            aria-label={`${siteConfig.fullName}, back to top`}
            className="inline-flex items-center gap-3 rounded-lg"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-sm font-extrabold text-accent">
              {siteConfig.monogram}
            </span>
            <span className="text-sm font-bold tracking-[0.2em] text-white">
              {siteConfig.name}
            </span>
          </a>
          <p className="mt-4 text-sm">Designed and built with React.</p>
        </div>

        {/* Contact details */}
        {contactItems.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              {contactItems.map(({ label, value, href, icon: Icon }) => (
                <li key={label} className="flex items-start gap-3 text-sm">
                  <Icon
                    size={18}
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{label}: </span>
                  {href ? (
                    <a
                      href={href}
                      className="break-all rounded transition-colors hover:text-accent"
                    >
                      {value}
                    </a>
                  ) : (
                    <span>{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Social links */}
        {socialLinks.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Find me online
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                  >
                    <Icon size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom bar. Extra bottom padding on phones keeps the floating
          WhatsApp button from covering the text. */}
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 pb-24 pt-6 text-sm sm:pb-6">
          &copy; {year} {siteConfig.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
