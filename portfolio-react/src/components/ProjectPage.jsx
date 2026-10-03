import { Icon } from "../icons";

export default function ProjectPage() {
  return (
    <div className="project-page min-h-screen bg-bg text-text">
      <header className="project-page-nav">
        <a href="/" className="font-mono text-[0.8rem] text-muted hover:text-accent hover:no-underline inline-flex items-center gap-2">
          <span aria-hidden="true">←</span> back to portfolio
        </a>
        <span className="font-mono text-[0.7rem] text-faint">case study / 01</span>
      </header>

      <main>
        <section className="project-hero max-w-[1080px] mx-auto px-6 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="font-mono text-accent text-[0.72rem] tracking-[0.28em] uppercase mb-5">Featured project</div>
          <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.95] tracking-tight max-w-[850px]">Brew &amp; Co.</h1>
          <p className="text-muted text-[1.05rem] leading-[1.8] max-w-[620px] mt-7">
            A warm, practical coffee shop management platform designed around three connected tools: inventory, point of sale, and HR and payroll.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {["UI/UX Design", "Web App", "POS System", "Responsive Layout"].map((tag) => (
              <span key={tag} className="font-mono text-[0.72rem] text-accent2 border border-border rounded-full px-3 py-1.5">{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-9">
            <a className="btn btn-primary" href="http://brewcoffeeshop.kesug.com/hub" target="_blank" rel="noopener">visit_live_site <Icon name="external" className="w-4 h-4" /></a>
            <a className="btn btn-outline" href="#screens">view_screens</a>
          </div>
        </section>

        <section id="screens" className="max-w-[1200px] mx-auto px-6 pb-20">
          <div className="project-shot project-shot-hub">
            <img src="/brew-hub.png" alt="Brew and Co system hub showing inventory, POS, and HRMS cards" />
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="project-shot"><img src="/brew-menu.png" alt="Brew and Co POS menu screen with coffee products and current order" /></div>
            <div className="project-note card p-7 md:p-9 flex flex-col justify-center">
              <span className="font-mono text-accent text-[0.72rem] tracking-[0.2em] uppercase">The direction</span>
              <h2 className="text-[1.7rem] font-bold mt-4 mb-4">Calm tools for busy counters.</h2>
              <p className="text-muted leading-[1.8] text-[0.92rem]">
                The interface uses a soft coffee palette, generous cards, and clear navigation to keep everyday operations easy to scan. Each system has its own purpose while still feeling like part of the same Brew &amp; Co. workspace.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-[1080px] mx-auto px-6 pb-24 grid md:grid-cols-3 gap-5">
          {[
            ["01", "One workspace", "The hub gives staff a clear starting point for the three core business systems."],
            ["02", "Fast decisions", "Menu cards surface the product, price, and stock information needed at a glance."],
            ["03", "Soft confidence", "Warm neutrals and rounded surfaces make an administrative product feel welcoming."],
          ].map(([number, title, text]) => (
            <article key={number} className="card p-6">
              <span className="font-mono text-accent2 text-[0.75rem]">{number}</span>
              <h3 className="font-bold mt-5 mb-2">{title}</h3>
              <p className="text-muted text-[0.88rem] leading-[1.7]">{text}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="border-t border-border text-center py-8 px-6">
        <a href="/" className="font-mono text-[0.75rem] text-faint hover:text-accent hover:no-underline">← return to jenwin's portfolio</a>
      </footer>
    </div>
  );
}
