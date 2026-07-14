# Triantaphilos Terzides — Portfolio

A professional portfolio website built with React, Vite, TypeScript and TailwindCSS to showcase my work as a Frontend Engineer.

**Live**:

- Netlify (production): https://terzidest.netlify.app
- GitHub Pages mirror: https://terzidest.github.io/my_portfolio/

## Tech stack

- **React 18** + **TypeScript** (strict mode)
- **Vite** — build & dev server
- **TailwindCSS** — styling
- **React Router v6** — client-side routing
- **Netlify Functions** + **Resend** — serverless email backend for the contact form

## Project structure

```
my_portfolio/
├── public/
│   ├── _redirects                  # Netlify SPA fallback (/* /index.html 200)
│   └── assets/images/              # Profile and project screenshots
├── src/
│   ├── components/                 # UI by area
│   │   ├── about/                  #   About page
│   │   ├── common/                 #   Navbar, Footer, Button
│   │   ├── contact/                #   Contact form
│   │   ├── home/                   #   Hero, FeatureCard
│   │   └── projects/               #   ProjectCard, CaseStudy
│   ├── data/projects.ts            # Project data + helpers
│   ├── hooks/useForm.ts            # Generic typed form hook
│   ├── pages/                      # Route components
│   ├── utils/                      # validation, ScrollToTop
│   ├── types.ts                    # Shared types
│   ├── vite-env.d.ts               # Vite ambient types
│   ├── App.tsx, main.tsx           # Entry
│   └── index.css
├── netlify/functions/
│   └── send-contact.ts             # Serverless contact-form handler (Resend)
├── shared/contact.ts               # Contact constraints shared by client/function
├── scripts/generate-responsive-images.mjs
├── .github/workflows/static.yml    # GitHub Pages deploy
├── netlify.toml                    # Netlify build & functions config
├── tsconfig.{json,app,node,functions}.json
└── vite.config.ts
```

## Local development

Requires Node.js LTS (20+).

```bash
git clone https://github.com/terzidest/my_portfolio.git
cd my_portfolio
npm install
npm run dev        # http://localhost:5173 — Vite only (no functions)
```

To run the contact-form function locally end-to-end:

```bash
npm install -g netlify-cli
echo 'RESEND_API_KEY=re_your_key' > .env   # already gitignored
netlify dev        # http://localhost:8888 — Vite + functions
```

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — production build for Netlify (base `/`)
- `npm run build:pages` — production build for GitHub Pages (base `/my_portfolio/`)
- `npm test` — Vitest + React Testing Library regression suite
- `npm run typecheck` — `tsc -b` across all project references
- `npm run lint` — ESLint
- `npm run images:generate` — regenerate committed responsive WebP variants
- `npm run preview` — preview the production build locally

## Deployment

Both targets deploy from `main` — no per-target branch:

- **Netlify** (production): runs `npm run build`, publishes `dist/`. Requires `RESEND_API_KEY` in the Netlify dashboard (Site settings → Environment variables). Optional `RESEND_SENDER` (e.g. `Portfolio <noreply@your-domain>`) replaces the default test sender and unlocks the auto-reply to submitters.
- **GitHub Pages**: [.github/workflows/static.yml](.github/workflows/static.yml) runs on push to `main`, builds with `npm run build:pages` (so assets resolve under `/my_portfolio/`), and deploys via `actions/deploy-pages`. The serverless function isn't available on the Pages mirror — the contact form falls back to a direct-email message there.

## Contact

Triantaphilos Terzides — terzidest@gmail.com
