import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
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
  console.log("AAAAA", url, data);
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    toast.error(`${error}`, {
      position: "top-left",
    });
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
