import { motion as Motion, useReducedMotion } from 'motion/react';
import { ArrowDown, Download, FileText } from 'lucide-react';
import GlobeBackground from '../components/GlobeBackground.jsx';
import WavingCharacter from '../components/WavingCharacter.jsx';
import { heroContent } from '../data/hero.js';
import { siteConfig } from '../data/siteConfig.js';

// Small helper: fade in and slide up, with an optional delay
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

// Every letter drops in from above (each from a slightly different height,
// side and angle) and gathers into its place in the paragraph.
// Words stay together, so a word never breaks in the middle of a line.
// With "reduce motion" turned on, the paragraph is simply shown as normal text.
function LetterText({ text, className }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  const words = text.split(' ');

  return (
    // The screen reader reads the whole sentence, not letter by letter.
    <p className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          // Position of this word's first letter in the whole text
          const wordStart =
            words.slice(0, wordIndex).join(' ').length + (wordIndex ? 1 : 0);

          return (
            <span key={`${word}-${wordIndex}`}>
              <span className="inline-block whitespace-nowrap">
                {word.split('').map((letter, letterIndex) => {
                  const n = wordStart + letterIndex;
                  return (
                    <Motion.span
                      key={n}
                      className="inline-block"
                      initial={{
                        opacity: 0,
                        y: -(50 + ((n * 37) % 70)),
                        x: ((n * 53) % 40) - 20,
                        rotate: ((n * 29) % 50) - 25,
                      }}
                      animate={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.4 + n * 0.01,
                        ease: 'easeOut',
                      }}
                    >
                      {letter}
                    </Motion.span>
                  );
                })}
              </span>{' '}
            </span>
          );
        })}
      </span>
    </p>
  );
}

function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-x-clip border-b border-line"
    >
      {/* Dotted globe behind everything. Ripples appear when the pointer touches it. */}
      <GlobeBackground className="-z-10 opacity-50 lg:opacity-90" />

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16">
        {/* Left column: text */}
        <div>
          <Motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-accent"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-accent motion-safe:animate-pulse"
            />
            {heroContent.label}
          </Motion.p>

          <Motion.h1
            id="hero-heading"
            {...fadeUp(0.1)}
            className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-6xl"
          >
            {heroContent.greeting}{' '}
            <span className="text-accent">{heroContent.name}</span>
          </Motion.h1>

          <Motion.p
            {...fadeUp(0.2)}
            className="mt-4 text-xl font-medium text-white/90 sm:text-2xl"
          >
            {heroContent.role}
          </Motion.p>

          <LetterText
            text={heroContent.description}
            className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg"
          />

          <Motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap gap-3">
            <a
              href={heroContent.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110 active:scale-95"
            >
              {heroContent.primaryCta.label}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-white transition hover:border-accent/60 hover:text-accent active:scale-95"
            >
              <FileText size={16} aria-hidden="true" />
              {heroContent.secondaryCtaLabel}
            </a>
          </Motion.div>

          {/* Separate download option */}
          <Motion.div {...fadeUp(0.5)} className="mt-4">
            <a
              href={siteConfig.cvUrl}
              download={siteConfig.cvFileName}
              className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <Download size={16} aria-hidden="true" />
              Download CV (PDF)
            </a>
          </Motion.div>
        </div>

        {/* Right column: waving character */}
        <div className="flex justify-center lg:justify-end">
          <WavingCharacter />
        </div>
      </div>
    </section>
  );
}

export default Hero;
