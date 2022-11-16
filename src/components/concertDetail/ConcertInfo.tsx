//@ts-nocheck
import React from "react";
import {
  FacebookIcon,
  FacebookMessengerShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";
import { useScript } from "../../hooks/KaKaoShare";
import { useEffect } from "react";
import kakaoShareIcon from "../../image/kakaoShareIcon.webp";
import MiniCalendar from "./miniCalendar/MiniCalendar";

const ConcertInfo = ({
  concert,
}: {
  concert: {
    posterUrl: string;
    title: string;
    showTimes: string[];
    location: string;
    runningTime: string;
    viewableGrade: string;
    genre: string;
    latitude: number;
    longitude: number;
    ticketingUrl: {
      melon: string;
    };
  };
}) => {
  const currentUrl = window.location.href;
  const ticketUrl = concert.ticketingUrl.melon;

  // kakao SDK import 하기
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

  // kakao SDK 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도합니다.
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init("5cc25d2c25e1fd715bd1018b2c9ad8ac");
      }
    }
  }, [status]);

  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };
  return (
    <div className="flex justify-between gap-10 m-auto w-full px-10 pt-5">
      <div className=" flex  gap-8">
        <div>
          <img className="w-72 h-96" alt="poster" src={concert.posterUrl} />
          <div className="flex gap-5 justify-center items-center my-4">
            <FacebookMessengerShareButton url={currentUrl} appId={""}>
              <FacebookIcon size={48} round={true} borderRadius={24} />
            </FacebookMessengerShareButton>
            <TwitterShareButton url={currentUrl}>
              <TwitterIcon
                size={48}
                round={true}
                borderRadius={24}
              ></TwitterIcon>
            </TwitterShareButton>
            <CopyToClipboard text={currentUrl}>
              <button
                className="w-12 h-12 text-white rounded-3xl border-none font-extrabold text-base cursor-pointer bg-primary-400"
                onClick={() => {
                  window.alert("클립보드에 복사되었습니다!");
                }}
              >
                URL
              </button>
            </CopyToClipboard>
            <span className="cursor-pointer" onClick={handleKakaoButton}>
              <img
                className="w-12 h-12 rounded-3xl"
                alt="kakaologo"
                src={kakaoShareIcon}
              ></img>
            </span>
          </div>
        </div>
        <div>
          <div className="bg-slate-100 w-full h-8 mb-6">
            <p className="text-2xl font-bold">{concert.title}</p>
          </div>
          <div>
            <div className="flex flex-wrap flex-col gap-y-4">
              <div className="flex items-center">
                티켓팅기간 &nbsp; {concert.showTimes}&nbsp;
                <MiniCalendar concert={concert} />
              </div>
              <p>관람시간 &nbsp; {concert.runningTime}</p>
              <p>장르 &nbsp; {concert.genre}</p>
              <p>관람등급 &nbsp; {concert.viewableGrade}</p>
              <p>공연장 &nbsp; {concert.location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex items-center">
        <button
          className="w-[140px] h-10 mr-10 bg-secondary-main flex  justify-center items-center rounded-2xl"
          onClick={() => {
            window.open(ticketUrl);
          }}
        >
          멜론티켓
        </button>
      </div>
    </div>
  );
};

export default ConcertInfo;