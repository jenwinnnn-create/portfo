import { CONFIG } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-border relative z-[1] overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pt-12 pb-[30px] text-center">
        {/* giant ghost wordmark — the unmistakable portfolio closer */}
        <div
          aria-hidden="true"
          className="text-stroke font-display font-bold uppercase leading-[0.85]
            tracking-[0.02em] select-none text-[clamp(4rem,17vw,11.5rem)]"
        >
          {CONFIG.name}
        </div>

        <div className="mt-10 text-faint text-[0.78rem] font-mono">
          <span dangerouslySetInnerHTML={{ __html: CONFIG.footerText }} />
          <div className="mt-3 text-[0.65rem] text-faint/60 hidden md:flex items-center justify-center gap-x-4 flex-wrap gap-y-1">
            <span>
              press <span className="kbd">t</span> to toggle theme
            </span>
            <span>hover the name to re-scramble</span>
            <span>scroll fast — everything reacts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
