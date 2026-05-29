<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        // Удаляем старые данные если есть
        News::truncate();

        $newsData = [
            [
                'title' => 'Запуск нового сайта',
                'slug' => 'zapusk-novogo-sajta',
                'excerpt' => 'Мы рады представить вам наш новый корпоративный сайт с улучшенным дизайном и функциональностью.',
                'content' => 'Сегодня мы запустили полностью обновленную версию нашего сайта. Новый дизайн стал более современным и удобным для пользователей. Мы также добавили раздел с новостями, где будем делиться актуальной информацией о нашей деятельности.',
                'date' => '2024-03-15',
                'year' => 2024,
                'category' => 'Обновление',
                'image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'is_published' => true,
            ],
            [
                'title' => 'Новые партнерские отношения',
                'slug' => 'novye-partnerskie-otnosheniya',
                'excerpt' => 'Заключено стратегическое партнерство с ведущей компанией в нашей отрасли.',
                'content' => 'Мы рады объявить о начале сотрудничества с компанией TechSolutions Inc. Это партнерство позволит нам предлагать клиентам более комплексные решения и расширить спектр предоставляемых услуг. Совместные проекты уже находятся в стадии разработки.',
                'date' => '2024-03-10',
                'year' => 2024,
                'category' => 'Партнерство',
                'image' => 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'is_published' => true,
            ],
            // Добавьте еще несколько для теста
        ];

        foreach ($newsData as $item) {
            News::create($item);
        }
        
        $this->command->info('News seeded successfully!');
    }
}