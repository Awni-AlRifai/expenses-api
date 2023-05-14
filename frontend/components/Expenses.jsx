import React, { useState, useEffect } from "react";
import { getCategories } from "@/services/categoryService";
import {
  createExpense,
  deleteExpense,
  updateExpense,
} from "@/services/expenseService";

const Expense = ({ expenses, setExpenses }) => {
  const [editingExpense, setEditingExpense] = useState(null);
  console.log(expenses);

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
  };

  const handleSaveClick = async () => {
    // Save the updated expense to the server here
    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, newExpense);
        setExpenses(
          expenses.map((expense) =>
            expense.id === editingExpense.id ? newExpense : expense
          )
        );
      } else {
        const response = await createExpense(newExpense);
        setExpenses([...expenses, response.data]);
      }
      setEditingExpense(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpenseHandler = async (expenseId) => {
    // Delete the expense from the server and remove it from the state
    try {
      await deleteExpense(expenseId);
      setExpenses(expenses.filter((expense) => expense.id !== expenseId));
    } catch (error) {
      console.log(error);
    }
  };
  return expenses?.length !== 0 ? (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="border px-4 py-2">Category</th>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Amount</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses?.map((expense) => (
          <tr key={expense.id}>
            <td className="border px-4 py-2">
              {expense.category?.name || "No category"}
            </td>
            <td className="border px-4 py-2">{expense.spending_date}</td>
            <td className="border px-4 py-2">{expense.amount}</td>
            <td className="border px-4 py-2 text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                onClick={() => handleEditClick(expense)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2  rounded"
                onClick={() => deleteExpenseHandler(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>There is no category</div>
  );
};

export default Expense;
