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
    <li className="tech-tile hover-trace hover-trace-sm flex h-[96px] snap-start flex-col items-center justify-center gap-2 px-1 md:h-[116px] md:gap-2.5 md:px-1.5" style={style}>
      {skill.icon ? (
        <svg className="tech-tile__logo h-[30px] w-[30px] md:h-9 md:w-9" viewBox="0 0 24 24" aria-hidden="true">
          <path d={skill.icon.path} />
        </svg>
      ) : (
        <span
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-neon/20 font-display text-base md:h-9 md:w-9 md:rounded-[10px] md:text-lg font-bold text-ink"
          aria-hidden="true"
        >
          {label.charAt(0)}
        </span>
      )}
      <span className="text-center text-xs font-medium leading-tight text-ink md:text-[13px]">{label}</span>
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
    <section className="mx-auto flex max-w-[1200px] flex-col gap-3.5 pb-10 md:gap-6 md:px-6 md:pb-24">
      <Reveal className="flex items-end justify-between gap-3 px-5 md:flex-wrap md:gap-5 md:px-0">
        <div className="flex flex-col gap-2 md:gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal md:text-sm">Tech stack</p>
          <h2 className="font-display text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[clamp(1.875rem,3.6vw,2.625rem)]">
            Tools I work with
          </h2>
        </div>
        <span className="whitespace-nowrap text-xs text-ink-muted md:hidden" aria-hidden="true">
          Swipe →
        </span>
        <Link to="/about" className="hidden text-[15px] font-semibold text-link hover:text-link-hover md:inline">
          More about me →
        </Link>
      </Reveal>

      {/* Pills and tiles scroll sideways on phones and wrap from md up. */}
      <div
        role="group"
        aria-label="Filter technologies"
        className="no-scrollbar rail-fade flex gap-2 overflow-x-auto px-5 md:flex-wrap md:overflow-visible md:px-0"
      >
        {pills.map((pill) => {
          const active = filter === pill.id;
          return (
            <button
              key={pill.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(pill.id)}
              className={`${pillBase} shrink-0 ${active ? pillOn : pillOff}`}
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
        className="no-scrollbar grid snap-x snap-mandatory scroll-px-5 auto-cols-[96px] grid-flow-col grid-rows-[repeat(2,96px)] gap-2.5 overflow-x-auto px-5 md:auto-cols-auto md:grid-flow-row md:grid-cols-[repeat(auto-fill,minmax(116px,1fr))] md:grid-rows-none md:gap-3 md:overflow-visible md:px-0"
      >
        {visible.map((skill) => (
          <TechTile key={skill.name} skill={skill} />
        ))}
      </ul>

      <p className="mt-1 px-5 text-[13px] leading-relaxed text-ink-muted md:px-0 md:text-sm md:leading-relaxed">
        <span className="font-medium text-ink-soft">Also:</span>{' '}
        {concepts.map((skill) => skill.name).join(' · ')}
      </p>

      <Link
        to="/about"
        className="mx-5 flex min-h-12 items-center justify-center rounded-[14px] border border-line/20 bg-surface/60 text-[15px] font-semibold text-ink md:hidden"
      >
        More about me →
      </Link>
    </section>
  );
};

export default TechStack;
