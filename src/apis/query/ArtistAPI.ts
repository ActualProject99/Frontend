import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ArtistLike,
  DeletePayload,
  IGetArtist,
  IGetArtistConcert,
} from "../../types";
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
      console.log("data", data);
      return data;
    },
    {
      cacheTime: Infinity,
    }
  );
};

const DeleteArtist = () => {
  return useMutation(async (payload: DeletePayload) => {
    const { data } = await axios.delete(
      `http://localhost:3001/artists/${payload.id}`
    );
    return data;
  });
};

const EditLikeArtist = () => {
  return useMutation(async (payload: ArtistLike) => {
    const { data } = await activate.put(`/artistlike/${payload.artistId}`);
    console.log("페이", data);
    return data;
  });
};

const ArtistApi = {
  GetArtist,
  DeleteArtist,
  EditLikeArtist,
  GetArtistConcert,
};

export default ArtistApi;
