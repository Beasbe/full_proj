import React from "react";
import Link from "next/link";
import { NewsItem } from "@/types";

interface NewsArchiveRowProps {
  news: NewsItem;
}

export default function NewsArchiveRow({ news }: NewsArchiveRowProps) {
  return (
    <div className="grid grid-cols-12 p-4 hover:bg-background/50 transition-colors">
      <div className="col-span-3 text-copy-secondary">
        {new Date(news.date).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </div>
      <div className="col-span-2">
        <span className="px-2 py-1 bg-cta/10 text-cta text-xs font-medium rounded-full">
          {news.category}
        </span>
      </div>
      <div className="col-span-6">
        <Link
          href={`/news/${news.slug}`}
          className="font-medium text-copy-primary hover:text-cta transition-colors line-clamp-1"
        >
          {news.title}
        </Link>
        {news.featured && <span className="ml-2 text-xs text-grape">★</span>}
      </div>
      <div className="col-span-1 text-right">
        <Link
          href={`/news/${news.slug}`}
          className="inline-flex items-center text-cta hover:text-cta-active transition-colors"
        >
          <svg
            className="w-5 h-5"
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
      </div>
    </div>
  );
}
