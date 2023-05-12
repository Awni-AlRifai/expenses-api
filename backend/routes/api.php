<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;


//export the validation and authentication into separate classes
Route::post('register', function (Request $request) {

    // adding try and catch to handle validation exception
    // should be refactored and exported outside the controller
    try {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
        ]);
    } catch (ValidationException $e) {
        return response()->json(['errors' => $e->errors()], 422);
    }


    $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => Hash::make($validatedData['password']),
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'token' => $token
    ], 201);
});

Route::post('login', function (Request $request) {
    $validatedData = $request->validate([
        'email' => 'required|string|email|max:255',
        'password' => 'required|string|min:8',
    ]);

    if (!Auth::attempt($validatedData)) {
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    $user = User::where('email', $validatedData['email'])->first();
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'token' => $token
    ], 200);
});

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
});

