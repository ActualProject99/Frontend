import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { dateSelected } from "../atoms/date";
import icons from "../components/icons";
import { cls } from "../utils";

interface Props {
  checkedDates?: Date[];
  className?: string;
  selectable?: boolean;
  selectedDate?: Date;
}
export const CalenderDrawer = () => {
  return (
    <icons.Calendar
      className="w-16 transition-colors py-2 pr-2 h-14 flex justify-end items-center rounded-r-xl bg-primary-200 text-gray-900 group hover:bg-primary-600 hover:text-gray-100"
      iconClassName="w-9 h-9"
    />
  );
};
const Calendar = ({
  checkedDates,
  className,
  selectable,
  selectedDate,
}: Props) => {
  let today = startOfToday();
  let [dateChosen, setdateChosen] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [, setDateSelected] = useRecoilState(dateSelected);
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });
  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  const handleClickDate = (day: Date) => () => {
    setdateChosen(day);
    setDateSelected(day);
  };
  const [year, month] = format(firstDayCurrentMonth, "yyyy MMMM", {
    locale: ko,
  }).split(" ");
  useEffect(() => {}, []);
  return (
    <div className={cls(className)}>
      <div className="flex items-center border-b-[4px] border-dotted pb-3">
        <h2 className="flex-auto text-2xl font-black ">
          <span className="text-gray-300">{year}&nbsp;</span>
          <span className="text-gray-900">{month}</span>
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <icons.ChevronLeft iconClassName="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <icons.ChevronRight iconClassName="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-7 mt-6 text-xs leading-6 text-center text-gray-500">
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </div>
      <div className="grid grid-cols-7 text-sm border-b-[4px] border-dotted">
        {days.map((day, dayIdx) => {
          return (
            <div
              key={day.toString()}
              className={cls(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-0.5"
              )}
            >
              <button
                type="button"
                onClick={selectable ? handleClickDate(day) : () => {}}
                className={
                  selectable
                    ? cls(
                        isEqual(day, dateChosen) && "text-white",
                        !isEqual(day, dateChosen) &&
                          isToday(day) &&
                          "text-primary-main",
                        !isEqual(day, dateChosen) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-900",
                        !isEqual(day, dateChosen) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400",
                        isEqual(day, dateChosen) &&
                          isToday(day) &&
                          "bg-primary-main",
                        isEqual(day, dateChosen) &&
                          !isToday(day) &&
                          "bg-gray-900",
                        !isEqual(day, dateChosen) && "hover:bg-gray-200",
                        (isEqual(day, dateChosen) || isToday(day)) &&
                          "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded"
                      )
                    : cls(
                        "mx-auto flex h-8 w-8 items-center justify-center rounded cursor-default",
                        selectedDate &&
                          isSameDay(day, selectedDate) &&
                          "bg-primary-100",
                        isToday(day) && "text-secondary-600 font-bold"
                      )
                }
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
              <div className="w-6 h-1 mx-auto mt-2">
                {checkedDates?.some((date) => isSameDay(date, day)) && (
                  <div className="w-6 h-1 rounded-full bg-secondary-500"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Calendar;
let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
