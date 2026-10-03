import Projects from "./Projects";

export default function ProjectsPage() {
  return (
    <div className="detail-page min-h-screen bg-bg text-text">
      <header className="project-page-nav">
        <a href="/" className="font-mono text-[0.8rem] text-muted hover:text-accent hover:no-underline">← back to portfolio</a>
        <span className="font-mono text-[0.7rem] text-faint">projects / selected work</span>
      </header>
      <main className="max-w-[980px] mx-auto px-6 pt-32 pb-24">
        <div className="font-mono text-accent text-[0.72rem] tracking-[0.28em] uppercase mb-5">Selected work</div>
        <h1 className="font-display text-[clamp(3rem,9vw,6rem)] leading-[0.95]">Things I’ve<br />made.</h1>
        <p className="text-muted text-[1rem] leading-[1.8] max-w-[620px] mt-7 mb-16">A growing collection of interfaces, experiments, and products shaped by curiosity.</p>
        <Projects />
      </main>
      <footer className="border-t border-border text-center py-8"><a href="/" className="font-mono text-[0.75rem] text-faint hover:text-accent hover:no-underline">← return to jenwin's portfolio</a></footer>
    </div>
  );
}
