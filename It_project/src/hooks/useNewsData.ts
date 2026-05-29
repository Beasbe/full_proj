'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  getNewsFromBackend, 
  getNewsItemFromBackend,
  getNewsCategoriesFromBackend,
  getNewsYearsFromBackend,
  getLatestNewsFromBackend,
  checkBackendAvailability 
} from '@/lib/api';
import { newsData as localNewsData } from '@/data/newsData';
import { NewsItem, NewsItemResponse } from '@/types';

export function useNewsData(params?: {
  category?: string;
  year?: string;
  search?: string;
  page?: number;
  per_page?: number;
}) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationMeta, setPaginationMeta] = useState<any>(null);

  // Загружаем данные
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const backendAvailable = await checkBackendAvailability();
      setIsBackendAvailable(backendAvailable);

      if (backendAvailable) {
        try {
          // Загружаем новости с фильтрами
          const newsResponse = await getNewsFromBackend(params);
          setNews(newsResponse.data);
          setPaginationMeta(newsResponse.meta);

          // Загружаем категории
          const categoriesData = await getNewsCategoriesFromBackend();
          setCategories(categoriesData);

          // Загружаем годы
          const yearsData = await getNewsYearsFromBackend();
          setYears(yearsData);

          // Загружаем последние новости
          const latestData = await getLatestNewsFromBackend(5);
          setLatestNews(latestData);

        } catch (fetchError) {
          console.warn('Используем локальные данные:', fetchError);
          setNews(localNewsData);
          
          // Генерируем категории и годы из локальных данных
          const categorySet = new Set<string>();
          const yearSet = new Set<number>();
          localNewsData.forEach(item => {
            categorySet.add(item.category);
            yearSet.add(item.year);
          });
          setCategories(Array.from(categorySet));
          setYears(Array.from(yearSet).sort((a, b) => b - a));
          setLatestNews(localNewsData.filter(n => n.featured).slice(0, 5));
        }
      } else {
        setNews(localNewsData);
        const categorySet = new Set<string>();
        const yearSet = new Set<number>();
        localNewsData.forEach(item => {
          categorySet.add(item.category);
          yearSet.add(item.year);
        });
        setCategories(Array.from(categorySet));
        setYears(Array.from(yearSet).sort((a, b) => b - a));
        setLatestNews(localNewsData.filter(n => n.featured).slice(0, 5));
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      setNews(localNewsData);
      setError('Не удалось загрузить новости');
    } finally {
      setIsLoading(false);
    }
  }, [params?.category, params?.year, params?.search, params?.page, params?.per_page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (isBackendAvailable) {
        const newsResponse = await getNewsFromBackend(params);
        setNews(newsResponse.data);
        setPaginationMeta(newsResponse.meta);
      } else {
        loadData();
      }
    } catch (error) {
      console.error('Ошибка обновления:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isBackendAvailable, params, loadData]);

  const getNewsItem = useCallback(async (slug: string): Promise<NewsItemResponse | null> => {
    if (isBackendAvailable) {
      try {
        return await getNewsItemFromBackend(slug);
      } catch {
        const item = localNewsData.find(item => item.slug === slug);
        if (!item) return null;
        
        const sortedNews = [...localNewsData].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const currentIndex = sortedNews.findIndex(item => item.slug === slug);
        
        return {
          data: item,
          related: {
            previous: currentIndex > 0 ? sortedNews[currentIndex - 1] : null,
            next: currentIndex < sortedNews.length - 1 ? sortedNews[currentIndex + 1] : null,
          }
        };
      }
    }
    
    const item = localNewsData.find(item => item.slug === slug);
    if (!item) return null;
    
    const sortedNews = [...localNewsData].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const currentIndex = sortedNews.findIndex(item => item.slug === slug);
    
    return {
      data: item,
      related: {
        previous: currentIndex > 0 ? sortedNews[currentIndex - 1] : null,
        next: currentIndex < sortedNews.length - 1 ? sortedNews[currentIndex + 1] : null,
      }
    };
  }, [isBackendAvailable]);

  return {
    news,
    categories,
    years,
    latestNews,
    isLoading,
    error,
    isBackendAvailable,
    paginationMeta,
    refreshData,
    getNewsItem,
  };
}