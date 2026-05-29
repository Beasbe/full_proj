// components/ProjectsGrid.tsx
"use client";

import Link from "next/link";
import {
  Calendar,
  MapPin,
  CheckCircle,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";
import { ProjectItem } from "@/types";
import { useState } from "react";

interface ProjectsGridProps {
  projects: ProjectItem[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
  isLoading?: boolean;
}

interface ProjectCardProps {
  project: ProjectItem;
}

// Компонент карточки проекта
function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="group bg-card border border-default border-border rounded-xl md:rounded-2xl overflow-hidden hover:shadow-lg hover:border-cta/50 transition-all duration-300 h-full flex flex-col">
      {/* Верхний блок с изображением или заглушкой */}
      <div className="h-40 md:h-48 relative overflow-hidden bg-gradient-to-r from-cta/20 to-grape/20">
        {!imageError && project.image && (
          <img
            src={project.image} // теперь TypeScript не ругается, если тип project.image — string
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
            alt={project.title}
          />
        )}
        {imageError && (
          // заглушка на случай ошибки загрузки
          <div className="absolute inset-0 flex items-center justify-center">
            {project.image ? (
              <ImageIcon size={48} className="text-white/30" />
            ) : (
              <div className="text-3xl md:text-4xl font-bold text-white/30">
                {project.title.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        )}

        {/* Бейджи */}
        <div className="absolute top-3 md:top-4 left-3 md:left-4">
          <span className="px-2 md:px-3 py-1 bg-cta text-cta-text text-xs md:text-sm font-medium rounded-full shadow-sm">
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 md:top-4 right-3 md:right-4 flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-cta backdrop-blur-sm rounded-full shadow-sm">
          <span className="text-xs md:text-sm font-medium text-cta-text">
            {project.year}
          </span>
        </div>

        {/* Градиент поверх изображения для читаемости */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-4 md:p-6 flex-grow">
        <h3 className="text-lg md:text-xl font-bold text-copy-primary mb-3 md:mb-4 group-hover:text-cta transition-colors line-clamp-2">
          {project.title}
        </h3>

        <p className="text-sm md:text-base text-copy-secondary mb-4 md:mb-6 leading-relaxed line-clamp-3">
          {project.short_description}
        </p>

        {/* Локация */}
        {project.location && (
          <div className="flex items-center gap-1 md:gap-2 text-copy-secondary mb-4 md:mb-6">
            <MapPin size={14} className="flex-shrink-0" />
            <span className="font-medium text-xs md:text-sm line-clamp-1">
              {project.location}
            </span>
          </div>
        )}

        {/* Результаты (первые 2) */}
        {project.results &&
          Array.isArray(project.results) &&
          project.results.length > 0 && (
            <div className="space-y-1 md:space-y-2 mb-4 md:mb-6">
              {project.results.slice(0, 2).map((result, index) => (
                <div key={index} className="flex items-center gap-1 md:gap-2">
                  <CheckCircle size={12} className="text-cta flex-shrink-0" />
                  <span className="text-xs md:text-sm text-copy-secondary line-clamp-1">
                    {result}
                  </span>
                </div>
              ))}
            </div>
          )}
      </div>

      {/* Футер с кнопкой */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-t border-default border-border bg-background/50">
        <Link
          href={`/projects/${project.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 md:py-3 bg-cta text-cta-text rounded-lg md:rounded-xl hover:bg-cta-active transition-all duration-300 font-medium text-sm md:text-base group/btn"
        >
          <span>Подробнее о проекте</span>
          <ArrowRight
            size={16}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}

// Компонент заглушки при загрузке
function ProjectCardSkeleton() {
  return (
    <div className="bg-card border border-default border-border rounded-xl md:rounded-2xl overflow-hidden h-full flex flex-col animate-pulse">
      <div className="h-40 md:h-48 bg-gradient-to-r from-cta/20 to-grape/20" />
      <div className="p-4 md:p-6 flex-grow space-y-4">
        <div className="h-6 bg-border rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-border rounded w-full" />
          <div className="h-4 bg-border rounded w-5/6" />
          <div className="h-4 bg-border rounded w-4/6" />
        </div>
        <div className="h-4 bg-border rounded w-1/2" />
      </div>
      <div className="px-4 md:px-6 py-3 md:py-4 border-t border-default border-border">
        <div className="h-10 bg-border rounded-lg" />
      </div>
    </div>
  );
}

// Компонент пустого состояния
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-12 md:py-16">
      <div className="text-4xl md:text-5xl mb-4 md:mb-6">🔍</div>
      <h3 className="text-xl md:text-2xl font-bold text-copy-primary mb-3 md:mb-4">
        Проекты не найдены
      </h3>
      <p className="text-sm md:text-base text-copy-secondary mb-6 md:mb-8 max-w-md mx-auto">
        Попробуйте изменить параметры фильтрации или введите другой поисковый
        запрос
      </p>
      <button
        onClick={onReset}
        className="px-6 md:px-8 py-2 md:py-3 bg-cta text-cta-text rounded-lg md:rounded-xl hover:bg-cta-active transition-colors font-medium text-sm md:text-base"
      >
        Показать все проекты
      </button>
    </div>
  );
}

// Компонент пагинации
function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  // Ограничиваем количество отображаемых кнопок (необязательно, но полезно)
  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);
  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 md:px-4 py-2 rounded-lg border border-default border-border transition-colors ${
            page === currentPage
              ? "bg-cta text-cta-text border-cta"
              : "bg-card text-copy-primary hover:bg-cta/10"
          }`}
          aria-label={`Страница ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

// Основной компонент сетки проектов
export function ProjectsGrid({
  projects,
  totalPages,
  currentPage,
  onPageChange,
  onResetFilters,
  isLoading = false,
}: ProjectsGridProps) {
  if (isLoading) {
    return (
      <section className="px-4 md:px-6 lg:px-8 mb-16 md:mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-6 lg:px-8 mb-16 md:mb-20">
      <div className="max-w-7xl mx-auto">
        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <EmptyState onReset={onResetFilters} />
        )}
      </div>
    </section>
  );
}

export default ProjectsGrid;
