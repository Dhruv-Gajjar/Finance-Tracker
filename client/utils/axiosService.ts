import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

export const get = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    console.log("Get error: ", error);
  }
};

export const post = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const deleteData = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await axiosInstance.delete(url, data);
    return response.data;
  } catch (error) {
    console.log("Delete error: ", error);
  }
};
