<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class HomeController extends Controller
{
    public function index()
    {
        return response()->json([
            'user' => auth()->user(),
        ]);
    }
}
