'use client';

import React from 'react';

interface NewsStatsProps {
  totalNews: number;
  totalCategories: number;
  totalYears: number;
  yearsRange: string;
}

export function NewsStats({ totalNews, totalCategories, totalYears, yearsRange }: NewsStatsProps) {
  // Проверяем, что yearsRange валидный
  const displayYearsRange = yearsRange.includes('Infinity') || yearsRange === 'Н/Д' 
    ? 'Н/Д' 
    : yearsRange;

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-3xl font-bold text-cta mb-2">
            {totalNews}
          </div>
          <div className="text-sm text-copy-secondary">
            Всего новостей
          </div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-3xl font-bold text-grape mb-2">
            {totalYears}
          </div>
          <div className="text-sm text-copy-secondary">
            Года
          </div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-3xl font-bold text-cta mb-2">
            {totalCategories}
          </div>
          <div className="text-sm text-copy-secondary">
            Категорий
          </div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-3xl font-bold text-grape mb-2">
            {displayYearsRange}
          </div>
          <div className="text-sm text-copy-secondary">
            Период
          </div>
        </div>
      </div>
    </div>
  );
}