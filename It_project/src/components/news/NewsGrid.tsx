'use client';

import React from 'react';
import NewsCard from '../NewsCard';
import { NewsItem } from '@/types';

interface NewsGridProps {
  news: NewsItem[];
}

export function NewsGrid({ news }: NewsGridProps) {
  if (!news.length) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}