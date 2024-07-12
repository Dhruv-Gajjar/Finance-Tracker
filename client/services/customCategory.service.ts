import { CustomCategory } from "@/utils/types";
import axios, { AxiosRequestConfig } from "axios";

export const createCustomCategory = async (data: CustomCategory) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/custom-category`,
    data
  );
  return response.data;
};

export const getAllCustomCategory = async (userId: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/custom-category/${userId}`
  );
  return response.data;
};
