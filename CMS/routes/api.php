<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\ProjectController;
Route::group(['middleware' => 'cors'], function () {
// Новости
Route::prefix('news')->group(function () {
    Route::get('/', [NewsController::class, 'index']);
    Route::get('/categories', [NewsController::class, 'categories']);
    Route::get('/years', [NewsController::class, 'years']);
    Route::get('/latest/{limit?}', [NewsController::class, 'latest']);
    Route::get('/{slug}', [NewsController::class, 'show']);
});

// Проекты
Route::prefix('projects')->group(function () {
    Route::get('/', [ProjectController::class, 'index']);
    Route::get('/categories', [ProjectController::class, 'categories']);
    Route::get('/years', [ProjectController::class, 'years']);
    Route::get('/featured/{limit?}', [ProjectController::class, 'featured']);
    Route::get('/category/{category}/{limit?}', [ProjectController::class, 'byCategory']);
    Route::get('/{slug}', [ProjectController::class, 'show']);
});
});