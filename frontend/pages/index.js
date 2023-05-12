import { getUserData } from "@/serverUtils/UserService";
import { redirectToLoginPage } from "@/utils/redirect";
import React from "react";

const Index = () => {
  return <h1>Awni</h1>;
};
export async function getServerSideProps(context) {
  // Check if the user is authenticated
  const { token } = context.req.cookies;

  if (!token) {
    // If the user is not authenticated, redirect them to the login page
    return redirectToLoginPage();
  }

  const res = await getUserData(token);

  if (!res) return redirectToLoginPage();

  return {
    props: {
      data: res,
    },
  };
}

export default Index;
