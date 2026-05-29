// app/news/[id]/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen py-12 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-copy-primary mb-6">Новость не найдена</h1>
        <p className="text-lg text-copy-secondary mb-8">
          Запрашиваемая новость не существует или была удалена.
        </p>
        <Link
          href="/news"
          className="inline-block px-6 py-3 bg-cta text-cta-text font-medium rounded-lg hover:bg-cta-active transition-colors"
        >
          Вернуться к новостям
        </Link>
      </div>
    </div>
  );
}