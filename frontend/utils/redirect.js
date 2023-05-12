export const redirectToLoginPage = () => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
