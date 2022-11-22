import Calendar from "../components/Calendar";
import { useState } from "react";
import { cls } from "../utils";
import Cards from "../components/Cards";
import {
  concertsDatesFiltered,
  dateAllConcerts,
  dateSelected,
} from "../atoms/date";
import { useRecoilState } from "recoil";
import { format, isSameDay, parseISO } from "date-fns";
import useFixoluteBox from "../hooks/useFixsolute";
import {
  allConcerts,
  calendarConcerts,
  Concert,
  showingConcerts,
} from "../atoms/concert";

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
  const [getConcerts] = useRecoilState<Concert[]>(allConcerts);
  const [, setCalendarConcerts] = useRecoilState<Concert[]>(calendarConcerts);
  const [getShowingConcerts, setShowingConcerts] =
    useRecoilState<Concert[]>(showingConcerts);
  const [getdateAllConcerts, setdateAllConcerts] =
    useRecoilState<Date[]>(dateAllConcerts);
  const {
    refs: { fixsolute, limit },
    fixoluteStyle,
  } = useFixoluteBox();
  const handleClick = (i: number) => () => {
    setSelect(i);
    setdateAllConcerts(concertsDatesFiltered(i));
  };
  const [dateChosen] = useRecoilState<Date>(dateSelected);
  const dateChosenConcerts = getConcerts.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), dateChosen)
  );
  const groupedConserts = (concerts: any[], select: number) =>
    concerts.filter((concert) => !select || concert.group === select);
  return (
    <div className="pt-16 mb-8 min-h-[700px]">
      <div className="max-w-md px-4 mx-auto md:max-w-6xl h-full">
        <div className="md:grid md:grid-cols-3 md:divide-x md:divide-gray-200 h-full">
          <div className="relative h-full">
            <div className="w-96" ref={fixsolute} style={fixoluteStyle}>
              <Calendar selectable checkedDates={getdateAllConcerts} />
              {dateChosen.toString()}
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

            <div className="hidden xl:flex gap-4 justify-center mt-12 flex-wrap">
              {getShowingConcerts.length > 0 ? (
                getShowingConcerts.map((consert, i) => (
                  <Cards key={i} vertical concert data={consert} />
                ))
              ) : (
                <p>No concerts for today.</p>
              )}
            </div>
            <div className="flex xl:hidden gap-2 justify-center mt-12 flex-wrap">
              {getShowingConcerts.length > 0 ? (
                getShowingConcerts.map((consert, i) => (
                  <Cards key={i} horizontal concert data={consert} />
                ))
              ) : (
                <p>No concerts for today.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Concerts;
