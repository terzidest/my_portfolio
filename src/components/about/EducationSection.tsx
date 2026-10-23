import Reveal from '../common/Reveal';
import { certifications, education, languages } from '../../data/about';

const card = 'hover-neon rounded-[22px] border border-line/15 bg-surface/60';
const label = 'font-mono text-xs uppercase tracking-[0.06em] text-signal';

const EducationSection = () => (
  <section className="flex flex-col gap-6 pb-24">
    <Reveal>
      <h2 className="font-display text-[32px] font-bold tracking-[-0.02em] text-ink">Education &amp; certifications</h2>
    </Reveal>

    <div className="flex flex-wrap items-stretch gap-5">
      <Reveal className={`${card} flex min-w-0 flex-[3_1_460px] flex-col gap-4 p-7`}>
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[14px] bg-neon/20 text-signal">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 9l10-5 10 5-10 5z" />
              <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
            </svg>
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-2xl font-bold text-ink">{education.degree}</h3>
            <p className="text-[15px] text-ink-soft">{education.institution}</p>
            <p className="text-sm text-ink-muted">Graduated {education.graduationDate}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className={label}>Specializations</h4>
          <ul className="flex flex-wrap gap-2">
            {education.specializations.map((specialization) => (
              <li key={specialization} className="rounded-full bg-neon/15 px-3 py-1.5 text-sm text-ink">
                {specialization}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={education.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 self-start text-[15px] font-semibold text-link hover:text-link-hover"
        >
          Verify degree badge <span aria-hidden="true">↗</span>
        </a>
      </Reveal>

      <div className="flex min-w-0 flex-[2_1_340px] flex-col gap-5">
        <Reveal className={`${card} flex flex-col px-7 py-6`}>
          <h3 className={`${label} mb-2`}>Certifications</h3>
          <ul>
            {certifications.map((certification) => (
              <li key={certification.link} className="border-b border-line/10 last:border-b-0">
                <a
                  href={certification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center justify-between gap-3 py-1 text-[15px] text-ink hover:text-link-hover"
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

        <Reveal className={`${card} flex flex-wrap items-center gap-x-5 gap-y-2.5 px-7 py-5`}>
          <h3 className={label}>Languages</h3>
          {languages.map((language) => (
            <span key={language.name} className="text-[15px] text-ink">
              {language.name} <span className="text-ink-muted">· {language.level}</span>
            </span>
          ))}
        </Reveal>
      </div>
    </div>
  </section>
);

export default EducationSection;
