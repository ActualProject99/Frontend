import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ArtistApi from "../../apis/query/ArtistAPI";
import icons from "../icons";
import ArtistIcon from "./ArtistIcon";
import { cls } from "../../utils";
import { IGetArtist, likeArtistProps } from "../../types";
import { useMemo } from "react";
import UserApi from "../../apis/query/UserApi";

const PickArtist = (): JSX.Element => {
  const { data: artists } = ArtistApi.GetArtist();
  const { data: artistLike } = ArtistApi.GetLikeArtistList();
  const { data: userData } = UserApi.GetUserInfo();

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const likeArtists = useMemo(() => {
    return (
      artistLike &&
      artistLike.map((artistList: likeArtistProps) => artistList.artistId)
    );
  }, [artistLike]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };
  useEffect(() => {}, [inputValue, artists]);

  return (
    <>
      <div className="flex justify-between py-5 mx-auto mt-2 mb-0 w-[95%]">
        <div className=" flex items-end gap-x-3 ml-1">
          <p className="text-2xl font-bold ">
            <span className="text-primary-500">{userData?.nickname}</span>님의
            아티스트 취향
          </p>
          <p className="text-slate-500 ">
            희망하는 아티스트를 모아볼 수 있어요!
          </p>
        </div>
        <div className="relative">
          <div className="flex items-center h-10 gap-x-1 border-b-2 border-purple-500 mr-1">
            <input
              className="h-6 border-none w-[85%] focus:border-none focus:ring-transparent"
              type="text"
              placeholder="아티스트 검색"
              value={inputValue}
              onChange={onChangeInput}
            />
            <icons.Search className="text-primary-500 cursor-pointer" />
          </div>
          <ul
            className={cls(
              "flex flex-col absolute font-bold w-[100%] top-[115%] px-2 py-4 gap-3 rounded bg-white z-20 ",
              inputValue ? "border" : ""
            )}
          >
            {artists
              ?.filter(
                (artist) =>
                  inputValue &&
                  artist.artistName
                    .toUpperCase()
                    .includes(inputValue.toUpperCase())
              )
              .reduce(
                (acc, cur) => {
                  if (acc.at(-1)?.length === 3) {
                    acc.push([]);
                  }
                  acc.at(-1)?.push(cur);
                  return acc;
                },
                [[]] as IGetArtist[][]
              )
              .map((artists) => {
                return artists.map((artist) => {
                  return (
                    <li
                      className="flex items-center gap-2 hover:bg-[#7151A1] hover:text-white cursor-pointer"
                      onClick={() => navigate(`/artist/${artist.artistId}`)}
                      key={artist.artistId}
                    >
                      <img
                        className="w-14 h-14 rounded-[50%]"
                        alt="at"
                        src={artist.artistImg}
                      />
                      {artist.artistName}
                    </li>
                  );
                });
              })}
          </ul>
        </div>
      </div>
      <div className="flex flex-col w-[95%] h-[30rem] p-7 border mx-auto my-5 gap-6 ">
        <div>
          <span className="text-accent-main font-bold">
            {userData?.nickname}
          </span>
          님의 선택한 아티스트
        </div>
        <div className="flex justify-around flex-wrap gap-x-8 gap-y-8 mb-5 mt-5 mx-3 overflow-y-scroll scrollbar-hide">
          {artists &&
            artists?.map((artist: IGetArtist) =>
              likeArtists?.includes(artist.artistId) ? (
                <ArtistIcon key={artist.artistId} artist={artist} />
              ) : null
            )}
        </div>
      </div>
    </>
  );
};

export default PickArtist;
