<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = News::published()->latest('date');
        
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
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }
        
        // Пагинация
        $perPage = $request->get('per_page', 10);
        $news = $query->paginate($perPage);
        
        return response()->json([
            'success' => true,
            'data' => $news->items(),
            'meta' => [
                'total' => $news->total(),
                'per_page' => $news->perPage(),
                'current_page' => $news->currentPage(),
                'last_page' => $news->lastPage(),
            ]
        ]);
    }
    
    public function show($slug)
    {
        $news = News::published()->where('slug', $slug)->firstOrFail();
        
        // Получаем предыдущую и следующую новости
        $previous = News::published()
            ->where('date', '<', $news->date)
            ->orWhere(function($query) use ($news) {
                $query->where('date', $news->date)
                      ->where('id', '<', $news->id);
            })
            ->orderBy('date', 'desc')
            ->orderBy('id', 'desc')
            ->first();
            
        $next = News::published()
            ->where('date', '>', $news->date)
            ->orWhere(function($query) use ($news) {
                $query->where('date', $news->date)
                      ->where('id', '>', $news->id);
            })
            ->orderBy('date', 'asc')
            ->orderBy('id', 'asc')
            ->first();
        
        return response()->json([
            'success' => true,
            'data' => $news,
            'related' => [
                'previous' => $previous,
                'next' => $next,
            ]
        ]);
    }
    
    public function categories()
    {
        $categories = News::published()
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
        $years = News::published()
            ->select('year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');
            
        return response()->json([
            'success' => true,
            'data' => $years
        ]);
    }
    
    public function latest($limit = 5)
    {
        $news = News::published()
            ->latest('date')
            ->limit($limit)
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => $news
        ]);
    }
}