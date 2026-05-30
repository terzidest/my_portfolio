import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row">
          {/* Profile Image */}
          <div className="lg:w-1/3 mb-12 lg:mb-0 flex justify-center">
            <div className="relative">
              {/* photo */}
              <div className="w-72 h-72 rounded-full overflow-hidden shadow-xl">
                <img
                src={`${import.meta.env.BASE_URL}assets/images/profile.jpg`}
                alt="Terzidest"
                className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary rounded-full opacity-20"></div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:w-2/3 lg:pl-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-16 h-1 bg-primary mb-6"></div>

            <p className="text-gray-600 text-lg mb-6">
              I'm a frontend engineer based in Athens with several years of experience building production React applications — from mobile apps to large-scale web platforms. I specialize in React and its ecosystem, with a focus on architecture that scales: modular codebases, clean state management, and maintainable component design.
            </p>

            <p className="text-gray-600 text-lg mb-6">
              I care about the craft — not just making things work, but making them work well. I'm comfortable owning frontend decisions end-to-end, collaborating closely with backend teams, and navigating complex domains like iGaming, fintech, or data-heavy B2B products.
            </p>

            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4">My Approach</h3>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">Architecture-first thinking — clear boundaries between domain, state, and UI</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">Component design that scales: composable, testable, and easy to reason about</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">Pragmatic state management — the right tool for the job, not the trendiest one</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">Performance and accessibility as defaults, not afterthoughts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">Comfortable owning features end-to-end, from API contract to deployed UI</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                View My Projects
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-primary border border-primary py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
