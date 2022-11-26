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
import { datedConcerts, Concert, showingConcerts } from "../atoms/concert";
import ConcertSlider from "../components/ConcertSlider";

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
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 h-full">
          <div className="grid grid-cols-3 divide-x divide-gray-200  h-full relative">
            <div className="relative h-[500px]">
              <div ref={fixsolute} style={fixoluteStyle} className="">
                <div className=" w-[280px]">
                  <Calendar selectable checkedDates={getdateAllConcerts} />
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
                  <p>No concerts for today.</p>
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
