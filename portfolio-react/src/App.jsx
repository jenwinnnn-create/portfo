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
import Education from "./components/Education";
import Projects from "./components/Projects";
import Connect from "./components/Connect";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectPage from "./components/ProjectPage";
import AboutPage from "./components/AboutPage";
import ProjectsPage from "./components/ProjectsPage";
import Aurora from "./components/background/Aurora";
import { useTheme } from "./hooks/useTheme";
import { initLenis, scrollToSection } from "./lib/scroll";

const SECTIONS = [
  { id: "about", title: "About Me", visible: true, Component: About },
  { id: "activity", title: "Contribution Graph", visible: CONFIG.activity.enabled, Component: ContributionGraph },
  { id: "skills", title: "Design Toolkit", visible: true, Component: Skills },
  { id: "experience", title: "Work Experience", visible: CONFIG.experience.length > 0, Component: Experience },
  { id: "education", title: "Education", visible: CONFIG.education.length > 0, Component: Education },
  { id: "projects", title: "Featured Projects", visible: CONFIG.projects.length > 0, Component: Projects },
  { id: "connect", title: "Find Me Online", visible: CONFIG.socials.length > 0, Component: Connect },
  { id: "contact", title: null, visible: true, Component: Contact },
];

function Portfolio() {
  const visible = SECTIONS.filter((s) => s.visible);
  const [theme, toggleTheme] = useTheme();
  const [showHint, setShowHint] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const ticking = useRef(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const lenis = initLenis();
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      e.preventDefault();
      scrollToSection(hash.length > 1 ? hash.slice(1) : "hero");
    };
    document.addEventListener("click", onClick);
    if (!lenis) return () => document.removeEventListener("click", onClick);
    const skewEls = Array.from(document.querySelectorAll(".skew-scroll"));
    const heroEl = heroRef.current;
    let target = 0;
    let current = 0;
    lenis.on("scroll", ({ velocity }) => {
      const v = Math.abs(velocity) < 2.5 ? 0 : velocity;
      target = Math.max(-4, Math.min(4, v * 0.28));
    });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      target *= 0.86;
      current += (target - current) * 0.14;
      const skew = Math.abs(current) < 0.015 ? 0 : current * 0.42;
      for (const el of skewEls) el.style.transform = skew ? `skewY(${skew}deg)` : "";
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
      if (heroEl) { heroEl.style.transform = ""; heroEl.style.opacity = ""; }
    };
  }, []);

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
      <Aurora />
      <Header sections={visible} theme={theme} onToggleTheme={toggleTheme} />
      <div className="relative z-[1]">
        <div ref={heroRef} className="will-change-transform"><Hero /></div>
        <Marquee />
        <main className="max-w-[860px] mx-auto px-6">
          {visible.map(({ id, title, Component }, i) => (
            <Section key={id} id={id} index={i + 1} title={title}><Component /></Section>
          ))}
        </main>
        <Footer />
      </div>
      <div className={`fixed bottom-7 left-1/2 z-50 pointer-events-none text-faint font-mono text-[0.68rem] flex flex-col items-center gap-1.5 animate-[float-y_2.5s_ease-in-out_infinite] transition-opacity duration-300 ${showHint ? "opacity-100" : "opacity-0"}`}>scroll ↓</div>
      <button onClick={() => scrollToSection("hero")} aria-label="Back to top" className={`fixed bottom-6 right-6 z-50 w-[40px] h-[40px] rounded-[2px] bg-card border border-border text-muted flex items-center justify-center transition-all duration-300 hover:text-accent hover:border-accent cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_20px_var(--accent-glow)] ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}><Icon name="arrowUp" className="w-[17px] h-[17px]" /></button>
    </>
  );
}

export default function App() {
  const path = window.location.pathname;
  if (path.startsWith("/projects/brew-coffee-shop")) return <ProjectPage />;
  if (path === "/about" || path === "/about/") return <AboutPage />;
  if (path === "/projects" || path === "/projects/") return <ProjectsPage />;
  return <Portfolio />;
}
