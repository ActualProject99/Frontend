import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface IGetArtist {
  id: number;
  artist: string;
  artistId: number;
  artistImg: string;
  genre: string;
}

interface DeletePayload {
  id: number;
}

const GetArtist = () => {
  return useQuery<IGetArtist[]>(["artistInfo"], async () => {
    const { data } = await axios.get<IGetArtist[]>(
      "http://localhost:3001/artists"
    );
    return data;
  });
};

const DeleteArtist = () => {
  return useMutation(async (payload: DeletePayload) => {
    const { data } = await axios.delete(
      `http://localhost:3001/artists/${payload.id}`
    );
    return data;
  });
};

const ArtistApi = {
  GetArtist,
  DeleteArtist,
};

export default ArtistApi;
