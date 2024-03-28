import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

export const get = async (url: string, params?: string | object) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    console.log("Get error: ", error);
  }
};

export const post = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const deleteData = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.delete(url, data);
    return response.data;
  } catch (error) {
    console.log("Delete error: ", error);
  }
};
