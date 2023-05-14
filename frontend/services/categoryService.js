const { default: getToken } = require("@/utils/getToken");
const { post, patch, put, deleteRecord, get } = require("@/utils/http");
const BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`;
const SERVER_SIDE_BACKEND_URL = `${process.env.BACKEND_URL}/categories`;


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
export const updateCategory = async (id,name) => {
  const token = getToken();
  const category = await put(
    `${BACKEND_URL}/${id}`,
    { name },
    { Authorization: `Bearer ${token}` }
  );
  if (!category) return false;
  return category;
};
export const deleteCategory = async (id) => {
  const token = getToken();
  const category = await deleteRecord(
    `${BACKEND_URL}/${id}`,
    { Authorization: `Bearer ${token}` }
  );
  if (!category) return false;
  return category;
};

/**
 * getCategory runs on the server side
 * @param {*} token 
 * @returns 
 */
 export const getCategories = async (token) =>{
    const headers = {
        Authorization: `Bearer ${token}`,
      };
    const categories = await get(SERVER_SIDE_BACKEND_URL,headers);
    return categories;
}



