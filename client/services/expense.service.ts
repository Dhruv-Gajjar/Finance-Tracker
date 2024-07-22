import { CustomCategory, IIncomeExpenseForm } from "@/utils/types";
import axios, { AxiosRequestConfig } from "axios";

export const addExpenses = async (data: IIncomeExpenseForm) => {
  const config = {
    headers: { Authorization: `Bearer ${data?.token}` },
  };
  delete data?.token;
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/expenses`,
    data,
    config
  );
  return response.data;
};

// export const getAllCustomCategory = async (userId: number) => {
//   const response = await axios.get(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/custom-category/${userId}`
//   );
//   return response.data;
// };
