import React, { useCallback } from "react";
import icons from "../icons";
import { useNavigate } from "react-router-dom";
import ConcertApi from "../../apis/query/ConcertApi";
import { useQueryClient } from "@tanstack/react-query";
import { IConcertProps } from "../../types";
import useTicket from "../../hooks/useTicketPop";

const LikeConcert = ({ concert }: IConcertProps): JSX.Element => {
  const navigate = useNavigate();

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
    <div className="grid w-56 h-[26rem] group relative">
      <div className="flex justify-center m-auto w-52 h-72 overflow-hidden ">
        <img
          className=" h-72 cursor-pointer"
          alt="poster"
          onClick={() => navigate(`/concerts/${concert.concertId}`)}
          src={concert.concertImg}
        />
      </div>
      <div className="flex flex-col justify-center items-center p-1 ">
        {concert.concertName.length < 14 ? (
          <p className="flex justify-center w-48 font-bold">
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
        <div title="눌러서 삭제하기" className="flex justify-end w-[92%] mt-1">
          <icons.FullHeart
            iconClassName="fill-rose-600 w-8 h-8"
            className="text-red-500 cursor-pointer transition-all ease-in-out  opacity-0 group-hover:opacity-100"
            onClick={onEditLike}
          />
        </div>
        {concert.saleDone === "판매완료" ? (
          <p className="flex items-center justify-center absolute top-3 right-1 w-16 h-5 text-sm text-white font-bold rounded bg-slate-500 mr-3">
            {concert.saleDone}
          </p>
        ) : (
          <p className="flex items-center justify-center absolute top-3 right-2 w-16 h-5 text-sm text-white font-bold rounded bg-accent-main mr-2">
            {concert.saleDone}
          </p>
        )}
      </div>
      <Ticket />
    </div>
  );
};

export default LikeConcert;
