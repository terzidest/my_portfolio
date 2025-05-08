import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex flex-col mb-16 md:mb-0 md:items-start md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
              React &
              <br />
              React Native
              <br />
              <span className="text-blue-200">Developer</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Meta-certified developer crafting high-quality cross-platform mobile and dynamic web apps 
            backed by Firebase for real-time data and secure authentication.
            </p>
            <div className="flex flex-col sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/projects" 
                className="inline-flex text-blue-800 bg-white border-0 py-3 px-8 focus:outline-none hover:bg-gray-100 rounded-lg text-lg font-medium transition-colors duration-300 mb-4 sm:mb-0 sm:mr-4"
              >
                View Projects
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex text-white bg-transparent border-2 border-white py-3 px-8 focus:outline-none hover:bg-blue-700 rounded-lg text-lg transition-colors duration-300"
              >
                Contact Me
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {/* Phone mockup illustration (placeholder) */}
            <div className="relative mx-auto w-64 h-128 bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex justify-center items-center">
                <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
              </div>
              {/* Mobile app screenshot placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 pt-6">
                {/* App content mockup */}
                <div className="bg-white mx-2 rounded-lg h-10 mb-2 flex items-center px-3">
                  <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                </div>
                <div className="flex px-2 mb-3">
                  <div className="w-1/3 bg-white rounded-lg h-20 mr-1"></div>
                  <div className="w-1/3 bg-white rounded-lg h-20 mr-1"></div>
                  <div className="w-1/3 bg-white rounded-lg h-20"></div>
                </div>
                <div className="bg-white mx-2 rounded-lg h-32 mb-2"></div>
                <div className="bg-white mx-2 rounded-lg h-12 mb-2 flex items-center justify-center">
                  <div className="w-20 h-6 bg-blue-500 rounded-full"></div>
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
          {['JavaScript/TypeScript', 'React Native(Expo)','React(vite)', 'React navigation/router', 'Zustand', 'TailwindCSS/Nativewind', 'Firebase'].map((tech, index) => (
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