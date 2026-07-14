# CLAUDE.md

Guidance for working in this repository.

## Project

Personal portfolio site for Triantaphilos Terzides (Frontend Engineer). Vite + React 18 + **TypeScript (strict)**, styled with TailwindCSS, routed with React Router v6. The contact form is backed by a Netlify Function that sends email via Resend.

## Commands

```bash
npm run dev          # Vite dev server (http://localhost:5173) — no functions
npm run build        # tsc -b && vite build  — production build for Netlify (base '/')
npm run build:pages  # production build for GitHub Pages (base '/my_portfolio/')
npm run typecheck    # tsc -b across all project references
npm run lint         # ESLint — TS-aware, zero-warning gate (config in .eslintrc.cjs)
npm test             # Vitest + React Testing Library regression suite
npm run preview      # preview the production build

# Contact form end-to-end locally (Vite + the Netlify Function):
netlify dev          # http://localhost:8888 — needs RESEND_API_KEY in .env
```

**Type errors fail the build** (`tsc -b` runs before `vite build`). Always run `npm run typecheck` before committing. When touching anything visual, sanity-check **both** `npm run build` and `npm run build:pages` (the two deploy targets use different base paths) — and eyeball the change in **both themes** (toggle in the navbar, or set `localStorage.theme`). Missing `dark:` variants produce invisible-text bugs that typecheck/lint/build cannot catch.

## Deployment — one branch, two targets

`main` is the single source of truth and deploys to both:

- **Netlify (production)** — https://terzidest.netlify.app — runs `npm run build`, `base: '/'`. Config in `netlify.toml`. Requires `RESEND_API_KEY` env var (dashboard); optional `RESEND_SENDER` swaps the email sender to a verified domain and enables the contact-form auto-reply.
- **GitHub Pages (mirror)** — https://terzidest.github.io/my_portfolio/ — `.github/workflows/static.yml` runs `npm run build:pages` on push to `main`, `base: '/my_portfolio/'`.

The base path is **build-time only** — never hardcode `/` or `/my_portfolio/`. Derive it from Vite:
- Asset/image paths: use `createResponsiveImage()` / `getAssetPath()` in `src/data/images.ts` (prefixes `import.meta.env.BASE_URL`).
- Router: `<BrowserRouter basename={import.meta.env.BASE_URL}>` (in `src/main.tsx`).

The Netlify Function only exists on Netlify; on the Pages mirror the contact form gracefully falls back to a "email me directly" message.

## Layout

```
src/
├── components/
│   ├── about/       AboutSection, ExperienceSection (timeline)
│   ├── common/      Navbar, Footer, Button, Reveal, BackToTop
│   ├── contact/     ContactForm (posts to the Netlify Function)
│   ├── home/        Hero, FeatureCard
│   └── projects/    ProjectCard
├── data/            projects.ts, experience.ts   (content lives here, not in JSX)
├── hooks/           useForm, useInView, usePrefersReducedMotion, usePageMeta
├── pages/           Home, Projects, ProjectDetail, About, Contact
├── utils/           validation, ScrollToTop (route-change scroll reset)
├── types.ts         shared types (Project, Experience, ContactFormValues, …)
└── main.tsx, App.tsx
netlify/functions/send-contact.ts   serverless contact handler (Resend)
```

TypeScript is split into project references: `tsconfig.app.json` (src), `tsconfig.node.json` (vite config), `tsconfig.functions.json` (netlify functions), tied together by `tsconfig.json`.

## Conventions & patterns

- **Content is data, not markup.** Projects and work history live in `src/data/*.ts` as typed arrays. To add/edit a project or role, edit the data file — the pages render whatever's there. New projects are picked up automatically (helpers in `projects.ts` are array-position-driven; the first entry leads the list). When adding a project, also add its `/projects/<id>` URL to `public/sitemap.xml`.
- **SEO**: every page calls `usePageMeta` (title, meta description, canonical, optional `noindex`) at the top of the component. Canonicals always point at the Netlify URL so the Pages mirror isn't treated as duplicate content. Site-wide Open Graph tags are static in `index.html` — social crawlers don't run JS, so per-route OG values are pointless without prerendering.
- **Project case studies** use structured fields — `problem`, `role`, `outcome` (plus the shared `techStack` for "Stack"). There is no `longDescription`.
- **Images**: drop originals in `public/assets/images/projects/` (convention: `name.png`, `name-2.png`, …), run `npm run images:generate`, and describe them with `createResponsiveImage()`. A project with no screenshots uses the placeholder descriptor and `additionalImages: []` (the gallery is hidden when empty).
- **Motion always respects `prefers-reduced-motion`.** Three mechanisms, use the right one:
  - Global CSS guard in `src/index.css` collapses CSS animations/transitions.
  - `useInView` (scroll reveals) returns visible immediately under reduced motion; wrap sections in `<Reveal>`.
  - `usePrefersReducedMotion` for JS-driven cases the CSS guard can't reach (marquee, framer-motion page transitions).
- **framer-motion** is used for the `/projects` filter animation and route cross-fades (`App.tsx`); both gated for reduced motion.
- **Styling** is Tailwind utility classes inline. Custom keyframes (fade-in-up, float, slide-down, shimmer, marquee) live in `src/index.css`. Primary brand color is the `primary` token in `tailwind.config.js`.
- **Dark mode** uses Tailwind's class strategy (`darkMode: 'class'`) with additive `dark:` variants — never remove a light class, append the dark one. Dark palette is slate (surfaces `slate-800/900`, text `slate-300/400`); cards keep their shadow and add `dark:ring-1 dark:ring-slate-700`. Theme state lives in `src/hooks/useTheme.ts` (toggle in the Navbar): no `theme` key in localStorage → follow the OS live; a stored `'light' | 'dark'` pins the choice. An inline anti-FOUC script in `index.html` sets the `dark` class before first paint, and `color-scheme` in `index.css` keeps native controls/scrollbars in sync.
  Standard pairings — reuse these, don't invent new ones:
  - cards/panels: `bg-white` → `dark:bg-slate-800 dark:ring-1 dark:ring-slate-700` (keep the shadow)
  - page wrappers: `bg-gray-50` → `dark:bg-slate-900`
  - headings: `text-gray-900` → `dark:text-white`; body copy `text-gray-600/700` → `dark:text-slate-300`; muted `text-gray-500/400` → `dark:text-slate-400/500`
  - borders: `border-gray-200/300` → `dark:border-slate-700` (form inputs: `dark:border-slate-600 dark:bg-slate-900`)
  - blue chips (`bg-blue-50/100`): → `dark:bg-blue-500/10` (tech chips: use `TechBadge`, already themed)
  - brand gradients (`from-blue-600 to-indigo-800`): → `dark:from-blue-800 dark:to-indigo-950`; decorative circles halve their opacity
  - `text-white` on gradients/primary buttons and black image overlays: no dark variant needed
- Grid cards use `h-full` on both the reveal/motion wrapper and the card root so they stay equal height (wrapping a grid item breaks CSS grid's automatic stretch).

## Workflow

- Work on a branch off `main`, open a PR — do not commit directly to `main` (it auto-deploys).
- Keep commits logical and scoped; one concern per commit.
- `node_modules` is intentionally untracked; run `npm install` after cloning.

## Known gaps (don't be surprised)

- The Button `dark` variant (`bg-gray-800`) predates dark mode and is unused — it's a dark-colored button style, not a theme variant.
