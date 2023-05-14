import React, { useState, useEffect } from "react";
import { getCategories } from "@/services/categoryService";
import {
  createExpense,
  deleteExpense,
  updateExpense,
} from "@/services/expenseService";
import ExpenseForm from "./ExpensesForm";

const Expense = ({ expenses, setExpenses, categories }) => {
  const [editForm, setEditForm] = useState(false);
  const [expense, setExpense] = useState({});

  const deleteExpenseHandler = async (expenseId) => {
    // Delete the expense from the server and remove it from the state
    try {
      await deleteExpense(expenseId);
      setExpenses(expenses.filter((expense) => expense.id !== expenseId));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (expense) => {
    setEditForm(true);
    setExpense(expense);
  };

  return expenses?.length !== 0 ? (
    <>
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
          {expenses?.map((exp) => (
            <tr key={exp.id}>
              <td className="border px-4 py-2">
                {exp.category?.name || "No category"}
              </td>
              <td className="border px-4 py-2">{exp.spending_date}</td>
              <td className="border px-4 py-2">{exp.amount}</td>
              <td className="border px-4 py-2 text-center">
                {editForm && exp.id == expense.id ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => setEditForm(false)}
                  >
                    cancel
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(exp)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2  rounded"
                  onClick={() => deleteExpenseHandler(exp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editForm && (
        <div className="mt-5 ">
          <h1 className="text-xl font-bold mb-4">Edit the expense here</h1>
          <ExpenseForm
            categories={categories}
            setExpenses={setExpenses}
            expense={expense}
            setEditForm={setEditForm}
          />
        </div>
      )}
    </>
  ) : (
    <div>There is no category</div>
  );
};

export default Expense;
