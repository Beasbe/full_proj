// app/thank-you/page.tsx
"use client";

import React, { Suspense } from "react";
import Link from "next/link";

function ThankYouContent() {
  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        {/* Иконка успеха */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl font-bold text-copy-primary mb-4">
          Спасибо за заявку!
        </h1>

        {/* Текст */}
        <p className="text-lg text-copy-secondary mb-6">
          Ваша заявка успешно отправлена. Наш специалист свяжется с вами в
          ближайшее время.
        </p>
        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-cta text-cta-text font-medium rounded-lg hover:bg-cta-active transition-colors"
          >
            Вернуться на главную
          </Link>
          <Link
            href="/contacts"
            className="inline-block px-6 py-3 border border-cta text-cta font-medium rounded-lg hover:bg-cta/10 transition-colors"
          >
            Другие контакты
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cta mx-auto"></div>
              <p className="mt-4 text-copy-secondary">Загрузка...</p>
            </div>
          </div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
