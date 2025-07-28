import { Link } from "react-router-dom";

const CaseStudy = ({ project }) => {
  const {
    id,
    title,
    description,
    image,
    techStack,
    features,
    challenges,
    longDescription,
    github,
  } = project;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={image || "/assets/images/placeholder.jpg"}
            alt={title}
          />
        </div>
        <div className="p-8">
          <Link to={`/projects/${id}`} className="block">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-primary transition-colors">
              {title}
            </h2>
          </Link>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack &&
              techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
          </div>

          <div className="flex items-center justify-between">
            <Link
              to={`/projects/${id}`}
              className="inline-flex items-center text-primary hover:text-blue-700 font-medium"
            >
              View Details
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
