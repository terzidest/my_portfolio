import Reveal from '../common/Reveal';
import { certifications, education, languages } from '../../data/about';

const card = 'hover-neon rounded-[22px] border border-line/15 bg-surface/60';
const label = 'font-mono text-xs uppercase tracking-[0.06em] text-signal';

const EducationSection = () => (
  <section className="flex flex-col gap-3 pb-10 md:gap-6 md:pb-24">
    <Reveal>
      <h2 className="font-display text-[24px] font-bold tracking-[-0.02em] text-ink md:text-[32px]">Education &amp; certifications</h2>
    </Reveal>

    <div className="flex flex-wrap items-stretch gap-3 md:gap-5">
      <Reveal className={`${card} flex min-w-0 flex-[3_1_460px] flex-col gap-2.5 p-5 md:gap-4 md:p-7`}>
        <div className="flex items-start gap-4">
          <span className="hidden h-12 w-12 flex-none items-center md:flex justify-center rounded-[14px] bg-neon/20 text-signal">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 9l10-5 10 5-10 5z" />
              <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
            </svg>
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-lg font-bold text-ink md:text-2xl">{education.degree}</h3>
            <p className="text-[14px] text-ink-soft md:text-[15px]">{education.institution}</p>
            <p className="text-[13px] text-ink-muted md:text-sm">Graduated {education.graduationDate}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className={`${label} hidden md:block`}>Specializations</h4>
          <ul className="flex flex-wrap gap-1.5 md:gap-2">
            {education.specializations.map((specialization) => (
              <li key={specialization} className="rounded-full bg-neon/15 px-2.5 py-[5px] text-xs text-ink md:px-3 md:py-1.5 md:text-sm">
                {specialization}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={education.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-1.5 self-start text-[14px] font-semibold md:min-h-[44px] md:text-[15px] text-link hover:text-link-hover"
        >
          Verify degree badge <span aria-hidden="true">↗</span>
        </a>
      </Reveal>

      <div className="flex min-w-0 flex-[2_1_340px] flex-col gap-3 md:gap-5">
        <Reveal className={`${card} flex flex-col px-4 py-1.5 md:px-7 md:py-6`}>
          <h3 className={`${label} mb-2 hidden md:block`}>Certifications</h3>
          <ul>
            {certifications.map((certification) => (
              <li key={certification.link} className="border-b border-line/10 last:border-b-0">
                <a
                  href={certification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-between gap-3 py-1 text-[14px] text-ink hover:text-link-hover md:min-h-[44px] md:text-[15px]"
                >
                  <span>
                    {certification.title} <span className="text-ink-muted">· {certification.issuer}</span>
                  </span>
                  <span className="text-link" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Phones show languages as a plain line, not a card. */}
        <Reveal
          className={`${card} flex flex-wrap items-center gap-x-3 gap-y-1 max-md:border-0 max-md:bg-transparent md:gap-x-5 md:gap-y-2.5 md:px-7 md:py-5`}
        >
          <h3 className={label}>Languages</h3>
          {languages.map((language) => (
            <span key={language.name} className="text-[14px] text-ink md:text-[15px]">
              {language.name} <span className="text-ink-muted">· {language.level}</span>
            </span>
          ))}
        </Reveal>
      </div>
    </div>
  </section>
);

export default EducationSection;
