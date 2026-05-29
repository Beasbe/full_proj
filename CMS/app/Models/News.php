<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class News extends Model
{
    use HasFactory;

protected $fillable = [
    'title',
    'slug',
    'excerpt',
    'content',
    'date',
    'year',
    'category',
    'image',
    // 'featured', // Убираем
    'is_published'
];

protected $casts = [
    'date' => 'date',
    // 'featured' => 'boolean', // Убираем
    'is_published' => 'boolean',
];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($news) {
            if (empty($news->slug)) {
                $news->slug = Str::slug($news->title);
            }
        });

        static::updating(function ($news) {
            if ($news->isDirty('title') && empty($news->slug)) {
                $news->slug = Str::slug($news->title);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeLatest($query, $limit = 10)
    {
        return $query->orderBy('date', 'desc')->limit($limit);
    }
}