import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex flex-col mb-16 md:mb-0 md:items-start items-center text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
              Frontend
              <br />
              <span className="text-blue-200">Engineer</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Building production-grade web and mobile experiences with React ecosystems — from component architecture to scalable state management and cross-platform delivery.
            </p>
            <div className="flex flex-col sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                to="/projects"
                variant="secondary"
                size="lg"
                className="text-blue-800 bg-white hover:bg-gray-100 mb-4 sm:mb-0 sm:mr-4"
              >
                View Projects
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="lg"
                className="text-white border-2 border-white hover:bg-blue-700"
              >
                Contact Me
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {/* Phone mockup illustration (placeholder) */}
            <div className="relative mx-auto w-64 h-128 bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex justify-center items-center">
                <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
              </div>
              {/* Mobile app UI — entirely CSS, no images. The internal
                  layout (header / search / featured card / grid / row /
                  tab bar) is meant to read as a finished generic app
                  rather than placeholder/skeleton blocks. */}
              <div className="w-full h-full bg-gray-50 pt-6 flex flex-col">
                {/* App header: title + avatar */}
                <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-20 bg-gray-800 rounded-full"></div>
                    <div className="h-1.5 w-14 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-sm"></div>
                </div>

                {/* Search bar */}
                <div className="mx-4 mb-3 h-9 bg-white rounded-full shadow-sm flex items-center px-3">
                  <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                  <div className="h-1.5 w-24 bg-gray-200 rounded-full ml-2"></div>
                </div>

                {/* Featured card */}
                <div className="mx-4 mb-3 h-28 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md p-3 flex flex-col justify-end">
                  <div className="h-2 w-3/4 bg-white/90 rounded-full mb-1.5"></div>
                  <div className="h-1.5 w-1/2 bg-white/70 rounded-full"></div>
                </div>

                {/* Two-column grid */}
                <div className="mx-4 mb-3 grid grid-cols-2 gap-2">
                  <div className="h-20 rounded-lg bg-white shadow-sm p-2 flex flex-col justify-between">
                    <div className="w-6 h-6 rounded-md bg-yellow-100"></div>
                    <div>
                      <div className="h-1.5 w-3/4 bg-gray-700 rounded-full mb-1"></div>
                      <div className="h-1 w-1/2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-20 rounded-lg bg-white shadow-sm p-2 flex flex-col justify-between">
                    <div className="w-6 h-6 rounded-md bg-pink-100"></div>
                    <div>
                      <div className="h-1.5 w-3/4 bg-gray-700 rounded-full mb-1"></div>
                      <div className="h-1 w-1/2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* List row */}
                <div className="mx-4 mb-3 bg-white rounded-lg shadow-sm p-2 flex items-center">
                  <div className="w-9 h-9 rounded-md bg-green-100 flex-shrink-0"></div>
                  <div className="ml-2 flex-1 space-y-1">
                    <div className="h-1.5 w-2/3 bg-gray-700 rounded-full"></div>
                    <div className="h-1 w-1/2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>

                {/* Spacer pushes the tab bar to the bottom */}
                <div className="flex-1"></div>

                {/* Tab bar */}
                <div className="border-t border-gray-200 bg-white h-12 flex items-center justify-around px-4">
                  <div className="w-5 h-5 rounded-full bg-primary"></div>
                  <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                  <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                  <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute top-10 -left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-70"></div>
            <div className="absolute bottom-10 -right-10 w-16 h-16 bg-pink-400 rounded-full opacity-70"></div>
          </div>
        </div>
      </div>

      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-indigo-600 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-blue-700 rounded-full opacity-20"></div>
      </div>

      {/* Technology logos */}
      <div className="container mx-auto px-6 mt-16 relative z-10">
        <p className="text-sm text-center text-blue-200 mb-4 uppercase tracking-wider">Technologies I Work With</p>
        <div className="flex flex-wrap justify-center gap-8">
          {['React', 'TypeScript', 'Next.js', 'React Native', 'React Query', 'Zustand', 'Styled Components', 'TailwindCSS', 'Node.js / Express'].map((tech, index) => (
            <div key={index} className="text-white font-medium">
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
