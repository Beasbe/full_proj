// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  getProjectItemFromBackend,
  getProjectsFromBackend,
} from "@/lib/apiProjects";

// Типизация для параметров
type PageParams = {
  slug: string;
};

// Функция для генерации статических путей
export async function generateStaticParams() {
  try {
    const { data } = await getProjectsFromBackend({ per_page: 100 });
    return data.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.warn("Не удалось получить проекты для генерации путей:", error);
    return [];
  }
}

// Метаданные для страницы
export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  try {
    const projectData = await getProjectItemFromBackend(slug);

    if (!projectData || !projectData.data) {
      return {
        title: "Проект не найден",
      };
    }

    const project = projectData.data;

    return {
      title: `${project.title} | Наши проекты`,
      description: project.short_description,
      openGraph: {
        title: `${project.title} | Наши проекты`,
        description: project.short_description,
        images: project.image ? [{ url: project.image }] : [],
      },
    };
  } catch (error) {
    console.warn(`Не удалось получить метаданные для проекта ${slug}:`, error);
    return {
      title: "Проект не найден",
    };
  }
}

// ✅ Вспомогательная функция для безопасного преобразования в массив
function ensureArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    // Если строка - пробуем распарсить как JSON или разделить по запятой
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return value.split(",").map((item) => item.trim()) as T[];
    }
  }
  return [];
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  let projectData: Awaited<ReturnType<typeof getProjectItemFromBackend>> = null;

  try {
    projectData = await getProjectItemFromBackend(slug);
  } catch (error) {
    console.warn(`Не удалось получить проект ${slug}:`, error);
  }

  if (!projectData || !projectData.data) {
    notFound();
  }

  const project = projectData.data;

  // ✅ Гарантируем, что все поля-массивы действительно являются массивами
  const technologies = ensureArray<string>(project.technologies);
  const challenges = ensureArray<string>(project.challenges);
  const results = ensureArray<string>(project.results);

  // Используем связанные проекты из ответа API
  const relatedProjects = Array.isArray(projectData.related)
    ? projectData.related.slice(0, 2)
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Навигация */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-copy-secondary hover:text-cta transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        Назад к проектам
      </Link>

      {/* Hero секция */}
      <div className="bg-gradient-to-r from-cta/10 to-grape/10 rounded-3xl p-8 md:p-12 mb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-grow">
            <div className="inline-flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-cta text-cta-text rounded-full font-medium">
                {project.category}
              </span>
              <span className="px-4 py-2 bg-card border border-primary-default rounded-full font-medium flex items-center gap-2">
                <Calendar size={16} />
                {project.year} год
              </span>
              <span className="px-4 py-2 bg-card border border-primary-default rounded-full font-medium flex items-center gap-2">
                <MapPin size={16} />
                {project.location}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-copy-primary mb-6">
              {project.title}
            </h1>

            <p className="text-xl text-copy-secondary mb-8">
              {project.short_description}
            </p>

            <div className="flex flex-wrap gap-6">
              {project.client && (
                <div className="flex items-center gap-3">
                  <User className="text-cta" size={20} />
                  <div>
                    <div className="text-sm text-copy-secondary">Клиент</div>
                    <div className="font-medium">{project.client}</div>
                  </div>
                </div>
              )}
              {project.duration && (
                <div className="flex items-center gap-3">
                  <Calendar className="text-cta" size={20} />
                  <div>
                    <div className="text-sm text-copy-secondary">
                      Срок реализации
                    </div>
                    <div className="font-medium">{project.duration}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/3 w-full">
            <div className="bg-card border border-primary-default rounded-2xl p-6">
              <h3 className="text-xl font-bold text-copy-primary mb-4">
                Технологии
              </h3>
              {technologies.length > 0 ? (
                <div className="space-y-3">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-cta" />
                      <span className="text-copy-secondary">{tech}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-copy-secondary">Информация отсутствует</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Полное описание */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-copy-primary mb-6">
              О проекте
            </h2>
            <div className="prose prose-lg max-w-none mb-12">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div
                  className="text-copy-primary leading-relaxed news-content"
                  dangerouslySetInnerHTML={{ __html: project.full_description }}
                />
              </div>
            </div>
          </div>

          {/* Вызовы и решения */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-copy-primary mb-6">
              Вызовы и решения
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-primary-default rounded-2xl p-6">
                <h3 className="text-xl font-bold text-copy-primary mb-4 flex items-center gap-3">
                  <span className="p-2 bg-red-100 text-red-600 rounded-lg">
                    ⚠️
                  </span>
                  Задачи и сложности
                </h3>
                {challenges.length > 0 ? (
                  <ul className="space-y-3">
                    {challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-copy-secondary">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-copy-secondary">Информация отсутствует</p>
                )}
              </div>
              <div className="bg-card border border-primary-default rounded-2xl p-6">
                <h3 className="text-xl font-bold text-copy-primary mb-4 flex items-center gap-3">
                  <span className="p-2 bg-green-100 text-green-600 rounded-lg">
                    ✅
                  </span>
                  Достигнутые результаты
                </h3>
                {results.length > 0 ? (
                  <ul className="space-y-3">
                    {results.map((result, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-copy-secondary">{result}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-copy-secondary">Информация отсутствует</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Результаты */}
          <div className="bg-gradient-to-b from-cta to-grape rounded-2xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-6">Ключевые результаты</h3>
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <CheckCircle size={16} />
                    </div>
                    <span className="font-medium">{result}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/70">Информация отсутствует</p>
            )}
          </div>

          {/* CTA блок */}
          <div className="bg-card border border-primary-default rounded-2xl p-6">
            <h3 className="text-xl font-bold text-copy-primary mb-4">
              Похожий проект?
            </h3>
            <p className="text-copy-secondary mb-6">
              У нас есть опыт решения подобных задач. Обсудим ваш проект?
            </p>
            <Link
              href="/contact"
              className="block w-full text-center py-3 bg-cta text-cta-text rounded-xl hover:bg-cta-active transition-colors font-medium"
            >
              Обсудить проект
            </Link>
          </div>

          {/* Другие проекты */}
          {relatedProjects.length > 0 && (
            <div className="bg-card border border-primary-default rounded-2xl p-6">
              <h3 className="text-xl font-bold text-copy-primary mb-4">
                Похожие проекты
              </h3>
              <div className="space-y-4">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    href={`/projects/${relatedProject.slug}`}
                    className="block p-4 bg-background rounded-xl hover:bg-cta/5 transition-colors group"
                  >
                    <div className="font-medium mb-2 group-hover:text-cta transition-colors">
                      {relatedProject.title}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-copy-secondary">
                        {relatedProject.year}
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-cta opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
