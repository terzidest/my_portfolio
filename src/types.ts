export type ProjectCategory = 'mobile' | 'web';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  additionalImages: string[];
  techStack: string[];
  categories: ProjectCategory[];
  github: string;
  featured: boolean;
  /** What this project addressed (1–2 paragraphs; use \n\n for paragraph breaks). */
  problem: string;
  /** Your role on the project (typically one or two sentences). */
  role: string;
  /** What you shipped or what was learned (1–2 paragraphs). */
  outcome: string;
}

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export interface Experience {
  /** Job title, e.g. "Frontend Engineer" */
  title: string;
  /** Company / organization name */
  company: string;
  /** Date range as displayed, e.g. "2025 – present" */
  dates: string;
  /** Optional intro paragraph above the bullets */
  description?: string;
  /** Achievement / responsibility bullets */
  bullets: string[];
}
