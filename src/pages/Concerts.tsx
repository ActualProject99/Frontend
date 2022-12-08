import Calendar from "../components/Calendar";
import { useEffect, useState } from "react";
import { cls } from "../utils";
import Cards from "../components/Cards";
import { dateSelected } from "../atoms/date";
import { useRecoilState, useRecoilValue } from "recoil";
import useFixoluteBox from "../hooks/useFixsolute";

import ConcertSlider from "../components/ConcertSlider";
import { Concert, IGetConcert } from "../types";
import ConcertApi from "../apis/query/ConcertApi";
import { monthConcerts } from "../atoms/date";
import { format } from "date-fns";
import { motion } from "framer-motion";

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
  const { data: hotConcerts } = ConcertApi.GetHotConcerts();

  const [groupedConcerts, setGroupedConcerts] = useState<IGetConcert[]>([]);
  const [CalendarConcerts, setCalendarConcerts] = useState<IGetConcert[]>([]);
  const ticketingDates = CalendarConcerts?.map((concert) => {
    return new Date(concert.ticketingDate);
  });

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [filteredGroup, setFilteredGroup] = useState(groups);
  const [, setIsVisible] = useState(false);
  const {
    refs: { fixsolute, limit },
    fixoluteStyle,
  } = useFixoluteBox(80);
  const [getDateSelected] = useRecoilState<Date | null>(dateSelected);
  const handleClick = (group: string) => () => {
    setSelectedCategory(groups.indexOf(group));
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
    if (!concerts) return;
    if (getDateSelected && selectedCategory) {
      setGroupedConcerts(
        concerts
          ?.filter(
            (concert) =>
              concert.ticketingDate === format(getDateSelected, "yyyy.MM.dd")
          )
          .filter((concert) => concert.categoryId === selectedCategory)
      );
    }
    if (getDateSelected && !selectedCategory) {
      setGroupedConcerts(
        concerts?.filter(
          (concert) =>
            concert.ticketingDate === format(getDateSelected, "yyyy.MM.dd")
        )
      );
    }
    if (!getDateSelected && selectedCategory) {
      setGroupedConcerts(
        concerts?.filter((concert) => concert.categoryId === selectedCategory)
      );
    }
    if (!getDateSelected && !selectedCategory) {
      setGroupedConcerts(concerts);
    }
  }, [getDateSelected, selectedCategory]);

  useEffect(() => {
    if (concerts) {
      const categorys = Array.from(
        new Set(concerts.map((concert) => concert.categoryId))
      );
      setFilteredGroup(groups.filter((_, i) => !i || categorys.includes(i)));
      setSelectedCategory(0);
    }
  }, [concerts]);

  useEffect(() => {
    if (concerts) {
      setCalendarConcerts(
        concerts?.filter((concert) => {
          return !selectedCategory || concert.categoryId === selectedCategory;
        })
      );
    }
  }, [selectedCategory, groupedConcerts]);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ConcertSlider hotConcerts={hotConcerts} />
        <div className="pt-16 mt-[620px] mb-10">
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
                    {filteredGroup.map((group, i) => (
                      <li
                        key={group}
                        className={cls(
                          "px-3 py-1 rounded-full cursor-pointer flex items-center justify-center font-bold border transition-colors",
                          i ===
                            filteredGroup.indexOf(groups[selectedCategory]) &&
                            "bg-primary-main text-white"
                        )}
                        onClick={handleClick(group)}
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
      </motion.div>
    </>
  );
};

export default Concerts;
