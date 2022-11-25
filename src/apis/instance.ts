import axios from "axios";

/* const baseURL = process.env.REACT_APP_SERVER_URL */
const baseURL = "http://localhost:3001/"

export const deactivate = axios.create({ // 로그인을 안한 상태
    baseURL,
    headers: {

    },
})

export const activate = axios.create({ // 로그인을 한 상태
    baseURL,
    headers: {
        
    },
})

