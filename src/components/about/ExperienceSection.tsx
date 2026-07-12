import { experiences } from '../../data/experience';
import Reveal from '../common/Reveal';

const ExperienceSection = () => {
  return (
    <section className="mt-16">
      <Reveal>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Experience</h2>
        <div className="w-16 h-1 bg-primary mb-8"></div>
      </Reveal>

      {/* Timeline: a vertical rail (the border-l) with a dot per role. */}
      <div className="relative ml-2 md:ml-3 border-l-2 border-gray-200 dark:border-slate-700 pl-8 md:pl-10 space-y-8">
        {experiences.map((exp, expIndex) => (
          <Reveal key={`${exp.company}-${exp.title}`} delay={expIndex * 100}>
            <div className="relative">
              {/* Dot sits on the rail. */}
              <span className="absolute -left-[41px] md:-left-[49px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-blue-100 dark:ring-blue-500/20"></span>

              <article className="bg-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-700 rounded-xl shadow-md p-8">
                <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <p className="text-gray-500 dark:text-slate-400 text-sm md:ml-4 md:flex-shrink-0">
                    {exp.dates}
                  </p>
                </header>

                {exp.description && (
                  <p className="text-gray-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                )}

                <ul className="space-y-2.5">
                  {exp.bullets.map((bullet, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-600 dark:text-slate-300 leading-relaxed"
                    >
                      <span className="text-primary mr-3 mt-1 flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
