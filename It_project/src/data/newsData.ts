import { NewsItem } from "@/types/index";

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Запуск нового продукта",
    excerpt: "Мы запустили инновационный продукт, который изменит рынок",
    content: "Полное описание новости...",
    category: "Технологии",
    date: "2024-01-15",
    year: 2024,
    featured: true,
    image: "../public/i.jpg",
    slug: "zapusk-novogo-produkta",
  },
  {
    id: 2,
    title: "Открытие нового офиса",
    excerpt: "Мы расширяемся и открываем новый офис в центре города",
    content: "Полное описание новости...",
    category: "Компания",
    date: "2023-11-20",
    year: 2023,
    featured: false,
    image: "/images/news/new-office.jpg",
    slug: "otkrytie-novogo-ofisa",
  },
];
export default newsData;
