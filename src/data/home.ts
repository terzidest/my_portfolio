export const hero = {
  eyebrow: 'Senior Frontend Engineer · Athens',
  name: 'Triantaphilos Terzides',
  intro:
    'React and TypeScript first, with an eye on how the whole system fits together. Straightforward solutions, clear responsibilities, code other developers can maintain.',
};

export type FocusIcon = 'architecture' | 'dashboard' | 'mobile';

export interface FocusArea {
  title: string;
  text: string;
  icon: FocusIcon;
}

// Capabilities, not achievements: those belong to Experience on About.
export const focusAreas: FocusArea[] = [
  {
    title: 'React architecture',
    text: 'Frontends that stay maintainable as they grow: feature-based structure, typed data boundaries, and state that lives where it belongs.',
    icon: 'architecture',
  },
  {
    title: 'Complex UI & dashboards',
    text: 'Data-heavy interfaces, admin tools and content editors, built from reusable components and kept fast and accessible.',
    icon: 'dashboard',
  },
  {
    title: 'Cross-platform mobile',
    text: 'iOS and Android apps with React Native and Expo, sharing logic with the web codebase where it makes sense.',
    icon: 'mobile',
  },
];
