import { IUser } from "@/utils/types";
import axios from "axios";

export const login = async (userData: IUser) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    userData
  );
  return response.data;
};
