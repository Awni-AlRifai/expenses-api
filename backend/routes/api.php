<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::view('/swagger','swagger');

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('register', 'App\Http\Controllers\auth\RegisterController@register');
    Route::post('login', 'App\Http\Controllers\auth\LoginController@login');
});

// Routes that require authentication
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Category routes
    Route::prefix('categories')->group(function () {
        Route::get('/', 'App\Http\Controllers\CategoryController@index');
        Route::post('/', 'App\Http\Controllers\CategoryController@store');
        Route::get('/{category}', 'App\Http\Controllers\CategoryController@show');
        Route::put('/{category}', 'App\Http\Controllers\CategoryController@update');
        Route::delete('/{category}', 'App\Http\Controllers\CategoryController@destroy');
    });

    // Expense routes
    Route::prefix('expenses')->group(function () {
        Route::get('/', 'App\Http\Controllers\ExpenseController@index');
        Route::post('/', 'App\Http\Controllers\ExpenseController@store');
        Route::get('/{expense}', 'App\Http\Controllers\ExpenseController@show');
        Route::put('/{expense}', 'App\Http\Controllers\ExpenseController@update');
        Route::delete('/{expense}', 'App\Http\Controllers\ExpenseController@destroy');
        Route::get('/day/{date}', 'App\Http\Controllers\ExpenseController@indexByDay');
        Route::get('/month/{year}/{month}', 'App\Http\Controllers\ExpenseController@indexByMonth');
        Route::get('/year/{year}', 'App\Http\Controllers\ExpenseController@indexByYear');
    });
});
