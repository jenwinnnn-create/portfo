import { CONFIG } from "../config";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <div className="flex flex-col gap-4">
      {CONFIG.education.map((item, i) => (
        <Reveal key={item.school} delay={(i % 2) * 90}>
          <article className="card p-5 md:p-6 transition-all duration-300 hover:border-border-hover hover:-translate-y-[3px] hover:shadow-[var(--shadow)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 min-w-12 rounded-full border border-border bg-[var(--accent-soft)] flex items-center justify-center font-mono font-bold text-accent">{item.mark}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="text-[1.02rem] font-bold leading-tight">{item.school}</h3>
                    <p className="text-accent font-semibold text-[0.88rem]">{item.program}</p>
                  </div>
                  <span className="font-mono text-[0.72rem] text-faint whitespace-nowrap">{item.date}</span>
                </div>
                <p className="text-muted text-[0.88rem] mt-3">{item.level}</p>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
