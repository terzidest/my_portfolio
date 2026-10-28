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

// Order matters: the first entry leads the list (see CLAUDE.md).
export const projects: Project[] = [
  {
    id: 'blockprint',
    title: 'blockprint',
    label: 'web · open source',
    description: 'An open-source, type-safe CMS renderer for React: a compile-time-checked component registry, Standard Schema validation and safe fallbacks for malformed blocks.',
    image: projectImage('blockprint.png', 1600, 1000, [320, 640, 1280], 'blockprint demo: JSON config beside the page it renders, with the hero block highlighted in both', CARD_SIZES),
    additionalImages: [
      projectImage('blockprint.png', 1600, 1000, [320, 640, 1280], 'blockprint demo split view: config and rendered page with hover-sync'),
      projectImage('blockprint-2.png', 1600, 1000, [320, 640, 1280], 'blockprint broken-config demo: invalid blocks render fallback cards while the rest of the page renders'),
    ],
    techStack: ['React', 'TypeScript', 'Vitest', 'npm', 'Standard Schema'],
    categories: ['web'],
    github: 'https://github.com/terzidest/blockprint',
    links: [
      { label: 'Live demo', href: 'https://blockprint.terzidest.com' },
      { label: 'npm', href: 'https://www.npmjs.com/package/blockprint' },
    ],
    problem:
      "Content teams compose pages from a fixed set of block types without touching code. Consuming those configs in React usually collapses into a switch on block.type: every block imported into every page, props typed as any, and unknown types either crashing the page or silently vanishing.\n\nblockprint generalises the Page Builder pattern I use in production into a library: you define the blocks and their prop types, register them once, and render any config, including configs that contain block types you've never seen.",
    role: 'Author and maintainer — API design, type-level guarantees, runtime validation, tests, docs and the live demo.',
    outcome:
      'Published on npm as a dependency-light React library. A registered component whose props do not match its schema is a compile error on that registry key, not a runtime crash; unknown block types and schema-rejected props render a configurable fallback, so a page never breaks because the CMS shipped something unexpected.\n\nThe live demo renders three very different pages (commerce, SaaS, editorial) from one renderer and one registry, plus a deliberately broken config you can edit live to watch the fallbacks catch it. Runtime and type-level behaviour are both covered by tests.',
  },
  {
    id: 'ethereal-nature',
    title: 'EtherealNature',
    label: 'web · full-stack',
    description: 'A full-stack e-commerce platform: an SSR TanStack Start storefront and admin dashboard over a modular Kotlin/Ktor + PostgreSQL backend, tied together by generated OpenAPI clients.',
    image: projectImage('ethnature.png', 1600, 1000, [320, 640, 1280], 'EtherealNature storefront home page', CARD_SIZES),
    additionalImages: [
      projectImage('ethnature.png', 1600, 1000, [320, 640, 1280], 'EtherealNature storefront home page'),
      projectImage('ethnature-2.png', 1600, 1000, [320, 640, 1280], 'EtherealNature product catalog'),
      projectImage('ethnature-3.png', 1600, 1000, [320, 640, 1280], 'EtherealNature cart drawer with the estimated total and checkout'),
      projectImage('ethnature-4.png', 1600, 1000, [320, 640, 1280], 'EtherealNature admin dashboard in read-only demo mode: product and order counts, recent orders'),
      projectImage('ethnature-5.png', 1600, 1000, [320, 640, 1280], 'EtherealNature admin product list with category filter, search, prices and stock'),
    ],
    techStack: ['TanStack Start', 'React', 'TypeScript', 'Kotlin', 'Ktor', 'PostgreSQL', 'Turborepo', 'OpenAPI'],
    categories: ['web'],
    github: 'https://github.com/terzidest/ethereal_nature',
    links: [
      { label: 'Storefront', href: 'https://eth-nature.terzidest.com' },
      { label: 'Admin demo', href: 'https://eth-nature-admin.terzidest.com' },
    ],
    problem:
      "A deliberately minimal e-shop domain — catalog, cart, ordering, identity — used as a vehicle for the hard part: structural integrity at scale. The guiding rule is that the server never trusts a client-supplied price, total, or stock; client carts are intents only, and the backend stays the authoritative source for money and inventory, recomputed at every cart merge and checkout.",
    role: 'Solo developer across a polyglot monorepo — TanStack storefront and admin (TypeScript), Kotlin/Ktor backend, and the OpenAPI contract that ties them together.',
    outcome:
      'A working shop you can try: a server-rendered storefront for browsing the catalog, cart and checkout, and an authenticated admin dashboard for managing products and orders, both live. They share a typed API client generated from an OpenAPI spec and run on a Ktor + Exposed backend over PostgreSQL.\n\nUnder the hood it is organised into bounded contexts, with Architecture Decision Records and a phased roadmap documented in the repo.',
  },
  {
    id: 'infovault',
    title: 'InfoVault',
    label: 'mobile · security',
    description: 'A local-first encrypted mobile vault: AES-256-GCM encryption, biometric unlock, protected key storage, auto-lock and screen-capture protection.',
    image: projectImage('info-vault.png', 1419, 2796, [480, 960], 'InfoVault password list', CARD_SIZES),
    additionalImages: [
      projectImage('info-vault-2.png', 1419, 2796, [480, 960], 'InfoVault authentication screen'),
      projectImage('info-vault.png', 1419, 2796, [480, 960], 'InfoVault password list'),
      projectImage('info-vault-3.png', 1419, 2796, [480, 960], 'InfoVault credential detail screen'),
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Secure Store', 'Biometric Authentication', 'AES-256-GCM'],
    categories: ['mobile'],
    github: 'https://github.com/terzidest/InfoVault',
    links: [
      { label: 'Android demo', href: 'https://appetize.io/app/b_po4aou3mjf27ojws3ogxk5iytq' },
      { label: 'Android APK', href: 'https://github.com/terzidest/InfoVault/releases/latest/download/InfoVault.apk' },
    ],
    problem:
      "I wanted a password manager that never leaves the device — no cloud sync, no third-party server — backed by OS-level biometrics and encryption at rest. An exercise in handling genuinely sensitive data inside a React Native app.",
    role: 'Solo developer — architecture, encryption layer, UI, and biometric integration.',
    outcome:
      'An offline-only vault: entries encrypted at rest with AES-256-GCM, keys held in protected platform storage via Expo SecureStore, biometric unlock, automatic locking and screen-capture protection. Runnable in the browser through the Appetize demo, or installable from the released APK.',
  },
  {
    id: 'stack-game',
    title: 'Stack Game',
    label: 'mobile · game',
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
];

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

// The leading projects, shown on the home page.
export const getFeaturedProjects = (count = 3): Project[] => projects.slice(0, count);

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
