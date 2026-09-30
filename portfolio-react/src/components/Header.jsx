import { useEffect, useRef, useState } from "react";
import { CONFIG } from "../config";
import { Icon } from "../icons";
import { useScramble } from "../hooks/useScramble";
import { scrollToSection, getLenis } from "../lib/scroll";

/* ----------------------------------------------------------------
   Top bar + burger → full-screen overlay menu with oversized type.
   One navigation for every screen size.
---------------------------------------------------------------- */

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

function Logo({ onNavigate }) {
  const { chars, replay } = useScramble("~/JENWIN$", 250);
  return (
    <button
      onClick={() => onNavigate("hero")}
      onMouseEnter={replay}
      className="font-mono font-bold text-[0.95rem] text-text tracking-tight cursor-pointer text-left"
      title="back to top"
    >
      {chars.map((c, i) =>
        c.glitch ? (
          <span key={i} className="text-accent2">
            {c.ch}
          </span>
        ) : (
          <span
            key={i}
            className={c.ch === "~" || c.ch === "/" || c.ch === "$" ? "text-accent" : undefined}
          >
            {c.ch}
          </span>
        )
      )}
      <span className="inline-block w-[8px] h-[1em] bg-accent align-[-3px] ml-[3px] animate-[blink_1s_step-end_infinite]" />
    </button>
  );
}

function ThemeButton({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className={`relative w-[46px] h-[46px] rounded-[12px] bg-card border border-border text-text
        overflow-hidden transition-colors duration-300 hover:border-accent cursor-pointer`}
    >
      <Icon
        name="sun"
        className={`absolute inset-0 m-auto w-[18px] h-[18px] transition-all duration-[450ms] ${EASE}
          ${theme === "dark" ? "opacity-0 rotate-[90deg] scale-50" : "opacity-100 rotate-0 scale-100"}`}
      />
      <Icon
        name="moon"
        className={`absolute inset-0 m-auto w-[18px] h-[18px] transition-all duration-[450ms] ${EASE}
          ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-[-90deg] scale-50"}`}
      />
    </button>
  );
}

/* hamburger → ✕ : generous pill with an explicit menu/close label */
function Burger({ open, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className={`group relative h-[46px] px-4 rounded-[12px] border flex items-center gap-2.5
        transition-colors duration-300 cursor-pointer
        ${open ? "bg-accent border-accent text-[var(--on-accent)]" : "bg-card border-border text-text hover:border-accent"}`}
    >
      <span className="relative block w-[18px] h-[12px]">
        <span
          className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-current
            transition-all duration-[450ms] ${EASE}
            ${open ? "translate-y-[5px] rotate-[45deg]" : ""}`}
        />
        <span
          className={`absolute left-0 bottom-0 h-[2px] rounded-full bg-current
            transition-all duration-[450ms] ${EASE}
            ${open ? "w-full -translate-y-[5px] -rotate-45" : "w-[65%] group-hover:w-full"}`}
        />
      </span>
      <span className="font-mono text-[0.72rem] tracking-[0.16em] uppercase leading-none">
        {open ? "close" : "menu"}
      </span>
    </button>
  );
}

export default function Header({ sections, theme, onToggleTheme }) {
  const items = [{ id: "hero" }, ...sections];
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const progressRef = useRef(null);
  const ticking = useRef(false);

  /* ---------- scroll-spy + top progress hairline ---------- */
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        let current = "hero";
        for (const s of items) {
          const el = document.getElementById(s.id);
          if (el && window.scrollY >= el.offsetTop - 220) current = s.id;
        }
        setActive(current);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        if (progressRef.current) progressRef.current.style.width = `${pct * 100}%`;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll, { passive: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  /* ---------- lock page scroll while the menu is open (Lenis + native) ---------- */
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  const navigate = (id) => {
    // make sure Lenis is running again before gliding away
    getLenis()?.start();
    document.body.style.overflow = "";
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      {/* ============ TOP BAR ============ */}
      <header
        className="fixed top-0 inset-x-0 z-[120] border-b border-border backdrop-blur-xl"
        style={{ background: "var(--nav-bg)" }}
      >
        <div className="h-[60px] px-5 md:px-10 flex items-center justify-between">
          <Logo onNavigate={navigate} />
          <div className="flex items-center gap-2.5">
            <ThemeButton theme={theme} onToggle={onToggleTheme} />
            <Burger open={open} onToggle={() => setOpen((o) => !o)} />
          </div>
        </div>
        {/* scroll progress hairline */}
        <div className="absolute bottom-[-1px] left-0 h-[2px] w-full">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-accent to-accent2 transition-[width] duration-150 ease-out"
            style={{ width: "0%" }}
          />
        </div>
      </header>

      {/* ============ FULL-SCREEN MENU ============ */}
      <div
        className={`menu-overlay fixed inset-0 z-[110] ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <div className="h-full flex flex-col max-w-[1100px] mx-auto px-6 md:px-10 pt-[100px] pb-8">
          {/* oversized links */}
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="flex flex-col gap-1 md:gap-2">
              {items.map((s, i) => {
                const isActive = s.id === active;
                return (
                  <li key={s.id} className="menu-item" style={{ "--i": i }}>
                    <button
                      onClick={() => navigate(s.id)}
                      tabIndex={open ? 0 : -1}
                      className={`group flex items-baseline gap-4 md:gap-7 text-left cursor-pointer
                        font-sans font-extrabold tracking-[-0.03em] leading-[1.06]
                        text-[clamp(2.5rem,9vw,4.6rem)]
                        transition-colors duration-300
                        ${isActive ? "text-accent" : "text-text hover:text-accent"}`}
                    >
                      <span
                        className="font-mono font-normal tracking-normal text-faint
                          text-[0.8rem] md:text-[0.95rem] group-hover:text-accent2 transition-colors duration-300"
                      >
                        {String(i).padStart(2, "0")}
                      </span>
                      <span
                        className={`transition-transform duration-[450ms] ${EASE} group-hover:translate-x-[14px]`}
                      >
                        {s.id === "hero" ? "home" : s.id}
                        {isActive && <span className="text-accent">.</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* menu footer */}
          <div
            className="menu-item flex items-end justify-between gap-4 flex-wrap border-t border-border pt-6"
            style={{ "--i": items.length + 1 }}
          >
            <div className="font-mono text-[0.72rem] text-faint leading-[1.7]">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-2 align-middle" />
              {CONFIG.status}
              <a
                href={`mailto:${CONFIG.email}`}
                className="block text-muted hover:text-accent hover:no-underline transition-colors"
                tabIndex={open ? 0 : -1}
              >
                {CONFIG.email}
              </a>
            </div>
            <div className="font-mono text-[0.68rem] text-faint">
              press <span className="kbd">esc</span> to close
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
