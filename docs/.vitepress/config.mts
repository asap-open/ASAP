import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ASAP",
  description:
    "Applied Strength & Advancement Platform - A data-driven workout management and analytics system",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/logo-2.png" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;700;800;900&display=swap",
        rel: "stylesheet",
      },
    ],
  ],
  themeConfig: {
    logo: "/logo-2.png",
    siteTitle: "ASAP",

    nav: [
      { text: "Home", link: "/" },
      { text: "Installation", link: "/installation" },
      { text: "Guide", link: "/guide/" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/guide/" },
          { text: "Installation", link: "/installation" },
          { text: "Quick Start", link: "/guide/quick-start" },
        ],
      },
      {
        text: "Features",
        items: [
          { text: "Workout Sessions", link: "/guide/features/sessions" },
          { text: "Exercise Library", link: "/guide/features/exercises" },
          { text: "Progress Tracking", link: "/guide/features/progress" },
          { text: "Profile & Stats", link: "/guide/features/profile" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "Authentication", link: "/api/authentication" },
          { text: "Sessions", link: "/api/sessions" },
          { text: "Exercises", link: "/api/exercises" },
          { text: "Profile", link: "/api/profile" },
          { text: "Weights", link: "/api/weights" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/yourusername/asap" },
    ],

    footer: {
      message: "Built with precision for measurable improvement",
      copyright: "Copyright © 2026 ASAP",
    },
  },
});
