import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface IGetArtist {
  id: number;
  artist: string;
  artistId: number;
  artistImg: string;
  genre: string;
  like: boolean;
  searchText?: Array<string>;
  searchCnt: number;
  target?: boolean;
  artistConcerts: [
    {
      id: Number;
      concertId: number;
      posterUrl: string;
      title: string;
      showTimes: string;
      location: string;
      like: boolean;
    }
  ];
}

interface DeletePayload {
  id: number;
}

interface EditLike {
  artistId: number;
  like: boolean;
}

const GetArtist = () => {
  return useQuery<IGetArtist[]>(
    ["artistInfo"],
    async () => {
      const { data } = await axios.get<IGetArtist[]>(
        "http://localhost:3001/artists"
      );
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
    const { data } = await axios.patch(
      `http://localhost:3001/artists/${payload.artistId}`,
      payload
    );
    console.log("페이", data);
    return data;
  });
};

const ArtistApi = {
  GetArtist,
  DeleteArtist,
  EditLikeArtist,
};

export default ArtistApi;
