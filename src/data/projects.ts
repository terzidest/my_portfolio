import type { Project } from '../types';

const getImagePath = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;

// src/data/projects.ts
export const projects: Project[] = [
  {
    id: 'stack-game',
    title: 'Stack Game',
    description: 'A from-scratch mobile stack game built with Expo, Skia, and Reanimated worklets.',
    image: getImagePath('/assets/images/projects/stack-game.png'),
    additionalImages: [
      getImagePath('/assets/images/projects/stack-game-2.png'),
      getImagePath('/assets/images/projects/stack-game-3.png'),
    ],
    techStack: ['Expo', 'React Native', 'TypeScript', 'React Native Skia', 'Reanimated', 'Gesture Handler'],
    categories: ['mobile'],
    github: 'https://github.com/terzidest/stack-game',
    featured: true,
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
    image: getImagePath('/assets/images/projects/info-vault.png'),
    additionalImages: [
      getImagePath('/assets/images/projects/info-vault-2.png'),
      getImagePath('/assets/images/projects/info-vault.png'),
      getImagePath('/assets/images/projects/info-vault-3.png'),
    ],
    techStack: ['React Native', 'Expo', 'Secure Store', 'Biometric Authentication', 'Encryption'],
    categories: ['mobile'],
    github: 'https://github.com/terzidest/InfoVault',
    featured: true,
    problem:
      "I wanted a password manager that never leaves the device — no cloud sync, no third-party server — backed by OS-level biometrics and encryption at rest. An exercise in handling genuinely sensitive data inside a React Native app.",
    role: 'Solo developer — architecture, encryption layer, UI, and biometric integration.',
    outcome:
      'A functional offline-only vault built on Expo SecureStore and platform biometrics. Demonstrates safe handling of sensitive data and use of platform-specific security APIs from a React Native codebase.',
  },
  {
    id: 'ethereal-nature',
    title: 'EtherealNature',
    description: 'A cross-platform e-commerce solution with shared Firebase backend for web and mobile.',
    image: getImagePath('/assets/images/projects/ethnature.png'),
    additionalImages: [
      getImagePath('/assets/images/projects/ethnature.png'),
      getImagePath('/assets/images/projects/ethnature2.png'),
      getImagePath('/assets/images/projects/ethnature3.png'),
    ],
    techStack: ['React Native', 'React', 'Firebase', 'Firestore', 'Authentication', 'Monorepo'],
    categories: ['mobile', 'web'],
    github: 'https://github.com/terzidest/ethereal_nature',
    featured: true,
    problem:
      'A small essential-oils business needed a web storefront, a mobile app, and an admin interface — all sharing the same product and order data without three disconnected databases or duplicated business logic.',
    role: 'Solo developer across the monorepo — mobile (React Native), web (React), shared Firebase backend, and admin tooling.',
    outcome:
      'A unified ecosystem with shared auth, shared data, and a single source of truth in Firestore. Demonstrates monorepo organization and shared-backend architecture across web and mobile in one codebase.',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description: 'This responsive portfolio website showcasing my projects and skills as a developer.',
    image: getImagePath('/assets/images/projects/portfolio.png'),
    additionalImages: [
      getImagePath('/assets/images/projects/portfolio-mobile-1.png'),
      getImagePath('/assets/images/projects/portfolio-mobile-2.png'),
      getImagePath('/assets/images/projects/portfolio-mobile-3.png'),
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'React Router', 'Netlify Functions', 'Resend'],
    categories: ['web'],
    github: 'https://github.com/terzidest/my_portfolio',
    featured: true,
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
    image: getImagePath('/assets/images/projects/little-lemon.png'),
    additionalImages: [
      getImagePath('/assets/images/projects/little-lemon-2.png'),
      getImagePath('/assets/images/projects/little-lemon.png'),
      getImagePath('/assets/images/projects/little-lemon-3.png'),
    ],
    techStack: ['React Native', 'JavaScript', 'Firebase', 'Nativewind', 'React Navigation', 'Zustand'],
    categories: ['mobile'],
    github: 'https://github.com/terzidest/little-lemon',
    featured: true,
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
