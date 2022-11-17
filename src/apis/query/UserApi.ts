import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

//유저Info Interface
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
  userImg: string | undefined | File | FormData;
}

//유저 좋아요 콘서트 Interface

export interface IGetLikeConcert {
  id: number;
  concertId: number;
  posterUrl: string;
  title: string;
  showTimes: string;
  location: string;
  runningTime: string;
  viewableGrade: string;
  genre: string;
  latitude: number;
  longitude: number;
  vendor: number;
  like: boolean;
  ticketingUrl: {
    melon: string;
    interpark: string;
    yes24: string;
  };
}

//유저Info API
const GetUserInfo = () => {
  return useQuery<IGetUser>(["userInfo"], async () => {
    const { data } = await axios.get<IGetUser>("http://localhost:3001/user");
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
    const { data } = await axios.patch("http://localhost:3001/user", payload, {
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
