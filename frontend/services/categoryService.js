const { default: getToken } = require("@/utils/getToken");
const { post } = require("@/utils/http");
const BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`;

export const postCategory = async (name) => {
  const token = getToken();
  const category = await post(
    BACKEND_URL,
    { name },
    { Authorization: `Bearer ${token}` }
  );
  if (!category) return false;
  return category;
};
