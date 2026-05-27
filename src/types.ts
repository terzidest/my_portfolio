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
  longDescription: string;
}

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
