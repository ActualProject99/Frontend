import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ConcertLike, IGetConcert, IGetLocation, PostSMS } from "../../types";
import { activate, deactivate } from "../instance";

//콘서트 API
const GetConcerts = () => {
  return useQuery<IGetConcert[]>(["concert"], async () => {
    const { data } = await deactivate.get<IGetConcert[]>("/concerts");
    return data;
  });
};

const GetMonthConcerts = (payload: number | Date) => {
  return useQuery<IGetConcert[]>(["monthConcert", payload], async () => {
    const { data } = await deactivate.get<IGetConcert[]>(
      `/concert?month=${payload}`
    );
    console.log("요청", data);
    return data;
  });
};

const GetLikeConcert = (payload: number) => {
  return useQuery(["LikeConcert", payload], async () => {
    const { data } = await activate.get(`/concertlike/${payload}`);
    return data;
  });
};

const EditLikeConcerts = () => {
  return useMutation(async (payload: ConcertLike) => {
    const { data } = await activate.put(`/concertlike/${payload.concertId}`);
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

//공연장 정보 API
const GetLocation = () => {
  return useQuery<IGetLocation[]>(["location"], async () => {
    const { data } = await deactivate.get<IGetLocation[]>("/location");
    console.log("data", data);
    return data;
  });
};

const ConcertApi = {
  GetConcerts,
  EditLikeConcerts,
  PostConcertSMS,
  DeleteConcertSMS,
  GetLocation,
  GetMonthConcerts,
  GetLikeConcert,
};

export default ConcertApi;
