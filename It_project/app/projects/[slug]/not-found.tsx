import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">😕</div>
        <h1 className="text-4xl font-bold text-copy-primary mb-4">Проект не найден</h1>
        <p className="text-copy-secondary mb-8">Такого проекта не существует или он был удален</p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cta text-cta-text rounded-xl hover:bg-cta-active transition-colors"
        >
          <ArrowLeft size={20} />
          Вернуться к проектам
        </Link>
      </div>
    </div>
  );
}