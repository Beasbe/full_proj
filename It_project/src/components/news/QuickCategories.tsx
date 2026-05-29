'use client';

import React from 'react';

interface QuickCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function QuickCategories({ categories, selectedCategory, onSelectCategory }: QuickCategoriesProps) {
  if (!categories.length) return null;
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-copy-primary mb-4">
        Популярные категории:
      </h3>
      <div className="flex flex-wrap gap-3">
        {categories.slice(0, 6).map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === cat
                ? 'bg-cta text-cta-text'
                : 'bg-card border border-border hover:border-cta hover:text-cta'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}