import { createResponsiveImage } from './images';

interface Education {
  degree: string;
  /** Verifiable degree badge (AUEB alumni) */
  link: string;
  institution: string;
  graduationDate: string;
  specializations: string[];
}

interface Certification {
  title: string;
  issuer: string;
  link: string;
}

interface Language {
  name: string;
  level: string;
}

export const intro = {
  heading: 'Software engineer based in Athens, Greece.',
  paragraphs: [
    'My background spans enterprise development, independent client projects and production web platforms. My work is primarily focused on frontend engineering, particularly React and TypeScript, but I enjoy understanding how the entire system fits together.',
    'I value straightforward solutions, clear responsibilities, and code that other developers can understand and maintain.',
  ],
};

export const education: Education = {
  degree: 'BSc in Informatics',
  link: 'https://alumni.aueb.gr/el/aueb-alumni-mybadge/1162/1026332541',
  institution: 'Athens University of Economics and Business',
  graduationDate: 'September 2018',
  specializations: [
    'Computer Systems & Networks',
    'Operational Research & Economics of Information Technology',
  ],
};

export const approach: { title: string; text: string }[] = [
  { title: 'Clarity over cleverness', text: 'Simple structures, clear boundaries, code that is easy to reason about.' },
  { title: 'Practical decisions', text: 'The right tool for the problem, not the trendiest one.' },
  { title: 'Ownership through delivery', text: 'From implementation to a verified release.' },
];

export const languages: Language[] = [
  { name: 'Greek', level: 'native' },
  { name: 'English', level: 'professional working proficiency' },
];

export const certifications: Certification[] = [
  {
    title: 'React Native Specialization',
    issuer: 'Meta',
    link: 'https://www.coursera.org/account/accomplishments/specialization/7L64OF9339YZ',
  },
  {
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    link: 'https://freecodecamp.org/certification/fcc5f3e71e4-78d0-4fe4-94a6-e7e9bd0b6e15/javascript-algorithms-and-data-structures',
  },
  {
    title: 'Software Engineering',
    issuer: 'HackerRank',
    link: 'https://www.hackerrank.com/certificates/0957a98d8f1f',
  },
  {
    title: 'Frontend Development (React)',
    issuer: 'HackerRank',
    link: 'https://www.hackerrank.com/certificates/a50abd338c65',
  },
];

export const profileImage = createResponsiveImage({
  path: '/assets/images/profile.jpg',
  webpWidths: [320, 640],
  width: 2736,
  height: 3648,
  alt: 'Triantaphilos Terzides',
  sizes: '288px',
});
