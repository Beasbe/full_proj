import React from "react";
import Link from "next/link";
import { NewsItem } from "@/types";

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <article className="bg-card border border-border rounded-lg overflow-hidden hover:border-cta transition-all hover:shadow-lg">
      {news.image && (
        <Link href={`/news/${news.slug}`} className="block overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-cta/10 text-cta text-xs font-medium rounded-full">
            {news.category}
          </span>
          <span className="text-xs text-copy-secondary">
            {new Date(news.date).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
          {news.featured && (
            <span className="text-xs font-medium px-2 py-1 bg-grape/10 text-grape rounded-full">
              Важное
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-copy-primary mb-2 line-clamp-2">
          <Link
            href={`/news/${news.slug}`}
            className="hover:text-cta transition-colors"
          >
            {news.title}
          </Link>
        </h3>

        <p className="text-copy-secondary mb-4 line-clamp-3">{news.excerpt}</p>

        <Link
          href={`/news/${news.slug}`}
          className="inline-flex items-center text-cta font-medium hover:text-cta-active transition-colors"
        >
          Читать далее
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
