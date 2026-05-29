'use client';

import React from 'react';

interface NewsEmptyStateProps {
  onReset: () => void;
}

export function NewsEmptyState({ onReset }: NewsEmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-border/30 flex items-center justify-center">
        <svg className="w-12 h-12 text-copy-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-copy-primary mb-2">
        Новости не найдены
      </h3>
      <p className="text-copy-secondary mb-6 max-w-md mx-auto">
        Попробуйте изменить параметры поиска или выбрать другую категорию
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 bg-cta text-cta-text font-medium rounded-lg hover:bg-cta-active transition-colors"
      >
        Показать все новости
      </button>
    </div>
  );
}