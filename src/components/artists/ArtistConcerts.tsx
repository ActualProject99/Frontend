import React from "react";
import { useNavigate } from "react-router-dom";
import { ArtistProps } from "../../types";

const ArtistConcerts = ({ artistConcert }: ArtistProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid w-56 h-[23rem] border overflow-y-scroll scrollbar-hide relative">
        <div className="flex justify-center items-center w-56 h-[18rem] overflow-hidden">
          <img
            className="object-contain w-56 cursor-pointer "
            alt="poster"
            onClick={() => navigate(`/concerts/${artistConcert.concertId}`)}
            src={artistConcert.concertImg}
          />
        </div>
        <div className="flex flex-col justify-center items-center p-1 ">
          {artistConcert.concertName.length < 11 ? (
            <p className="flex justify-center w-48 font-bold ">
              {artistConcert.concertName}
            </p>
          ) : (
            <p className="w-48 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              {artistConcert.concertName}
            </p>
          )}
          <p className="text-sm">{artistConcert.playTime}</p>
          <p className="text-sm font-bold">{artistConcert.locationName}</p>
          {artistConcert.saleDone === "판매완료" ? (
            <p className="flex items-center justify-center absolute top-2 right-0 w-16 h-5 text-sm text-white font-bold rounded bg-slate-500 mr-2">
              {artistConcert.saleDone}
            </p>
          ) : (
            <p className="flex items-center justify-center absolute top-2 right-0 w-16 h-5 text-sm text-white font-bold rounded bg-accent-main mr-2">
              {artistConcert.saleDone}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtistConcerts;
