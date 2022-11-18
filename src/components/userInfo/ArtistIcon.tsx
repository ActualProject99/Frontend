import React, { useCallback } from "react";
import ArtistApi from "../../apis/query/ArtistAPI";
import icons from "../icons";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
}): JSX.Element => {
  const { mutateAsync: EditLike } = ArtistApi.EditLikeArtist();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onEditLike = useCallback(() => {
    const payload = {
      artistId: artist.artistId,
      like: false,
    };
    EditLike(payload).then(() => {
      console.log("pay", payload);
      queryClient.invalidateQueries(["artistInfo"]);
    });
  }, [artist.artistId, EditLike, queryClient]);

  return (
    <>
      <div className="grid content-center justify-start justify-items-center items-center">
        <div className="w-[6.4rem] group">
          <icons.XIcon
            className="flex flex-row-reverse mb-[-0.5rem] cursor-pointer text-primary-600  transition-all ease-in-out  opacity-0 group-hover:opacity-100"
            onClick={onEditLike}
          />
          <img
            className="w-24 h-24 rounded-[50%] cursor-pointer mb-1 "
            alt="artist"
            src={artist.artistImg}
            onClick={() => navigate(`/artist/${artist.artistId}`)}
          />
        </div>
        <p>{artist.artist}</p>
      </div>
    </>
  );
};

export default ArtistIcon;
