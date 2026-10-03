import Lenis from "lenis";

let instance = null;
export function initLenis() {
  if (instance) return instance;
  instance = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false });
  return instance;
}
export function getLenis() { return instance; }
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (instance) instance.scrollTo(target || 0, { offset: -70 });
  else if (target) target.scrollIntoView({ behavior: "smooth" });
}
