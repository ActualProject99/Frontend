import React, { useCallback, useState } from "react";
import icons from "../icons";
import { useNavigate } from "react-router-dom";
import ConcertApi from "../../apis/query/ConcertApi";
import { useQueryClient } from "@tanstack/react-query";
import { IConcertProps } from "../../types";
import useTicket from "../../hooks/useTicketPop";

const LikeConcert = ({ concert }: IConcertProps): JSX.Element => {
  const navigate = useNavigate();

  const [like, setLike] = useState(true);
  const queryClient = useQueryClient();
  const { mutateAsync: EditLike } = ConcertApi.EditLikeConcerts();

  const { Ticket, poped, userInput } = useTicket("콘서트를 삭제 하시겠어요?", {
    cacelButton: false,
    userInputs: {
      예: {
        value: () => {
          const payload = {
            concertId: concert.concertId,
          };
          EditLike(payload).then(() => {
            console.log("pay", payload);
            queryClient.invalidateQueries(["LikeConcertList"]);
          });
          setLike(!like);
        },
        className: "bg-accent-main text-white",
      },
      아니요: null,
    },
    toastOnly: false,
    type: "info",
  });

  const onEditLike = useCallback(() => {
    poped();
  }, [poped]);

  return (
    <div className="grid w-56 h-[26rem] group">
      <div className="flex justify-center m-auto w-56 h-[18rem] overflow-hidden ">
        <img
          className="object-contain cursor-pointer transition-all ease-in-out hover:scale-110"
          alt="poster"
          onClick={() => navigate(`/concerts/${concert.concertId}`)}
          src={concert.concertImg}
        />
      </div>
      <div className="flex flex-col justify-center items-center p-1 ">
        {concert.concertName.length < 11 ? (
          <p className="flex justify-center w-48 font-bold ">
            {concert.concertName}
          </p>
        ) : (
          <p
            title={concert.concertName}
            className="w-48 font-bold overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {concert.concertName}
          </p>
        )}
        <p className="text-sm">{concert.playTime}</p>
        <p className="text-sm font-bold">{concert.locationName}</p>
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
      <Ticket />
    </div>
  );
};

export default LikeConcert;
