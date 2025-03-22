import { Article, Category } from './types';
import { Newspaper, Briefcase, Globe2, Heart, Cpu, Gamepad2, DivideIcon as LucideIcon } from 'lucide-react';

export const categories: Category[] = [
  { id: '1', name: 'General', icon: Newspaper, isSelected: true },
  { id: '2', name: 'Business', icon: Briefcase, isSelected: true },
  { id: '3', name: 'World', icon: Globe2, isSelected: true },
  { id: '4', name: 'Health', icon: Heart, isSelected: false },
  { id: '5', name: 'Technology', icon: Cpu, isSelected: true },
  { id: '6', name: 'Gaming', icon: Gamepad2, isSelected: false },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'AI Breakthrough: New Model Achieves Human-Level Understanding',
    summary: 'Researchers have developed a new AI model that demonstrates unprecedented levels of language comprehension and reasoning abilities.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    source: 'Tech Daily',
    publishedAt: '2024-03-15T10:30:00Z',
    sentiment: 'positive',
    isRead: false,
    isSaved: false,
  },
  {
    id: '2',
    title: 'Global Markets React to New Economic Policies',
    summary: 'Major stock markets show mixed reactions as central banks announce coordinated policy changes.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
    source: 'Financial Times',
    publishedAt: '2024-03-15T09:15:00Z',
    sentiment: 'neutral',
    isRead: false,
    isSaved: true,
  },
  {
    id: '3',
    title: 'Climate Change: New Study Shows Accelerated Impact',
    summary: 'Latest research indicates environmental changes are occurring faster than previously predicted.',
    imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce',
    source: 'Environmental Report',
    publishedAt: '2024-03-15T08:45:00Z',
    sentiment: 'negative',
    isRead: true,
    isSaved: false,
  },
];

