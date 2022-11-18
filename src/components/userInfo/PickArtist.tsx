import React from "react";
import ArtistApi from "../../apis/query/ArtistAPI";

import icons from "../icons";
import ArtistIcon from "./ArtistIcon";
import { IGetArtist } from "../../apis/query/ArtistAPI";

const PickArtist = (): JSX.Element => {
  const { data: artists } = ArtistApi.GetArtist();
  return (
    <>
      <div className="flex justify-between py-5 mx-auto mt-10 mb-0 w-[95%]">
        <div className=" flex items-end gap-x-3 ml-1">
          <p className="text-2xl font-bold ">
            <span className="text-primary-500">긍정킹</span>님의 아티스트 취향
          </p>
          <p className="text-slate-500 ">
            희망하는 아티스트를 모아볼 수 있어요!
          </p>
        </div>
        <div className=" flex items-center h-10 gap-x-1 border-b-2 border-purple-500 mr-1">
          <input
            className="h-6 border-none w-[85%] focus:border-none focus:ring-transparent"
            type="text"
            placeholder="아티스트 검색"
          />
          <icons.Search className="text-primary-500 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col w-[95%] h-[30rem] p-7 border mx-auto my-5 gap-6 ">
        <div>
          <span className="text-secondary-500 font-bold">긍정킹</span>님의
          선택한 아티스트
        </div>
        <div className="flex justify-around flex-wrap gap-x-8 gap-y-8 mb-5 mt-5 mx-3">
          {artists &&
            artists?.map((artist: IGetArtist) =>
              artist.like === true ? (
                <ArtistIcon key={artist.id} artist={artist} />
              ) : null
            )}
        </div>
      </div>
    </>
  );
};

export default PickArtist;
