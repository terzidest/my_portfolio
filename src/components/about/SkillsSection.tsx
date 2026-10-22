import { skillGroups } from '../../data/skills';
import Reveal from '../common/Reveal';
import TechBadge from '../common/TechBadge';

const SkillsSection = () => {
  return (
    <section className="mt-16">
      <Reveal>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Core Skills</h2>
        <div className="w-16 h-1 bg-primary mb-8"></div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 80} className="h-full">
            <div className="h-full bg-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-700 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <TechBadge key={skill} label={skill} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
