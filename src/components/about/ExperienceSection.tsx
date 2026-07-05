import { experiences } from '../../data/experience';
import Reveal from '../common/Reveal';

const ExperienceSection = () => {
  return (
    <section className="mt-16">
      <Reveal>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Experience</h2>
        <div className="w-16 h-1 bg-primary mb-8"></div>
      </Reveal>

      <div className="space-y-6">
        {experiences.map((exp, expIndex) => (
          <Reveal key={`${exp.company}-${exp.title}`} delay={expIndex * 100}>
          <article
            className="bg-white rounded-xl shadow-md p-8"
          >
            <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
              </div>
              <p className="text-gray-500 text-sm md:ml-4 md:flex-shrink-0">
                {exp.dates}
              </p>
            </header>

            {exp.description && (
              <p className="text-gray-600 mb-4 leading-relaxed">
                {exp.description}
              </p>
            )}

            <ul className="space-y-2.5">
              {exp.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-600 leading-relaxed"
                >
                  <span className="text-primary mr-3 mt-1 flex-shrink-0">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
