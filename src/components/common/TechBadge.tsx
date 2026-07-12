// Single pill style for tech-stack tags so cards and case studies match.
const TechBadge = ({ label }: { label: string }) => (
  <span className="px-3 py-1 bg-blue-50 text-primary text-xs font-medium rounded-full">
    {label}
  </span>
);

export default TechBadge;
