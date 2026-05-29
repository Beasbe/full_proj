// hooks/useProjectsFilters.ts
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

export function useProjectsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Инициализация из URL
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "Все",
  );
  const [selectedYear, setSelectedYear] = useState(
    searchParams.get("year") || "Все",
  );
  const currentPage = Number(searchParams.get("page")) || 1;

  // Обновление URL при изменении фильтров
  const updateUrl = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "Все") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });
      // При изменении любого фильтра сбрасываем страницу
      if (updates.page === undefined) {
        params.delete("page");
      }
      router.push(`/projects?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  // Обработчики
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      const timeoutId = setTimeout(() => {
        updateUrl({ search: value || null });
      }, 500);
      return () => clearTimeout(timeoutId);
    },
    [updateUrl],
  );

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setSelectedCategory(value);
      updateUrl({ category: value === "Все" ? null : value });
    },
    [updateUrl],
  );

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setSelectedYear(value);
      updateUrl({ year: value === "Все" ? null : value });
    },
    [updateUrl],
  );

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("Все");
    setSelectedYear("Все");
    updateUrl({ search: null, category: null, year: null, page: null });
  }, [updateUrl]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateUrl({ page });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateUrl],
  );

  return {
    // значения
    searchQuery,
    selectedCategory,
    selectedYear,
    currentPage,
    // обработчики
    handleSearchChange,
    handleCategoryChange,
    handleYearChange,
    handleResetFilters,
    handlePageChange,
  };
}
