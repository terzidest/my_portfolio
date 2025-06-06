// src/data/projects.js
export const projects = [
  {
    id: 'little-lemon',
    title: 'Little Lemon',
    description: 'A mobile app fetching data from firebase and filtering effectively.',
    image: '/assets/images/projects/little-lemon.png',
    additionalImages: [
      '/assets/images/projects/little-lemon-2.png',
      '/assets/images/projects/little-lemon.png',
      '/assets/images/projects/little-lemon-3.png',
    ],
    techStack: ['React Native', 'JavaScript', 'Firebase', 'Nativewind', 'React Navigation', 'Zustand'],
    categories: ['mobile'],
    github: 'https://github.com/terzidest/little-lemon',
    featured: true,
    longDescription: `
      Little Lemon is a comprehensive mobile application for a restaurant that demonstrates my skills in React Native development.
      
      The app features a clean, intuitive user interface that allows users to browse the restaurant's menu.
      
      Key technical features include:
      - User Authentication
      - Menu Items preview
      - Filtering and search functionality
      - Clean architecture with reusable components
      - Performance optimization for smooth scrolling and transitions
    `
  },
  {
    id: 'infovault',
    title: 'InfoVault',
    description: 'A password manager with secure local authentication.',
    image: '/assets/images/projects/info-vault.png',
    additionalImages: [
      '/assets/images/projects/info-vault-2.png',
      '/assets/images/projects/info-vault.png',
      '/assets/images/projects/info-vault-3.png',
    ],
    techStack: ['React Native', 'Expo', 'Secure Store', 'Biometric Authentication', 'Encryption'],
    categories: ['mobile'],
    github: 'https://github.com/terzidest/InfoVault',
    featured: true,
    longDescription: `
      InfoVault is a secure password management application built with React Native and Expo.
      
      The app provides a secure way for users to store their passwords and sensitive information locally on their device,
      protected by biometric authentication and encryption.
      
      Security was the top priority for this project, implementing industry best practices for
      data protection and user privacy.
    `,
  },
  {
    id: 'ethereal-nature',
    title: 'EtherealNature',
    description: 'A cross-platform e-commerce solution with shared Firebase backend for web and mobile.',
    image: '/assets/images/projects/ethnature.png',
    additionalImages: [
      '/assets/images/projects/ethnature.png',
      '/assets/images/projects/ethnature.png',
      '/assets/images/projects/ethnature.png',
    ],
    techStack: ['React Native', 'React', 'Firebase', 'Firestore', 'Authentication', 'Cloud Functions', 'Payment Processing', 'Monorepo'],
    categories: ['mobile', 'web'],
    github: 'https://github.com/terzidest/etherealNature',
    featured: true,
    longDescription: `
      EtherealNature is a full-featured e-commerce ecosystem specialized for an essential oils business,
      encompassing web, mobile, and admin interfaces with a shared Firebase backend.
      
      The platform combines clean, appealing interfaces with powerful e-commerce functionality across 
      all touchpoints. The mobile app is built with React Native, the web interface with React, and 
      everything is unified through a common Firebase backend with a monorepo workspace structure.
      
      This project demonstrates my ability to architect and build complex, production-ready 
      cross-platform applications with shared business logic and consistent user experiences.
    `
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description: 'This responsive portfolio website showcasing my projects and skills as a developer.',
    image: '/assets/images/projects/portfolio.jpg',
    additionalImages: [
      '/assets/images/projects/portfolio-mobile.jpg',
      '/assets/images/projects/portfolio-projects.jpg',
      '/assets/images/projects/portfolio-detail.jpg',
    ],
    techStack: ['React', 'Vite', 'TailwindCSS', 'React Router', 'Responsive Design'],
    categories: ['web'],
    github: 'https://github.com/terzidest/portfolio',
    featured: true,
    longDescription: `
      My personal portfolio website is built using modern web technologies to showcase my projects and skills 
      as a React and React Native developer. The site itself serves as a demonstration of my web development and design
      capabilities.
      
      Built with React, Vite, and TailwindCSS, the portfolio features a clean, responsive design that works 
      seamlessly across all devices. The site is structured to provide an optimal user experience, with smooth 
      navigation and transitions between sections.
      
      This project was an opportunity to apply best practices in web development and to create a platform 
      that effectively communicates my professional identity and technical expertise.
    `
  }
];

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};

// Helper function to get all project IDs
export const getAllProjectIds = () => {
  return projects.map(project => project.id);
};

// Helper function to get next and previous project IDs
export const getAdjacentProjectIds = (currentId) => {
  const ids = getAllProjectIds();
  const currentIndex = ids.indexOf(currentId);
  
  return {
    prevId: currentIndex > 0 ? ids[currentIndex - 1] : null,
    nextId: currentIndex < ids.length - 1 ? ids[currentIndex + 1] : null
  };
};
