import Category from "@/components/Category";
import CategoryForm from "@/components/CategoryForm";
import { getHomePageData } from "@/serverUtils/homeService";
import { redirectToLoginPage } from "@/utils/redirect";
import React from "react";

const Index = ({ data }) => {
  return(
    <div className="container mx-auto my-4">
    <h1 className="text-2xl font-bold mb-4">Categories</h1>
    <CategoryForm/>
    <Category categories={data?.categories || []} />
  </div>
  )
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
