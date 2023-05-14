import Expense from "@/components/Expenses";
import ExpenseForm from "@/components/ExpensesForm";
import { getCategories } from "@/services/categoryService";
import { getExpenses } from "@/services/expenseService";
import { redirectToLoginPage } from "@/utils/redirect";
import React, { useState } from "react";

const Index = ({ expensesData,categories }) => {

  const [expenses, setExpenses] = useState(expensesData.data || []);

  return (
    <>

      <div className="container mx-auto my-4">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
        <ExpenseForm categories={categories.categories} setExpenses={setExpenses}/>
        <Expense expenses={expenses} setExpenses={setExpenses}/>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  // Check if the user is authenticated
  const { token } = context.req.cookies;

  if (!token) {
    // If the user is not authenticated, redirect them to the login page
    return redirectToLoginPage();
  }

  const expensesData = await getExpenses(token);

  if (!expensesData) return redirectToLoginPage();

  const categories = await getCategories(token);

  return {
    props: {
      expensesData,
      categories
    },
  };
}

export default Index;
