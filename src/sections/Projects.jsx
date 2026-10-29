import { motion as Motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { projectsContent } from '../data/projects.js';

// Fade in and slide up when the element scrolls into view (only once).
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-line"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <Motion.div {...reveal()}>
          <SectionHeading
            id="projects-heading"
            eyebrow={projectsContent.eyebrow}
            title={projectsContent.heading}
            description={projectsContent.description}
          />
        </Motion.div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsContent.projects.map((project, index) => (
            <Motion.li key={project.id} {...reveal(index * 0.1)}>
              <ProjectCard project={project} />
            </Motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Projects;
