import type { Project } from '../types';
import { createResponsiveImage } from './images';

const CARD_SIZES = '(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw';
const GALLERY_SIZES = '(min-width: 1024px) 29vw, (min-width: 640px) 45vw, 88vw';

const projectImage = (
  filename: string,
  width: number,
  height: number,
  webpWidths: number[],
  alt: string,
  sizes = GALLERY_SIZES,
) => createResponsiveImage({
  path: `/assets/images/projects/${filename}`,
  webpWidths,
  width,
  height,
  alt,
  sizes,
});

// src/data/projects.ts
export const projects: Project[] = [
  {
    id: 'stack-game',
    title: 'Stack Game',
    description: 'A from-scratch mobile stack game built with Expo, Skia, and Reanimated worklets.',
    image: projectImage('stack-game.png', 1206, 2622, [480, 960], 'Stack Game gameplay screen', CARD_SIZES),
    additionalImages: [
      projectImage('stack-game-2.png', 1206, 2622, [480, 960], 'Stack Game tower and score screen'),
      projectImage('stack-game-3.png', 1206, 2622, [480, 960], 'Stack Game game-over screen'),
    ],
    techStack: ['Expo', 'React Native', 'TypeScript', 'React Native Skia', 'Reanimated', 'Gesture Handler'],
    categories: ['mobile'],
    github: 'https://github.com/terzidest/stack-game',
    problem:
      "Writing a polished mobile game from scratch — no game engine — as a test bed for Reanimated worklets, Skia rendering, and React Native's new architecture. A simple but unforgiving gameplay loop (Stack: drop a sliding block onto a tower, slice the overhang, lose when you miss) gave a small enough scope to ship while still surfacing the hard parts: a UI-thread game loop, cross-thread state coordination, sub-pixel collision math, and game-feel polish.",
    role: 'Solo developer — gameplay loop, rendering, audio, and game-feel polish.',
    outcome:
      "A playable game on Expo + RN 0.85 with the New Architecture (Fabric), driving the entire animation loop from Reanimated worklets on the UI thread and rendering via Skia. Core gameplay complete with combo / perfect-drop detection, haptics, and sound; thread model and data flow documented in the repo's ARCHITECTURE.md. Demonstrates handling worklet/JS state coordination and shipping a 60 fps gameplay loop without a game engine.",
  },
  {
    id: 'infovault',
    title: 'InfoVault',
    description: 'A password manager with secure local authentication.',
    image: projectImage('info-vault.png', 1419, 2796, [480, 960], 'InfoVault password list', CARD_SIZES),
    additionalImages: [
      projectImage('info-vault-2.png', 1419, 2796, [480, 960], 'InfoVault authentication screen'),
      projectImage('info-vault.png', 1419, 2796, [480, 960], 'InfoVault password list'),
      projectImage('info-vault-3.png', 1419, 2796, [480, 960], 'InfoVault credential detail screen'),
    ],
    techStack: ['React Native', 'Expo', 'Secure Store', 'Biometric Authentication', 'Encryption'],
    categories: ['mobile'],
    github: 'https://github.com/terzidest/InfoVault',
    problem:
      "I wanted a password manager that never leaves the device — no cloud sync, no third-party server — backed by OS-level biometrics and encryption at rest. An exercise in handling genuinely sensitive data inside a React Native app.",
    role: 'Solo developer — architecture, encryption layer, UI, and biometric integration.',
    outcome:
      'A functional offline-only vault built on Expo SecureStore and platform biometrics. Demonstrates safe handling of sensitive data and use of platform-specific security APIs from a React Native codebase.',
  },
  {
    id: 'ethereal-nature',
    title: 'EtherealNature',
    description: 'A contract-first e-commerce reference architecture: a TanStack storefront and admin over a Kotlin/Ktor + PostgreSQL backend in a polyglot monorepo.',
    image: projectImage('ethnature.png', 600, 324, [320, 640], 'EtherealNature storefront home page', CARD_SIZES),
    additionalImages: [
      projectImage('ethnature.png', 600, 324, [320, 640], 'EtherealNature storefront home page'),
      projectImage('ethnature2.png', 602, 324, [320, 640], 'EtherealNature product catalog'),
      projectImage('ethnature3.png', 608, 324, [320, 640], 'EtherealNature shopping cart'),
    ],
    techStack: ['TanStack Start', 'React', 'TypeScript', 'Kotlin', 'Ktor', 'PostgreSQL', 'Turborepo', 'OpenAPI'],
    categories: ['web'],
    github: 'https://github.com/terzidest/ethereal_nature',
    problem:
      "A deliberately minimal e-shop domain — catalog, cart, ordering, identity — used as a vehicle for the hard part: structural integrity at scale. The guiding rule is that the server never trusts a client-supplied price, total, or stock; client carts are intents only, and the backend stays the authoritative source for money and inventory, recomputed at every cart merge and checkout.",
    role: 'Solo developer across a polyglot monorepo — TanStack storefront and admin (TypeScript), Kotlin/Ktor backend, and the OpenAPI contract that ties them together.',
    outcome:
      'A contract-first architecture where an OpenAPI spec generates the typed API client shared by a server-rendered storefront and an authenticated admin SPA, backed by Ktor + Exposed on PostgreSQL. Built as a reference codebase — bounded contexts, Architecture Decision Records, and a phased roadmap (read paths before writes) documented in the repo — to demonstrate scalable, well-separated full-stack design rather than feature breadth.',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description: 'This responsive portfolio website showcasing my projects and skills as a developer.',
    image: projectImage('portfolio.png', 559, 324, [320, 640], 'Portfolio home page', CARD_SIZES),
    additionalImages: [
      projectImage('portfolio-mobile-1.png', 1419, 2796, [480, 960], 'Portfolio mobile home page'),
      projectImage('portfolio-mobile-2.png', 1419, 2796, [480, 960], 'Portfolio mobile projects page'),
      projectImage('portfolio-mobile-3.png', 1419, 2796, [480, 960], 'Portfolio mobile project detail page'),
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'React Router', 'Netlify Functions', 'Resend'],
    categories: ['web'],
    github: 'https://github.com/terzidest/my_portfolio',
    problem:
      "The existing portfolio framed me as a 'React & React Native developer' and was drifting from how I actually work today. I needed a site that reflects my current Frontend Engineer positioning — architecture, scalability, testability — and that I'd actually maintain over time.",
    role: 'Solo — design, implementation, and deployment of a TypeScript-strict React app with a serverless contact-form backend.',
    outcome:
      "Live at terzidest.netlify.app from a single `main` branch that deploys to both Netlify (primary) and GitHub Pages, end-to-end TypeScript under strict mode, and a Netlify Function for the contact form using Resend — with honeypot spam protection, length caps, and an opt-in auto-reply.",
  },
  {
    id: 'little-lemon',
    title: 'Little Lemon',
    description: 'A mobile app fetching data from firebase and filtering effectively.',
    image: projectImage('little-lemon.png', 1419, 2796, [480, 960], 'Little Lemon restaurant home screen', CARD_SIZES),
    additionalImages: [
      projectImage('little-lemon-2.png', 1419, 2796, [480, 960], 'Little Lemon onboarding screen'),
      projectImage('little-lemon.png', 1419, 2796, [480, 960], 'Little Lemon restaurant home screen'),
      projectImage('little-lemon-3.png', 1419, 2796, [480, 960], 'Little Lemon menu filters'),
    ],
    techStack: ['React Native', 'JavaScript', 'Firebase', 'Nativewind', 'React Navigation', 'Zustand'],
    categories: ['mobile'],
    github: 'https://github.com/terzidest/little-lemon',
    problem:
      "Course-derived brief from Meta's React Native Specialization: build a complete restaurant menu mobile experience covering onboarding, authentication, browsable menu items, and search/filter — exercising end-to-end React Native fundamentals against a realistic domain rather than a toy app.",
    role: 'Solo developer — UI, state, navigation, persistence, and Firebase integration.',
    outcome:
      'A working app covering the full brief: auth, menu browsing with search and filter, and a clean component layer with shared primitives. Used to consolidate the Meta React Native Specialization material and as a reference codebase for later React Native work.',
  }
];

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

// Helper function to get all project IDs
export const getAllProjectIds = (): string[] => {
  return projects.map(project => project.id);
};

// Helper function to get next and previous project IDs
export const getAdjacentProjectIds = (
  currentId: string
): { prevId: string | null; nextId: string | null } => {
  const ids = getAllProjectIds();
  const currentIndex = ids.indexOf(currentId);

  return {
    prevId: currentIndex > 0 ? ids[currentIndex - 1] : null,
    nextId: currentIndex < ids.length - 1 ? ids[currentIndex + 1] : null
  };
};
