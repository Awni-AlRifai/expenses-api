import Category from "@/components/Category";
import CategoryForm from "@/components/CategoryForm";
import Expense from "@/components/Expenses";
import ExpenseForm from "@/components/ExpensesForm";
import { getHomePageData } from "@/serverUtils/homeService";
import { redirectToLoginPage } from "@/utils/redirect";
import Link from "next/link";
import React, { useState } from "react";

const Index = ({ data }) => {
  console.log(data);
  const [categories, setCategories] = useState(data?.categories || []);
  const [expenses, setExpenses] = useState(data?.expenses || []);

  const onAddCategory = (category) => {
    setCategories((prev) => [...prev, category.category]);
  };
  return (
    <>
        <h1 className="text-white font-bold text-5xl mb-8">
          Welcome to the Expenses App
        </h1>
        <Link href="/expenses">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow">
            View Expenses
          </button>
        </Link>
      <div className="container mx-auto my-4">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <CategoryForm onAddCategory={onAddCategory} />
        <Category categories={categories || []} setCategories={setCategories} />
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

  const data = await getHomePageData(token);

  if (!data) return redirectToLoginPage();

  return {
    props: {
      data,
    },
  };
}

export default Index;
