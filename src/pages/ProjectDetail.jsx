import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProjectById, getAdjacentProjectIds } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [adjacentProjects, setAdjacentProjects] = useState({ prevId: null, nextId: null });
  const [imageIsPortrait, setImageIsPortrait] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const handleImageLoad = (e) => {
    const img = e.target;
    setImageIsPortrait(img.naturalWidth < img.naturalHeight);
  };
  useEffect(() => {
    setLoading(true);
    
    const projectData = getProjectById(id);
    const { prevId, nextId } = getAdjacentProjectIds(id);
    
    if (projectData) {
      setProject(projectData);
      setAdjacentProjects({ prevId, nextId });
      setLoading(false);
    } else {
      // Handle project not found
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="pt-28 pb-20 min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Project Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, the project you're looking for doesn't exist.</p>
          <Link 
            to="/projects" 
            className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <Link 
          to="/projects" 
          className="inline-flex items-center text-primary hover:text-blue-700 mb-6"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Projects
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="md:flex">
            <div className="md:w-64 h-48 overflow-hidden flex-shrink-0 mt-2 ml-2">
              <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-800 flex justify-center items-center rounded-xl">
                <img 
                  src={project.image || '/assets/images/placeholder.jpg'} 
                  alt={project.title} 
                  className={`rounded-xl ${imageIsPortrait ? 'h-40 w-auto' : 'w-full h-48 object-cover object-top'}`}
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h1>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-blue-700"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
              <div className="prose max-w-none">
                {project.longDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Challenges & Solutions</h2>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-gray-600">
                    <span className="font-medium text-gray-800">Challenge {index + 1}:</span> {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Development Process Section - only show if process exists */}
        {project.process && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.process.map((step, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{index + 1}. {step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Next/Previous Navigation */}
        <div className="mt-12 border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center">
            {adjacentProjects.prevId ? (
              <Link 
                to={`/projects/${adjacentProjects.prevId}`}
                className="flex items-center text-primary hover:text-blue-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Previous Project
              </Link>
            ) : (
              <div></div> 
            )}
            
            {adjacentProjects.nextId && (
              <Link 
                to={`/projects/${adjacentProjects.nextId}`}
                className="flex items-center text-primary hover:text-blue-700"
              >
                Next Project
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;