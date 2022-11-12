import axios from "axios";

/* const baseURL = process.env.REACT_APP_API_SERVER */
const baseURL = "http://localhost:3001/"

export const instance = axios.create({
    baseURL,
    headers: {},
})

export const api = axios.create({
    baseURL,
    headers: {},
})

export default instance;
