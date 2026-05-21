export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'Full-Stack' | 'Django/React' | 'Web3/Cloud';
  analytics?: {
    labels: string[];
    values: number[];
  };
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  items: { name: string; icon: string; rating: number; desc: string }[];
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
  badge?: string;
}

export interface Certification {
  title: string;
  platform: string;
  date: string;
  link?: string;
  verificationId?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}


