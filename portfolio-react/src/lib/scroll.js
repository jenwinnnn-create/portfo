import Lenis from "lenis";

/* Singleton Lenis instance — buttery inertia scrolling.
   Returns null under prefers-reduced-motion (native scrolling then). */
let lenis = null;

export function initLenis() {
  if (lenis || typeof window === "undefined") return lenis;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  lenis = new Lenis({
    lerp: 0.115, // snappy follow: responsive hands, gliding wheels
    smoothWheel: true,
    syncTouch: false,
  });
  return lenis;
}

export function getLenis() {
  return lenis;
}

/* easeInOutQuart — balanced launch + landing: feels like travel, not teleport */
const easeInOutQuart = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) {
    if (lenis) lenis.scrollTo(0, { duration: 1, easing: easeInOutQuart });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (lenis) {
    lenis.scrollTo(el, {
      offset: -12,
      duration: 1.15,
      easing: easeInOutQuart,
    });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
