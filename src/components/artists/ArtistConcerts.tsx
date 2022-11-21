import React, { useState, useCallback } from "react";
import icons from "../icons";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ConcertApi from "../../apis/query/ConcertApi";

interface ArtistProps {
  artistConcert: {
    id: Number;
    concertId: number;
    posterUrl: string;
    title: string;
    showTimes: string;
    location: string;
    like: boolean;
  };
}

const ArtistConcerts = ({ artistConcert }: ArtistProps): JSX.Element => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutateAsync: EditLike } = ConcertApi.EditLikeConcerts();

  const onEditLike = useCallback(() => {
    const payload = {
      concertId: artistConcert.concertId,
      like: !artistConcert.like,
    };
    EditLike(payload).then(() => {
      console.log("pay", payload);
      queryClient.invalidateQueries(["concert"]);
    });
    setLike((prev) => !prev);
  }, [EditLike, artistConcert.concertId, artistConcert.like, queryClient]);

  return (
    <>
      <div className="grid w-56 h-[26rem] group">
        <div className="flex justify-center m-auto w-56 h-[18rem] overflow-hidden ">
          <img
            className="object-contain cursor-pointer transition-all ease-in-out hover:scale-110"
            alt="poster"
            onClick={() => navigate(`/concerts/${artistConcert.concertId}`)}
            src={artistConcert.posterUrl}
          />
        </div>
        <div className="flex flex-col justify-center items-center p-1 ">
          {artistConcert.title.length < 11 ? (
            <p className="flex justify-center w-48 font-bold ">
              {artistConcert.title}
            </p>
          ) : (
            <p className="w-48 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              {artistConcert.title}
            </p>
          )}
          <p className="text-sm">{artistConcert.showTimes}</p>
          <p className="text-sm font-bold">{artistConcert.location}</p>
          <div className="flex justify-end w-[92%] ">
            {!like ? (
              <icons.FullHeart
                className="text-red-500 cursor-pointer transition-all ease-in-out  opacity-0 group-hover:opacity-100"
                onClick={onEditLike}
              />
            ) : (
              <icons.EmptyHeart
                className="text-red-500 cursor-pointer transition-all ease-in-out  opacity-0 group-hover:opacity-100"
                onClick={onEditLike}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistConcerts;
