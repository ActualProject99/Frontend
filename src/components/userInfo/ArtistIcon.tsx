import React from "react";
import ArtistApi from "../../apis/query/ArtistAPI";
import icons from "../icons";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const ArtistIcon = ({
  artist,
}: {
  artist: {
    id: number;
    artist: string;
    artistId: number;
    artistImg: string;
    genre: string;
  };
}) => {
  const { mutateAsync: DeleteArtist } = ArtistApi.DeleteArtist();
  const QueryClient = useQueryClient();
  const onDelete = () => {
    const payload = {
      id: artist.id,
    };
    DeleteArtist(payload).then((res) => {
      console.log("삭제성공", res);
      QueryClient.invalidateQueries();
    });
  };
  return (
    <>
      <div className="grid content-center justify-start justify-items-center items-center">
        <div className="w-[6.4rem] opacity-0 transition-all ease-in-out hover:opacity-100 ">
          <icons.XIcon
            className="flex flex-row-reverse mb-[-0.5rem] cursor-pointer text-primary-600"
            onClick={onDelete}
          />
        </div>
        <img
          className="w-24 h-24 rounded-[50%] cursor-pointer mb-1 "
          alt="artist"
          src={artist.artistImg}
        />

        <p>{artist.artist}</p>
      </div>
    </>
  );
};

export default ArtistIcon;