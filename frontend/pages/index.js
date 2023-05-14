import Category from "@/components/Category";
import CategoryForm from "@/components/CategoryForm";
import { getHomePageData } from "@/serverUtils/homeService";
import { redirectToLoginPage } from "@/utils/redirect";
import Link from "next/link";
import React, { useState } from "react";

const Index = () => {
  return (
    <>
     <div className="flex flex-col items-center justify-center h-screen">
  <div className="bg-white rounded-lg shadow-lg p-8">
    <h1 className="text-gray-800 font-bold text-5xl mb-8">
      Welcome to the Expenses App
    </h1>
    <div className="flex justify-center space-x-4">
      <Link href="/expenses">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          View Expenses
        </button>
      </Link>
      <Link href="/categories">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          View Categories
        </button>
      </Link>
    </div>
  </div>
</div>

    </>
  );
};

export default Index;
