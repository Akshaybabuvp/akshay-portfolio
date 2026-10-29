import { motion as Motion } from 'motion/react';
import { getWhatsAppUrl } from '../data/siteConfig.js';
import { WhatsAppIcon } from './BrandIcons.jsx';

function WhatsAppButton() {
  return (
    <Motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Akshay on WhatsApp (opens in a new tab)"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 sm:right-6 sm:h-16 sm:w-16"
    >
      {/* Pulse ring: grows outward and fades, repeatedly */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping"
      />

      {/* Vibrate: a quick shake, then a rest of 3 seconds, then again */}
      <Motion.span
        aria-hidden="true"
        className="relative grid place-items-center"
        animate={{ rotate: [0, -14, 12, -10, 8, -4, 0] }}
        transition={{
          duration: 0.9,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <WhatsAppIcon size={28} />
      </Motion.span>

      {/* Small label on larger screens (the aria-label already names the button) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
      >
        Chat on WhatsApp
      </span>
    </Motion.a>
  );
}

export default WhatsAppButton;
