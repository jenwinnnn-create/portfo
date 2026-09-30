import { useRef } from "react";
import { CONFIG } from "../config";
import { Icon } from "../icons";
import { useScramble } from "../hooks/useScramble";
import { useTyping } from "../hooks/useTyping";
import Magnetic from "./Magnetic";

export default function Hero() {
  const { chars, replay } = useScramble(CONFIG.name, 400);
  const typed = useTyping(CONFIG.roles);
  const glowRef = useRef(null);

  /* The ambient glow leans gently toward the cursor */
  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${x * 70}px, ${y * 46}px)`;
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={onMouseMove}
      className="min-h-screen flex items-center relative overflow-x-clip"
    >
      <div ref={glowRef} className="hero-glow" />

      <div className="skew-scroll w-full max-w-[1120px] mx-auto px-6 md:px-10 pt-[120px] pb-[80px]">
        <div className="grid md:grid-cols-[1fr_250px] items-center gap-12 md:gap-10">
          {/* ---- the statement column ---- */}
          <div>
            {/* Status badge */}
            <div
              className="intro inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-wide text-accent bg-[var(--accent-soft)] border border-accent/40 px-3.5 py-[5px] rounded-full mb-7"
              style={{ animationDelay: "60ms" }}
            >
              <span className="w-[6px] h-[6px] rounded-full bg-accent animate-[pulse-dot_2s_ease-in-out_infinite]" />
              {CONFIG.status}
            </div>

            <p
              className="intro font-mono text-muted text-[0.9rem] mb-3"
              style={{ animationDelay: "120ms" }}
            >
              <span className="text-accent2">$</span> kamusta, I am
            </p>

            {/* Scramble-decrypted name — hover to re-scramble */}
            <h1
              onMouseEnter={replay}
              title="hey."
              className="intro font-sans font-extrabold tracking-[-0.035em] leading-[1.02]
                text-[clamp(2.9rem,10vw,5.4rem)] mb-4 min-h-[1.05em] cursor-default select-none"
              style={{ animationDelay: "190ms" }}
            >
              {chars.map((c, i) =>
                c.glitch ? (
                  <span key={i} className="text-accent">
                    {c.ch}
                  </span>
                ) : (
                  <span key={i}>{c.ch}</span>
                )
              )}
            </h1>

            {/* Typewriter roles */}
            <div
              className="intro font-mono text-[clamp(1.05rem,3.5vw,1.45rem)] text-muted mb-[22px] min-h-[1.5em]"
              style={{ animationDelay: "260ms" }}
            >
              <span className="text-accent">{typed}</span>
              <span className="inline-block w-[9px] h-[1.05em] bg-accent align-[text-bottom] ml-[3px] animate-[blink_1s_step-end_infinite]" />
            </div>

            <p
              className="intro text-muted max-w-[560px] mb-10 text-[1rem] leading-[1.75]"
              style={{ animationDelay: "330ms" }}
            >
              {CONFIG.heroDescription}
            </p>

            <div
              className="intro flex gap-3.5 flex-wrap items-center"
              style={{ animationDelay: "400ms" }}
            >
              <Magnetic>
                <a href="#about" className="btn btn-primary">
                  $ about_me
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn btn-outline">
                  $ get_in_touch
                </a>
              </Magnetic>
            </div>

            {/* quiet stack line */}
            <div
              className="intro flex flex-wrap gap-x-5 gap-y-1.5 mt-10 font-mono text-[0.68rem] tracking-wider text-faint"
              style={{ animationDelay: "460ms" }}
            >
              {CONFIG.heroBadges.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </div>

          {/* ---- the spec sheet ---- */}
          <aside
            className="intro hidden md:flex flex-col border border-border rounded-[14px] bg-card divide-y divide-border"
            style={{ animationDelay: "520ms" }}
          >
            {[
              ["role", CONFIG.roles[0]],
              ["now", CONFIG.status],
              ["base", "PH · GMT+8"],
              ["mail", CONFIG.email],
            ].map(([k, v]) => (
              <div key={k} className="px-5 py-4 flex flex-col gap-1">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-faint">
                  {k}
                </span>
                <span className="text-[0.8rem] font-medium leading-snug break-all">{v}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>

      {/* vertical editorial rail */}
      <div
        className="intro hidden xl:block absolute right-7 top-1/2 -translate-y-1/2
          font-mono text-[0.6rem] tracking-[0.35em] text-faint uppercase [writing-mode:vertical-rl]"
        style={{ animationDelay: "640ms" }}
      >
        jenwin — portfolio © 2026
      </div>
    </section>
  );
}
