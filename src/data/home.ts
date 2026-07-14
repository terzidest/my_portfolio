export type FeatureIcon = 'architecture' | 'web' | 'mobile' | 'firebase';

export interface HomeFeature {
  title: string;
  description: string;
  icon: FeatureIcon;
}

export const homeFeatures: HomeFeature[] = [
  {
    title: 'React Ecosystem Architecture',
    description:
      'Designing scalable frontend systems with React — feature-based module structure, performant state management, and clean separation between UI and domain logic.',
    icon: 'architecture',
  },
  {
    title: 'Complex UI & Dashboard Development',
    description:
      'Building data-heavy interfaces, real-time dashboards, and admin platforms that handle scale — with a focus on performance, accessibility, and maintainability.',
    icon: 'web',
  },
  {
    title: 'Cross-Platform Mobile Development',
    description:
      'Delivering native-feeling iOS and Android apps with React Native and Expo, sharing logic with web codebases where it makes sense.',
    icon: 'mobile',
  },
];
