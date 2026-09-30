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

  const spec = [
    ["role", CONFIG.roles[0]],
    ["now", CONFIG.status],
    ["base", "PH · GMT+8"],
    ["mail", CONFIG.email],
  ];

  return (
    <section
      id="hero"
      onMouseMove={onMouseMove}
      className="min-h-screen flex items-center justify-center relative overflow-x-clip text-center"
    >
      <div ref={glowRef} className="hero-glow" />

      <div className="skew-scroll w-full max-w-[900px] mx-auto px-6 pt-[130px] pb-[84px] flex flex-col items-center">
        {/* Status badge */}
        <div
          className="intro inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-wide text-accent bg-[var(--accent-soft)] border border-accent/40 px-3.5 py-[5px] rounded-[2px] mb-7"
          style={{ animationDelay: "60ms" }}
        >
          <span className="w-[6px] h-[6px] rounded-full bg-accent animate-[pulse-dot_2s_ease-in-out_infinite]" />
          {CONFIG.status}
        </div>

        {/* profile portrait */}
        <div
          className="intro profile-photo-wrap mb-7"
          style={{ animationDelay: "90ms" }}
        >
          <img
            src={CONFIG.profileImage}
            alt={`${CONFIG.name} portrait`}
            className="profile-photo"
          />
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
          className="intro font-display font-bold tracking-[0.01em] leading-[1.05]
            text-[clamp(3rem,11.5vw,6.2rem)] mb-4 min-h-[1.1em] cursor-default select-none"
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
          className="intro flex gap-3.5 flex-wrap items-center justify-center"
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
          className="intro flex flex-wrap justify-center gap-x-5 gap-y-1.5 mt-9 font-mono text-[0.68rem] tracking-wider text-faint"
          style={{ animationDelay: "460ms" }}
        >
          {CONFIG.heroBadges.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>

        {/* spec strip — a hairline ledger, centered like an altar */}
        <div
          className="intro grid grid-cols-2 md:grid-cols-4 w-full max-w-[840px] mt-14 border-y border-border"
          style={{ animationDelay: "520ms" }}
        >
          {spec.map(([k, v], i) => (
            <div
              key={k}
              className={`px-4 py-4 flex flex-col items-center gap-1 border-border
                ${i >= 2 ? "max-md:border-t" : ""} md:border-l md:first:border-l-0`}
            >
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-faint">
                {k}
              </span>
              <span className="text-[0.8rem] font-medium leading-snug break-all">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
