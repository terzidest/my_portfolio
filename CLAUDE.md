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
npm run preview      # preview the production build

# Contact form end-to-end locally (Vite + the Netlify Function):
netlify dev          # http://localhost:8888 — needs RESEND_API_KEY in .env
```

**Type errors fail the build** (`tsc -b` runs before `vite build`). Always run `npm run typecheck` before committing. When touching anything visual, sanity-check **both** `npm run build` and `npm run build:pages`, since the two deploy targets use different base paths.

## Deployment — one branch, two targets

`main` is the single source of truth and deploys to both:

- **Netlify (production)** — https://terzidest.netlify.app — runs `npm run build`, `base: '/'`. Config in `netlify.toml`. Requires `RESEND_API_KEY` env var (dashboard); optional `RESEND_SENDER` swaps the email sender to a verified domain and enables the contact-form auto-reply.
- **GitHub Pages (mirror)** — https://terzidest.github.io/my_portfolio/ — `.github/workflows/static.yml` runs `npm run build:pages` on push to `main`, `base: '/my_portfolio/'`.

The base path is **build-time only** — never hardcode `/` or `/my_portfolio/`. Derive it from Vite:
- Asset/image paths: use the `getImagePath()` helper in `src/data/projects.ts` (prefixes `import.meta.env.BASE_URL`).
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
- **Images**: drop files in `public/assets/images/projects/` (convention: `name.png`, `name-2.png`, …) and reference via `getImagePath()`. A project with no screenshots yet points `image` at `placeholder.jpg` and uses `additionalImages: []` (the gallery is hidden when empty).
- **Motion always respects `prefers-reduced-motion`.** Three mechanisms, use the right one:
  - Global CSS guard in `src/index.css` collapses CSS animations/transitions.
  - `useInView` (scroll reveals) returns visible immediately under reduced motion; wrap sections in `<Reveal>`.
  - `usePrefersReducedMotion` for JS-driven cases the CSS guard can't reach (marquee, framer-motion page transitions).
- **framer-motion** is used for the `/projects` filter animation and route cross-fades (`App.tsx`); both gated for reduced motion.
- **Styling** is Tailwind utility classes inline. Custom keyframes (fade-in-up, float, slide-down, shimmer, marquee) live in `src/index.css`. Primary brand color is the `primary` token in `tailwind.config.js`.
- Grid cards use `h-full` on both the reveal/motion wrapper and the card root so they stay equal height (wrapping a grid item breaks CSS grid's automatic stretch).

## Workflow

- Work on a branch off `main`, open a PR — do not commit directly to `main` (it auto-deploys).
- Keep commits logical and scoped; one concern per commit.
- `node_modules` is intentionally untracked; run `npm install` after cloning.

## Known gaps (don't be surprised)

- **Dark mode** is not implemented (deferred as a separate project).
- Image shimmer/fade-in is applied on the Projects listing cards but not the ProjectDetail page images.
