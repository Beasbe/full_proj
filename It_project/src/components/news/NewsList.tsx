'use client';

import React from 'react';
import NewsArchiveRow from '../NewsArchiveRow';
import { NewsItem } from '@/types';

interface NewsListProps {
  news: NewsItem[];
}

export function NewsList({ news }: NewsListProps) {
  if (!news.length) return null;
  
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border bg-background/50">
        <div className="grid grid-cols-12 text-sm font-medium text-copy-secondary">
          <div className="col-span-3">Дата</div>
          <div className="col-span-2">Категория</div>
          <div className="col-span-6">Заголовок</div>
          <div className="col-span-1"></div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {news.map((item) => (
          <NewsArchiveRow key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
}