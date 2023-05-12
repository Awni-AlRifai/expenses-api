<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $expenses = Expense::where('user_id', auth()->user()->id)
            ->with('category')
            ->when($request->category_id, function ($query, $categoryId) {
                return $query->where('category_id', $categoryId);
            })
            ->orderBy('spending_date', 'desc')
            ->get();

        return response()->json([
            'data' => $expenses,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'category_id' => 'required|exists:categories,id',
                'spending_date' => 'required|date',
                'amount' => 'required|numeric',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $expense = new Expense;
        $expense->user_id = auth()->user()->id;
        $expense->category_id = $validatedData['category_id'];
        $expense->spending_date = $validatedData['spending_date'];
        $expense->amount = $validatedData['amount'];
        $expense->save();

        return response()->json([
            'message' => 'Expense created successfully',
            'data' => $expense,
        ], 201);
    }

    public function show(Expense $expense)
    {
        $this->authorize('view', $expense);

        $expense->load('category');

        return response()->json([
            'data' => $expense,
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        $this->authorize('update', $expense);

        $validatedData = $request->validate([
            'category_id' => 'exists:categories,id',
            'spending_date' => 'date',
            'amount' => 'numeric',
        ]);

        if (isset($validatedData['category_id'])) {
            $expense->category_id = $validatedData['category_id'];
        }

        if (isset($validatedData['spending_date'])) {
            $expense->spending_date = $validatedData['spending_date'];
        }

        if (isset($validatedData['amount'])) {
            $expense->amount = $validatedData['amount'];
        }

        $expense->save();

        return response()->json([
            'message' => 'Expense updated successfully',
            'data' => $expense,
        ]);
    }

    public function destroy(Expense $expense)
    {
        $this->authorize('delete', $expense);

        $expense->delete();

        return response()->json([
            'message' => 'Expense deleted successfully',
        ]);
    }

    public function indexByDay(Request $request)
    {
        $expenses = Expense::where('user_id', auth()->user()->id)
            ->whereDate('spending_date', $request->date)
            ->get();

        return response()->json(['expenses' => $expenses]);
    }

    public function indexByMonth(Request $request)
    {
        $expenses = Expense::where('user_id', auth()->user()->id)
            ->whereYear('spending_date', $request->year)
            ->whereMonth('spending_date', $request->month)
            ->get();

        return response()->json(['expenses' => $expenses]);
    }

    public function indexByYear(Request $request)
    {
        $expenses = Expense::where('user_id', auth()->user()->id)
            ->whereYear('spending_date', $request->year)
            ->get();

        return response()->json(['expenses' => $expenses]);
    }
}
