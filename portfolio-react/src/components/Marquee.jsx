import { useEffect, useRef } from "react";

/* ----------------------------------------------------------------
   Dual kinetic marquee — two word rows scroll in OPPOSITE directions
   (pattern borrowed from the BrewedOps motion library). Both are
   velocity-reactive: fling the page and they tear apart; scroll back
   up and they swap directions.
   Row A: alternating filled / ghost. Row B: all ghost, smaller.
---------------------------------------------------------------- */

const WORDS_A = [
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
const WORDS_B = [
  "kamusta",
  "design student",
  "bone gothic",
  "cinzel",
  "hairlines",
  "razor corners",
  "still learning",
  "no color needed",
];

function WordRow({ words, ghost = false, big = true }) {
  return (
    <div className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span
            className={`font-sans font-extrabold uppercase leading-none
              ${
                big
                  ? "tracking-[-0.02em] text-[clamp(1.4rem,3.5vw,2.2rem)]"
                  : "tracking-[0.04em] text-[clamp(0.95rem,2.2vw,1.5rem)]"
              }
              ${ghost || i % 2 ? "text-stroke" : "text-text"}`}
          >
            {w}
          </span>
          <span
            className={`text-accent font-mono px-5 md:px-7 ${
              big ? "text-[0.85rem]" : "text-[0.7rem]"
            }`}
          >
            //
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const aRef = useRef(null);
  const bRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    let raf;
    let xA = 0;
    let xB = 0;
    let vel = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const loop = (t) => {
      const dt = Math.min(t - lastT, 50);
      lastT = t;

      // smoothed scroll velocity drives both rows, opposite signs
      const y = window.scrollY;
      const instant = ((y - lastY) / Math.max(dt, 1)) * 16.7;
      lastY = y;
      vel += (instant - vel) * 0.08;

      const speed = Math.max(-40, Math.min(40, 1.1 + vel * 0.9));
      xA -= speed;
      xB += speed;

      // seamless wrap over one copy of each row
      const WA = a.scrollWidth / 3 || 1;
      const WB = b.scrollWidth / 3 || 1;
      if (xA <= -WA) xA += WA;
      if (xA > 0) xA -= WA;
      if (xB <= -WB) xB += WB;
      if (xB > 0) xB -= WB;

      a.style.transform = `translateX(${xA}px)`;
      b.style.transform = `translateX(${xB}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="marquee border-y border-border select-none" aria-hidden="true">
      <div className="overflow-hidden pt-5 md:pt-6">
        <div ref={aRef} className="marquee-track">
          <WordRow words={WORDS_A} />
          <WordRow words={WORDS_A} />
          <WordRow words={WORDS_A} />
        </div>
      </div>
      <div className="overflow-hidden pb-5 md:pb-6 pt-2">
        <div ref={bRef} className="marquee-track">
          <WordRow words={WORDS_B} ghost big={false} />
          <WordRow words={WORDS_B} ghost big={false} />
          <WordRow words={WORDS_B} ghost big={false} />
        </div>
      </div>
    </div>
  );
}
