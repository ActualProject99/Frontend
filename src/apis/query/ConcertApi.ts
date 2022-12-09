import { useMutation, useQuery } from "@tanstack/react-query";

import {
  ConcertLike,
  IGetConcert,
  IGetHotConcert,
  IGetLocation,
  PostSMS,
} from "../../types";
import { getCookieToken } from "../cookie";
import { activate, deactivate, instance } from "../instance";

//콘서트 API
const GetConcerts = () => {
  return useQuery<IGetConcert[]>(
    ["concert"],
    async () => {
      const { data } = await deactivate.get<IGetConcert[]>("/concerts");
      return data;
    },
    {
      staleTime: 5000,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

const GetDetailConcerts = (payload: number) => {
  return useQuery<IGetConcert>(
    ["detailConcert", payload],
    async () => {
      const { data } = await deactivate.get<IGetConcert>(`/concert/${payload}`);
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

const GetHotConcerts = () => {
  return useQuery<IGetHotConcert[]>(["hotConcert"], async () => {
    const { data } = await deactivate.get<IGetHotConcert[]>("/hotconcert");
    return data;
  });
};

const GetMonthConcerts = (payload: number | Date) => {
  return useQuery<IGetConcert[]>(["monthConcert", payload], async () => {
    const { data } = await deactivate.get<IGetConcert[]>(
      `/concert?month=${payload}`
    );
    return data;
  });
};

const GetSearchData = (payload: string) => {
  return useQuery(["searchData", payload], async () => {
    const { data } = await deactivate.get(`/search?searchQuery=${payload}`);
    return data;
  });
};
// 콘서트 좋아요
const GetLikeConcertList = () => {
  const myToken = getCookieToken();
  return useQuery(["LikeConcertList"], async () => {
    const { data } = await instance(myToken).get("/concertlike/mypage");
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
  const myToken = getCookieToken();
  return useMutation(async (payload: ConcertLike) => {
    const { data } = await instance(myToken).put(
      `/concertlike/${payload.concertId}`
    );
    return data;
  });
};

//공연 SMS 알림 API

const PostConcertSMS = () => {
  return useMutation(async (payload: PostSMS) => {
    const { data } = await activate.post("url", payload);
    return data;
  });
};
const DeleteConcertSMS = () => {
  return useMutation(async (payload: PostSMS) => {
    const { data } = await activate.post("url", payload);
    return data;
  });
};

//공연장 정보 API
const GetLocation = () => {
  return useQuery<IGetLocation[]>(["location"], async () => {
    const { data } = await deactivate.get<IGetLocation[]>("/location");
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
  GetLikeConcertList,
  GetHotConcerts,
  GetDetailConcerts,
  GetSearchData,
};

export default ConcertApi;
