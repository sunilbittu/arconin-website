# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck (`tsc`) then build with Vite. There is no separate lint step; `tsc` is the source of truth for type errors.
- `npm run preview` — preview the production build locally

Imports use the `@/*` alias mapped to `src/*` (see `tsconfig.json` and `vite.config.ts`).

## Architecture

Single-page React 19 + TypeScript + Vite app — a marketing site for Arconin (Hyderabad architecture/interior design studio). Routing is client-side via `react-router-dom` v7 with `BrowserRouter`. Tailwind CSS v4 is configured via `@tailwindcss/vite` and `@import "tailwindcss"` in `src/index.css` (no separate `tailwind.config.js` — theme tokens like `brand-*` and `dark-*` live in the `@theme` block of `index.css`).

### App shell (`src/App.tsx`, `src/main.tsx`)

The shell wraps every route in this order:
1. `SmoothScroll` — Lenis-based smooth scrolling provider that also registers GSAP `ScrollTrigger` and resets scroll position on route change.
2. `CustomCursor` — site uses a custom cursor; `body { cursor: none }` is set under `@media (pointer: fine)` in `index.css`.
3. `Preloader` — only shown on the home route (`pathname === "/"`); other routes mount with `loaded=true` so they render immediately. This was fixed deliberately — see commit `461b73e` ("Fix blank pages on reload by limiting preloader to home route"). Do not re-enable the preloader for non-home routes.
4. `Navbar` (takes `loaded` prop, Framer Motion entrance — see commit `4844916`) and `Footer` wrap a `<Routes>` block with one `<Route>` per page under `src/pages/`.

Only `HomePage` receives the `loaded` prop; other pages wrap themselves in `components/layout/PageLayout.tsx`, which applies `pt-24 md:pt-32` (clearance for the fixed navbar) and a Framer Motion fade-in.

### Data layer (`src/data/`)

Service pages (Architecture, Construction, Interiors, Innovation, Consulting, Technology, Careers, Projects, Gallery) are **data-driven**: each `src/data/<service>.ts` exports typed content (tabs, project lists, etc.) consumed by the matching `src/pages/<Service>Page.tsx`. To add or edit service content, edit the data file — the page component is usually a thin renderer.

- Sub-service navigation uses `?tab=...` query strings (see `src/data/navigation.ts`). Pages read the tab from the URL and render the matching section.
- Gallery images live in `src/data/gallery.ts` and are served from Cloudinary (cloud name `df6z9onej`). Use the `cloudinaryUrl()` / `cloudinaryThumb()` helpers — they bake in `q_auto,f_auto` and width. Do not hardcode Cloudinary URLs.

### Animation & 3D

- `motion` (Framer Motion v12) is the default for component-level animations.
- GSAP + `ScrollTrigger` is used for scroll-linked effects; it's registered once inside `SmoothScroll.tsx`. Always integrate ScrollTrigger through the existing Lenis ticker — do not call `gsap.ticker` setup again elsewhere.
- `@react-three/fiber` + `@react-three/drei` + `three` power the hero scene in `src/components/three/HeroScene.tsx`.

### Styling conventions

- Use the `cn()` helper from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional classes.
- Theme colors are CSS custom properties: `brand-50..900` (warm tan) and `dark-100..950` (near-black). Reference them via Tailwind utility classes (e.g. `bg-dark-950`, `text-brand-500`) — they come from the `@theme` block, not a JS config.
- Fonts: `font-sans` (Inter), `font-display` (Space Grotesk), `font-serif` (Cormorant Garamond) — declared in `@theme` and loaded from Google Fonts in `index.html`.
- Reusable utility classes defined in `@layer components` of `index.css`: `text-gradient`, `glass`, `glass-hover`, `line-reveal`, `noise-bg`.

### SEO

`index.html` contains hand-maintained meta tags, OpenGraph, and a JSON-LD `LocalBusiness` schema for the Hyderabad studio. Update it directly when contact info, services, or reviews change — there is no CMS.

## Deployment

Two deployment targets are configured; both rewrite all routes to `index.html` for client-side routing:

- **Vercel** — `vercel.json` rewrites `/(.*)` to `/`.
- **GitHub Pages** — `.github/workflows/deploy.yml` builds on push to `main` and copies `dist/index.html` to `dist/404.html` as the SPA fallback.

`vite.config.ts` sets `base: "/"` (root deploy). If switching to a project subpath on Pages, update `base` accordingly.
