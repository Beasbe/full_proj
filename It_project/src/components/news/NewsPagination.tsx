'use client';

import React from 'react';

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

export function NewsPagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange
}: NewsPaginationProps) {
  if (totalPages <= 1) return null;

  const paginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) buttons.push(i);
        buttons.push('...');
        buttons.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        buttons.push(1);
        buttons.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) buttons.push(i);
      } else {
        buttons.push(1);
        buttons.push('...');
        buttons.push(currentPage - 1);
        buttons.push(currentPage);
        buttons.push(currentPage + 1);
        buttons.push('...');
        buttons.push(totalPages);
      }
    }
    
    return buttons;
  };

  return (
    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-copy-secondary">
        Показано {startIndex + 1}-{Math.min(endIndex, totalItems)} из {totalItems} новостей
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-cta hover:text-cta transition-colors"
        >
          ← Назад
        </button>

        <div className="flex items-center space-x-2">
          {paginationButtons().map((pageNum, index) => (
            pageNum === '...' ? (
              <span key={`ellipsis-${index}`} className="text-copy-secondary px-2">
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum as number)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? 'bg-cta text-cta-text'
                    : 'border border-border hover:border-cta hover:text-cta'
                }`}
              >
                {pageNum}
              </button>
            )
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-cta hover:text-cta transition-colors"
        >
          Вперед →
        </button>
      </div>
    </div>
  );
}