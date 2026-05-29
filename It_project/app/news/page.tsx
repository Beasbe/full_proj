"use client";

import React, { useState, useCallback, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NewsCarousel from "@/components/NewsCarousel";
import { useNewsData } from "@/hooks/useNewsData";
import { NewsFilters } from "@/components/news/NewsFilters";
import { NewsGrid } from "@/components/news/NewsGrid";
import { NewsList } from "@/components/news/NewsList";
import { NewsPagination } from "@/components/news/NewsPagination";
import { NewsEmptyState } from "@/components/news/NewsEmptyState";
import { NewsStats } from "@/components/news/NewsStats";
import { QuickCategories } from "@/components/news/QuickCategories";
import { DataSourceBadge } from "@/components/news/DataSourceBadge";
import { newsData as localNewsData } from "@/data/newsData";

function NewsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Получаем параметры из URL
  const initialCategory = searchParams.get("category") || "";
  const initialYear = searchParams.get("year") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialPage = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const initialPerPage = searchParams.get("per_page")
    ? parseInt(searchParams.get("per_page")!)
    : 12;

  // Состояние для UI
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || "Все",
  );
  const [selectedYear, setSelectedYear] = useState(initialYear || "Все");
  const [viewMode, setViewMode] = useState("grid");
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  const {
    news,
    categories,
    years,
    latestNews,
    isLoading,
    error,
    isBackendAvailable,
    paginationMeta,
    refreshData,
  } = useNewsData({
    category: initialCategory || undefined,
    year: initialYear || undefined,
    search: initialSearch || undefined,
    page: initialPage,
    per_page: itemsPerPage,
  });

  const filteredLocalNews = useMemo(() => {
    if (isBackendAvailable) return [];

    let filtered = localNewsData;

    if (selectedCategory !== "Все") {
      filtered = filtered.filter((news) => news.category === selectedCategory);
    }

    if (selectedYear !== "Все") {
      filtered = filtered.filter(
        (news) => news.year === parseInt(selectedYear),
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(query) ||
          news.excerpt.toLowerCase().includes(query) ||
          news.content.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [selectedCategory, selectedYear, searchQuery, isBackendAvailable]);

  // Определяем какие данные показывать
  const displayNews = isBackendAvailable ? news : filteredLocalNews;
  const displayCategories = isBackendAvailable
    ? categories
    : Array.from(new Set(localNewsData.map((n) => n.category)));
  const displayYears = isBackendAvailable
    ? years
    : Array.from(new Set(localNewsData.map((n) => n.year))).sort(
        (a, b) => b - a,
      );
  const displayLatestNews = isBackendAvailable
    ? latestNews
    : localNewsData.filter((n) => n.featured).slice(0, 5);

  // Пагинация
  const totalPages = isBackendAvailable
    ? paginationMeta?.last_page || 1
    : Math.ceil(filteredLocalNews.length / itemsPerPage);

  const startIndex = (initialPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = isBackendAvailable
    ? displayNews
    : displayNews.slice(startIndex, endIndex);

  const totalItems = isBackendAvailable
    ? paginationMeta?.total || displayNews.length
    : displayNews.length;

  // Обработчики
  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCategory = e.target.value;
      setSelectedCategory(newCategory);

      const params = new URLSearchParams(searchParams.toString());
      if (newCategory !== "Все") {
        params.set("category", newCategory);
      } else {
        params.delete("category");
      }
      params.delete("page");

      router.push(`/news?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newYear = e.target.value;
      setSelectedYear(newYear);

      const params = new URLSearchParams(searchParams.toString());
      if (newYear !== "Все") {
        params.set("year", newYear);
      } else {
        params.delete("year");
      }
      params.delete("page");

      router.push(`/news?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);

      const timeoutId = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
        params.delete("page");
        router.push(`/news?${params.toString()}`, { scroll: false });
      }, 500);

      return () => clearTimeout(timeoutId);
    },
    [router, searchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`/news?${params.toString()}`, { scroll: false });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router, searchParams],
  );

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("Все");
    setSelectedYear("Все");
    router.push("/news");
  }, [router]);

  const handleItemsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = Number(e.target.value);
      setItemsPerPage(value);

      const params = new URLSearchParams(searchParams.toString());
      params.set("per_page", value.toString());
      params.delete("page");
      router.push(`/news?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleViewModeChange = useCallback((mode: string) => {
    setViewMode(mode);
  }, []);

  const handleQuickCategorySelect = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      const params = new URLSearchParams();
      params.set("category", category);
      router.push(`/news?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  // Годы для статистики
  const yearsRange = useMemo(() => {
    const yearsList = displayYears;
    if (!yearsList || yearsList.length === 0) return "Н/Д";

    try {
      const validYears = yearsList.filter(
        (y) => typeof y === "number" && !isNaN(y),
      );
      if (validYears.length === 0) return "Н/Д";

      const maxYear = Math.max(...validYears);
      const minYear = Math.min(...validYears);

      if (maxYear === -Infinity || minYear === Infinity) return "Н/Д";

      return `${maxYear} - ${minYear}`;
    } catch {
      return "Н/Д";
    }
  }, [displayYears]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cta mx-auto"></div>
            <p className="mt-4 text-copy-secondary">Загрузка новостей...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !isBackendAvailable && displayNews.length === 0) {
    return (
      <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-copy-primary mb-2">
              Ошибка загрузки
            </h3>
            <p className="text-copy-secondary mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => refreshData()}
              className="px-6 py-3 bg-cta text-cta-text font-medium rounded-lg hover:bg-cta-active transition-colors"
            >
              Повторить попытку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок и статус */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-copy-primary mb-4">
            Все новости
          </h1>
          <p className="text-lg text-copy-secondary max-w-3xl mx-auto">
            Полный архив новостей компании. Будьте в курсе всех наших достижений
            и событий.
          </p>
        </div>

        {/* Карусель с последними новостями */}
        {displayLatestNews.length > 0 && (
          <div className="mb-12">
            <NewsCarousel news={displayLatestNews} />
          </div>
        )}

        {/* Фильтры */}
        <NewsFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedYear={selectedYear}
          categories={displayCategories}
          years={displayYears}
          viewMode={viewMode}
          itemsPerPage={itemsPerPage}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onYearChange={handleYearChange}
          onViewModeChange={handleViewModeChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          onResetFilters={handleResetFilters}
          showResetButton={
            selectedCategory !== "Все" ||
            selectedYear !== "Все" ||
            !!searchQuery
          }
        />

        {/* Результаты */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div>
              {searchQuery && (
                <p className="text-copy-secondary mt-1">
                  По запросу: "
                  <span className="font-medium">{searchQuery}</span>"
                </p>
              )}
            </div>
            {currentNews.length > 0 && (
              <div className="text-sm text-copy-secondary">
                Страница {initialPage} из {totalPages}
              </div>
            )}
          </div>

          {currentNews.length > 0 ? (
            <>
              {viewMode === "grid" ? (
                <NewsGrid news={currentNews} />
              ) : (
                <NewsList news={currentNews} />
              )}

              <NewsPagination
                currentPage={initialPage}
                totalPages={totalPages}
                totalItems={totalItems}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <NewsEmptyState onReset={handleResetFilters} />
          )}
        </div>

        {/* Быстрые категории */}
        <QuickCategories
          categories={displayCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleQuickCategorySelect}
        />
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cta mx-auto"></div>
              <p className="mt-4 text-copy-secondary">Загрузка новостей...</p>
            </div>
          </div>
        </div>
      }
    >
      <NewsPageContent />
    </Suspense>
  );
}
