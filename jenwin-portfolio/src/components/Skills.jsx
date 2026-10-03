import { CONFIG } from "../config";
import { Icon } from "../icons";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

const SKILL_MARKS = {
  Figma: "Fg", FigJam: "Fj", Canva: "Ca", "Adobe XD": "Xd",
  Wireframing: "Wf", Prototyping: "Pr", "Visual Design": "Vd", "User Research": "Ur", "Design Systems": "Ds",
  HTML: "<>" , CSS: "#", "UX Principles": "Ux", Accessibility: "A11y",
  Creativity: "✦", "Attention to Detail": "◎", Curiosity: "?", Communication: "↗",
};

function SkillLogo({ name }) {
  return (
    <span className="skill-logo" aria-hidden="true">{SKILL_MARKS[name] || name.slice(0, 2)}</span>
  );
}

export default function Skills() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {CONFIG.skills.map((s, i) => (
        <Reveal key={s.title} delay={(i % 2) * 90} className="h-full">
          <Tilt className="h-full" max={8}>
          <div className="card p-5 h-full transition-[border,box-shadow] duration-300 hover:border-border-hover hover:shadow-[var(--shadow)] group">
            <h3 className="font-mono text-[0.88rem] mb-4 flex items-center gap-3">
              <span className="w-[32px] h-[32px] rounded-[9px] border border-border bg-[var(--accent-soft)]
                flex items-center justify-center text-accent transition-transform duration-300
                group-hover:scale-110 group-hover:border-accent">
                <Icon name={s.icon} className="w-[15px] h-[15px]" />
              </span>
              {s.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {s.items.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.72rem] text-muted bg-bg-soft border border-border
                    px-[8px] py-[5px] rounded-full transition-all inline-flex items-center gap-1.5
                    hover:text-accent hover:border-accent hover:bg-[var(--accent-soft)]"
                >
                  <SkillLogo name={t} />
                  {t}
                </span>
              ))}
            </div>
          </div>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}
