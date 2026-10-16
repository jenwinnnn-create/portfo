import { useEffect, useRef, useState } from "react";

/* ----------------------------------------------------------------
   Blueprint grid draw — hairlines engrave themselves onto the page,
   drawing outward from the center, when scrolled into view.
   (Pattern borrowed from the BrewedOps motion library, rebuilt in bone.)
---------------------------------------------------------------- */

const LINES = 17;

export default function BlueprintDraw() {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const mid = (LINES - 1) / 2;

  return (
    <div
      ref={ref}
      className={`blueprint relative py-12 select-none ${drawn ? "on" : ""}`}
      aria-hidden="true"
    >
      <div className="flex justify-center gap-[clamp(10px,2.6vw,26px)] h-[130px]">
        {Array.from({ length: LINES }).map((_, i) => (
          <span
            key={i}
            className="bp-line"
            style={{ transitionDelay: `${Math.abs(i - mid) * 55}ms` }} // center-out draw
          />
        ))}
      </div>
      <div className="bp-caption mt-5 text-center font-mono text-[0.62rem] tracking-[0.3em] uppercase text-faint">
        the plan — still being drawn
      </div>
    </div>
  );
}
