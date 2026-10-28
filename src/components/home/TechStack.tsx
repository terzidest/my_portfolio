import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import { logoVars, skillGroups, type Skill } from '../../data/skills';

const ALL = 'all';

const tools = (skills: Skill[]) => skills.filter((skill) => !skill.concept);

const pillBase =
  'inline-flex min-h-[44px] items-center gap-2 rounded-full px-[18px] text-[15px] transition-[box-shadow,background-color,color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-ground';
const pillOn =
  'bg-gradient-to-r from-[#4559f0] to-[#6e86ff] font-semibold text-white shadow-[inset_0_3px_8px_rgb(73_181_245/0.5),inset_0_-3px_8px_rgb(73_181_245/0.5)]';
const pillOff =
  'border border-line/20 bg-surface/70 font-medium text-ink-soft hover:text-ink hover:shadow-[0_0_0_1px_rgb(var(--neon)/0.6),0_0_16px_rgb(var(--neon)/0.4)]';

const TechTile = ({ skill }: { skill: Skill }) => {
  const label = skill.tileLabel ?? skill.name;
  const style = logoVars(skill) as CSSProperties;

  return (
    <li className="tech-tile hover-trace hover-trace-sm flex h-[116px] flex-col items-center justify-center gap-2.5 px-1.5" style={style}>
      {skill.icon ? (
        <svg className="tech-tile__logo h-9 w-9" viewBox="0 0 24 24" aria-hidden="true">
          <path d={skill.icon.path} />
        </svg>
      ) : (
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-neon/20 font-display text-lg font-bold text-ink"
          aria-hidden="true"
        >
          {label.charAt(0)}
        </span>
      )}
      <span className="text-center text-[13px] font-medium leading-tight text-ink">{label}</span>
    </li>
  );
};

const TechStack = () => {
  const [filter, setFilter] = useState(ALL);

  const pills = [
    { id: ALL, title: 'All', count: skillGroups.reduce((sum, group) => sum + tools(group.skills).length, 0) },
    ...skillGroups.map((group) => ({ id: group.id, title: group.title, count: tools(group.skills).length })),
  ];
  const visible = skillGroups
    .filter((group) => filter === ALL || group.id === filter)
    .flatMap((group) => tools(group.skills));
  const concepts = skillGroups.flatMap((group) => group.skills.filter((skill) => skill.concept));

  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 pb-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-sm uppercase tracking-[0.08em] text-signal">Tech stack</p>
          <h2 className="font-display text-[clamp(1.875rem,3.6vw,2.625rem)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            Tools I work with
          </h2>
        </div>
        <Link to="/about" className="text-[15px] font-semibold text-link hover:text-link-hover">
          More about me →
        </Link>
      </Reveal>

      <div role="group" aria-label="Filter technologies" className="flex flex-wrap gap-2">
        {pills.map((pill) => {
          const active = filter === pill.id;
          return (
            <button
              key={pill.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(pill.id)}
              className={`${pillBase} ${active ? pillOn : pillOff}`}
            >
              {pill.title}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-white/20' : 'bg-neon/20 text-ink-soft'}`}
              >
                {pill.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Keyed by filter so the tiles replay their rise when the set changes. */}
      <ul
        key={filter}
        aria-label="Technologies"
        className="grid grid-cols-[repeat(auto-fill,minmax(116px,1fr))] gap-3"
      >
        {visible.map((skill) => (
          <TechTile key={skill.name} skill={skill} />
        ))}
      </ul>

      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
        <span className="font-medium text-ink-soft">Also:</span>{' '}
        {concepts.map((skill) => skill.name).join(' · ')}
      </p>
    </section>
  );
};

export default TechStack;
