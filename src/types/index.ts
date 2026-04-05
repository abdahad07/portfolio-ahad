export interface NavItem {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imageSrc: string;
  imageAlt: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface SiteProfile {
  name: string;
  title: string;
  intro: string;
  bio: string;
  email: string;
  location: string;
  portraitAlt: string;
  social: {
    label: string;
    href: string;
  }[];
}
