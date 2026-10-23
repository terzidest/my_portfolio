import ContactForm from '../components/contact/ContactForm';
import { EMAIL, LOCATION, socials } from '../data/contact';
import usePageMeta from '../hooks/usePageMeta';

const iconTile = 'flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-neon/20 text-signal';
const infoCard = 'flex items-center gap-4 rounded-[18px] border border-line/15 bg-surface/60 px-5 py-[18px]';

const Contact = () => {
  usePageMeta({
    title: 'Contact',
    description:
      'Get in touch with Triantaphilos Terzides for frontend projects and opportunities.',
  });

  return (
    <div className="spotlight">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-12 px-6 pb-24 pt-36 md:pt-40">
        <div className="rise-stagger flex min-w-0 flex-[1_1_340px] flex-col gap-5">
          <p className="font-mono text-sm uppercase tracking-[0.08em] text-signal">Contact</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink">
            Get in touch
          </h1>
          <p className="text-lg leading-[1.65] text-ink-soft">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out and
            I'll get back to you as soon as possible.
          </p>

          <div className="mt-3 flex flex-col gap-3">
            <a href={`mailto:${EMAIL}`} className={`hover-neon ${infoCard}`}>
              <span className={iconTile}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16v12H4z" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[13px] text-ink-muted">Email</span>
                <span className="font-semibold text-ink">{EMAIL}</span>
              </span>
            </a>
            <div className={infoCard}>
              <span className={iconTile}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[13px] text-ink-muted">Location</span>
                <span className="font-semibold text-ink">{LOCATION}</span>
              </span>
            </div>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-neon flex min-h-[52px] flex-1 items-center justify-center gap-2.5 rounded-2xl border border-line/15 bg-surface/60 text-[15px] font-semibold text-ink"
                >
                  <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                  {social.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-[999_1_520px]">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
