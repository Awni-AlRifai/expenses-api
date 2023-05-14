const { default: getToken } = require("@/utils/getToken");
const { post, get, deleteRecord, put } = require("@/utils/http");
const BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/expenses`;
const SERVER_SIDE_BACKEND_URL = `${process.env.BACKEND_URL}/expenses`;

export const createExpense = async ({
  categoryId: category_id,
  spendingDate: spending_date,
  amount,
}) => {
  const token = getToken();
  const expense = await post(
    BACKEND_URL,
    { category_id, amount, spending_date },
    { Authorization: `Bearer ${token}` }
  );
  if (!expense) return false;
  return expense;
};
/**
 * getExpenses runs on the server side
 * @param {*} token
 * @returns
 */
export const getExpenses = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const expenses = await get(SERVER_SIDE_BACKEND_URL, headers);
  return expenses;
};

export const deleteExpense = async (id) => {
  const token = getToken();
  const expense = await deleteRecord(`${BACKEND_URL}/${id}`, {
    Authorization: `Bearer ${token}`,
  });
  if (!expense) return false;
  return expense;
};
export const updateExpense = async (id, expense) => {
  const token = getToken();
  const updatedExpense = await put(`${BACKEND_URL}/${id}`, expense, {
    Authorization: `Bearer ${token}`,
  });
  if (!updatedExpense) return false;
  return updatedExpense;
};
