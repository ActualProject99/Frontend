import Chat from "../components/Chat";
import Comment from "../components/Comment";
import MiniCalendar from "../components/MiniCalendar";
import { NaverMap } from "../components/NaverMap";

const Concert = () => {
  const concert = {
    posterUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/10/202210271719249f4bcd53-76af-424d-afa4-9b64958f3aa6.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
    title: "SAAY 단독 콘서트:mise-en-scène",
    showTimes: ["2022년 12월 15일(목) 오후 8시"],
    location: "롤링홀",
    runningTime: "120분",
    viewableGrade: "전체관람가",
    genre: "콘서트",
    latitude: 37.5484648,
    longitude: 126.92011,
    ticketingUrl: {
      melon:
        "https://ticket.melon.com/performance/index.htm?prodId=207476#skip_nav",
    },
  };
  return (
    <div>
      Concert
      <MiniCalendar />
      <NaverMap concert={concert} />
      <Comment />
      <Chat />
    </div>
  );
};

export default Concert;
