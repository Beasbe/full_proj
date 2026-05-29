"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useProjectsFilters } from "@/hooks/useProjectsFilters";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectsFilters } from "@/components/projects/ProjectsFilters";
import { ProjectsLoading } from "@/components/projects/ProjectsLoading";
import { ProjectsError } from "@/components/projects/ProjectsError";
import { ProjectsCTA } from "@/components/projects/ProjectsCTA";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ProjectItem } from "@/types";
import {
  getProjectsFromBackend,
  getProjectCategoriesFromBackend,
  getProjectYearsFromBackend,
  checkBackendAvailability,
} from "@/lib/apiProjects";

function ProjectsPageContent() {
  const {
    searchQuery,
    selectedCategory,
    selectedYear,
    currentPage,
    handleSearchChange,
    handleCategoryChange,
    handleYearChange,
    handleResetFilters,
    handlePageChange,
  } = useProjectsFilters();

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBackendAvailable, setIsBackendAvailable] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState<any>(null);

  // Проверка доступности бэкенда
  useEffect(() => {
    checkBackendAvailability().then(setIsBackendAvailable);
  }, []);

  // Загрузка данных
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        // Загружаем категории и годы
        const [categoriesData, yearsData] = await Promise.all([
          getProjectCategoriesFromBackend(),
          getProjectYearsFromBackend(),
        ]);
        setCategories(categoriesData);
        setYears(yearsData);

        // Загружаем проекты, если бэкенд доступен
        if (isBackendAvailable) {
          const { data, meta } = await getProjectsFromBackend({
            category: selectedCategory !== "Все" ? selectedCategory : undefined,
            year: selectedYear !== "Все" ? selectedYear : undefined,
            search: searchQuery || undefined,
            page: currentPage,
            per_page: 12,
          });
          setProjects(data);
          setPaginationMeta(meta);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [
    selectedCategory,
    selectedYear,
    searchQuery,
    currentPage,
    isBackendAvailable,
  ]);

  // Фильтрация на клиенте, если бэкенд недоступен
  const filteredProjects = useMemo(() => {
    if (isBackendAvailable) return projects;

    return projects.filter((project) => {
      const matchesYear =
        selectedYear === "Все" || project.year === parseInt(selectedYear);
      const matchesCategory =
        selectedCategory === "Все" || project.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.short_description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesYear && matchesCategory && matchesSearch;
    });
  }, [
    projects,
    isBackendAvailable,
    selectedYear,
    selectedCategory,
    searchQuery,
  ]);

  if (isLoading) {
    return <ProjectsLoading />;
  }

  if (error && !isBackendAvailable && projects.length === 0) {
    return (
      <ProjectsError message={error} onRetry={() => window.location.reload()} />
    );
  }

  const totalPages = paginationMeta?.last_page || 1;
  const totalProjects = paginationMeta?.total || filteredProjects.length;

  return (
    <div className="min-h-screen bg-background transition-theme">
      <ProjectsHero
        totalProjects={totalProjects}
        yearsCount={years.length}
        categoriesCount={categories.length}
      />

      <ProjectsFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedYear={selectedYear}
        categories={categories}
        years={years}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onYearChange={handleYearChange}
        onResetFilters={handleResetFilters}
        totalFiltered={filteredProjects.length}
      />

      <ProjectsGrid
        projects={isBackendAvailable ? projects : filteredProjects}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onResetFilters={handleResetFilters}
      />

      <ProjectsCTA />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsPageContent />
    </Suspense>
  );
}
