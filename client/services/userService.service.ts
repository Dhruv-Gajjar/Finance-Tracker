import axios from "axios";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

export const getUser = async () => {
  const userString = localStorage.getItem("user");
  let user = null;
  console.log("USERSTRING", userString);

  if (userString !== null) {
    user = JSON.parse(userString);
  }

  if (token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const userData = await axios.get(`users/${user?.userId}`, config);
    if (userData?.status === 200) {
      return userData?.data;
    } else {
      return "NO USER FOUND";
      // router.push("/signup");
    }
  }
};
