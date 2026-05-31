import type { Experience } from '../types';

// Ordered most-recent-first.
export const experiences: Experience[] = [
  {
    title: 'Frontend Engineer',
    company: 'Digitech Marketing',
    dates: '2025 – present',
    description:
      'Frontend architect and lead developer on a large-scale, CMS-driven online casino platform built with Next.js App Router, TypeScript, and fully dynamic SSR. Joined an existing codebase and introduced scalable patterns across the application.',
    bullets: [
      'Designed and enforced a layered frontend architecture (UI → Hooks → Services → API) with React Query for server state and Context + reducer for global UI/auth, establishing patterns adopted across the team.',
      'Rebuilt the CMS Page Builder from the ground up: replaced a grouped component system with an ordered rendering pipeline using typed domain models (ICmsPageComponent → CmsComponentWithData), a single validation boundary for safe type narrowing, and dynamic block mapping that allowed new CMS components to be added without touching core rendering logic.',
      'Diagnosed and resolved a critical Next.js architectural issue: identified a mismatch between static rendering assumptions and runtime-dependent data, then implemented route groups with force-dynamic to fix broken 404 behavior, hydration errors, and production build failures across 20+ routes.',
      'Owned the notification/inbox system end-to-end: drawer-based UI with inline preview, React Query caching with optimistic updates, unread count polling, mark-as-read and clear-all actions — achieving zero redundant fetches through cache-driven detail rendering.',
      'Implemented the full authentication and session lifecycle: cookie-based auth with interceptor-driven auto-logout (401), multi-step registration flow (Bonus → Credentials → Info → Resume) with localStorage persistence, auto-login after registration, and API orchestration across register/login/bonus endpoints.',
      'Delivered CMS-driven UI systems including hero carousels with responsive positioning and clamping logic, infinite-scroll game listings with dynamic multi-axis filtering (category, provider, features), SSR-friendly SEO content blocks, and configurable marketing widgets.',
      'Integrated real-time updates via Server-Sent Events (SSE), built OTP phone verification flows, implemented session-based locale/country handling tied to iGaming regulatory requirements, and created an i18n debug mode for translation QA.',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Freelance (Fiverr, Upwork, Direct Clients)',
    dates: '2021 – 2025',
    description:
      'Delivered 10+ client projects across mobile and web, working directly with non-technical stakeholders from requirements through deployment.',
    bullets: [
      'Built and shipped MVP mobile applications with React Native, Expo, and Firebase, including authentication systems, local encrypted storage, push notifications, and third-party API integrations.',
      'Developed companion admin panels and web dashboards enabling clients to manage app content, users, and data without developer intervention.',
      'Created professional portfolio websites and landing pages with React and Vite, featuring responsive layouts, contact form integrations, and automated CI/CD deployment via GitHub Actions and Netlify.',
    ],
  },
  {
    title: 'SAP ABAP Developer',
    company: 'IT-TELESIS',
    dates: '2018 – 2020',
    bullets: [
      'Developed custom reports (ALV, CSV export), Smart Forms, and BADI enhancements for Quality Management and Production Planning SAP modules.',
      'Built custom UI extensions including tabs, validation error handling, and mass-maintenance tooling for custom fields, supporting day-to-day operations for manufacturing teams.',
    ],
  },
];
