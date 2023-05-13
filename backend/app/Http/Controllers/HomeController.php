<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::where('user_id', auth()->user()->id)->get();

        return response()->json([
            'categories' => $categories,
            'user' => auth()->user(),
        ]);
    }
}