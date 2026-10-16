import { useState, useEffect, useCallback } from "react";

/* Reads the theme set by the inline script in index.html,
   toggles the `.dark` class on <html>, and persists to localStorage.

   The toggle uses the View Transition API when available: the new
   theme sweeps over the page in a circle growing out from the button
   (--tx/--ty). Browsers without support (or reduced motion) get a
   normal instant flip — everything keeps working. */
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* private mode — ignore */
    }
    // let canvas/background components re-read theme CSS vars
    window.dispatchEvent(new Event("portfolio-theme"));
  }, [theme]);

  const toggle = useCallback(
    (e) => {
      const next = theme === "dark" ? "light" : "dark";
      const reduce = window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .matches;

      if (reduce || typeof document.startViewTransition !== "function") {
        setTheme(next); // fallback: effect flips the class
        return;
      }

      // ripple origin: the click point (button), or the top-right corner area
      const x = e?.clientX ?? window.innerWidth - 92;
      const y = e?.clientY ?? 30;
      document.documentElement.style.setProperty("--tx", `${x}px`);
      document.documentElement.style.setProperty("--ty", `${y}px`);

      try {
        const vt = document.startViewTransition(() => {
          // flip the class synchronously so the snapshot captures the new theme
          document.documentElement.classList.toggle("dark", next === "dark");
          setTheme(next);
        });
        vt.finished.catch(() => {
          /* skipped by a newer transition — fine */
        });
      } catch {
        setTheme(next); // ultra-safe fallback
      }
    },
    [theme]
  );

  return [theme, toggle];
}
