import { motion as Motion } from 'motion/react';
import PeekingBuddy from '../components/PeekingBuddy.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { skillsContent } from '../data/skills.js';

// Fade in and slide up when the element scrolls into view (only once).
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="overflow-x-clip border-b border-line"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <Motion.div {...reveal()}>
          <SectionHeading
            id="skills-heading"
            eyebrow={skillsContent.eyebrow}
            title={skillsContent.heading}
            description={skillsContent.description}
          />
        </Motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {skillsContent.categories.map(
            ({ title, icon: Icon, skills, wide }, index) => (
              <div
                key={title}
                className={`relative ${wide ? 'lg:col-span-2' : ''}`}
              >
                {/* The buddy peeks out of the first box only (index 0).
                  To use another box, change 0 to its number. */}
                {index === 0 && <PeekingBuddy />}

                <Motion.article
                  {...reveal(index * 0.1)}
                  className="relative z-10 rounded-2xl border border-line bg-surface p-6 sm:p-7"
                >
                  <header className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-ink text-accent">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                  </header>

                  <ul
                    className={`mt-6 grid gap-3 sm:grid-cols-2 ${
                      wide ? 'lg:grid-cols-3' : ''
                    }`}
                  >
                    {skills.map((skill) => (
                      <Motion.li
                        key={skill.name}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.15 }}
                        className="group flex items-center gap-3 rounded-xl border border-line bg-ink px-3 py-2.5 transition-colors duration-300 hover:border-accent/50"
                      >
                        <span
                          aria-hidden="true"
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-[11px] font-bold tracking-tight text-accent transition-colors duration-300 group-hover:border-accent/50"
                        >
                          {skill.abbr}
                        </span>
                        <span className="min-w-0 text-sm font-medium text-white/90">
                          {skill.name}
                        </span>
                      </Motion.li>
                    ))}
                  </ul>
                </Motion.article>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default Skills;
