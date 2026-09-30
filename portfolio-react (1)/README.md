# Jenwin · UI/UX Portfolio

Personal portfolio built with **React 19 + Vite + Tailwind CSS v4 + Lenis**.

## ✨ Features

- 🍔 **Burger → full-screen menu** — oversized typographic links (up to 4.6rem) rise in a tight cascade while the panel sweeps down with a soft clip-path reveal; scroll-spy active state, Escape / ✕ to close, page scroll locks while open
- 🎬 **One motion system** — every entrance, hover and transition shares a single signature ease-out-expo curve + tight staggers, so the whole site moves the same way
- 🌗 **Theme switch that ripples** — dark/light sweeps across the page in a circle growing out from the button (View Transition API); graceful instant flip on Firefox/reduced-motion
- 🌀 **Lenis butter scrolling** — cinematic inertia scroll (the Awwwards-library); anchor links glide with balanced easeInOut travel instead of jumping
- 🤸 **Velocity skew** — fling the page and the content bends with your speed (±1.7°, damped spring-back); at reading speed it stays perfectly still
- 🌊 **Delight details** — hero intro drifts in from a soft blur, contribution-graph cells ripple in diagonally on reveal, keyboard `:focus-visible` rings
- 🗞️ **Editorial layout** — full-bleed hero with spec sheet + vertical rail, sticky ghost-outline section numbers, alternating filled/outline typography, giant ghost name in the footer
- 🏎️ **Velocity marquee** — the word strip between hero and content drifts on its own, speeds up when you fling the page, and reverses when you scroll back up
- 🎬 **Scroll cinema** — clip-path title reveals, rules that draw themselves, staggered entrance cascades, hero parallax fade
- 🌗 **Dark / Light mode** — persisted to `localStorage`, respects system preference, no flash on load. Hidden shortcut: press `T`
- 🌌 **Layered interactive background** — drifting aurora gradient blobs + cursor-lit blueprint grid + live particle constellation
- 🧲 **Magnetic buttons**, 🃏 **3D tilt cards**, 🔆 **cursor glow trail** (desktop)
- ⌨️ **Scramble/decrypt name** — decrypts on load, hover to re-scramble
- 💻 **Self-typing terminal** — the `whoami.json` card types itself into view; click to replay
- 📊 **Live GitHub contribution graph** — real data, recolored to the theme's lime ramp, offline fallback
- 🧩 **Auto-hiding sections** — empty config lists hide sections + menu links automatically
- 🔠 **Self-hosted variable fonts** — Inter + Inconsolata, ~82 KB
- ♿ `prefers-reduced-motion` support, semantic HTML

## 🚀 Getting Started

```bash
npm install       # install dependencies
npm run dev       # start dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## ✏️ Customizing

**Everything personal lives in one file: [`src/config.js`](src/config.js)** — name, roles, about text, skills, experience, projects, socials, email, footer. Edit values there and the whole site updates. The file has examples showing how to add projects/socials/experience later.

### Project structure

```
src/
├── config.js            ← ★ all your data here
├── App.jsx              ← sections, Lenis loop, velocity skew, parallax
├── index.css            ← Tailwind + theme tokens (dark/light)
├── icons.jsx            ← inline SVG icon library
├── lib/
│   └── scroll.js        ← Lenis smooth-scroll engine
├── hooks/
│   ├── useTheme.js      ← dark/light toggle
│   ├── useScramble.js   ← decrypt animation (replayable)
│   └── useTyping.js     ← typewriter effect
└── components/
    ├── Header.jsx            ← top bar + burger → full-screen menu
    ├── Hero.jsx              ├── Skills.jsx
    ├── Section.jsx           ├── Experience.jsx
    ├── About.jsx             ├── Projects.jsx
    ├── ContributionGraph.jsx ├── Connect.jsx
    ├── Reveal.jsx            ├── Contact.jsx
    ├── Magnetic.jsx          ├── Footer.jsx
    ├── Tilt.jsx              └── CursorGlow.jsx
    └── background/
        ├── Aurora.jsx        ← gradient blobs + spotlight grid
        └── ParticleField.jsx ← interactive canvas constellation

public/fonts/            ← self-hosted variable fonts (woff2)
```

### Changing the accent color

Edit the CSS variables under `:root` (light) and `.dark` (dark) in [`src/index.css`](src/index.css).

## 🌐 Deployment

This is a static SPA — deploy anywhere:

- **Vercel**: `vercel` (framework preset: Vite) — or push to GitHub and import
- **Netlify**: build command `npm run build`, publish directory `dist`
- **GitHub Pages**: `npm run build`, then publish the `dist` folder
