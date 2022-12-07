import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  EditImgPayload,
  EditNamePayload,
  IGetLikeConcert,
  IGetUser,
} from "../../types";
import { getCookieToken } from "../cookie";
import { activate, instance } from "../instance";

//유저Info API
const GetUserInfo = () => {
  const myToken = getCookieToken();
  console.log("마이", myToken);
  return useQuery<IGetUser>(
    ["userInfo"],
    async () => {
      const { data } = await instance(myToken).get<IGetUser>("/users/userinfo");
      console.log("data", data);
      return data;
    }
    // {
    //   enabled: !!getCookieToken(),
    //   refetchOnMount: false,
    //   refetchOnWindowFocus: false,
    // }
  );
};

const EditUserName = () => {
  return useMutation(async (payload: EditNamePayload) => {
    const { data } = await activate.put("/users/userinfo", payload);
    return data;
  });
};
const readMyComments = async ( userId : number) => {
  const { data } = await activate.get(`/comment/user/${userId}`);
  return data;
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

const DeleteUser = () => {
  return useMutation(async () => {
    const { data } = await activate.delete("/users/delete");
    return data;
  });
};

const UserApi = {
  GetUserInfo,
  EditUserName,
  EditUserImg,
  DeleteUser,
};

export default UserApi;
