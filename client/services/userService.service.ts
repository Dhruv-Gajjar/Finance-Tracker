import axios from "axios";

export const getUserById = async (userId: number, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  if (userId !== undefined) {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
      config
    );
    return response.data;
  } else {
    return;
  }
};
