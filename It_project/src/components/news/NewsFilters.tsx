'use client';

import React from 'react';

interface NewsFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  selectedYear: string;
  categories: string[];
  years: number[];
  viewMode: string;
  itemsPerPage: number;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onViewModeChange: (mode: string) => void;
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onResetFilters: () => void;
  showResetButton: boolean;
}

export function NewsFilters({
  searchQuery,
  selectedCategory,
  selectedYear,
  categories,
  years,
  viewMode,
  itemsPerPage,
  onSearchChange,
  onCategoryChange,
  onYearChange,
  onViewModeChange,
  onItemsPerPageChange,
  onResetFilters,
  showResetButton
}: NewsFiltersProps) {
  return (
    <div className="mb-8 bg-card border border-border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Поиск */}
        <div>
          <label className="block text-sm font-medium text-copy-primary mb-2">
            Поиск по новостям
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Введите ключевые слова..."
              className="w-full px-4 py-3 pl-12 bg-background border border-border rounded-lg focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-colors"
            />
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-copy-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Фильтр по категории */}
        <div>
          <label className="block text-sm font-medium text-copy-primary mb-2">
            Категория
          </label>
          <select
            value={selectedCategory}
            onChange={onCategoryChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-colors"
          >
            <option value="Все">Все категории</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Фильтр по году */}
        <div>
          <label className="block text-sm font-medium text-copy-primary mb-2">
            Год
          </label>
          <select
            value={selectedYear}
            onChange={onYearChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-colors"
          >
            <option value="Все">Все годы</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Управление отображением */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-copy-secondary">
            Режим просмотра:
          </span>
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`px-4 py-2 transition-colors ${viewMode === 'grid' ? 'bg-cta text-cta-text' : 'bg-background hover:bg-card'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`px-4 py-2 transition-colors ${viewMode === 'list' ? 'bg-cta text-cta-text' : 'bg-background hover:bg-card'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-copy-secondary">
            Показывать по:
          </span>
          <select
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            className="px-3 py-2 bg-background border border-border rounded-lg focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-colors"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>

        {showResetButton && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:border-cta hover:text-cta transition-colors"
          >
            Сбросить фильтры
          </button>
        )}
      </div>
    </div>
  );
}