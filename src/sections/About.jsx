import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion as Motion,
  useReducedMotion,
} from 'motion/react';
import SectionHeading from '../components/SectionHeading.jsx';
import { aboutContent } from '../data/about.js';

// Fade in and slide up when the element scrolls into view (only once).
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.3, delay, ease: 'linear' },
});

// One entrance and exit animation per card: zoom, slide, flip, drop.
const cardMotions = [
  {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.25 },
  },
  {
    initial: { opacity: 0, x: 140 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -140 },
  },
  {
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: 90 },
  },
  {
    initial: { opacity: 0, y: -80 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 80 },
  },
];

const SLIDE_SECONDS = 2.5;

// Shows one value at a time. Every few seconds the next one appears.
function ValuesShowcase({ values }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Move on to the next card after a few seconds.
  // Paused while the mouse is over it or a dot has keyboard focus.
  // With "reduce motion" turned on, the cards do not change by themselves.
  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % values.length);
    }, SLIDE_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [index, paused, prefersReducedMotion, values.length]);

  const { title, description, icon: Icon } = values[index];
  const motionProps = cardMotions[index % cardMotions.length];

  return (
    <div
      role="group"
      aria-label="My values"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="mt-14"
    >
      <div
        className="grid h-60 place-items-center sm:h-52"
        style={{ perspective: 1000 }}
      >
        <AnimatePresence mode="wait">
          <Motion.div
            key={title}
            initial={motionProps.initial}
            animate={motionProps.animate}
            exit={motionProps.exit}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full max-w-xl rounded-2xl border border-accent/40 bg-surface p-7 text-center sm:p-8"
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-line bg-ink text-accent">
              <Icon size={28} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-bold text-white">{title}</h3>
            <p className="mt-2 text-base leading-relaxed">{description}</p>
          </Motion.div>
        </AnimatePresence>
      </div>

      {/* Dots: click one to jump to that value */}
      <div className="mt-2 flex justify-center gap-1">
        {values.map((value, dotIndex) => (
          <button
            key={value.title}
            type="button"
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show ${value.title}`}
            aria-current={dotIndex === index ? 'true' : undefined}
            className="group rounded-full px-1 py-3"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                dotIndex === index
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-line group-hover:bg-muted'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-line"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <Motion.div {...reveal()}>
          <SectionHeading
            id="about-heading"
            eyebrow={aboutContent.eyebrow}
            title={aboutContent.heading}
          />
        </Motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Left: description */}
          <Motion.div
            {...reveal(0.1)}
            className="space-y-5 text-base leading-relaxed sm:text-lg lg:col-span-3"
          >
            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Motion.div>

          {/* Right: information cards */}
          <Motion.dl
            {...reveal(0.2)}
            className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1"
          >
            {aboutContent.infoCards.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/50"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-ink text-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-semibold uppercase tracking-[0.15em]">
                    {label}
                  </dt>
                  <dd className="mt-1 break-words text-base font-semibold text-white">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </Motion.dl>
        </div>

        {/* Personal values: one card at a time */}
        <Motion.div {...reveal(0.1)}>
          <ValuesShowcase values={aboutContent.values} />
        </Motion.div>
      </div>
    </section>
  );
}

export default About;
