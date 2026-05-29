"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NewsItem } from "@/types";

interface NewsCarouselProps {
  news: NewsItem[];
}

export default function NewsCarousel({ news = [] }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_SCROLL_DELAY = 5000; // 5 секунд

  // Если новостей нет, не рендерим компонент
  if (!news.length) {
    return null;
  }

  // Берем только первые 5 новостей
  const displayNews = news.slice(0, 5);

  // Функция сброса и перезапуска таймера
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (isPlaying && displayNews.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayNews.length);
      }, AUTO_SCROLL_DELAY);
    }
  };

  // Инициализация таймера при монтировании и изменении isPlaying
  useEffect(() => {
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, displayNews.length]);

  // Переход к конкретному слайду
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer(); // 🔄 Сбрасываем таймер при ручном переключении
  };

  // Предыдущий слайд
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayNews.length - 1 : prev - 1));
    resetTimer(); // 🔄 Сбрасываем таймер при ручном переключении
  };

  // Следующий слайд
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayNews.length);
    resetTimer(); // 🔄 Сбрасываем таймер при ручном переключении
  };

  if (displayNews.length === 0) return null;

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-background overflow-hidden">
      {/* Слайды */}
      {displayNews.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-cta text-cta-text text-sm font-medium rounded-full">
                  {item.category}
                </span>
                <span className="text-sm text-copy-secondary/80">
                  {new Date(item.date).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
                {item.featured && (
                  <span className="text-xs font-medium px-2 py-1 bg-grape/90 text-white rounded-full">
                    Важное
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                {item.title}
              </h2>

              <p className="text-copy-secondary/80 mb-4 line-clamp-2 md:line-clamp-3">
                {item.excerpt}
              </p>

              <Link
                href={`/news/${item.slug}`}
                className="inline-flex items-center px-6 py-3 bg-cta text-cta-text font-medium rounded-lg hover:bg-cta-active transition-colors duration-300"
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
          </div>
        </div>
      ))}

      {/* Навигационные кнопки */}
      {displayNews.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Предыдущий слайд"
          >
            <svg
              className="w-6 h-6"
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
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Следующий слайд"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </>
      )}

      {/* Индикаторы */}
      {displayNews.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {displayNews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 bg-cta"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Кнопка паузы/воспроизведения */}
      {/*{displayNews.length > 1 && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label={isPlaying ? "Пауза" : "Воспроизведение"}
        >
          {isPlaying ? (
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
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
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
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>
      )}*/}
    </div>
  );
}
