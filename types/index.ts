export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'featured' | 'other';
  metrics?: {
    stars?: number;
    forks?: number;
    impact?: string;
  };
}

export interface Skill {
  id: number;
  name: string;
  category: 'cybersecurity' | 'devops' | 'linux' | 'cloud' | 'programming';
  proficiency: number;
  description?: string;
  icon?: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  achievements: string[];
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  description: string;
  badge: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  status: 'published' | 'draft' | 'coming-soon';
  slug?: string;
}

export type Theme = 'dark' | 'light';