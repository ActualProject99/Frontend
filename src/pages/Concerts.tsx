import Calendar from "../components/Calendar";
import { useEffect, useState } from "react";
import { cls } from "../utils";
import Cards from "../components/Cards";
import {
  concertsDatesFiltered,
  dateAllConcerts,
  dateSelected,
} from "../atoms/date";
import { useRecoilState } from "recoil";
import useFixoluteBox from "../hooks/useFixsolute";
import { datedConcerts, showingConcerts } from "../atoms/concert";
import ConcertSlider from "../components/ConcertSlider";
import { Concert } from "../types";
import ConcertApi from "../apis/query/ConcertApi";

const groups = [
  "전체",
  "아이돌",
  "발라드/R&B",
  "힙합/EDM",
  "인디/록",
  "내한공연",
  "페스티벌",
  "트로트",
  "댄스",
  "콘서트",
];
const Concerts = () => {
  const { data: concerts } = ConcertApi.GetConcerts();

  const [select, setSelect] = useState(0);
  const [getShowingConcerts, setShowingConcerts] =
    useRecoilState<Concert[]>(showingConcerts);
  const [getdateAllConcerts, setdateAllConcerts] =
    useRecoilState<Date[]>(dateAllConcerts);
  const {
    refs: { fixsolute, limit },
    fixoluteStyle,
  } = useFixoluteBox(60);
  const [dateChosen] = useRecoilState<Date>(dateSelected);
  const handleClick = (i: number) => () => {
    setSelect(i);
    setdateAllConcerts(concertsDatesFiltered(i));
    setShowingConcerts(datedConcerts(i, dateChosen.getDate()));
  };
  useEffect(() => {
    setShowingConcerts(datedConcerts(select, dateChosen.getDate()));
    setIsVisible(false);
  }, [select, dateChosen, setShowingConcerts]);
  const [, setIsVisible] = useState(false);
  return (
    <>
      <ConcertSlider />
      <div className="pt-16 mt-[640px] mb-8">
        <div className="px-4 h-full">
          <div className="grid grid-cols-3 h-full relative w-[95%] mx-auto">
            <div className="relative h-[500px]">
              <div
                ref={fixsolute}
                style={fixoluteStyle}
                className="w-[340px] flex flex-col items-center gap-6"
              >
                <Calendar
                  selectable
                  checkedDates={getdateAllConcerts}
                  className="w-[95%]"
                />
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
              </div>
            </div>
            <section
              ref={limit}
              className="md:pl-8 flex flex-col min-h-[540px] justify-center items-center gap-10 md:col-span-2"
            >
              <div className="flex gap-4 justify-center flex-wrap">
                {getShowingConcerts.length > 0 ? (
                  getShowingConcerts.map((consert, i) => (
                    <Cards key={i} vertical concert data={consert} />
                  ))
                ) : (
                  <p>해당 날짜에 공연이 없어요!</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Concerts;
