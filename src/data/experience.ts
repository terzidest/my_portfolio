import type { Experience } from '../types';

// Ordered most-recent-first. Wording mirrors the CV.
export const experiences: Experience[] = [
  {
    title: 'Frontend Engineer',
    company: 'Digitech Marketing',
    dates: 'Nov 2025 – Present · Athens, Greece',
    description:
      'Develop a multi-jurisdiction iGaming platform spanning React/Next.js storefronts, CMS backoffice applications and engineering tooling within a seven-person engineering team.',
    bullets: [
      {
        label: 'Frontend architecture & migration',
        text: 'Delivered core player experiences across two generations of the React/Next.js storefront; established reusable components, coding conventions and responsive design patterns adopted by the team.',
      },
      {
        label: 'CMS & Page Builder',
        text: 'Architected a modular, type-safe Page Builder with a single data-validation boundary and dynamically rendered CMS blocks; built connected backoffice editors for promotions, carousels, media and localized content.',
      },
      {
        label: 'End-to-end delivery',
        text: 'Implemented features spanning game discovery, account profiles, rewards, promotions, inbox, verification and deposit flows, integrating CMS data, backend APIs and third-party services.',
      },
      {
        label: 'Production release ownership',
        text: 'Coordinated storefront and backoffice production releases, assessed release readiness, selectively cherry-picked fixes when needed and verified deployed builds.',
      },
      {
        label: 'Automation & reliability',
        text: 'Built a scheduled staging sentinel that checks critical player flows and automatically opens/closes GitHub issues; developed nightly translation synchronization and reusable deployment verification tools.',
      },
      {
        label: 'Complex debugging',
        text: 'Resolved production build and routing failures in Next.js, Safari authentication/payment issues, dependency conflicts and CMS translation publishing defects; led a QA-driven CMS stabilization round.',
      },
      {
        label: 'Backend & security',
        text: 'Implemented and tested failed-login protection in Go, including account/IP-aware progressive lockouts, account-enumeration safeguards and resilient cache-failure handling, integrated with frontend lockout feedback.',
      },
    ],
  },
  {
    title: 'React & React Native Developer',
    company: 'Freelance / Self-Employed',
    dates: 'Feb 2020 – Oct 2025 · Remote',
    description:
      'Independently delivered web and mobile products for international clients, from requirements and implementation to integrations and deployment.',
    bullets: [
      {
        text: 'Delivered 10+ React and React Native web/mobile projects, including e-commerce applications, fitness products and business administration tools.',
      },
      {
        text: 'Built customer-facing functionality for authentication, shopping carts, payments, order management and notifications, alongside admin interfaces for managing products, users and operational workflows.',
      },
      {
        text: 'Developed a fitness management solution with a React Native client application and React admin panel for workout programs, assignments, client progress and studio operations.',
      },
      {
        text: 'Extended existing production React codebases with features, Figma-based interfaces and bug fixes, adapting to established architectures and delivery processes.',
      },
    ],
  },
  {
    title: 'SAP ABAP Developer',
    company: 'IT-TELESIS',
    dates: 'Dec 2018 – Jan 2020',
    bullets: [
      {
        text: 'Developed custom reports (ALV, CSV export), Smart Forms, and BADI enhancements for Quality Management and Production Planning SAP modules.',
      },
      {
        text: 'Built custom UI extensions including tabs, validation error handling, and mass-maintenance tooling for custom fields, supporting day-to-day operations for manufacturing teams.',
      },
    ],
  },
];
