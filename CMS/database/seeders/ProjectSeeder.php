<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projectsData = [
            [
                'slug' => 'ekodolje',
                'title' => 'Коттеджный поселок Экодолье',
                'short_description' => 'Полная телефонизация коттеджного поселка с организацией телефонной сети для всех домовладений',
                'full_description' => 'Проект включал в себя комплексную телефонизацию коттеджного поселка "Экодолье". Основные задачи: проектирование и монтаж телефонной сети, прокладка кабельных трасс, установка и настройка оборудования.',
                'year' => 2023,
                'location' => 'Калужская область',
                'category' => 'Телефония',
                'client' => 'УК "Экодолье"',
                'duration' => '3 месяца',
                'technologies' => json_encode(['ВОЛС', 'АТС Panasonic', 'Медные линии', 'Пассивное оборудование']),
                'challenges' => json_encode(['Большая площадь поселка', 'Необходимость минимального вмешательства в ландшафт']),
                'results' => json_encode(['Охват 100% домовладений', 'Стабильная связь без перебоев']),
                // 'featured' => true, // УБИРАЕМ
                'is_published' => true,
                'sort_order' => 1,
            ],
            // Остальные проекты без featured
        ];

        foreach ($projectsData as $item) {
            Project::create($item);
        }
    }
}