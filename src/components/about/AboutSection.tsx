import { Link } from 'react-router-dom';
import ResponsiveImage from '../common/ResponsiveImage';
import { approach, profileImage } from '../../data/about';

const AboutSection = () => {
  return (
    // Layout-neutral: the About page owns the outer padding/background.
    <section>
      <div className="flex flex-col lg:flex-row">
          {/* Profile Image */}
          <div className="lg:w-1/3 mb-12 lg:mb-0 flex justify-center">
            <div className="relative">
              {/* photo */}
              <div className="w-72 h-72 rounded-full overflow-hidden shadow-xl">
                <ResponsiveImage
                  source={profileImage}
                  loading="eager"
                  containerClassName="w-full h-full"
                  imageClassName="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 dark:opacity-10"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary rounded-full opacity-20 dark:opacity-10"></div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:w-2/3 lg:pl-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <div className="w-16 h-1 bg-primary mb-6"></div>

            <p className="text-gray-600 dark:text-slate-300 text-lg mb-6">
              I'm a software engineer in Athens with 7+ years across enterprise SAP development, independent client work, and production web platforms. My focus is frontend engineering with React and TypeScript, but I like understanding how the whole system fits together, and I'm comfortable working on the backend when a feature needs it.
            </p>

            <p className="text-gray-600 dark:text-slate-300 text-lg mb-6">
              I value straightforward solutions, clear responsibilities, and code the next developer can pick up. I'm open to remote roles across Europe.
            </p>

            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Approach</h3>

              <ul className="space-y-3">
                {approach.map((principle) => (
                  <li key={principle.title} className="flex items-start">
                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600 dark:text-slate-300">
                      <strong className="font-semibold text-gray-900 dark:text-white">{principle.title}:</strong> {principle.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
              >
                View My Projects
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white dark:bg-slate-800 text-primary border border-primary py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>
      </div>
    </section>
  );
};

export default AboutSection;
