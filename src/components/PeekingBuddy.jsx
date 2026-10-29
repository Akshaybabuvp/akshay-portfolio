import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion as Motion, useInView, useReducedMotion } from 'motion/react';

// The story, step by step. "ms" is how long each step lasts before the next.
//   none = hiding behind the box, top = peeking over the top edge,
//   side = peeking out from the right side (big screens only).
const STEPS = [
  { where: 'none', ms: 2500 },
  { where: 'top', ms: 2600 }, // slides up, looks around for about 2 seconds
  { where: 'none', ms: 3000 },
  { where: 'side', ms: 2600 },
  { where: 'none', ms: 3500 },
];

// The side peek needs empty space beside the box, so it is used only on big
// screens. On phones and tablets the buddy peeks from the top only.
const WIDE_QUERY = '(min-width: 1280px)';

function subscribe(callback) {
  const media = window.matchMedia(WIDE_QUERY);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
const getSnapshot = () => window.matchMedia(WIDE_QUERY).matches;
const getServerSnapshot = () => false;

function BuddyFace({ looking }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" focusable="false">
      {/* Antenna and ears */}
      <line
        x1="32"
        y1="14"
        x2="32"
        y2="6"
        stroke="#b6f23a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="32" cy="5" r="3.5" fill="#b6f23a" />
      <circle cx="6" cy="38" r="4" fill="#9fd32f" />
      <circle cx="58" cy="38" r="4" fill="#9fd32f" />

      {/* Head and dark face plate */}
      <rect x="6" y="14" width="52" height="46" rx="16" fill="#b6f23a" />
      <rect x="12" y="21" width="40" height="28" rx="11" fill="#0b0b0c" />

      {/* Eyes: the pupils look left and right while the buddy is peeking */}
      <circle cx="24" cy="34" r="7" fill="#ffffff" />
      <circle cx="40" cy="34" r="7" fill="#ffffff" />
      <Motion.g
        animate={
          looking
            ? { x: [0, -2.5, 2.5, -1, 0], y: [0, 1, 1, 0, 0] }
            : { x: 0, y: 0 }
        }
        transition={
          looking
            ? { duration: 2, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }
            : { duration: 0.2 }
        }
      >
        <circle cx="24" cy="34" r="3.2" fill="#0b0b0c" />
        <circle cx="40" cy="34" r="3.2" fill="#0b0b0c" />
      </Motion.g>

      {/* Smile */}
      <path
        d="M27 43 Q32 47 37 43"
        fill="none"
        stroke="#b6f23a"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// One buddy. It sits BEHIND the box (z-0), so when it slides down the box
// hides it. edge="top" peeks over the top edge, edge="right" out of the side.
function Buddy({ edge, active, className }) {
  const isSide = edge === 'right';
  const hidden = isSide ? { x: -60 } : { y: 60 };
  const shown = isSide ? { x: -14 } : { y: 14 };

  return (
    <Motion.div
      aria-hidden="true"
      initial={hidden}
      animate={active ? shown : hidden}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className={`pointer-events-none absolute z-0 h-14 w-14 ${
        isSide ? 'left-full' : 'bottom-full'
      } ${className}`}
    >
      <div className={`h-full w-full ${isSide ? 'rotate-90' : ''}`}>
        <BuddyFace looking={active} />
      </div>
    </Motion.div>
  );
}

// Put this inside a parent that has "relative". The box itself needs
// "relative z-10" and a solid background, so it covers the hiding buddy.
function PeekingBuddy() {
  const anchorRef = useRef(null);
  const inView = useInView(anchorRef, { margin: '-80px' });
  const reduceMotion = useReducedMotion();
  const isWide = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [step, setStep] = useState(0);

  // Move to the next step after a few seconds.
  // Pauses while the box is off screen (saves battery).
  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    const timer = setTimeout(() => {
      setStep((current) => (current + 1) % STEPS.length);
    }, STEPS[step].ms);
    return () => clearTimeout(timer);
  }, [step, inView, reduceMotion]);

  // It is only decoration, so it is not shown when "reduce motion" is on.
  if (reduceMotion) return null;

  const where = STEPS[step].where;

  return (
    <>
      <div
        ref={anchorRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      {isWide ? (
        <>
          {/* Big screens: one peek over the top, one out of the side */}
          <Buddy edge="top" active={where === 'top'} className="right-24" />
          <Buddy edge="right" active={where === 'side'} className="top-24" />
        </>
      ) : (
        // Phones and tablets: the top only, both times
        <Buddy
          edge="top"
          active={where === 'top' || where === 'side'}
          className="right-8 sm:right-24"
        />
      )}
    </>
  );
}

export default PeekingBuddy;
