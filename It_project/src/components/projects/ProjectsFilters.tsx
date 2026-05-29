// components/projects/ProjectsFilters.tsx
interface ProjectsFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  selectedYear: string;
  categories: string[];
  years: number[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onResetFilters: () => void;
  totalFiltered: number;
}

export function ProjectsFilters({
  searchQuery,
  selectedCategory,
  selectedYear,
  categories,
  years,
  onSearchChange,
  onCategoryChange,
  onYearChange,
  onResetFilters,
  totalFiltered,
}: ProjectsFiltersProps) {
  return (
    <section className="px-4 md:px-6 lg:px-8 mb-12 md:mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-default border-border rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            <div>
              <label className="block text-sm font-medium text-copy-secondary mb-2">
                Поиск проектов
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Название проекта, описание, локация..."
                className="w-full px-4 py-3 bg-background border border-default border-border rounded-lg md:rounded-xl focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-all text-copy-primary placeholder:text-copy-secondary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-copy-secondary mb-2">
                Год реализации
              </label>
              <select
                value={selectedYear}
                onChange={onYearChange}
                className="w-full px-4 py-3 bg-background border border-default border-border rounded-lg md:rounded-xl focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-all appearance-none text-copy-primary"
              >
                <option value="Все">Все годы</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-copy-secondary mb-2">
                Категория
              </label>
              <select
                value={selectedCategory}
                onChange={onCategoryChange}
                className="w-full px-4 py-3 bg-background border border-default border-border rounded-lg md:rounded-xl focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-all appearance-none text-copy-primary"
              >
                <option value="Все">Все категории</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="text-sm text-copy-secondary">
              Найдено проектов:{" "}
              <span className="font-bold text-copy-primary">
                {totalFiltered}
              </span>
            </div>
            <button
              onClick={onResetFilters}
              className="px-4 md:px-6 py-2 md:py-3 text-cta hover:text-cta-active font-medium hover:bg-cta/10 rounded-lg md:rounded-xl transition-all text-sm md:text-base"
            >
              Сбросить фильтры
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
