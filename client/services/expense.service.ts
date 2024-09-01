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

export const getAllExpenses = async (token: string, userId: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/expenses/${userId}`,
    config
  );
  return response.data;
};

export const getLatestExpenses = async (token: string, userId: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/expenses/${userId}/latest-expenses`,
    config
  );
  return response.data;
};
