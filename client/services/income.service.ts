import { CustomCategory, IIncomeExpenseForm } from "@/utils/types";
import axios, { AxiosRequestConfig } from "axios";

export const addIncome = async (data: IIncomeExpenseForm) => {
  const config = {
    headers: { Authorization: `Bearer ${data?.token}` },
  };
  delete data?.token;
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/incomes`,
    data,
    config
  );
  return response.data;
};

export const getAllIncomes = async (token: string, userId: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/incomes/${userId}`,
    config
  );
  return response.data;
};

export const getLatestIncomes = async (token: string, userId: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/incomes/${userId}/latest-incomes`,
    config
  );
  return response.data;
};
