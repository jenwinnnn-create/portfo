import { useEffect, useRef } from "react";

/* ----------------------------------------------------------------
   Velocity marquee — words drift slowly on their own, SPEED UP when
   you fling the page, and REVERSE if you scroll back up.
   Words alternate filled / ghost-outline for an editorial look.
---------------------------------------------------------------- */

const WORDS = [
  "ui/ux",
  "wireframes",
  "figma",
  "prototypes",
  "typography",
  "interfaces",
  "design systems",
  "pixels",
  "empathy",
  "micro-moments",
];

function WordRow() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span
            className={`font-sans font-extrabold uppercase tracking-[-0.02em] leading-none
              text-[clamp(1.4rem,3.5vw,2.2rem)]
              ${i % 2 ? "text-stroke" : "text-text"}`}
          >
            {w}
          </span>
          <span className="text-accent font-mono text-[0.85rem] px-5 md:px-7">//</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    if (!track) return;

    let raf;
    let x = 0;
    let vel = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const loop = (t) => {
      const dt = Math.min(t - lastT, 50);
      lastT = t;

      // scroll velocity, smoothed — this is what makes it feel alive
      const y = window.scrollY;
      const instant = ((y - lastY) / Math.max(dt, 1)) * 16.7;
      lastY = y;
      vel += (instant - vel) * 0.08;

      const speed = Math.max(-40, Math.min(40, 1.1 + vel * 0.9));
      x -= speed;

      // seamless wrap over one copy of the words
      const W = track.scrollWidth / 3 || 1;
      if (x <= -W) x += W;
      if (x > 0) x -= W;

      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="marquee border-y border-border py-5 md:py-6 select-none" aria-hidden="true">
      <div ref={trackRef} className="marquee-track">
        <WordRow />
        <WordRow />
        <WordRow />
      </div>
    </div>
  );
}
