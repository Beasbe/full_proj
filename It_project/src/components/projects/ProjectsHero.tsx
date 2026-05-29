// components/projects/ProjectsHero.tsx
interface ProjectsHeroProps {
  totalProjects: number;
  yearsCount: number;
  categoriesCount: number;
}

export function ProjectsHero({
  totalProjects,
  yearsCount,
  categoriesCount,
}: ProjectsHeroProps) {
  return (
    <section className="px-4 md:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-copy-primary mb-6">
            Наши <span className="text-cta">проекты</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-copy-secondary max-w-3xl mx-auto leading-relaxed">
            Более 10 лет мы реализуем сложные инфраструктурные проекты в области
            телекоммуникаций, СКС, видеонаблюдения и автоматизации. Здесь вы
            найдете наше портфолио успешных кейсов.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12 md:mb-16">
          <StatCard
            value={`${totalProjects}+`}
            label="Реализованных проектов"
          />
          <StatCard value={`${yearsCount}+`} label="Лет успешной работы" />
          <StatCard value={`${categoriesCount}+`} label="Категорий проектов" />
          <StatCard value="24/7" label="Техническая поддержка" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-card border border-default border-border rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
      <div className="text-2xl md:text-4xl font-bold text-cta mb-2">
        {value}
      </div>
      <div className="text-xs md:text-sm text-copy-secondary">{label}</div>
    </div>
  );
}
