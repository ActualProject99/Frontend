import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ConcertLike, IGetConcert, PostSMS } from "../../types";
import { deactivate } from "../instance";

//콘서트 API
const GetConcerts = () => {
  return useQuery<IGetConcert[]>(["concert"], async () => {
    const { data } = await deactivate.get<IGetConcert[]>("/concerts");
    console.log("data", data);
    return data;
  });
};

const EditLikeConcerts = () => {
  return useMutation(async (payload: ConcertLike) => {
    const { data } = await deactivate.put(`/concertlike/${payload.concertId}`);
    return data;
  });
};

//공연 SMS 알림 API

const PostConcertSMS = () => {
  return useMutation(async (payload: PostSMS) => {
    const { data } = await axios.post("url", payload);
    return data;
  });
};
const DeleteConcertSMS = () => {
  return useMutation(async (payload: PostSMS) => {
    const { data } = await axios.patch("url", payload);
    return data;
  });
};

const ConcertApi = {
  GetConcerts,
  EditLikeConcerts,
  PostConcertSMS,
  DeleteConcertSMS,
};

export default ConcertApi;
