import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const DOT_COUNT = 900;
const RIPPLE_LIFE = 2800; // how long a ripple lasts (milliseconds)
const RIPPLE_SPEED = 0.14; // how fast a ripple spreads (pixels per millisecond). Lower = slower.
const RIPPLE_WIDTH = 70; // thickness of the wave ring (pixels)
const RIPPLE_PUSH = 7; // how far the dots move in the wave (pixels). Lower = calmer.
const MAX_RIPPLES = 6;
const TILT = 0.35; // tilts the globe a little so it looks natural
const ACCENT = '182, 242, 58'; // the lime colour (r, g, b)

// Spreads the dots evenly over a sphere (Fibonacci sphere).
function buildDots() {
  const dots = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < DOT_COUNT; i += 1) {
    const y = 1 - (i / (DOT_COUNT - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    dots.push({ x: Math.cos(theta) * ring, y, z: Math.sin(theta) * ring });
  }
  return dots;
}

// A slowly turning dotted globe. When the pointer touches it, water-like
// ripples spread across the dots. It never blocks clicks (pointer-events-none).
function GlobeBackground({ className = '' }) {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;

    const dots = buildDots();
    const ripples = [];
    const geo = { cx: 0, cy: 0, radius: 0 };
    const lastRipple = { x: -999, y: -999, t: 0 };
    let width = 0;
    let height = 0;
    let angle = 0.6;
    let last = performance.now();
    let frame = 0;
    let running = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!reduceMotion) angle += dt * 0.00012;

      ctx.clearRect(0, 0, width, height);

      const wide = width >= 1024;
      geo.cx = wide ? width * 0.7 : width * 0.5;
      geo.cy = height * 0.5;
      geo.radius = Math.min(height * 0.46, wide ? width * 0.3 : width * 0.46);

      while (ripples.length && now - ripples[0].t > RIPPLE_LIFE)
        ripples.shift();

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);
      ctx.fillStyle = `rgb(${ACCENT})`;

      for (const dot of dots) {
        // Turn the dot around the vertical axis, then tilt it
        const x1 = dot.x * cosA + dot.z * sinA;
        const z1 = -dot.x * sinA + dot.z * cosA;
        const y1 = dot.y * cosT - z1 * sinT;
        const z2 = dot.y * sinT + z1 * cosT;

        let px = geo.cx + x1 * geo.radius;
        let py = geo.cy + y1 * geo.radius;
        const depth = (z2 + 1) / 2; // 0 = back of the globe, 1 = front
        let glow = 0;

        // Water ripples: push dots away from the touch point in a gentle wave
        for (const ripple of ripples) {
          const age = now - ripple.t;
          const front = age * RIPPLE_SPEED;
          const dx = px - ripple.x;
          const dy = py - ripple.y;
          const dist = Math.hypot(dx, dy) || 1;
          const delta = dist - front;
          if (Math.abs(delta) < RIPPLE_WIDTH) {
            const strength =
              (1 - Math.abs(delta) / RIPPLE_WIDTH) * (1 - age / RIPPLE_LIFE);
            const push =
              Math.sin((delta / RIPPLE_WIDTH) * Math.PI * 2) *
              strength *
              RIPPLE_PUSH;
            px += (dx / dist) * push;
            py += (dy / dist) * push;
            glow += strength;
          }
        }

        const size = 0.7 + depth * 1.5 + glow * 1.4;
        ctx.globalAlpha = Math.min(0.08 + depth * 0.5 + glow * 0.5, 1);
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    // A ripple starts only when the pointer touches the globe itself
    const addRipple = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (Math.hypot(x - geo.cx, y - geo.cy) > geo.radius * 1.1) return;

      const now = performance.now();
      const moved = Math.hypot(x - lastRipple.x, y - lastRipple.y);
      if (
        event.type === 'pointermove' &&
        (moved < 40 || now - lastRipple.t < 120)
      )
        return;

      lastRipple.x = x;
      lastRipple.y = y;
      lastRipple.t = now;
      ripples.push({ x, y, t: now });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(performance.now()); // still picture: redraw once
    });
    resizeObserver.observe(canvas);

    let observer;
    if (reduceMotion) {
      draw(performance.now()); // one still picture, no animation
    } else {
      // Only animate while the hero is on screen (saves battery and GPU)
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      });
      observer.observe(canvas);
      window.addEventListener('pointermove', addRipple, { passive: true });
      window.addEventListener('pointerdown', addRipple, { passive: true });
    }

    return () => {
      stop();
      observer?.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', addRipple);
      window.removeEventListener('pointerdown', addRipple);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

export default GlobeBackground;
