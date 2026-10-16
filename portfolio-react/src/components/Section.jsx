import Reveal from "./Reveal";

/* Cathedral section — everything rides the central axis:
   ghost number above, symmetric hairline rules flanking the label,
   then the title. Content below, centered in the nave. */
export default function Section({ id, index, title, children }) {
  return (
    <section id={id} className="py-16 md:py-24 scroll-mt-4 text-center">
      <Reveal variant="scale-in">
        <div
          className="text-stroke font-display font-bold leading-[0.82] select-none
            text-[3.6rem] md:text-[4.8rem]"
        >
          {String(index).padStart(2, "0")}
        </div>
        <div className="flex items-center justify-center gap-4 mt-5">
          <span className="rule h-px w-12 md:w-16 bg-border-hover" />
          <span className="font-mono text-accent text-[0.78rem] tracking-[0.3em] uppercase whitespace-nowrap">
            {id}
          </span>
          <span className="rule h-px w-12 md:w-16 bg-border-hover" />
        </div>
      </Reveal>

      {title && (
        <Reveal variant="clip-up">
          <h2 className="text-[1.7rem] md:text-[2.1rem] font-bold mt-5 mb-8 tracking-[-0.02em]">
            {title}
          </h2>
        </Reveal>
      )}
      <div className={`skew-scroll text-left ${title ? "" : "mt-8"}`}>{children}</div>
    </section>
  );
}
