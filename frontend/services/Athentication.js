import { post } from "@/utils/http";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const signupUser = async ({
  username: name,
  email,
  password,
  password_confirmation,
}) => {
  const data = await post(`${BACKEND_URL}/register`, {
    name,
    email,
    password,
    password_confirmation,
  });

  return data;
};
