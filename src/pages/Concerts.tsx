import Calendar from "../components/Calendar";
import { useEffect, useState } from "react";
import { cls } from "../utils";
import Cards from "../components/Cards";
import {
  concertsDatesFiltered,
  dateAllConcerts,
  dateSelected,
} from "../atoms/date";
import { useRecoilState, useRecoilValue } from "recoil";
import useFixoluteBox from "../hooks/useFixsolute";
import { datedConcerts, showingConcerts } from "../atoms/concert";
import ConcertSlider from "../components/ConcertSlider";
import { Concert, IGetConcert } from "../types";
import ConcertApi from "../apis/query/ConcertApi";
import { monthConcerts } from "../atoms/date";
import { format } from "date-fns";

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
  "포크",
];
const Concerts = () => {
  const payload = useRecoilValue(monthConcerts);
  const { data: concerts } = ConcertApi.GetMonthConcerts(payload);
  console.log("야생의 데이터다!", concerts);

  const ticketingDates = concerts?.map((concert) => {
    return new Date(concert.ticketingDate);
  });
  console.log("티켓데이트", ticketingDates);
  const [groupedConcerts, setGroupedConcerts] = useState<IGetConcert[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [, setIsVisible] = useState(false);
  const {
    refs: { fixsolute, limit },
    fixoluteStyle,
  } = useFixoluteBox(60);
  const [getDateSelected] = useRecoilState<Date | null>(dateSelected);
  const handleClick = (i: number) => () => {
    setSelectedCategory(i);
  };
  useEffect(() => {
    setIsVisible(false);
  }, [selectedCategory, getDateSelected]);
  useEffect(() => {
    if (concerts) {
      setGroupedConcerts(concerts);
    }
  }, [concerts]);

  useEffect(() => {
    if (concerts) {
      if (getDateSelected) {
        if (selectedCategory) {
          setGroupedConcerts(
            concerts
              ?.filter(
                (concert) =>
                  concert.ticketingDate ===
                  format(getDateSelected, "yyyy.MM.dd")
              )
              .filter((concert) => concert.categoryId === selectedCategory)
          );
        } else {
          setGroupedConcerts(
            concerts?.filter(
              (concert) =>
                concert.ticketingDate === format(getDateSelected, "yyyy.MM.dd")
            )
          );
        }
      } else if (selectedCategory) {
        setGroupedConcerts(
          concerts?.filter((concert) => concert.categoryId === selectedCategory)
        );
      } else {
        setGroupedConcerts(concerts);
      }
    }
  }, [getDateSelected, selectedCategory]);
  return (
    <>
      <ConcertSlider />
      <div className="pt-16 mt-[680px] mb-10">
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
                  checkedDates={ticketingDates as Date[]}
                  className="w-[95%]"
                />
                <ul className="flex justify-center gap-3 flex-wrap">
                  {groups.map((group, i) => (
                    <li
                      key={group}
                      className={cls(
                        "px-3 py-1 rounded-full cursor-pointer flex items-center justify-center font-bold border transition-colors",
                        i === selectedCategory && "bg-primary-main text-white"
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
                {groupedConcerts.length > 0 ? (
                  groupedConcerts?.map((consert, i) => (
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
