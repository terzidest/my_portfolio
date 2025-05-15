// src/data/projects.js
export const projects = [
  {
    id: 'little-lemon',
    title: 'Little Lemon',
    description: 'A mobile app fetching data from APIs, storing locally, and filtering effectively.',
    image: '/assets/images/projects/little-lemon.png',
    additionalImages: [
      '/assets/images/projects/little-lemon-2.jpg',
      '/assets/images/projects/little-lemon-3.jpg',
      '/assets/images/projects/little-lemon-4.jpg',
    ],
    techStack: ['React Native', 'JavaScript', 'API Integration', 'Local Storage', 'Navigation'],
    categories: ['mobile'],
    github: 'https://github.com/terzidest/little-lemon',
    featured: true,
    longDescription: `
      Little Lemon is a comprehensive mobile application for a restaurant that demonstrates my skills in React Native development.
      
      The app features a clean, intuitive user interface that allows users to browse the restaurant's menu, place orders, and make reservations.
      
      Key technical features include:
      - Efficient data fetching from REST APIs
      - Local storage implementation for offline access
      - Complex filtering and search functionality
      - Clean architecture with reusable components
      - Performance optimization for smooth scrolling and transitions
    `,
    features: [
      'User authentication',
      'Menu browsing with categories',
      'Item filtering and search',
      'Order placement',
      'Reservation system',
      'Profile management'
    ],
    challenges: [
      'Implementing efficient local storage sync',
      'Optimizing image loading for performance',
      'Creating a smooth, intuitive filtering interface'
    ],
    process: [
      {
        title: 'Research & Planning',
        description: 'I began by researching restaurant apps and identifying key user needs. This informed my planning process where I created wireframes and user flows.'
      },
      {
        title: 'Design & Architecture',
        description: 'Next, I designed the UI components and planned the app architecture with a focus on performance and maintainability.'
      },
      {
        title: 'Development',
        description: 'Development followed a feature-by-feature approach, starting with core functionality and gradually adding advanced features.'
      },
      {
        title: 'Testing & Refinement',
        description: 'I conducted thorough user testing and made refinements based on feedback to ensure a polished final product.'
      }
    ],
    outcomes: 'The app successfully streamlined the ordering process, resulting in increased customer satisfaction and higher order volume.',
    relatedProjects: ['infovault', 'ethereal-nature']
  },
  {
    id: 'infovault',
    title: 'InfoVault',
    description: 'A password manager with secure local authentication.',
    image: '/assets/images/projects/info-vault.png',
    additionalImages: [
      '/assets/images/projects/infovault-2.jpg',
      '/assets/images/projects/infovault-3.jpg',
      '/assets/images/projects/infovault-4.jpg',
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
    features: [
      'Biometric authentication (fingerprint/face)',
      'AES-256 encryption for stored data',
      'Auto-fill integration with device',
      'Password strength analyzer',
      'Secure notes feature',
      'Automatic backup options'
    ],
    challenges: [
      'Implementing secure storage without compromising UX',
      'Creating a reliable biometric authentication flow',
      'Ensuring proper encryption key management'
    ],
    process: [
      {
        title: 'Security Research',
        description: 'Extensive research into mobile security best practices and encryption standards to ensure the highest level of data protection.'
      },
      {
        title: 'UX Design',
        description: 'Focused on creating a user interface that balances security with usability, making secure password management accessible.'
      },
      {
        title: 'Secure Development',
        description: 'Implemented secure storage mechanisms and biometric authentication while following security best practices throughout the development process.'
      },
      {
        title: 'Security Testing',
        description: 'Conducted rigorous security testing including penetration testing and vulnerability assessments to identify and address potential security risks.'
      }
    ],
    outcomes: 'InfoVault provides users with a secure, easy-to-use solution for managing their sensitive information, with positive feedback on both security features and user experience.',
    relatedProjects: ['little-lemon', 'ethereal-nature']
  },
  {
    id: 'ethereal-nature',
    title: 'EtherealNature',
    description: 'A cross-platform e-commerce solution with shared Firebase backend for web, mobile and admin panel.',
    image: '/assets/images/projects/ethnature.png',
    additionalImages: [
      '/assets/images/projects/ethereal-nature-web.jpg',
      '/assets/images/projects/ethereal-nature-mobile.jpg',
      '/assets/images/projects/ethereal-nature-admin.jpg',
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
    `,
    features: [
      'Unified user authentication across platforms',
      'Shared product catalog with categories',
      'Platform-optimized interfaces',
      'Shopping cart synchronization across devices',
      'Responsive web design with mobile-first approach',
      'Admin dashboard for inventory and order management',
      'Real-time data synchronization',
      'Push notifications'
    ],
    challenges: [
      'Creating consistent experiences across platforms',
      'Structuring a maintainable monorepo architecture',
      'Implementing secure payment processing',
      'Optimizing shared code while respecting platform differences',
      'Maintaining type safety across the codebase'
    ],
    process: [
      {
        title: 'Architecture Planning',
        description: 'Designed a scalable architecture that allows code sharing between platforms while respecting platform-specific requirements.'
      },
      {
        title: 'Backend Development',
        description: 'Built a robust Firebase backend with secure data models, authentication flows, and cloud functions for business logic.'
      },
      {
        title: 'Web & Mobile Development',
        description: 'Created the web and mobile frontends with a focus on responsive design, performance, and consistent user experience.'
      },
      {
        title: 'Admin Panel Implementation',
        description: 'Developed an administrative interface that provides powerful tools for managing products, orders, and customers.'
      },
      {
        title: 'Integration & Testing',
        description: 'Integrated payment processing and conducted extensive cross-platform testing to ensure seamless operation.'
      }
    ],
    outcomes: 'The EtherealNature platform has enabled the business to reach customers across multiple channels while maintaining operational efficiency through the centralized admin panel.',
    relatedProjects: ['little-lemon', 'infovault', 'portfolio']
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
      as a React and React Native developer. The site itself serves as a demonstration of my web development 
      capabilities and design sensibilities.
      
      Built with React, Vite, and TailwindCSS, the portfolio features a clean, responsive design that works 
      seamlessly across all devices. The site is structured to provide an optimal user experience, with smooth 
      navigation and transitions between sections.
      
      This project was an opportunity to apply best practices in web development and to create a platform 
      that effectively communicates my professional identity and technical expertise.
    `,
    features: [
      'Responsive design for all device sizes',
      'Modern UI with subtle animations',
      'Project showcase with detailed case studies',
      'Skills and expertise highlighting',
      'Contact form for easy communication',
      'Optimized performance and accessibility',
      'Clean, maintainable code structure'
    ],
    challenges: [
      'Creating an elegant, professional design that stands out',
      'Implementing responsive layouts that work across all devices',
      'Optimizing image assets for performance',
      'Balancing visual appeal with fast load times',
      'Structuring project data for easy maintenance'
    ],
    process: [
      {
        title: 'Design & Planning',
        description: 'Researched portfolio best practices and designed a layout that effectively showcases my work while being visually appealing.'
      },
      {
        title: 'Technology Selection',
        description: 'Selected modern technologies (React, Vite, TailwindCSS) that demonstrate my technical skills while providing excellent performance.'
      },
      {
        title: 'Development',
        description: 'Built the site with a component-based architecture focused on reusability and maintainability.'
      },
      {
        title: 'Optimization',
        description: 'Optimized performance, accessibility, and SEO to ensure the site ranks well and provides a great user experience.'
      }
    ],
    outcomes: 'This portfolio effectively showcases my projects and skills to potential clients and employers, with a clean, professional design that highlights my work.',
    relatedProjects: ['ethereal-nature']
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
