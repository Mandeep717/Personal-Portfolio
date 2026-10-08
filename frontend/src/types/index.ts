export interface Contact {
  email?: string;
  phone?: string;
  location?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
}

export interface CodingProfile {
  _id?: string;
  platform: string;
  username?: string;
  url: string;
}

export interface SkillCategory {
  _id?: string;
  category: string;
  items: string[];
}

export interface Resume {
  url: string;
  fileName: string;
}

export interface Profile {
  _id?: string;
  name: string;
  title: string;
  bio: string;
  contact?: Contact;
  socialLinks?: SocialLinks;
  codingProfiles?: CodingProfile[];
  skills?: SkillCategory[];
  resume?: Resume;
  createdAt?: string;
  updatedAt?: string;
}

export type PortfolioType = 'education' | 'experience' | 'project' | 'achievement';

export interface PortfolioItem {
  _id: string;
  type: PortfolioType;
  title: string;
  organization?: string;
  description?: string;
  technologies?: string[];
  details?: string[];
  startDate?: string;
  endDate?: string;
  githubUrl?: string;
  liveUrl?: string;
  certificateUrl?: string;
  featured?: boolean;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ChatRequest {
  query: string;
  conversationId?: string;
}

export interface ChatResponseData {
  conversationId: string;
  answer: string;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  data: ChatResponseData;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
}
