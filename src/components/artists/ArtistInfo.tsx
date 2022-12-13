import { useQueryClient } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";
import ArtistApi from "../../apis/query/ArtistAPI";
import icons from "../icons";
import ArtistConcerts from "./ArtistConcerts";
import { getCookieToken } from "../../apis/cookie";
import ConcertApi from "../../apis/query/ConcertApi";
import { useParams } from "react-router-dom";
import { ArtistInfoProps } from "../../types";
import useTicket from "../../hooks/useTicketPop";

const ArtistInfo = ({ artist }: ArtistInfoProps): JSX.Element => {
  const { data: LikeArtist } = ArtistApi.GetLikeArtist(artist.artistId);
  const [like, setLike] = useState<boolean>(false);

  const cookie = getCookieToken();
  const { id } = useParams();
  const { data: artistConcerts } = ConcertApi.GetConcerts();
  const queryClient = useQueryClient();
  const { mutateAsync: EditLike } = ArtistApi.EditLikeArtist();

  const { Ticket, poped, userInput } = useTicket("로그인 후 이용해주세요!😉", {
    cacelButton: false,
    userInputs: {
      확인: {
        value: () => {},
        className: "bg-red-200 text-lime-800",
      },
      아니오: null,
    },
    toastOnly: true,
    type: "warn",
  });

  const onEditLike = useCallback(() => {
    if (!cookie) {
      poped();
    } else {
      const payload = {
        artistId: artist.artistId,
      };
      EditLike(payload).then(() => {
        queryClient.invalidateQueries(["artistInfo"]);
      });
      setLike(!like);
    }
  }, [artist.artistId, like, EditLike, queryClient, setLike]);

  useEffect(() => {
    if (LikeArtist) setLike(LikeArtist?.isLike);
  }, [LikeArtist, setLike]);

  return (
    <>
      <Ticket />
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
              <p className="text-2xl font-bold">{artist.artistName}</p>
              <div className="">
                {!like ? (
                  <button
                    className="flex justify-center items-center border border-[#7151A1] w-40 h-10 rounded-md gap-x-2"
                    onClick={onEditLike}
                  >
                    <span>관심 아티스트</span>
                    <icons.EmptyHeart className="text-red-500 cursor-pointer " />
                  </button>
                ) : (
                  <button
                    className="flex justify-center items-center border w-40 h-10 bg-[#7151A1] text-white rounded-md gap-x-2"
                    onClick={onEditLike}
                  >
                    <span>관심 아티스트</span>
                    <icons.FullHeart
                      iconClassName="fill-red-500 w-6 h-6"
                      className="text-red-500 cursor-pointer"
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-wrap h-24 gap-x-10 gap-y-2">
              <div className="flex flex-col gap-2 font-bold">
                <p>장르 </p>
                <p>데뷔 </p>
                <p>데뷔곡 </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>{artist.category}</p>
                <p>{artist.debutDate}</p>
                <p>{artist.debutSong}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-10 ">
        <p className="text-2xl border-b-2 border-accent-main">
          아티스트의 공연 리스트
        </p>
      </div>
      <div className="flex flex-col w-[95%] h-[40rem] p-7 border mx-auto my-2 gap-6 ">
        <div className="flex justify-center items-start flex-wrap w-full h-full  gap-x-10 gap-y-14 overflow-y-scroll scrollbar-hide">
          {artistConcerts &&
            artistConcerts.map((artistConcert) =>
              artistConcert.artistId === Number(id) ? (
                <ArtistConcerts
                  key={artistConcert.artistId}
                  artistConcert={artistConcert}
                />
              ) : null
            )}
        </div>
      </div>
    </>
  );
};

export default ArtistInfo;
