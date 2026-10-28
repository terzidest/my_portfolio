import { useRef, useState, type KeyboardEvent } from 'react';
import { skillGroups } from '../../data/skills';
import useMediaQuery, { DESKTOP } from '../../hooks/useMediaQuery';
import { pillOff, pillOn } from '../common/pills';
import SkillChip from '../common/SkillChip';
import Reveal from '../common/Reveal';

const tabId = (id: string) => `skills-tab-${id}`;

// Phones: one group at a time behind a swipeable tab row.
const SkillTabs = ({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) => {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = skillGroups.find((g) => g.id === selected) ?? skillGroups[0];

  // Arrow keys move between tabs, as in a native tab list.
  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + skillGroups.length) % skillGroups.length;
    onSelect(skillGroups[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <>
      <div role="tablist" aria-label="Skill groups" className="no-scrollbar rail-fade glow-room -mx-5 flex gap-2 overflow-x-auto px-5 [--glow-room:16px]">
        {skillGroups.map((g, index) => {
          const active = g.id === group.id;
          return (
            <button
              key={g.id}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              id={tabId(g.id)}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="skills-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(g.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={`inline-flex min-h-10 flex-none items-center rounded-full px-3.5 text-sm transition-[box-shadow,background-color,color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon ${
                active ? pillOn : pillOff
              }`}
            >
              {g.title}
            </button>
          );
        })}
      </div>
      <div id="skills-panel" role="tabpanel" aria-labelledby={tabId(group.id)}>
        <ul className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </ul>
      </div>
    </>
  );
};

// The full, grouped reference list. Home shows the same data as logo tiles;
// here every skill is listed, practices included (marked with a dot).
const SkillsSection = () => {
  const desktop = useMediaQuery(DESKTOP);
  const [selected, setSelected] = useState(skillGroups[0].id);
  const count = skillGroups.find((g) => g.id === selected)?.skills.length ?? 0;

  return (
    <section className="flex flex-col gap-3.5 pb-9 md:gap-6 md:pb-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-[24px] font-bold tracking-[-0.02em] text-ink md:text-[32px]">Core skills</h2>
        <p className="text-[13px] text-ink-muted md:text-sm">
          {desktop ? 'The full list, grouped by layer.' : `${count} skills`}
        </p>
      </Reveal>

      {/* Not wrapped in Reveal: the panel is taller than useInView's 15% threshold
          can reach on short viewports, so it would never appear. */}
      {desktop ? (
        <div className="glass overflow-hidden rounded-3xl border border-line/15">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="flex flex-wrap gap-x-7 gap-y-4 border-b border-line/10 px-7 py-[22px] last:border-b-0"
            >
              <div className="flex flex-[0_0_170px] flex-col gap-1 pt-1.5">
                <h3 className="font-mono text-[13px] uppercase tracking-[0.06em] text-signal">{group.title}</h3>
                <span className="text-[13px] text-ink-muted">{group.skills.length} skills</span>
              </div>
              <ul className="flex min-w-0 flex-[1_1_420px] flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <SkillTabs selected={selected} onSelect={setSelected} />
      )}
    </section>
  );
};

export default SkillsSection;
