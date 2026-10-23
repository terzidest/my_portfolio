import type { CSSProperties } from 'react';
import { logoVars, type Skill } from '../../data/skills';

// Pill with the skill's brand logo, or a dot for practices and tools without one.
const SkillChip = ({ skill }: { skill: Skill }) => (
  <li
    style={logoVars(skill) as CSSProperties}
    className="skill-chip inline-flex items-center gap-2 rounded-full border border-line/15 bg-neon/10 py-[7px] pl-2.5 pr-3.5 text-sm text-ink"
  >
    {skill.icon ? (
      <svg className="skill-chip__logo h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
        <path d={skill.icon.path} />
      </svg>
    ) : (
      <span
        className="mx-[5px] h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_rgb(var(--signal))]"
        aria-hidden="true"
      />
    )}
    {skill.name}
  </li>
);

export default SkillChip;
