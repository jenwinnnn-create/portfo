import { CONFIG } from "../config";
import Reveal from "./Reveal";

/* Education ledger — schools in hairline rows: years left, story right. */
export default function Education() {
  return (
    <div className="max-w-[760px] mx-auto">
      {CONFIG.education.map((e, i) => (
        <Reveal key={e.school} delay={i * 90}>
          <div
            className="group grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-8 py-7 px-3 -mx-3
              border-t border-border last:border-b items-baseline text-left
              transition-colors duration-300 hover:bg-[var(--accent-soft)]"
          >
            <div className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-faint">
              {e.years}
            </div>
            <div>
              <h3 className="text-[1.08rem] font-bold flex items-center gap-3 flex-wrap">
                {e.school}
                {e.current && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] font-normal uppercase tracking-[0.18em] text-accent">
                    <span className="w-[5px] h-[5px] rounded-full bg-accent animate-[pulse-dot_2s_ease-in-out_infinite]" />
                    current
                  </span>
                )}
              </h3>
              {e.long && <p className="text-muted text-[0.82rem] mt-1">{e.long}</p>}
              <p className="font-mono text-[0.75rem] text-accent2 mt-1.5">{e.program}</p>
              {e.detail && <p className="text-faint text-[0.76rem] mt-0.5">{e.detail}</p>}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
