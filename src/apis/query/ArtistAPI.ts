import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArtistLike, IGetArtist, IGetArtistConcert } from "../../types";
import { getCookieToken } from "../cookie";
import { deactivate, activate, instance } from "../instance";

const GetArtist = () => {
  return useQuery<IGetArtist[]>(
    ["artistInfo"],
    async () => {
      const { data } = await deactivate.get<IGetArtist[]>("/artist");
      return data;
    },
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
const GetArtistConcert = () => {
  return useQuery<IGetArtistConcert[]>(
    ["artistConcerts"],
    async () => {
      const { data } = await deactivate.get<IGetArtistConcert[]>(
        `/concert/artist`
      );
      return data;
    },
    {
      cacheTime: Infinity,
    }
  );
};

const GetLikeArtist = (payload: number) => {
  return useQuery(["LikeArtist", payload], async () => {
    const { data } = await activate.get(`/artistlike/${payload}`);
    return data;
  });
};

const GetLikeArtistList = () => {
  const myToken = getCookieToken();
  return useQuery(["LikeArtistList"], async () => {
    const { data } = await instance(myToken).get("/artistlike/mypage");
    return data;
  });
};

const EditLikeArtist = () => {
  const myToken = getCookieToken();
  return useMutation(async (payload: ArtistLike) => {
    const { data } = await instance(myToken).put(
      `/artistlike/${payload.artistId}`
    );
    return data;
  });
};

const ArtistApi = {
  GetArtist,
  EditLikeArtist,
  GetArtistConcert,
  GetLikeArtist,
  GetLikeArtistList,
};

export default ArtistApi;
