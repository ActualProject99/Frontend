import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setAccessToken = (accessToken: string) => {
  // const today = new Date();
  // const expireDate = today.setDate(today.getDate() + 3);
  const expireDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 6);
  return cookies.set("accessToken", accessToken, {
    sameSite: "lax",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const setRefreshToken = (refreshToken: string) => {
  // const today = new Date();
  // const expireDate = today.setDate(today.getDate() + 1);
  const expireDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
  return cookies.set("refreshToken", refreshToken, {
    sameSite: "lax",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const getCookieToken = () => {
  return cookies.get("accessToken");
};

export const getRefreshToken = () => {
  return cookies.get("refreshToken");
};

export const removeCookieToken = () => {
  return cookies.remove("accessToken", { sameSite: "lax", path: "/" });
};

export const removeRefreshCookieToken = () => {
  return cookies.remove("refreshToken", { sameSite: "lax", path: "/" });
};
