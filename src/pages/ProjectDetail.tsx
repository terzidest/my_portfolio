import { useParams, Link } from 'react-router-dom';
import { getProjectById, getAdjacentProjectIds } from '../data/projects';
import TechBadge from '../components/common/TechBadge';
import ResponsiveImage from '../components/common/ResponsiveImage';
import usePageMeta from '../hooks/usePageMeta';

// Split a multi-paragraph string on blank-line breaks so single newlines
// inside a paragraph don't produce empty <p> tags.
const toParagraphs = (text: string): string[] =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;
  const adjacentProjects = id ? getAdjacentProjectIds(id) : { prevId: null, nextId: null };

  usePageMeta(
    project
      ? { title: project.title, description: project.description }
      : { title: 'Project Not Found', description: 'This project does not exist.', noindex: true }
  );

  if (!project) {
    return (
      <div className="pt-28 pb-20 min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Project Not Found</h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8">Sorry, the project you're looking for doesn't exist.</p>
          <Link
            to="/projects"
            className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
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
    <div className="pt-28 pb-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <Link
          to="/projects"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-6"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Projects
        </Link>

        <div className="bg-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-700 rounded-xl shadow-md overflow-hidden mb-10">
          <div className="p-7 sm:p-9">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h1>
            <p className="text-lg text-gray-600 dark:text-slate-300 mb-5 max-w-3xl">{project.description}</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-800 dark:to-indigo-950 border-t border-blue-400/20 dark:border-slate-700 p-3 sm:p-5">
            <ResponsiveImage
              source={project.image}
              loading="eager"
              sizes="(min-width: 1280px) 1152px, 92vw"
              containerClassName="h-80 sm:h-[28rem] lg:h-[34rem] rounded-lg bg-black/10"
              imageClassName="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

          <div>
            <div className="bg-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-700 rounded-xl shadow-md p-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Problem</h2>
                {toParagraphs(project.problem).map((p, i) => (
                  <p key={i} className="mb-4 text-gray-600 dark:text-slate-300 leading-relaxed last:mb-0">
                    {p}
                  </p>
                ))}
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Role</h2>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">{project.role}</p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                </div>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Outcome</h2>
                {toParagraphs(project.outcome).map((p, i) => (
                  <p key={i} className="mb-4 text-gray-600 dark:text-slate-300 leading-relaxed last:mb-0">
                    {p}
                  </p>
                ))}
              </section>
            </div>

            {/* Image Gallery - only show if additionalImages exist */}
            {project.additionalImages && project.additionalImages.length > 0 && (
              <div className="bg-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-700 rounded-xl shadow-md p-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Gallery</h2>
                {/* Fixed-height cells keep rows even; object-contain shows
                    landscape shots uncropped inside them. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {project.additionalImages.map((image) => (
                    <div key={image.src} className="relative bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-800 dark:to-indigo-950 p-1 rounded-xl h-72 flex items-center justify-center overflow-hidden dark:ring-1 dark:ring-white/10">
                      <ResponsiveImage
                        source={image}
                        containerClassName="w-full h-full rounded-lg"
                        imageClassName="h-full w-full object-contain rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}


        </div>

        {/* Next/Previous Navigation */}
        <div className="mt-12 border-t border-gray-200 dark:border-slate-700 pt-6">
          <div className="flex justify-between items-center">
            {adjacentProjects.prevId ? (
              <Link
                to={`/projects/${adjacentProjects.prevId}`}
                className="flex items-center text-primary hover:text-primary-dark"
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
                className="flex items-center text-primary hover:text-primary-dark"
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
