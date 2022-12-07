//@ts-nocheck
import React, { useState, useCallback, useRef } from "react";
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
import ConcertApi from "../../apis/query/ConcertApi";
import Chat from "./Chat";
import MoreInfo from "./MoreInfo";
import { NaverMap } from "./NaverMap";

import useTaps from "../../hooks/useTaps";
import icons from "../icons";
import { useQueryClient } from "@tanstack/react-query";
import CommentList from "./comment/CommentList";
import Calendar from "../Calendar";
import useDebounce from "../../hooks/useDebounce";
import { ConcertProps } from "../../types";
import useTicket from "../../hooks/useTicketPop";
import { getCookieToken } from "../../apis/cookie";
import FlareLane from "@flarelane/flarelane-web-sdk";
import Countdown from "./Countdown";
import ShowCountDown from "./ShowCountDown";
import { cls } from "../../utils";
import Janusface from "../Janusface";

const ConcertInfo = ({ concert }: ConcertProps): JSX.Element => {
  const currentUrl = window.location.href;
  console.log("콘서트", concert);
  const { data: LikeCon } = ConcertApi.GetLikeConcert(concert.concertId);
  const { data: locations } = ConcertApi.GetLocation();
  const { mutateAsync: EditLike } = ConcertApi.EditLikeConcerts();
  const { mutateAsync: PostConcertSMS } = ConcertApi.PostConcertSMS();
  const { mutateAsync: DeleteConcertSMS } = ConcertApi.DeleteConcertSMS();
  const queryClient = useQueryClient();
  const [like, setLike] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [dday, setDday] = useState<Date>(new Date(concert?.ticketingDate));
  console.log("dday", dday);
  const location = locations?.find(
    (location) => location.locationId === concert.locationId
  );
  const [subscrided, setSubscribed] = useState();
  FlareLane.getIsSubscribed((isSubscribed) => {
    setSubscribed(isSubscribed);
  });

  const ticketings = JSON.parse(concert.ticketingUrl);
  console.log("티켓팅", ticketings);
  // const moreInfoConcert = JSON.parse(concert.concertInfo);
  // console.log("작품설명", moreInfoConcert);

  const { Ticket, poped, userInput } = useTicket(
    "알림 구독을 해주셔야합니다!\n알림 구독을 하시겠어요?",
    {
      cacelButton: false,
      userInputs: {
        예: {
          value: () => {
            FlareLane.setIsSubscribed(true);
            PostDebounced(concert.concertId);
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
  const debouncer = useDebounce(1000);
  const PostDebounced = useRef(
    debouncer(({ concertId }: { concertId: number }) => {
      PostConcertSMS({ concertId });
      setShow(!show);
    })
  ).current;
  const PostSMS = () => {
    if (!cookie) {
      poped("로그인 후 이용해주세요!😉", {
        isToastOnly: true,
        newType: "warn",
      });
    } else if (!subscrided) {
      poped();
    } else {
      PostDebounced(concert.concertId);
    }
  };

  const DeleteDebounced = useRef(
    debouncer(({ concertId }: { concertId: number }) => {
      DeleteConcertSMS({ concertId });
      setShow(!show);
    })
  ).current;
  const DeleteSMS = () => {
    if (!cookie) return poped();
    DeleteDebounced(concert.concertId);
  };

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
    });
    setLike((prev) => !prev);
  }, [concert.concertId, like, EditLike, queryClient]);

  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };

  useEffect(() => {
    const pos = document.documentElement;
    const mouseTracker = (e) => {
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

  useEffect(() => {
    if (LikeCon) setLike(LikeCon?.isLike);
  }, [LikeCon, setLike]);

  return (
    <>
      <Ticket />
      <img
        className="w-full h-[580px] absolute top-20 left-0 -z-10 object-cover blur-xl"
        alt="poster"
        src={concert.concertImg}
      />
      <div className="w-full h-[630px] absolute top-20 left-0 -z-10 bg-gradient-to-b from-white/10 to-white/90" />
      <div className="flex justify-between m-auto w-full h-full p-5 font-hanna">
        <div className="flex gap-2 m-auto">
          <div className="flex flex-col gap-2 w-72">
            <img className="w-72 h-96" alt="poster" src={concert.concertImg} />
            <div className="flex gap-5 justify-center items-center my-4 rounded-3xl bg-white/20 py-3">
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
          <div className="w-[34rem] bg-white/20 p-3 rounded-xl">
            <div className="w-full h-12 bg-white/50 p-2 rounded-md mb-4 flex items-center">
              <p className="text-xl text-black font-bold">
                {concert.concertName}
              </p>
            </div>
            <div className="flex flex-wrap w-full flex-col gap-y-4 text-[#707070] ">
              <div className="flex gap-x-8 bg-white/50 p-2 rounded-md relative">
                <div className="flex flex-col gap-y-3 font-bold">
                  <p>티켓팅날짜</p>
                  <p>관람시간</p>
                  <p>관람등급</p>
                  <p>장르</p>
                  <p>공연장</p>
                </div>
                <div className="flex flex-col gap-y-3 ">
                  <div className="flex gap-3">
                    <p className="font-bold text-accent-main">
                      {concert.ticketingDate}
                    </p>
                    <ShowCountDown dday={dday} />
                  </div>

                  <p>{concert.playTime}</p>
                  <p>{concert.ratings}</p>
                  <p>콘서트</p>
                  <p>{concert.locationName}</p>
                </div>
                <button
                  className={cls(
                    "flex justify-center items-center border-2 w-44 h-10 rounded-md gap-x-2 absolute bottom-3 right-3",
                    like ? "bg-[#7151A1] text-white" : "border-[#7151A1]"
                  )}
                  onClick={onEditLike}
                >
                  <span className="font-bold">관심 공연</span>
                  {like ? (
                    <icons.FullHeart
                      className="text-red-500 cursor-pointer"
                      iconClassName="fill-red-500 w-6 h-6"
                    />
                  ) : (
                    <icons.EmptyHeart
                      className="text-red-500 cursor-pointer "
                      strokeWidth={3}
                    />
                  )}
                </button>
              </div>
              <div className="bg-white/50 p-2 rounded-md">
                <p>예매하기</p>
                <div className="flex gap-3">
                  {ticketings &&
                    ticketings.map((ticketing) => (
                      <Janusface
                        key={ticketing.id}
                        title={ticketing.title}
                        url={ticketing.url}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-72 h-[95%] rounded-md p-5 bg-white/20">
            <Calendar
              selectedDate={new Date(concert.ticketingDate)}
              showingMonth={new Date(concert.ticketingDate)}
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
            {!show ? (
              <button
                className="flex items-center justify-center w-56 h-9 rounded-xl mt-3 text-xs font-bold border border-[#7151A1] text-[#7151A1] gap-x-2"
                onClick={PostSMS}
              >
                <icons.Bell />
                <span>공연 알림 설정하기</span>
              </button>
            ) : (
              <button
                className="flex items-center justify-center w-56 h-9 rounded-xl mt-4 text-xs font-bold text-white bg-[#7151A1] gap-x-2"
                onClick={DeleteSMS}
              >
                <icons.Bell />
                <span>공연 알림 취소하기</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <Taps />
      <Viewer />
      <Chat />
    </>
  );
};

export default ConcertInfo;
