import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  isRead: boolean;
  isSaved: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  isSelected: boolean;
}