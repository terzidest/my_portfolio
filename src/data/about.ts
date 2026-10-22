import { createResponsiveImage } from './images';

interface Education {
  degree: string;
  /** Verifiable degree badge (AUEB alumni) */
  link: string;
  institution: string;
  graduationDate: string;
  specializations: string[];
  courses: string[];
}

interface Certification {
  title: string;
  link: string;
}

export const education: Education = {
  degree: 'BSc in Informatics',
  link: 'https://alumni.aueb.gr/el/aueb-alumni-mybadge/1162/1026332541',
  institution: 'Athens University of Economics and Business, Athens, Greece',
  graduationDate: 'September 2018',
  specializations: [
    'Computer Systems & Networks',
    'Operational Research & Economics of Information Technology',
  ],
  courses: [
    'Data Structures',
    'Algorithms',
    'Databases',
    'Computer Networks',
    'Distributed Systems',
    'Web Technologies',
    'Software Engineering',
    'C++',
    'Java',
  ],
};

export const languages: string[] = ['Greek (native)', 'English (professional working proficiency)'];

export const certifications: Certification[] = [
  {
    title: 'React Native Specialization by Meta',
    link: 'https://www.coursera.org/account/accomplishments/specialization/7L64OF9339YZ',
  },
  {
    title: 'freeCodeCamp JavaScript Algorithms and Data Structures',
    link: 'https://freecodecamp.org/certification/fcc5f3e71e4-78d0-4fe4-94a6-e7e9bd0b6e15/javascript-algorithms-and-data-structures',
  },
  {
    title: 'Hackerrank Software Engineering',
    link: 'https://www.hackerrank.com/certificates/0957a98d8f1f',
  },
  {
    title: 'Hackerrank Frontend Development (React)',
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
