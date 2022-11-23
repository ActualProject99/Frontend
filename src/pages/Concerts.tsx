import Calendar from "../components/Calendar";
import { useState } from "react";
import { cls } from "../utils";
import Cards from "../components/Cards";
import { dateSelected } from "../atoms/date";
import { useRecoilState } from "recoil";
import { format, isSameDay, parseISO } from "date-fns";
import useFixoluteBox from "../hooks/useFixsolute";
import {
  allConcerts,
  calendarConcerts,
  Concert,
  showingConcerts,
} from "../atoms/concert";
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
  const [getConcerts] = useRecoilState<Concert[]>(allConcerts);
  const [, setCalendarConcerts] = useRecoilState<Concert[]>(calendarConcerts);
  const [getShowingConcerts, setShowingConcerts] =
    useRecoilState<Concert[]>(showingConcerts);
  const {
    refs: { fixsolute, limit },
    fixoluteStyle,
  } = useFixoluteBox();
  const handleClick = (i: number) => () => {
    setSelect(i);
  };
  const [dateChosen] = useRecoilState<Date>(dateSelected);
  const dateChosenConcerts = getConcerts.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), dateChosen)
  );
  const groupedConserts = (concerts: any[], select: number) =>
    concerts.filter((concert) => !select || concert.group === select);
  return (
    <>
      <ConcertSlider />
      {no1 ? (
        <>
          <div className="pt-16 mb-8  h-[460px]">
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 h-full">
              <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200  h-full relative">
                <div>
                  <Calendar
                    selectedDate={new Date(2022, 11, 20, 6, 30, 45, 0)}
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
            {getShowingConcerts.length > 0 ? (
              getShowingConcerts.map((consert, index) => (
                <Cards key={index} vertical concert data={consert} />
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
                      selectedDate={new Date(2022, 10, 20, 6, 30, 45, 0)}
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
