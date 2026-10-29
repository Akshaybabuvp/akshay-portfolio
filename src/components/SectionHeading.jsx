// Reusable heading for every section: a small lime label above a large title.
function SectionHeading({ id, eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
