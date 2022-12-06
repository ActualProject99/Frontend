import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArtistLike, IGetArtist, IGetArtistConcert } from "../../types";
import { deactivate, activate } from "../instance";

const GetArtist = () => {
  return useQuery<IGetArtist[]>(
    ["artistInfo"],
    async () => {
      const { data } = await deactivate.get<IGetArtist[]>("/artist");
      return data;
    },
    {
      cacheTime: Infinity,
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
  return useQuery(["LikeArtistList"], async () => {
    const { data } = await activate.get("/artistlike/mypage");
    return data;
  });
};

const EditLikeArtist = () => {
  return useMutation(async (payload: ArtistLike) => {
    const { data } = await activate.put(`/artistlike/${payload.artistId}`);
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
