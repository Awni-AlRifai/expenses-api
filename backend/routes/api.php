<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('register', 'App\Http\Controllers\auth\RegisterController@register');
Route::post('login', 'App\Http\Controllers\auth\LoginController@login');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function () {
    // Get all categories for authenticated user
    Route::get('/categories', 'App\Http\Controllers\CategoryController@index');

    // Create a new category for authenticated user
    Route::post('/categories', 'App\Http\Controllers\CategoryController@store');

    // Get a specific category for authenticated user
    Route::get('/categories/{category}', 'App\Http\Controllers\CategoryController@show');

    // Update a specific category for authenticated user
    Route::put('/categories/{category}', 'App\Http\Controllers\CategoryController@update');

    // Delete a specific category for authenticated user
    Route::delete('/categories/{category}', 'App\Http\Controllers\CategoryController@destroy');
});

Route::middleware('auth:sanctum')->group(function () {
    // Get all expenses for authenticated user
    Route::get('/expenses', 'App\Http\Controllers\ExpenseController@index');

    // Create a new expense for authenticated user
    Route::post('/expenses', 'App\Http\Controllers\ExpenseController@store');

    // Get a specific expense for authenticated user
    Route::get('/expenses/{expense}', 'App\Http\Controllers\ExpenseController@show');

    // Update a specific expense for authenticated user
    Route::put('/expenses/{expense}', 'App\Http\Controllers\ExpenseController@update');

    // Delete a specific expense for authenticated user
    Route::delete('/expenses/{expense}', 'App\Http\Controllers\ExpenseController@destroy');

    // Get expenses by day for authenticated user
    Route::get('/expenses/day/{date}', 'App\Http\Controllers\ExpenseController@indexByDay');

    // Get expenses by month for authenticated user
    Route::get('/expenses/month/{year}/{month}', 'App\Http\Controllers\ExpenseController@indexByMonth');

    // Get expenses by year for authenticated user
    Route::get('/expenses/year/{year}', 'App\Http\Controllers\ExpenseController@indexByYear');
});
