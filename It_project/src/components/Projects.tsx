"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import projectsData from "@/data/projects";

interface Project {
  id: number;
  slug: string;
  title: string;
  year: string;
  category: string;
  shortDescription: string;
  location: string;
}

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Берем первые 6 проектов для главной
  const featuredProjects = projectsData.slice(0, 6);

  return (
    <section className="py-24 bg-background relative overflow-hidden w-full border-t border-primary-default">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-grape rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cta rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="px-4 md:px-6 lg:px-8 relative z-10">
        {/* Заголовок */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-cta/10 text-cta rounded-full text-sm font-medium">
            <span>Наши проекты</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-copy-primary mb-6">
            Реализованные <span className="text-cta">решения</span>
          </h2>
          <p className="text-xl text-copy-secondary max-w-3xl mx-auto">
            Наша экспертиза подтверждена успешными проектами в различных
            отраслях
          </p>
        </div>

        {/* Сетка проектов - 3 колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-card border border-primary-default rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-cta/50 h-full flex flex-col"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Шапка карточки */}
              <div className="p-2 pb-6 flex-grow">
                {/* Верхний блок - год и категория */}
                <div className="flex justify-between items-start mb-8 px-4 pt-4">
                  <div className="inline-flex px-4 py-2 bg-cta/10 text-cta rounded-full text-base font-medium">
                    {project.year}
                  </div>
                  <span className="px-3 py-1 bg-primary-default/10 text-copy-secondary rounded-full text-sm">
                    {project.category}
                  </span>
                </div>

                {/* Название проекта */}
                <h3 className="text-2xl font-bold text-copy-primary mb-6 text-center group-hover:text-cta transition-colors leading-tight px-4">
                  {project.title}
                </h3>

                {/* Разделительная линия */}
                <div className="mb-8 flex justify-center">
                  <div className="w-16 h-1 bg-cta/30 rounded-full"></div>
                </div>

                {/* Описание */}
                <p className="text-lg text-copy-secondary leading-relaxed text-center mb-10 px-4">
                  {project.shortDescription}
                </p>
              </div>

              {/* Футер карточки с кнопкой статьи */}
              <div className="px-8 py-6 border-t border-border bg-background/50">
                <div className="flex items-center justify-between">
                  {/* Локация - слева */}
                  <div className="text-base text-copy-secondary font-medium">
                    {project.location}
                  </div>

                  {/* Анимированная стрелка на статью - справа */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-cta text-cta-text rounded-lg hover:bg-cta-active transition-all duration-300 font-medium group/btn"
                    title="Подробнее о проекте"
                  >
                    <ArrowRight
                      size={18}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>

              {/* Эффект наведения */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-cta/5 to-transparent pointer-events-none transition-opacity duration-300 ${
                  hoveredProject === project.id ? "opacity-100" : "opacity-0"
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Кнопка "Все проекты" */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-cta text-cta-text rounded-xl hover:bg-cta-active transition-all duration-300 font-semibold text-xl group shadow-lg hover:shadow-xl"
          >
            <span>Смотреть все проекты</span>
            <ArrowRight
              size={24}
              className="group-hover:translate-x-2 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
