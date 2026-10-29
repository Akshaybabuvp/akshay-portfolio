import { useEffect, useRef, useState } from 'react';
// "Motion" is written with a capital M on purpose: this project's lint rule
// ignores capitalized names, so <Motion.div> passes `npm run lint`.
import { AnimatePresence, motion as Motion } from 'motion/react';
import { FileText, Menu, X } from 'lucide-react';
import { navLinks } from '../data/navigation';
import { siteConfig } from '../data/siteConfig';
import { useActiveSection } from '../utils/useActiveSection';

const sectionIds = navLinks.map((link) => link.id);

// The one and only CV button. It stays in the top bar on every screen size.
function CvButton() {
  return (
    <a
      href={siteConfig.cvUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-xs font-semibold text-ink transition hover:brightness-110 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
    >
      <FileText size={16} aria-hidden="true" className="hidden sm:block" />
      View My CV
    </a>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const activeId = useActiveSection(sectionIds);

  const closeMenu = () => setMenuOpen(false);

  // Add a border and blur once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Escape closes the mobile menu and returns focus to the toggle button
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // If the screen grows to desktop size, close the mobile menu
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? 'border-line bg-ink/85 backdrop-blur-md'
          : 'border-transparent bg-ink'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          aria-label={`${siteConfig.fullName}, back to top`}
          className="flex items-center gap-2 rounded-lg sm:gap-3"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-sm font-extrabold text-accent">
            {siteConfig.monogram}
          </span>
          <span className="text-sm font-bold tracking-[0.2em] text-white">
            {siteConfig.name}
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-muted hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <Motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <CvButton />

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-white transition hover:border-accent/60 md:hidden"
          >
            {menuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu: links only. The CV button stays in the top bar. */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-line md:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto max-w-6xl px-4 pb-5 pt-3 sm:px-6"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeId === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={closeMenu}
                        aria-current={isActive ? 'location' : undefined}
                        className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-surface text-accent'
                            : 'text-muted hover:bg-surface hover:text-white'
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
