import { CONFIG } from "../config";
import { Icon } from "../icons";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

export default function Skills() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {CONFIG.skills.map((s, i) => (
        <Reveal key={s.title} delay={(i % 2) * 90} className="h-full">
          <Tilt className="h-full" max={8}>
          <div className="card p-5 h-full transition-[border,box-shadow] duration-300 hover:border-border-hover hover:shadow-[var(--shadow)] group">
            <h3 className="font-mono text-[0.88rem] mb-4 flex items-center gap-3">
              <span className="w-[32px] h-[32px] rounded-[2px] border border-border bg-[var(--accent-soft)]
                flex items-center justify-center text-accent transition-transform duration-300
                group-hover:scale-110 group-hover:border-accent">
                <Icon name={s.icon} className="w-[15px] h-[15px]" />
              </span>
              {s.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {s.items.map((t) => {
                const item = typeof t === "string" ? { name: t } : t;
                return (
                  <span
                    key={item.name}
                    className="font-mono text-[0.72rem] text-muted bg-bg-soft border border-border
                      px-[11px] py-[5px] rounded-[2px] transition-all inline-flex items-center gap-[7px]
                      hover:text-accent hover:border-accent hover:bg-[var(--accent-soft)]"
                  >
                    {item.logo && <Icon name={item.logo} className="w-[13px] h-[13px]" />}
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}
