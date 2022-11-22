import axios from "axios";
import { getCookieToken, getRefreshToken } from "./cookie";

/* const baseURL = process.env.REACT_APP_API_SERVER */
const baseURL = "http://localhost:3001/";

const myToken = getCookieToken();
const refToken = getRefreshToken();

export const deactivate = axios.create({
  // 로그인을 안한 상태
  baseURL,
  headers: {},
});

export const activate = axios.create({
  // 로그인을 한 상태
  baseURL,
  headers: {},
});

//토큰 만료시 인터셉터

activate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const { data } = await activate.get(`/validate`);
        if (data.data.validate === 1) {
          // window.location.href = '/login'
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
);
