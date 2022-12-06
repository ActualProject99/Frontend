import React from "react";
import { useNavigate } from "react-router-dom";
import { ArtistProps } from "../../types";

const ArtistConcerts = ({ artistConcert }: ArtistProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid w-56 h-[24rem] border group overflow-y-scroll scrollbar-hide">
        <div className="flex justify-center items-center w-56 h-[18rem] overflow-hidden ">
          <img
            className="object-contain w-56 cursor-pointer transition-all ease-in-out duration-700 hover:scale-110"
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
        </div>
      </div>
    </>
  );
};

export default ArtistConcerts;
