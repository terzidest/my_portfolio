import { useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 'little-lemon',
      title: 'Little Lemon',
      description: 'A mobile app fetching data from APIs, storing locally, and filtering effectively.',
      image: '/assets/images/projects/little-lemon.jpg',
      techStack: ['React Native', 'JavaScript', 'API Integration', 'Local Storage'],
      category: 'mobile',
      github: 'https://github.com/terzidest/little-lemon',
      featured: true
    },
    {
      id: 'infovault',
      title: 'InfoVault',
      description: 'A password manager with secure local authentication.',
      image: '/assets/images/projects/infovault.jpg',
      techStack: ['React Native', 'Expo', 'Secure Store', 'Authentication'],
      category: 'mobile',
      github: 'https://github.com/terzidest/InfoVault',
      featured: true
    },
    {
      id: 'ethereal-nature',
      title: 'EtherealNature',
      description: 'An e-commerce app for essential oils with Firebase backend and React Native frontend.',
      image: '/assets/images/projects/ethereal-nature.jpg',
      techStack: ['React Native', 'Firebase', 'E-commerce', 'State Management'],
      category: 'ecommerce',
      github: 'https://github.com/terzidest/etherealNature',
      featured: true
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">My Projects</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Below are some of the projects I've worked on. Each showcases different aspects of my skills
          in React Native development with a focus on creating seamless mobile experiences.
        </p>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 border border-gray-300 rounded-lg bg-white">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              All Projects
            </button>
            <button 
              onClick={() => setFilter('mobile')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'mobile' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Mobile Apps
            </button>
            <button 
              onClick={() => setFilter('ecommerce')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'ecommerce' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              eCommerce
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;