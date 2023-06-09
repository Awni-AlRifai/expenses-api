import Category from "@/components/Category";
import CategoryForm from "@/components/CategoryForm";
import { getHomePageData } from "@/serverUtils/homeService";
import { getCategories } from "@/services/categoryService";
import { redirectToLoginPage } from "@/utils/redirect";
import React, { useState } from "react";

const Index = ({ data }) => {
  console.log(data);
  const [categories, setCategories] = useState(data?.categories || []);

  const onAddCategory = (category) => {
    setCategories((prev) => [...prev, category.category]);
  };
  return (
    <>
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

  const data = await getCategories(token);

  if (!data) return redirectToLoginPage();

  return {
    props: {
      data,
    },
  };
}

export default Index;
