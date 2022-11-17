import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IGetUser {
  id: number;
  email: any;
  nickname: string;
  phone: string;
  userImg: string;
}

interface EditNamePayload {
  nickname: string | undefined;
}
interface EditImgPayload {
  userImg: string | undefined | FormData;
}

const GetUserInfo = () => {
  return useQuery<IGetUser>(["userInfo"], async () => {
    const { data } = await axios.get<IGetUser>("http://localhost:3001/user");
    // console.log("data", userInfo);
    return data;
  });
};

const EditUserName = () => {
  return useMutation(async (payload: EditNamePayload) => {
    const { data } = await axios.patch("http://localhost:3001/user", payload);
    return data;
  });
};

const EditUserImg = () => {
  return useMutation(async (payload: EditImgPayload) => {
    const { data } = await axios.patch("http://localhost:3001/user", payload);
    return data;
  });
};

const UserApi = {
  GetUserInfo,
  EditUserName,
  EditUserImg,
};

export default UserApi;
