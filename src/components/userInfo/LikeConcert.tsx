import React, { useCallback, useState } from "react";
import icons from "../icons";
import { useNavigate } from "react-router-dom";
import ConcertApi from "../../apis/query/ConcertApi";
import { useQueryClient } from "@tanstack/react-query";
import { IGetLikeConcert } from "../../types";

interface IConcertProps {
  concert: IGetLikeConcert;
}

const LikeConcert = ({ concert }: IConcertProps): JSX.Element => {
  const navigate = useNavigate();

  const [like, setLike] = useState(concert.like);
  const queryClient = useQueryClient();
  const { mutateAsync: EditLike } = ConcertApi.EditLikeConcerts();

  const onEditLike = useCallback(() => {
    const payload = {
      concertId: concert.concertId,
    };
    EditLike(payload).then(() => {
      console.log("pay", payload);
      queryClient.invalidateQueries(["concert"]);
    });
    setLike(!like);
  }, [concert.concertId, like, EditLike, queryClient, setLike]);

  return (
    <div className="grid w-56 h-[26rem] group">
      <div className="flex justify-center m-auto w-56 h-[18rem] overflow-hidden ">
        <img
          className="object-contain cursor-pointer transition-all ease-in-out hover:scale-110"
          alt="poster"
          onClick={() => navigate(`/concerts/${concert.concertId}`)}
          src={concert.posterUrl}
        />
      </div>
      <div className="flex flex-col justify-center items-center p-1 ">
        {concert.title.length < 11 ? (
          <p className="flex justify-center w-48 font-bold ">{concert.title}</p>
        ) : (
          <p
            title={concert.title}
            className="w-48 font-bold overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {concert.title}
          </p>
        )}
        <p className="text-sm">{concert.showTimes}</p>
        <p className="text-sm font-bold">{concert.location}</p>
        <div className="flex justify-end w-[92%] ">
          {!like ? (
            <icons.EmptyHeart
              className="text-red-500 cursor-pointer transition-all ease-in-out  opacity-0 group-hover:opacity-100"
              onClick={onEditLike}
            />
          ) : (
            <icons.FullHeart
              className="text-red-500 cursor-pointer transition-all ease-in-out  opacity-0 group-hover:opacity-100"
              onClick={onEditLike}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LikeConcert;
