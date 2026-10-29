import { motion as Motion } from 'motion/react';
import { Check, Code, ExternalLink } from 'lucide-react';

// Simple layouts drawn with divs, used when there is no real screenshot yet.
function MockupBody({ variant }) {
  if (variant === 'shop') {
    return (
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2 p-3">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex min-h-0 flex-col rounded-md border border-line bg-surface p-2"
          >
            <div className="min-h-0 flex-1 rounded bg-line/70" />
            <div className="mt-2 h-1.5 w-3/4 rounded bg-white/25" />
            <div className="mt-1.5 flex items-center justify-between">
              <div className="h-1.5 w-1/4 rounded bg-accent/70" />
              <div className="h-3 w-6 rounded-sm bg-accent" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-center gap-2">
          <div className="h-5 flex-1 rounded-md border border-line bg-surface" />
          <div className="h-5 w-12 rounded-md bg-accent" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-1.5">
          {[0, 1, 2, 3, 4].map((row) => (
            <div
              key={row}
              className="flex min-h-0 flex-1 items-center gap-2 rounded-md border border-line bg-surface px-2"
            >
              <div className="h-3 w-3 rounded-full bg-line" />
              <div className="h-1.5 w-1/4 rounded bg-white/25" />
              <div className="h-1.5 w-1/5 rounded bg-line" />
              <div className="ml-auto h-1.5 w-6 rounded bg-accent/70" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: dashboard
  const bars = [40, 65, 50, 80, 60, 90, 70];
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((stat) => (
          <div
            key={stat}
            className="rounded-md border border-line bg-surface p-2"
          >
            <div className="h-1.5 w-1/2 rounded bg-white/25" />
            <div className="mt-2 h-2.5 w-2/3 rounded bg-accent/80" />
          </div>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 items-end gap-1.5 rounded-md border border-line bg-surface p-2">
        {bars.map((height, index) => (
          <div
            key={index}
            style={{ height: `${height}%` }}
            className="flex-1 rounded-sm bg-accent/60"
          />
        ))}
      </div>
    </div>
  );
}

function Thumbnail({ project }) {
  if (project.image) {
    return (
      <div className="aspect-[16/10] overflow-hidden bg-ink">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder preview of ${project.title}`}
      className="relative flex aspect-[16/10] flex-col overflow-hidden bg-ink"
    >
      {/* Browser window bar */}
      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-3 h-3.5 flex-1 rounded-full bg-ink" />
      </div>
      <MockupBody variant={project.mockup} />
      <span className="absolute bottom-2 right-2 rounded bg-ink/85 px-2 py-0.5 text-[10px] font-medium text-muted">
        Illustrative mockup
      </span>
    </div>
  );
}

// A real link when the URL exists, otherwise a clear "Coming soon" label.
function ProjectLink({ href, icon: Icon, label, projectTitle }) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-muted">
        <Icon size={16} aria-hidden="true" />
        {label}
        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
          Coming soon
        </span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} for ${projectTitle} (opens in a new tab)`}
      className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-white transition-colors hover:text-accent"
    >
      <Icon size={16} aria-hidden="true" />
      {label}
    </a>
  );
}

function ProjectCard({ project }) {
  const headingId = `${project.id}-title`;

  return (
    <Motion.article
      aria-labelledby={headingId}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent/50"
    >
      <div className="border-b border-line">
        <Thumbnail project={project} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 id={headingId} className="text-xl font-bold text-white">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed">{project.description}</p>

        {project.features?.length > 0 && (
          <ul className="mt-5 space-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check
                  size={16}
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <ul
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Technologies used"
        >
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-ink px-3 py-1 text-xs font-semibold text-white/90"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* mt-auto keeps the links at the bottom so all cards line up */}
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
          <ProjectLink
            href={project.liveUrl}
            icon={ExternalLink}
            label="Live Demo"
            projectTitle={project.title}
          />
          <ProjectLink
            href={project.githubUrl}
            icon={Code}
            label="GitHub"
            projectTitle={project.title}
          />
        </div>
      </div>
    </Motion.article>
  );
}

export default ProjectCard;
