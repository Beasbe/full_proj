// components/projects/ProjectsCTA.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProjectsCTA() {
  return (
    <section className="px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-cta to-grape rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
          <div className="p-6 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-cta-text mb-4 md:mb-6">
              Хотите обсудить свой проект?
            </h2>
            <p className="text-cta-text/90 text-sm md:text-xl mb-6 md:mb-10 max-w-2xl mx-auto">
              Наши специалисты готовы проконсультировать вас и предложить
              оптимальное решение
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-2 md:py-4 bg-cta-text text-cta rounded-lg md:rounded-xl hover:bg-white/90 transition-all duration-300 font-semibold text-sm md:text-lg"
              >
                <span>Обсудить проект</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
              <a
                href="tel:+78001234567"
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-2 md:py-4 bg-transparent border-2 border-cta-text text-cta-text rounded-lg md:rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold text-sm md:text-lg"
              >
                +7 (800) 123-45-67
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
