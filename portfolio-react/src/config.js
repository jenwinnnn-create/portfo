/* ===============================================================

   ┌──────────────────────────────────────────────────────┐
   │  ★★★  JENWIN'S PORTFOLIO DATA — EDIT HERE  ★★★     │
   │  Change values below and the whole site updates.      │
   │  TIP: leave a list empty [] and its section           │
   │       disappears automatically (page AND nav).        │
   │       Add items later and it comes back —             │
   │       no other code changes needed!                   │
   └──────────────────────────────────────────────────────┘
   =============================================================== */

export const CONFIG = {
  // ---------- BASIC INFO ----------
  name: "JENWIN",
  username: "jenwin",
  status: "Design Student · Philippines 🇵🇭",
  roles: [
    "UI/UX Designer",
    "Design Student",
    "Aspiring Product Designer",
    "Pixel Perfectionist",
  ],
  heroDescription:
    "Just a normal guy from the Philippines learning to turn ideas into clean, human-centered interfaces — one frame, one wireframe, and one late-night Figma session at a time.",
  heroBadges: ["react 19", "vite 8", "tailwind 4"],
  email: "jenwindocabo03@gmail.com",

  // ---------- ABOUT (supports <strong> and <a> HTML) ----------
  aboutParagraphs: [
    "I'm a <strong>normal guy living in the Philippines</strong> 🇵🇭 with a not-so-normal obsession for how things look, feel, and work. I'm currently a <strong>student exploring the world of UI/UX design</strong> — studying interfaces, sketching wireframes, and figuring out what makes digital experiences actually delightful.",
    "To me, great design isn't decoration — it's <strong>empathy</strong>: understanding people and solving their problems beautifully. My toolkit and this portfolio are both works in progress... and honestly, so am I — and that's the fun part. 🙂",
  ],

  // ---------- TERMINAL CARD (whoami.json) ----------
  terminal: {
    location: "Philippines 🇵🇭",
    education: "BSIT @ NCST (3rd yr)",
    focus: "UI/UX Design",
    interests: "Interfaces, Typography",
    currently: "Learning Figma & UX",
    fun_fact: "Normal guy, not-so-normal ideas",
  },

  // ---------- CONTRIBUTION GRAPH ----------
  // Your real GitHub contribution graph, fetched live!
  // username : your GitHub handle ("" = always show sample data)
  // enabled  : false = hide the whole section
  // If GitHub can't be reached (e.g. offline preview), a
  // sample pattern renders instead so the layout never breaks.
  activity: {
    enabled: true,
    username: "jenwinnnn-create",
  },

  // ---------- EDUCATION ----------
  education: [
    {
      school: "NCST",
      long: "National College of Science and Technology",
      program: "BS in Information Technology",
      detail: "3rd Year",
      years: "2024 — present",
      current: true,
    },
    {
      school: "STI College",
      program: "Senior High School — ICT Strand",
      detail: "Mobile App & Web Development",
      years: "2022 — 2024",
    },
  ],

  // ---------- SKILLS ----------
  // icon options: "tool", "layers", "code", "server"
  // Skill items: plain string, or { name, logo } — logo keys live in icons.jsx
  skills: [
    { icon: "tool", title: "Design Tools", items: [
      { name: "Figma", logo: "figma" },
      { name: "FigJam", logo: "figjam" },
      { name: "Canva", logo: "canva" },
      { name: "Adobe XD", logo: "adobexd" },
    ] },
    { icon: "layers", title: "Design Practice", items: ["Wireframing", "Prototyping", "Visual Design", "User Research", "Design Systems"] },
    { icon: "code", title: "Currently Learning", items: [
      { name: "HTML", logo: "html5" },
      { name: "CSS", logo: "css3" },
      "UX Principles", "Accessibility",
    ] },
    { icon: "server", title: "Soft Skills", items: ["Creativity", "Attention to Detail", "Curiosity", "Communication"] },
  ],

  // ---------- EXPERIENCE  (empty = section hidden) ----------
  // Add entries like this when you have them:
  // {
  //   role: "UI/UX Design Intern",
  //   company: "Some Studio",
  //   companyUrl: "#",
  //   logoText: "SS",          // initials shown if no logoUrl
  //   logoUrl: "",             // optional logo image URL
  //   date: "Jun 2026 — Aug 2026",
  //   badge: "",               // e.g. "Current"
  //   bullets: ["What you did there."],
  // },
  experience: [],

  // ---------- PROJECTS  (empty = section hidden) ----------
  // Add entries like this when you have them:
  // {
  //   title: "My First Case Study",
  //   description: "What it is and what you designed.",
  //   tags: ["Figma", "Mobile"],
  //   liveUrl: "https://...",
  //   codeUrl: "",
  // },
  projects: [
    {
      title: "Brew & Co. — Coffee Shop Suite",
      description:
        "My first full system build: a web portal for a coffee shop tying three modules together — a POS for orders, payments & sales reports, an inventory & procurement tracker, and an HRMS with payroll, scheduling and audit logs. Every cup tells a story; three dashboards tell the whole business.",
      tags: ["UI/UX", "Web App", "POS", "Inventory", "HRMS"],
      liveUrl: "http://brewcoffeeshop.kesug.com/hub",
      codeUrl: "",
    },
  ],

  // ---------- SOCIAL LINKS  (empty = section hidden) ----------
  // Available icons: github, linkedin, x, mail, codepen, dribbble,
  //                  instagram, stackoverflow, gitlab, facebook, website, youtube
  // { label: "Dribbble", handle: "@jenwin", url: "https://dribbble.com/jenwin", icon: "dribbble" },
  socials: [],

  // ---------- FOOTER ----------
  footerText:
    'crafted with <span class="heart">♥</span> by jenwin · react + tailwind · © ' +
    new Date().getFullYear(),
};
