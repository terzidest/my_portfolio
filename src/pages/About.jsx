import AboutSection from '../components/about/AboutSection';

const About = () => {
  const education = {
    degree: 'Bachelor of Science: Informatics',
    institution: 'Athens University of Economics and Business, Athens, Greece',
    graduationDate: 'September 2018',
    specializations: [
      'Computer Systems & Networks',
      'Operational Research & Economics of Information Technology'
    ],
    courses: [
      'Computer Programming with C++',
      'Computer Programming with Java',
      'Data Structures',
      'Algorithms',
      'Databases',
      'Computer Networks',
      'Distributed Systems',
      'Web Technologies and Programming',
      'Software Engineering',
      'Technological Innovation and Entrepreneurship'
    ]
  };
  
  const certifications = [
    {
      title: 'React Native Specialization by Meta',
      link: 'https://www.coursera.org/account/accomplishments/specialization/7L64OF9339YZ'
    },
    {
      title: 'freeCodeCamp JavaScript Algorithms and Data Structures',
      link: 'https://freecodecamp.org/certification/fcc5f3e71e4-78d0-4fe4-94a6-e7e9bd0b6e15/javascript-algorithms-and-data-structures'
    },
    {
      title: 'Hackerrank Software Engineering',
      link: 'https://www.hackerrank.com/certificates/0957a98d8f1f'
    },
    {
      title: 'Hackerrank Frontend Development (React)',
      link: 'https://www.hackerrank.com/certificates/a50abd338c65'
    },


  ];

  return (
    <div className="pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <AboutSection />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Education</h2>
            <div className="mb-2">
              <h3 className="text-xl font-bold text-gray-800">{education.degree}</h3>
              <p className="text-gray-600 italic">{education.institution}</p>
              <p className="text-gray-500 text-sm mb-4">Graduated: {education.graduationDate}</p>
              
              <div className="mb-4">
                <h4 className="font-bold text-gray-700">Specializations:</h4>
                <ul className="list-disc list-inside text-gray-600 pl-4">
                  {education.specializations.map((specialization, index) => (
                    <li key={index}>{specialization}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-700">Relevant Courses:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {education.courses.map((course, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Certifications</h2>
            <div className="space-y-6">
              {certifications.map((certification, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex justify-center items-center mr-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{certification.title}</h3>
                    <a 
                      href={certification.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:text-blue-700 text-sm"
                    >
                      View Certificate →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;