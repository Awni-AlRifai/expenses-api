const { get } = require("@/utils/http");

const BACKEND_URL = process.env.BACKEND_URL;

export const getUserData = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const user = await get(`${BACKEND_URL}/user`, headers);
  return user;
};
