// Single pill style for tech-stack tags so cards and case studies match.
const TechBadge = ({ label }: { label: string }) => (
  <span className="rounded-full bg-neon/15 px-2.5 py-1 text-xs font-medium text-ink-soft">
    {label}
  </span>
);

export default TechBadge;
