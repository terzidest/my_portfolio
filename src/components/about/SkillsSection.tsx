import { skillGroups } from '../../data/skills';
import SkillChip from '../common/SkillChip';
import Reveal from '../common/Reveal';

// The full, grouped reference list. Home shows the same data as logo tiles;
// here every skill is listed, practices included (marked with a dot).
const SkillsSection = () => (
  <section className="flex flex-col gap-6 pb-20">
    <Reveal className="flex flex-wrap items-end justify-between gap-3">
      <h2 className="font-display text-[32px] font-bold tracking-[-0.02em] text-ink">Core skills</h2>
      <p className="text-sm text-ink-muted">The full list, grouped by layer.</p>
    </Reveal>

    {/* Not wrapped in Reveal: the panel is taller than useInView's 15% threshold
        can reach on short viewports, so it would never appear. */}
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
  </section>
);

export default SkillsSection;
