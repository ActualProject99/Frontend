import React, { useCallback } from "react";
import ArtistApi from "../../apis/query/ArtistAPI";
import icons from "../icons";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArtistIconProps } from "../../types";
import useTicket from "../../hooks/useTicketPop";

const ArtistIcon = ({ artist }: ArtistIconProps): JSX.Element => {
  const { mutateAsync: EditLike } = ArtistApi.EditLikeArtist();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { Ticket, poped, userInput } = useTicket(
    "아티스트를 삭제 하시겠어요?",
    {
      cacelButton: false,
      userInputs: {
        예: {
          value: () => {
            const payload = {
              artistId: artist.artistId,
            };
            EditLike(payload).then(() => {
              queryClient.invalidateQueries(["LikeArtistList"]);
            });
          },
          className: "bg-accent-main text-white",
        },
        아니요: null,
      },
      toastOnly: false,
      type: "info",
    }
  );

  const onEditLike = useCallback(() => {
    poped();
  }, [poped]);

  return (
    <>
      <Ticket />
      <div className="grid content-center justify-start justify-items-center items-center">
        <div className="w-[6.4rem] group">
          <icons.XIcon
            className="flex flex-row-reverse mb-[-0.5rem] cursor-pointer text-primary-600  transition-all ease-in-out  opacity-0 group-hover:opacity-100"
            onClick={onEditLike}
          />
          <img
            title={artist.artistName}
            className="w-24 h-24 rounded-[50%] cursor-pointer mb-1 shadow-md shadow-black"
            alt="artist"
            src={artist.artistImg}
            onClick={() => navigate(`/artist/${artist.artistId}`)}
          />
        </div>
        {artist.artistName.length < 13 ? (
          <p className="mt-1">{artist.artistName}</p>
        ) : (
          <p className="mt-1 w-28 overflow-hidden text-ellipsis whitespace-nowrap">
            {artist.artistName}
          </p>
        )}
      </div>
    </>
  );
};

export default ArtistIcon;
