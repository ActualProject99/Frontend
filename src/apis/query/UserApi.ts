import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  EditImgPayload,
  EditNamePayload,
  IGetLikeConcert,
  IGetUser,
} from "../../types";
import { activate } from "../instance";

//유저Info API
const GetUserInfo = () => {
  return useQuery<IGetUser>(["userInfo"], async () => {
    const { data } = await activate.get<IGetUser>("/users/userinfo");
    return data;
  });
};

const EditUserName = () => {
  return useMutation(async (payload: EditNamePayload) => {
    const { data } = await activate.put("/users/userinfo", payload);
    return data;
  });
};

const EditUserImg = () => {
  return useMutation(async (payload: EditImgPayload) => {
    const { data } = await activate.put("/users/userinfo/upload", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  });
};

//유저 좋아요 concerts

const GetLikeConcert = () => {
  return useQuery<IGetLikeConcert[]>(["likeConcert"], async () => {
    const { data } = await axios.get<IGetLikeConcert[]>(
      "http://localhost:3001/concerts"
    );
    return data;
  });
};
const UserApi = {
  GetUserInfo,
  EditUserName,
  EditUserImg,
  GetLikeConcert,
};

export default UserApi;
