import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsFromBackend, getNewsItemFromBackend } from "@/lib/api";
import { newsData } from "@/data/newsData";
import { NewsItem } from "@/types";
import { DataSourceBadge } from "@/components/news/DataSourceBadge";
export const dynamic = 'force-dynamic';
type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};


export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  let news: NewsItem | null = null;

  try {
    const backendData = await getNewsItemFromBackend(slug);
    if (backendData) {
      news = backendData.data;
    }
  } catch {
    news = newsData.find((item) => item.slug === slug) || null;
  }

  if (!news) {
    return {
      title: "Новость не найдена",
    };
  }

  return {
    title: news.title,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: news.image ? [news.image] : [],
    },
  };
}

export default async function NewsDetail({ params }: PageProps) {
  const { slug } = await params;

  let newsItem: NewsItem | null = null;
  let previousNews: NewsItem | null = null;
  let nextNews: NewsItem | null = null;
  let isBackendAvailable = false;

  try {
    const backendData = await getNewsItemFromBackend(slug);
    if (backendData) {
      newsItem = backendData.data;
      previousNews = backendData.related.previous;
      nextNews = backendData.related.next;
      isBackendAvailable = true;
    }
  } catch {
    // Бэкенд недоступен - используем локальные данные
    newsItem = newsData.find((item) => item.slug === slug) || null;

    if (newsItem) {
      const sortedNews = [...newsData].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      const currentIndex = sortedNews.findIndex((item) => item.slug === slug);

      if (currentIndex > 0) {
        previousNews = sortedNews[currentIndex - 1];
      }
      if (currentIndex < sortedNews.length - 1) {
        nextNews = sortedNews[currentIndex + 1];
      }
    }
  }

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Кнопка назад */}
        <Link
          href="/news"
          className="mb-8 inline-flex items-center text-copy-secondary hover:text-copy-primary transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Назад к новостям
        </Link>

        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-cta text-cta-text text-sm font-medium rounded-full">
              {newsItem.category}
            </span>
            <span className="text-sm text-copy-secondary">
              {new Date(newsItem.date).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
            {newsItem.featured && (
              <span className="text-xs font-medium px-2 py-1 bg-grape/10 text-grape rounded-full">
                Важное
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-copy-primary mb-6">
            {newsItem.title}
          </h1>
          <div className="text-lg text-copy-secondary">{newsItem.excerpt}</div>
        </div>

        {/* Изображение */}
        {newsItem.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Контент */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <div
              className="text-copy-primary leading-relaxed news-content"
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />
          </div>
        </div>

        {/* Навигация между новостями */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <Link
            href="/news"
            className="mb-4 md:mb-0 px-6 py-3 bg-cta text-cta-text font-medium rounded-lg hover:bg-cta-active transition-colors"
          >
            Все новости
          </Link>

          <div className="flex items-center gap-4">
            {previousNews && (
              <Link
                href={`/news/${previousNews.slug}`}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-cta hover:text-cta transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="hidden md:inline">Предыдущая</span>
              </Link>
            )}

            {nextNews && (
              <Link
                href={`/news/${nextNews.slug}`}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-cta hover:text-cta transition-colors"
              >
                <span className="hidden md:inline">Следующая</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
