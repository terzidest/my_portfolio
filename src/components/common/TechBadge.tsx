// Single pill style for tech-stack tags so cards and case studies match.
const TechBadge = ({ label }: { label: string }) => (
  <span className="px-3 py-1 bg-blue-50 text-primary dark:bg-blue-500/10 dark:text-blue-300 text-xs font-medium rounded-full">
    {label}
  </span>
);

export default TechBadge;
