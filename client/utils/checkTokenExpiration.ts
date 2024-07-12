import { jwtDecode } from "jwt-decode";

export const checkTokenExpiration = (token: string): boolean => {
  let isTokenExpired = false;
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    if (expirationTime < currentTime) {
      return (isTokenExpired = true);
    } else {
      return (isTokenExpired = false);
    }
  }
  return isTokenExpired;
};
