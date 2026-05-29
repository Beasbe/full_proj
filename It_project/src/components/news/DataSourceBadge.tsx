'use client';

import React from 'react';

interface DataSourceBadgeProps {
  isBackendAvailable: boolean;
  isLoading?: boolean;
}

export function DataSourceBadge({ isBackendAvailable, isLoading }: DataSourceBadgeProps) {
  if (isLoading) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
        <span className="text-sm text-copy-secondary">Загрузка...</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
      <div className={`w-2 h-2 rounded-full ${isBackendAvailable ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
      <span className="text-sm text-copy-secondary">
        {isBackendAvailable ? 'Данные из бэкенда' : 'Локальные данные (оффлайн режим)'}
      </span>
    </div>
  );
}