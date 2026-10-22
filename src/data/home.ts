export type FeatureIcon = 'architecture' | 'web' | 'mobile' | 'firebase' | 'automation';

export interface HomeFeature {
  title: string;
  description: string;
  icon: FeatureIcon;
}

export const homeFeatures: HomeFeature[] = [
  {
    title: 'Frontend Architecture & CMS',
    description:
      'Designing React/Next.js systems that scale with the team — reusable components, shared conventions, and type-safe, CMS-driven page builders with a single validation boundary.',
    icon: 'architecture',
  },
  {
    title: 'End-to-End Delivery & Releases',
    description:
      'Shipping complete product flows across storefront, backoffice and APIs — then owning the production release: readiness checks, targeted cherry-picks and verifying what actually deployed.',
    icon: 'web',
  },
  {
    title: 'Automation & Backend',
    description:
      'Building the tooling that keeps a platform healthy — scheduled flow checks that open and close their own issues, translation sync, deploy verification — plus production backend work in Go.',
    icon: 'automation',
  },
];
