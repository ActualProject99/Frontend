import axios from "axios";
import { getCookieToken } from "./cookie";

const isDev = ["localhost:3000", "127.0.0.1:3000"].includes(
  window.location.host
);

// const jwtToken = localStorage.getItem("AccessToken");
// const baseURL = process.env.REACT_APP_SERVER_URL;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;
const myToken = getCookieToken();

export const deactivate = axios.create({
  // 로그인을 안한 상태
  baseURL: isDev ? PROXY_URL : SERVER_URL,
  headers: {},
});

export const activate = axios.create({
  // 로그인을 한 상태
  baseURL: isDev ? PROXY_URL : SERVER_URL,
  headers: {
    authorization: `Bearer ${myToken}`,
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
});

export const instance = (token: string) =>
  axios.create({
    // 로그인을 한 상태
    baseURL: isDev ? PROXY_URL : SERVER_URL,
    headers: {
      authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    },
  });

//토큰 만료시 인터셉터

// activate.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response.status === 401) {
//       try {
//         const { data } = await activate.get(`/validate`);
//         if (data.data.validate === 1) {
//           // window.location.href = '/login'
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }
// );
