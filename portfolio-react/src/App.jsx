import { useEffect, useRef, useState } from "react";
import { CONFIG } from "./config";
import { Icon } from "./icons";
import Header from "./components/Header";
import Marquee from "./components/Marquee";
import Hero from "./components/Hero";
import Section from "./components/Section";
import About from "./components/About";
import ContributionGraph from "./components/ContributionGraph";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Connect from "./components/Connect";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Aurora from "./components/background/Aurora";
import ParticleField from "./components/background/ParticleField";
import CursorGlow from "./components/CursorGlow";
import { useTheme } from "./hooks/useTheme";
import { initLenis, scrollToSection } from "./lib/scroll";

/* Sections auto-hide when their config list is empty, and the
   numbering (01 // about, 02 // skills, ...) adjusts automatically. */
const SECTIONS = [
  { id: "about", title: "About Me", visible: true, Component: About },
  { id: "activity", title: "Contribution Graph", visible: CONFIG.activity.enabled, Component: ContributionGraph },
  { id: "skills", title: "Design Toolkit", visible: true, Component: Skills },
  { id: "experience", title: "Work Experience", visible: CONFIG.experience.length > 0, Component: Experience },
  { id: "projects", title: "Featured Projects", visible: CONFIG.projects.length > 0, Component: Projects },
  { id: "connect", title: "Find Me Online", visible: CONFIG.socials.length > 0, Component: Connect },
  { id: "contact", title: null, visible: true, Component: Contact },
];

export default function App() {
  const visible = SECTIONS.filter((s) => s.visible);
  const [theme, toggleTheme] = useTheme();
  const [showHint, setShowHint] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const ticking = useRef(false);
  const heroRef = useRef(null);

  /* ---------- Lenis butter-scroll + velocity skew + hero parallax ---------- */
  useEffect(() => {
    const lenis = initLenis();

    // intercept in-page anchors so they glide through Lenis
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      e.preventDefault();
      scrollToSection(hash.length > 1 ? hash.slice(1) : "hero");
    };
    document.addEventListener("click", onClick);

    if (!lenis) {
      return () => document.removeEventListener("click", onClick);
    }

    // cache skew targets + hero
    const skewEls = Array.from(document.querySelectorAll(".skew-scroll"));
    const heroEl = heroRef.current;
    let target = 0;
    let current = 0;

    lenis.on("scroll", ({ velocity }) => {
      // only flings bend the page — slow reading speed stays dead still
      const v = Math.abs(velocity) < 2.5 ? 0 : velocity;
      target = Math.max(-4, Math.min(4, v * 0.28));
    });

    let raf;
    const loop = (time) => {
      lenis.raf(time);

      // ----- velocity skew: taut, damped release (max ±1.7°, never at rest) -----
      target *= 0.86; // fast decay = tight spring-back
      current += (target - current) * 0.14;
      const skew = Math.abs(current) < 0.015 ? 0 : current * 0.42;
      for (const el of skewEls) {
        el.style.transform = skew ? `skewY(${skew}deg)` : "";
      }

      // ----- hero parallax: drifts up + fades as you leave it -----
      if (heroEl) {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroEl.style.transform = `translateY(${y * 0.14}px)`;
          heroEl.style.opacity = String(1 - Math.min(y / (window.innerHeight * 0.8), 1) * 0.9);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", onClick);
      for (const el of skewEls) el.style.transform = "";
      if (heroEl) {
        heroEl.style.transform = "";
        heroEl.style.opacity = "";
      }
    };
  }, []);

  /* ---------- scroll hint + back-to-top visibility ---------- */
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setShowHint(window.scrollY <= 100);
        setShowTop(window.scrollY > 700);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- hidden shortcut: press "T" to toggle theme ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "t" || e.key === "T") && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = document.activeElement?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") toggleTheme();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleTheme]);

  return (
    <>
      {/* interactive layered background */}
      <Aurora />
      <ParticleField />
      <CursorGlow />

      <Header sections={visible} theme={theme} onToggleTheme={toggleTheme} />

      {/* content column */}
      <div className="relative z-[1]">
        <div ref={heroRef} className="will-change-transform">
          <Hero />
        </div>
        <Marquee />
        <main className="max-w-[1080px] mx-auto px-6 md:px-10">
          {visible.map(({ id, title, Component }, i) => (
            <Section key={id} id={id} index={i + 1} title={title}>
              <Component />
            </Section>
          ))}
        </main>
        <Footer />
      </div>

      {/* Scroll hint */}
      <div
        className={`fixed bottom-7 left-1/2 z-50 pointer-events-none text-faint font-mono
          text-[0.68rem] flex flex-col items-center gap-1.5
          animate-[float-y_2.5s_ease-in-out_infinite] transition-opacity duration-300
          ${showHint ? "opacity-100" : "opacity-0"}`}
      >
        scroll ↓
      </div>

      {/* Back to top */}
      <button
        onClick={() => scrollToSection("hero")}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 w-[40px] h-[40px] rounded-[2px]
          bg-card border border-border text-muted flex items-center justify-center
          transition-all duration-300 hover:text-accent hover:border-accent cursor-pointer
          hover:-translate-y-1 hover:shadow-[0_8px_20px_var(--accent-glow)]
          ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
      >
        <Icon name="arrowUp" className="w-[17px] h-[17px]" />
      </button>
    </>
  );
}
