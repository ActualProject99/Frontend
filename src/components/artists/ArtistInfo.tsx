import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useCallback } from "react";
import ArtistApi, { IGetArtist } from "../../apis/query/ArtistAPI";
import ConcertApi from "../../apis/query/ConcertApi";
import icons from "../icons";
import ArtistConcerts from "./ArtistConcerts";

interface ArtistProps {
  artist: IGetArtist;
}

const ArtistInfo = ({ artist }: ArtistProps): JSX.Element => {
  const [like, setLike] = useState<boolean>(artist.like);
  console.log("좋아요 스테이트", like);
  console.log("아티스트 서버데이터", artist.like);
  const artistConcerts = artist.artistConcerts;

  const queryClient = useQueryClient();
  const { mutateAsync: EditLike } = ArtistApi.EditLikeArtist();

  const onEditLike = useCallback(() => {
    const payload = {
      artistId: artist.artistId,
      like: !like,
    };
    EditLike(payload).then(() => {
      console.log("pay", payload);
      queryClient.invalidateQueries(["artistInfo"]);
    });
    setLike(!like);
  }, [artist.artistId, like, EditLike, queryClient, setLike]);

  return (
    <>
      <div className="flex justify-between items-center w-[95%] h-52 p-8 border mx-auto my-5 gap-6">
        <div className="flex items-center gap-x-10">
          <div>
            <img
              id="uploadedimage"
              className="w-36 h-36 rounded-[50%]"
              alt="userImg"
              src={artist.artistImg}
            />
          </div>
          <div className="flex flex-col items-start w-[40rem] max-h-40 gap-y-6">
            <div className="flex justify-center items-center gap-x-5">
              <p className="text-2xl">{artist.artist}</p>
              <div className="">
                {!like ? (
                  <button
                    className="flex justify-center items-center border w-40 h-10 rounded-md gap-x-2"
                    onClick={onEditLike}
                  >
                    <span>관심 아티스트</span>
                    <icons.EmptyHeart className="text-red-500 cursor-pointer " />
                  </button>
                ) : (
                  <button
                    className="flex justify-center items-center border w-40 h-10 rounded-md gap-x-2"
                    onClick={onEditLike}
                  >
                    <span>관심 아티스트</span>
                    <icons.FullHeart className="text-red-500 cursor-pointer " />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-wrap h-24 gap-x-32 gap-y-2">
              <p className="">유형 여성솔로</p>
              <p>장르 {artist.genre}</p>
              <p>데뷔 2008.09.18</p>
              <p>데뷔곡 미아</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-10 ">
        <p className="text-2xl border-b-2 border-purple-500">
          아티스트의 공연 리스트
        </p>
      </div>
      <div className="flex flex-col w-[95%] h-[40rem] p-7 border mx-auto my-2 gap-6 ">
        <div className="flex justify-center items-start flex-wrap w-full h-full  gap-x-10 gap-y-14 overflow-y-scroll scrollbar-hide">
          {artistConcerts &&
            artistConcerts.map((artistConcert) => (
              <ArtistConcerts artistConcert={artistConcert} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ArtistInfo;