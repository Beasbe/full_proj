// Приводим к структуре Laravel backend
export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  year: number;
  featured?: boolean;
  image: string | null;
  slug: string;

  created_at?: string;
  updated_at?: string;
}

export interface ProjectItem {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  year: number;
  location: string;
  category: string;
  client?: string;
  duration?: string;
  technologies?: string[];
  challenges?: string[];
  results?: string[];
  image?: string | null;
  featured?: boolean;
  is_published?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface NewsItemResponse {
  data: NewsItem;
  related: {
    previous: NewsItem | null;
    next: NewsItem | null;
  };
}

export interface ProjectItemResponse {
  data: ProjectItem;
  related: ProjectItem[];
}
