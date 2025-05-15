import { useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../data/projects";

const Projects = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Toggle filter selection
  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  // Filter logic
  const filteredProjects = projects.filter(project => {
    // If no filters selected, show all projects
    if (selectedFilters.length === 0) {
      return true;
    }
    
    // If both filters are selected, only show projects that have both categories
    if (selectedFilters.includes('mobile') && selectedFilters.includes('web')) {
      return project.categories.includes('mobile') && project.categories.includes('web');
    }
    
    // Otherwise, show projects that match any selected filter
    return selectedFilters.some(filter => project.categories.includes(filter));
  });

  return (
    <div className="pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">My Projects</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Below are some of the projects I've worked on. Each showcases different aspects of my skills
          in both React and React Native development.
        </p>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 border border-gray-300 rounded-lg bg-white">
            <button 
              onClick={() => toggleFilter('mobile')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedFilters.includes('mobile') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Mobile Apps
            </button>
            <button 
              onClick={() => toggleFilter('web')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedFilters.includes('web') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Web Apps
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