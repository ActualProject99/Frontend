import Calendar from "../components/Calendar";
import { useState } from "react";
import { cls } from "../utils";
import useTaps from "../hooks/useTaps";
import Cards from "../components/Cards";
import { dateSelected } from "../atoms/date";
import { useRecoilState } from "recoil";
import { format, isSameDay, parseISO } from "date-fns";
import useFixoluteBox from "../hooks/fixsolute";

const concerts = [
  {
    id: 1,
    group: 1,
    name: "2022 THE BOYZ FAN CON:THE B-ROAD",
    location: "잠실실내체육관",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022110715161989ac7a2a-df54-43ed-8d46-c956e58877d0.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-11T13:00",
    endDatetime: "2022-11-11T14:30",
  },
  {
    id: 2,
    group: 2,
    name: "MAMAMOO WORLD TOUR 〈MY CON〉-SEOUL",
    location: "올림픽공원 올림픽홀",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/10/202210211342336f3111f8-1152-498f-b133-78a61cce0f71.jpg/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T09:00",
    endDatetime: "2022-11-20T11:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 4,
    group: 4,
    name: "2022 장동우 1st Fan Meeting 〈DONGWOO TIMES〉",
    location: "연세대학교 백주년기념관 콘서트홀",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022110418290021e3e9b2-4f68-4c27-b420-b25dac083058.jpg/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-09T13:00",
    endDatetime: "2022-11-09T14:30",
  },
  {
    id: 5,
    group: 5,
    name: "2022 남지현 팬미팅 〈어서 와요，우리 집에！〉 ",
    location: "성신여대 운정그린캠퍼스 대강당",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/10/2022102419024583fa1c1c-1659-466f-92e3-0b85320851dc.jpg/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-13T14:00",
    endDatetime: "2022-11-13T14:30",
  },
];

const groups = [
  "전체",
  "아이돌",
  "발라드/R&B",
  "트로트",
  "힙합",
  "인디/록",
  "POP",
];
const Concerts = ({ no1, no2 }: { no1?: boolean; no2?: boolean }) => {
  const [select, setSelect] = useState(0);
  const {
    refs: { fixsolute, limit },
    fixoluteStyle,
  } = useFixoluteBox();
  const handleClick = (i: number) => () => {
    setSelect(i);
  };
  const [dateChosen] = useRecoilState<Date>(dateSelected);
  let dateChosenConcerts = concerts.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), dateChosen)
  );
  return (
    <>
      {no1 ? (
        <>
          <div className="pt-16 mb-8  h-[460px]">
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 h-full">
              <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200  h-full relative">
                <div>
                  <Calendar
                    concerts={concerts.filter(
                      (concert) => !select || concert.group === select
                    )}
                  />
                  <h3 className="font-semibold text-lg text-gray-900 mt-10 absolute -bottom-8">
                    <time dateTime={format(dateChosen, "yyyy-MM-dd")}>
                      {format(dateChosen, "MMM dd, yyy")}
                    </time>
                  </h3>
                </div>
                <section className="mt-12 md:mt-0 md:pl-14 flex flex-col justify-center items-center gap-10">
                  {/* <h2 className="font-semibold text-gray-900">
                Schedule for{" "}
                <time dateTime={format(dateChosen, "yyyy-MM-dd")}>
                  {format(dateChosen, "MMM dd, yyy")}
                </time>
              </h2> */}
                  <ul className="flex justify-center gap-3 flex-wrap">
                    {groups.map((group, i) => (
                      <li
                        key={group}
                        className={cls(
                          "px-3 py-1 rounded-full cursor-pointer flex items-center justify-center font-bold border transition-colors",
                          i === select && "bg-primary-main text-white"
                        )}
                        onClick={handleClick(i)}
                      >
                        {group}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
          {/* <h3 className="font-semibold text-gray-900 mx-auto flex justify-center items-center w-36 ">
        <time dateTime={format(dateChosen, "yyyy-MM-dd")}>
          {format(dateChosen, "MMM dd, yyy")}
        </time>
      </h3> */}
          <div className="flex gap-4 justify-center mt-12 flex-wrap">
            {dateChosenConcerts.length > 0 ? (
              dateChosenConcerts.map((consert, index) => (
                <Cards key={index} concert data={consert} />
              ))
            ) : (
              <p>No concerts for today.</p>
            )}
          </div>
        </>
      ) : null}
      {no2 ? (
        <>
          <div className="pt-16 mb-8 min-h-[700px]">
            <div className="max-w-md px-4 mx-auto md:max-w-6xl h-full">
              <div className="md:grid md:grid-cols-3 md:divide-x md:divide-gray-200 h-full">
                <div className="relative h-full">
                  <div className="w-96" ref={fixsolute} style={fixoluteStyle}>
                    <Calendar
                      concerts={concerts.filter(
                        (concert) => !select || concert.group === select
                      )}
                    />
                    <ul className="flex justify-center gap-3 flex-wrap mt-12 md:px-8">
                      {groups.map((group, i) => (
                        <li
                          key={group}
                          className={cls(
                            "px-3 py-1 rounded-full cursor-pointer flex items-center justify-center font-bold border transition-colors",
                            i === select && "bg-primary-main text-white"
                          )}
                          onClick={handleClick(i)}
                        >
                          {group}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <section
                  ref={limit}
                  className="mt-12 md:min-h-[700px] md:mt-0 md:pl-8 flex flex-col justify-center items-center gap-10 md:col-span-2"
                >
                  {/* <h2 className="font-semibold text-gray-900">
                Schedule for{" "}
                <time dateTime={format(dateChosen, "yyyy-MM-dd")}>
                  {format(dateChosen, "MMM dd, yyy")}
                </time>
              </h2> */}

                  <div className="flex gap-4 justify-center mt-12 flex-wrap">
                    {dateChosenConcerts.length > 0 ? (
                      dateChosenConcerts.map((consert, i) => (
                        <Cards key={i} concert data={consert} />
                      ))
                    ) : (
                      <p>No concerts for today.</p>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
          {/* <h3 className="font-semibold text-gray-900 mx-auto flex justify-center items-center w-36 ">
        <time dateTime={format(dateChosen, "yyyy-MM-dd")}>
          {format(dateChosen, "MMM dd, yyy")}
        </time>
      </h3> */}
        </>
      ) : null}
    </>
  );
};

export default Concerts;
