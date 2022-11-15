import CommentList from "../components/CommentList";
import Comment from "../components/concertDetail/comment/Comment";
import ConcertInfo from "../components/concertDetail/ConcertInfo";
import MoreInfo from "../components/concertDetail/MoreInfo";
import { NaverMap } from "../components/concertDetail/NaverMap";
import useTaps from "../hooks/useTaps";
import Chat from "../components/concertDetail/Chat";

const Concert = () => {
  const concert = {
    posterUrl:
      "https://img.wowtv.co.kr/wowtv_news/dnrs/20221028/2022102813341803170d3244b4fed182172185139.jpg",
    title: "SAAY 단독 콘서트:mise-en-scène",
    showTimes: ["2022년 12월 15일(목) 오후 8시"],
    location: "롤링홀",
    runningTime: "120분",
    viewableGrade: "전체관람가",
    genre: "콘서트",
    latitude: 37.5484648,
    longitude: 126.92011,
    hour: 20,
    minute: 0,
    ticketingUrl: {
      melon:
        "https://ticket.melon.com/performance/index.htm?prodId=207476#skip_nav",
    },
  };

  const { Taps, Viewer } = useTaps(
    ["상세정보", <MoreInfo />],
    ["공연장정보", <NaverMap concert={concert} />],
    ["기대평", <Comment />]
  );
  return (
    <>
      <ConcertInfo concert={concert} />
      <Taps />
      <Viewer />
      <Chat />
      <CommentList />
    </>
  );
};

export default Concert;
