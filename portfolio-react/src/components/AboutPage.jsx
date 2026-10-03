import About from "./About";
import Education from "./Education";
import Skills from "./Skills";

export default function AboutPage() {
  return (
    <div className="detail-page min-h-screen bg-bg text-text">
      <header className="project-page-nav">
        <a href="/" className="font-mono text-[0.8rem] text-muted hover:text-accent hover:no-underline">← back to portfolio</a>
        <span className="font-mono text-[0.7rem] text-faint">about / jenwin</span>
      </header>
      <main className="max-w-[860px] mx-auto px-6 pt-32 pb-24">
        <div className="font-mono text-accent text-[0.72rem] tracking-[0.28em] uppercase mb-5">About me</div>
        <h1 className="font-display text-[clamp(3rem,9vw,6rem)] leading-[0.95]">A little more<br />about me.</h1>
        <p className="text-muted text-[1rem] leading-[1.8] max-w-[620px] mt-7 mb-16">The person behind the pixels, wireframes, and late-night Figma sessions.</p>
        <section className="mb-16"><About /></section>
        <section className="mb-16"><div className="font-mono text-accent text-[0.72rem] tracking-[0.28em] uppercase mb-5">Education</div><Education /></section>
        <section><div className="font-mono text-accent text-[0.72rem] tracking-[0.28em] uppercase mb-5">Design toolkit</div><Skills /></section>
      </main>
      <footer className="border-t border-border text-center py-8"><a href="/" className="font-mono text-[0.75rem] text-faint hover:text-accent hover:no-underline">← return to jenwin's portfolio</a></footer>
    </div>
  );
}
