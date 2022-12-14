import React, { useState, useCallback, useRef, memo } from "react";
import {
  FacebookIcon,
  FacebookMessengerShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ConcertApi from "../../apis/query/ConcertApi";
import { getCookieToken } from "../../apis/cookie";

import useTicket from "../../hooks/useTicketPop";
import { useScript } from "../../hooks/KaKaoShare";
import useTaps from "../../hooks/useTaps";
import useFixoluteBox from "../../hooks/useFixsolute";

import CopyToClipboard from "react-copy-to-clipboard";

import { ConcertProps } from "../../types";
import { NaverMap } from "./NaverMap";
import { cls } from "../../utils";
import Calendar from "../Calendar";
import CommentList from "./comment/CommentList";
import ShowCountDown from "./ShowCountDown";
import Janusface from "../Janusface";
import MoreInfo from "./MoreInfo";

import kakaoShareIcon from "../../image/kakaoShareIcon.webp";
import icons from "../icons";

declare global {
  interface Window {
    Kakao: any;
  }
}

const ConcertInfo = memo(({ concert }: ConcertProps): JSX.Element => {
  const currentUrl = window.location.href;
  const { data: LikeCon } = ConcertApi.GetLikeConcert(concert.concertId);
  const { data: AlarmCon } = ConcertApi.GetAlarmConcert(concert.concertId);
  const { data: locations } = ConcertApi.GetLocation();
  const { mutateAsync: EditLike } = ConcertApi.EditLikeConcerts();
  const { mutateAsync: PostConcertSMS } = ConcertApi.PostConcertSMS();

  const queryClient = useQueryClient();
  const [like, setLike] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [dday, setDday] = useState<Date>(new Date(concert?.ticketingDate));
  const location = locations?.find(
    (location) => location.locationId === concert.locationId
  );

  const ticketings = JSON.parse(concert.ticketingUrl);

  const { Ticket, poped, userInput } = useTicket(
    `${concert.concertName}\n 공연의 알림을 받으시겠어요?`,
    {
      cacelButton: false,
      userInputs: {
        예: {
          value: () => {
            const payload = {
              concertId: concert.concertId,
            };
            PostConcertSMS(payload).then(() => {
              queryClient.invalidateQueries(["concert"]);
            });
            setShow((prev) => !prev);
          },
          className: "bg-accent-main text-white",
        },
        아니요: null,
      },
      toastOnly: false,
      type: "info",
    }
  );
  const cookie = getCookieToken();

  const PostSMS = useCallback(() => {
    if (!cookie)
      return poped("로그인 후 이용해주세요!😉", {
        isToastOnly: true,
        newType: "warn",
      });
    if (show === false) {
      poped();
    } else {
      const payload = {
        concertId: concert.concertId,
      };
      PostConcertSMS(payload).then(() => {
        queryClient.invalidateQueries(["concert"]);
        setShow((prev) => !prev);
      });
    }
  }, [PostConcertSMS, show, queryClient]);

  const onEditLike = useCallback(() => {
    if (!cookie)
      return poped("로그인 후 이용해주세요!😉", {
        isToastOnly: true,
        newType: "warn",
      });
    const payload = {
      concertId: concert.concertId,
    };
    EditLike(payload).then(() => {
      queryClient.invalidateQueries(["concert"]);
      setLike((prev) => !prev);
    });
  }, [like, EditLike, queryClient]);

  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };

  useEffect(() => {
    const pos = document.documentElement;
    const mouseTracker = (e: MouseEvent) => {
      pos.style.setProperty("--x", e.offsetX + "px");
      pos.style.setProperty("--y", e.offsetY + "px");
    };
    pos.addEventListener("mousemove", mouseTracker);
    return () => {
      pos.removeEventListener("mousemove", mouseTracker);
    };
  }, []);

  const { Taps, Viewer } = useTaps(
    1,
    ["상세정보", <MoreInfo concert={concert} />],
    ["공연장정보", <NaverMap location={location} />],
    ["기대평", <CommentList />]
  );

  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("5cc25d2c25e1fd715bd1018b2c9ad8ac");
      }
    }
  }, [status]);

  const { innerWidth: screenWidth } = window;
  const {
    refs: { fixsolute, limit },
    fixoluteStyle,
  } = useFixoluteBox(
    80,
    screenWidth < 1200 ? screenWidth - 1200 + 26 : (screenWidth - 1200) / 2 + 31
  );
  useEffect(() => {
    if (LikeCon) setLike(LikeCon?.isLike);
  }, [LikeCon, setLike]);
  useEffect(() => {
    if (AlarmCon) setShow(AlarmCon?.isLike);
  }, [AlarmCon, setShow]);
  return (
    <>
      <Ticket />
      <img
        className="w-full h-[900px] absolute top-20 left-0 -z-10 object-cover blur-xl"
        alt="poster"
        src={concert?.concertImg}
      />
      <div className="w-full h-[950px] absolute top-20 left-0 -z-10 bg-gradient-to-b from-transparent to-white" />
      <div className="w-fit px-3 ml-4 h-12 p-2 rounded-md flex items-center bg-white/30">
        <p className="text-2xl text-black font-bold">{concert.concertName}</p>
      </div>
      <div ref={limit}>
        <div className="w-full h-[740px] px-5 my-5 font-hanna mb-12">
          <div className="flex gap-2 m-auto relative">
            <div className="flex flex-col gap-2 w-[31rem]">
              <img
                className="w-[480px] h-[620px]"
                alt="poster"
                src={concert.concertImg}
              />
            </div>
            <div className="w-[20rem] bg-white/20 p-3 rounded-xl">
              <div className="flex flex-wrap w-full flex-col gap-y-4 text-[#707070] ">
                <div className="bg-white/50 p-2 rounded-md">
                  <ShowCountDown dday={dday} />
                  <DataSlice name="티켓팅날짜" value={concert.ticketingDate} />
                  <DataSlice name="관람시간" value={concert.playTime} />
                  <DataSlice name="관람등급" value={concert.ratings} />
                  <DataSlice name="공연장" value={concert.locationName} />
                </div>

                <div className="flex gap-5 justify-center items-center my-4 rounded-3xl bg-white/50 py-3">
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
                <div className="bg-white/50 p-2 rounded-md">
                  <p className="font-black font-welcome ml-3">예매하기</p>
                  <div className="flex gap-3 flex-col">
                    {ticketings &&
                      ticketings.map(
                        (ticketing: {
                          id: React.Key | null | undefined;
                          title: string;
                          url: string;
                        }) => (
                          <Janusface
                            key={ticketing.id}
                            title={ticketing.title}
                            url={ticketing.url}
                          />
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={fixsolute}
              style={fixoluteStyle}
              className="flex flex-col right-4 h-[620px] items-center w-72 rounded-xl p-5 bg-white/20"
            >
              <Calendar
                selectedDate={new Date(concert.ticketingDate)}
                // showingMonth={new Date(concert.ticketingDate)}
              />
              <div className="flex flex-col gap-y-3 mt-3">
                <div className="flex justify-between w-56 text-xs font-bold">
                  <span className="text-accent-main">티켓팅 시작일</span>
                  <span>{concert.ticketingDate} - 마감시</span>
                </div>
                <div className="flex justify-between w-56 text-xs font-bold">
                  <span className="text-purple-700">공연 기간</span>
                  <span>{concert.concertDate}</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 mt-3">
                <button
                  className="rounded-full bg-white/40 p-2"
                  onClick={PostSMS}
                >
                  <icons.Bell
                    className="text-primary-600"
                    iconClassName={cls("w-9 h-9", show && "fill-primary-600")}
                    strokeWidth={1.5}
                  />
                </button>
                <button
                  className={cls(
                    "flex justify-center items-center rounded-full gap-x-2 bg-white/40 p-2"
                  )}
                  onClick={onEditLike}
                >
                  {like ? (
                    <icons.FullHeart
                      className="text-rose-600 cursor-pointer"
                      iconClassName="fill-rose-600 w-9 h-9"
                    />
                  ) : (
                    <icons.EmptyHeart
                      className="text-rose-600 cursor-pointer "
                      iconClassName="w-9 h-9"
                      strokeWidth={1.5}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[880px]">
          <Taps />
          <Viewer />
        </div>
      </div>
    </>
  );
});

const DataSlice = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="flex w-64 items-end">
      <div className="w-24 text-base font-bold">{name}</div>
      <div className="w-40 text-lg truncate " title={value}>
        {value}
      </div>
    </div>
  );
};

export default ConcertInfo;
