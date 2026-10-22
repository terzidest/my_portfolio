export interface SkillGroup {
  title: string;
  skills: string[];
}

// Mirrors the "Core skills" section of the CV.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js (App Router)', 'TypeScript', 'JavaScript', 'TanStack Start', 'React Native', 'Expo'],
  },
  {
    title: 'State & APIs',
    skills: ['TanStack Query', 'Zustand', 'React Context', 'REST APIs', 'OpenAPI', 'Axios'],
  },
  {
    title: 'UI & Styling',
    skills: ['Tailwind CSS', 'Material UI', 'HeroUI', 'Responsive design', 'HTML', 'CSS'],
  },
  {
    title: 'Backend',
    skills: ['Go', 'Node.js', 'Kotlin/Ktor', 'PostgreSQL', 'Firebase'],
  },
  {
    title: 'Engineering',
    skills: ['SSR', 'CMS-driven architecture', 'i18n', 'CI/CD', 'GitHub Actions', 'Docker', 'Git', 'pnpm', 'Turborepo', 'Vitest', 'Jest'],
  },
];
