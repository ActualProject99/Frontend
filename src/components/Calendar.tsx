import { Menu, Transition } from "@headlessui/react";
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
  parseISO,
  startOfToday,
} from "date-fns";
import { useState } from "react";
import { Concert } from "../atoms/concert";
import icons from "../components/icons";
import { cls } from "../utils";

interface Props {
  checkedConcerts?: Concert[];
  className?: string;
  selectable?: boolean;
  selectedDate?: Date;
}

const Calendar = ({
  checkedConcerts,
  className,
  selectable,
  selectedDate,
}: Props) => {
  let today = startOfToday();
  let [dateChosen, setdateChosen] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

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
  const handleClickDate = (day: number) => {};

  return (
    <div className={className}>
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-gray-900">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
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
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="grid grid-cols-7 mt-2 text-sm ">
        {days.map((day, dayIdx) => {
          return (
            <div
              key={day.toString()}
              className={cls(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-1.5"
              )}
            >
              <button
                type="button"
                onClick={() => setdateChosen(day)}
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
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )
                    : cls(
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full cursor-default",
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

              <div className="w-1 h-1 mx-auto mt-1">
                {checkedConcerts?.some((concert) =>
                  isSameDay(parseISO(concert.startDatetime), day)
                ) && <div className="w-1 h-1 rounded-full bg-sky-500"></div>}
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
