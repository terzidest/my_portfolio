const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Mobile Development",
      skills: [
        { name: "JavaScript", level: 95 },
        { name: "React Native", level: 95 },
        { name: "Expo", level: 90 },
        { name: "Firebase", level: 85 },
        { name: "React Navigation", level: 90 },
        { name: "Mobile UI/UX", level: 85 },
      ],
    },
    {
      title: "Software Development",
      skills: [
        { name: "Problem Solving", level: 90 },
        { name: "Attention to Detail", level: 95 },
        { name: "Self-Motivation", level: 90 },
        { name: "Adaptability", level: 90 },
        { name: "API Integration", level: 85 },
        { name: "Local Storage Solutions", level: 85 },
      ],
    },
    {
      title: "UI/UX & Implementation",
      skills: [
        { name: "Figma to React Native", level: 90 },
        { name: "UI Component Design", level: 85 },
        { name: "Cross-Platform Styling", level: 90 },
        { name: "Animation & Transitions", level: 80 },
        { name: "Responsive Design", level: 90 },
        { name: "User Flow Implementation", level: 85 },
      ],
    },
    {
      title: "Backend Integration",
      skills: [
        { name: "Authentication Systems", level: 90 },
        { name: "Secure Storage", level: 85 },
        { name: "RESTful APIs", level: 90 },
        { name: "Data Fetching & Caching", level: 85 },
        { name: "Error Handling", level: 90 },
        { name: "Offline Functionality", level: 80 },
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/*
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Skill Areas
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized in modern app Development with cutting-edge
            technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> */}

        {/* Certifications */}
        {/*<div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Certifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-blue-50 border-2 border-blue-100 rounded-lg p-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-gray-900">
                    React Native Specialization by Meta
                  </h4>
                  <p className="text-gray-600 mb-2">
                    Official Meta certification for React Native development
                  </p>
                  <a
                    href="https://www.coursera.org/account/accomplishments/specialization/7L64OF9339YZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-blue-700 text-sm"
                  >
                    View Certificate →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-100 rounded-lg p-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-gray-900">
                    JavaScript Algorithms and Data Structures
                  </h4>
                  <p className="text-gray-600 mb-2">
                    freeCodeCamp certification for advanced JavaScript
                  </p>
                  <a
                    href="https://freecodecamp.org/certification/fcc5f3e71e4-78d0-4fe4-94a6-e7e9bd0b6e15/javascript-algorithms-and-data-structures"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-blue-700 text-sm"
                  >
                    View Certificate →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SkillsSection;
