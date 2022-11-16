import React, { useState } from "react";
import { IGetLikeConcert } from "../../apis/query/UserApi";
import icons from "../icons";

interface IConcertProps {
  concert: IGetLikeConcert;
}

const LikeConcert = ({ concert }: IConcertProps) => {
  const [like, setLike] = useState(false);
  return (
    <div className="grid w-56 h-[26rem]">
      <div className="flex justify-center m-auto w-56 h-[18rem] overflow-hidden ">
        <img
          className="object-contain cursor-pointer transition-all ease-in-out hover:scale-110"
          alt="poster"
          src={concert.posterUrl}
        />
      </div>
      <div className="flex flex-col justify-center items-center p-1">
        <p className="w-48 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
          {concert.title}
        </p>
        <p>{concert.showTimes}</p>
        <p>{concert.location}</p>
        <div className="flex justify-end w-[92%] ">
          {!like ? (
            <icons.EmptyHeart
              className="text-red-500 cursor-pointer"
              onClick={() => setLike((prev) => !prev)}
            />
          ) : (
            <icons.FullHeart
              className="text-red-500 cursor-pointer"
              onClick={() => setLike((prev) => !prev)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LikeConcert;
