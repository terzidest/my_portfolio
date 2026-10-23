import type { SimpleIcon } from 'simple-icons';
import {
  siAxios,
  siCss,
  siDocker,
  siExpo,
  siFirebase,
  siGit,
  siGithubactions,
  siGo,
  siHeroui,
  siHtml5,
  siJavascript,
  siJest,
  siKotlin,
  siKtor,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siOpenapiinitiative,
  siPnpm,
  siPostgresql,
  siReact,
  siReactquery,
  siTailwindcss,
  siTanstack,
  siTurborepo,
  siTypescript,
  siVitest,
} from 'simple-icons';

export interface Skill {
  name: string;
  /** Shorter name for the Home tiles, when `name` is too long for one. */
  tileLabel?: string;
  /** Brand logo (Simple Icons, CC0). A tool without one gets a lettered tile. */
  icon?: SimpleIcon;
  /** A practice rather than a tool: listed in text, never given a tile. */
  concept?: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

// Mirrors the "Core skills" section of the CV.
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', icon: siReact },
      { name: 'Next.js (App Router)', tileLabel: 'Next.js', icon: siNextdotjs },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'TanStack Start', icon: siTanstack },
      { name: 'React Native', icon: siReact },
      { name: 'Expo', icon: siExpo },
    ],
  },
  {
    id: 'state-apis',
    title: 'State & APIs',
    skills: [
      { name: 'TanStack Query', icon: siReactquery },
      { name: 'Zustand' },
      { name: 'React Context', concept: true },
      { name: 'REST APIs', concept: true },
      { name: 'OpenAPI', icon: siOpenapiinitiative },
      { name: 'Axios', icon: siAxios },
    ],
  },
  {
    id: 'ui',
    title: 'UI & Styling',
    skills: [
      { name: 'Tailwind CSS', icon: siTailwindcss },
      { name: 'Material UI', icon: siMui },
      { name: 'HeroUI', icon: siHeroui },
      { name: 'Responsive design', concept: true },
      { name: 'HTML', icon: siHtml5 },
      { name: 'CSS', icon: siCss },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Go', icon: siGo },
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'Kotlin', icon: siKotlin },
      { name: 'Ktor', icon: siKtor },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'Firebase', icon: siFirebase },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    skills: [
      { name: 'SSR', concept: true },
      { name: 'CMS-driven architecture', concept: true },
      { name: 'i18n', concept: true },
      { name: 'CI/CD', concept: true },
      { name: 'GitHub Actions', icon: siGithubactions },
      { name: 'Docker', icon: siDocker },
      { name: 'Git', icon: siGit },
      { name: 'pnpm', icon: siPnpm },
      { name: 'Turborepo', icon: siTurborepo },
      { name: 'Vitest', icon: siVitest },
      { name: 'Jest', icon: siJest },
    ],
  },
];

const hexToRgb = (hex: string) =>
  [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ');

const luminance = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Logo fill and halo per theme, as RGB channels. Brand colors too close to a
 * theme's ground (black logos on navy, cream logos on light) fall back to
 * `--ink`, and their halo to the accent so it doesn't read as a grey smudge.
 */
export const logoColors = (icon: SimpleIcon) => {
  const lum = luminance(icon.hex);
  const brand = hexToRgb(icon.hex);
  const lightFallback = lum > 0.88;
  const darkFallback = lum < 0.25;
  return {
    light: lightFallback ? 'var(--ink)' : brand,
    dark: darkFallback ? 'var(--ink)' : brand,
    glowLight: lightFallback || darkFallback ? 'var(--neon)' : brand,
    glowDark: darkFallback ? 'var(--line)' : brand,
  };
};

/** CSS custom properties for a skill's logo tint (see `.tech-tile`, `.skill-chip`). */
export const logoVars = (skill: Skill): Record<string, string> => {
  const colors = skill.icon
    ? logoColors(skill.icon)
    : { light: 'var(--neon)', dark: 'var(--line)', glowLight: 'var(--neon)', glowDark: 'var(--line)' };
  return {
    '--tile-light': colors.light,
    '--tile-dark': colors.dark,
    '--glow-light': colors.glowLight,
    '--glow-dark': colors.glowDark,
  };
};

/** The skill entry for a tech-stack name (by name or tile label), if it has one. */
export const findSkill = (name: string): Skill | undefined =>
  skillGroups
    .flatMap((group) => group.skills)
    .find((skill) => skill.name === name || skill.tileLabel === name);
