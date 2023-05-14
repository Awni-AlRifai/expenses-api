import React, { useState } from "react";
import { createExpense, updateExpense } from "@/services/expenseService";
import ErrorMessage from "./ErrorMessage";
import generateError from "@/utils/generateError";

// This Form needs refactoring to get shared components outside these form and have a create from and edit form
const ExpenseForm = ({ categories, setExpenses, expense = {}, setEditForm =()=>{} }) => {
  const [newExpenseAmount, setNewExpenseAmount] = useState(
    expense?.amount || ""
  );
  const [newExpenseCategoryId, setNewExpenseCategoryId] = useState(
    expense?.category?.id || ""
  );
  const [newExpenseSpendingDate, setNewExpenseSpendingDate] = useState(
    expense?.spending_date || ""
  );

  const [error,setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new expense object using the current form values
    const newExpense = {
      amount: Number(newExpenseAmount),
      categoryId: Number(newExpenseCategoryId) || categories[0].id,
      spendingDate: newExpenseSpendingDate,
    };
    let res;
    if (expense?.id) {
      res = await updateExpense(expense.id, newExpense);
      setEditForm(false);
    } else {
       res = await createExpense(newExpense);
    }
    if(res?.errors){
        generateError(res,setError);
        return;
    }

    const cat = categories.filter((cat) => cat.id == newExpense.categoryId);
    const expenseData = res.data;
    expenseData["category"] = cat[0];

    setExpenses((prev) => [expenseData, ...prev]);

    // Reset the form values
    setNewExpenseAmount("");
    setNewExpenseCategoryId("");
    setNewExpenseSpendingDate("");
  };

  return (
    <form class="mb-5" onSubmit={handleSubmit}>
      <label className="block mb-2 font-bold text-gray-700">Amount</label>
      <input
        className="w-full border py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        placeholder="Enter amount"
        value={newExpenseAmount}
        onChange={(e) => setNewExpenseAmount(e.target.value)}
      />
      <label className="block mb-2 font-bold text-gray-700">Category</label>
      <select
        className="w-full border py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        value={newExpenseCategoryId}
        onChange={(e) => {
          setNewExpenseCategoryId(e.target.value);
        }}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <label className="block mb-2 font-bold text-gray-700">
        Spending Date
      </label>
      <input
        className="w-full border py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type="date"
        placeholder="Enter spending date"
        value={newExpenseSpendingDate}
        onChange={(e) => setNewExpenseSpendingDate(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
       {expense?.id ? "Update Expense" : " Add Expense"}
      </button>
      <ErrorMessage message={error} />
    </form>
  );
};

export default ExpenseForm;
