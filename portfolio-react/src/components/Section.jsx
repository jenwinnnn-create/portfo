import Reveal from "./Reveal";

/* Editorial two-column section: giant ghost-outline number + sticky
   label rail on the left, content on the right. */
export default function Section({ id, index, title, children }) {
  return (
    <section
      id={id}
      className="py-14 md:py-20 scroll-mt-4 grid md:grid-cols-[190px_1fr] gap-6 md:gap-12"
    >
      {/* sticky editorial label */}
      <Reveal variant="fade-left" className="md:sticky md:top-[100px] self-start">
        <div className="text-stroke font-sans font-extrabold leading-[0.82] select-none
          text-[4.2rem] md:text-[5.4rem]">
          {String(index).padStart(2, "0")}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <span className="rule h-px w-10 bg-accent" />
          <span className="font-mono text-accent text-[0.78rem] tracking-[0.18em] uppercase whitespace-nowrap">
            {id}
          </span>
        </div>
      </Reveal>

      {/* content column */}
      <div className="min-w-0">
        {title && (
          <Reveal variant="clip-up">
            <h2 className="text-[1.6rem] md:text-[2rem] font-bold mb-7 tracking-[-0.02em]">
              {title}
            </h2>
          </Reveal>
        )}
        <div className="skew-scroll">{children}</div>
      </div>
    </section>
  );
}
