import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { deactivate, activate } from "../instance";

export interface IGetArtist {
  artistName: string;
  artistId: number;
  artistImg: string;
  debutSong: string;
  debutDate: string;
  category: string;
  like: boolean;
}

export interface IGetArtistConcert {
  concertId: number;
  categoryId: number;
  artistId: number;
  concertName: string;
  concertImg: string;
  concertInfo: string;
  concertDate: string;
  ticketingDate: string;
  ticketingUrl: string;
  locationName: string;
  playTime: string;
  ratings: string;
  calender: string;
}

interface DeletePayload {
  id: number;
}

interface EditLike {
  artistId: number;
}

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
  return useMutation(async (payload: EditLike) => {
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
