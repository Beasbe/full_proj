<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::published()->ordered();
        
        // Фильтрация по категории
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
        
        // Фильтрация по году
        if ($request->has('year')) {
            $query->where('year', $request->year);
        }
        
        // Поиск
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%")
                  ->orWhere('full_description', 'like', "%{$search}%")
                  ->orWhere('client', 'like', "%{$search}%");
            });
        }
        
        // Пагинация
        $perPage = $request->get('per_page', 10);
        $projects = $query->paginate($perPage);
        
        return response()->json([
            'success' => true,
            'data' => $projects->items(),
            'meta' => [
                'total' => $projects->total(),
                'per_page' => $projects->perPage(),
                'current_page' => $projects->currentPage(),
                'last_page' => $projects->lastPage(),
            ]
        ]);
    }
    
    public function show($slug)
    {
        $project = Project::published()->where('slug', $slug)->firstOrFail();
        
        // Получаем связанные проекты (той же категории)
        $related = Project::published()
            ->where('category', $project->category)
            ->where('id', '!=', $project->id)
            ->ordered()
            ->limit(3)
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $project,
            'related' => $related
        ]);
    }
    
    public function categories()
    {
        $categories = Project::published()
            ->select('category')
            ->distinct()
            ->pluck('category');
            
        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }
    
    public function years()
    {
        $years = Project::published()
            ->select('year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');
            
        return response()->json([
            'success' => true,
            'data' => $years
        ]);
    }
    
    public function featured($limit = 6)
    {
        $projects = Project::published()
            ->ordered()
            ->limit($limit)
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => $projects
        ]);
    }
    
    public function byCategory($category, $limit = 6)
    {
        $projects = Project::published()
            ->where('category', $category)
            ->ordered()
            ->limit($limit)
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => $projects
        ]);
    }
}