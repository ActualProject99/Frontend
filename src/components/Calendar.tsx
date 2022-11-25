//@ts-nocheck
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
import { ko } from "date-fns/locale";
import { useEffect } from "react";
import { ReactNode, useState } from "react";
import { useRecoilState } from "recoil";
import { dateSelected } from "../atoms/date";
import icons from "../components/icons";
import { cls } from "../utils";
import Portal from "./Portal";

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
  const [dateChosen, setDateChosen] = useRecoilState<Date>(dateSelected);
  // let [dateChosen, setdateChosen] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [getDateSelected, setDateSelected] = useRecoilState(dateSelected);

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
      <div className="grid grid-cols-7 mt-2 text-sm border-b-[4px] border-dotted pb-3">
        {days.map((day, dayIdx) => {
          return (
            <div
              key={day.toString()}
              className={cls(
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
                isEqual(day, dateChosen) && isToday(day) && "bg-primary-main",
                isEqual(day, dateChosen) && !isToday(day) && "bg-gray-900",
                !isEqual(day, dateChosen) && "hover:bg-gray-200",
                (isEqual(day, dateChosen) || isToday(day)) && "font-semibold",
                "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
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
          </div>
        ))}
      </div>
    </div>
  );
};

const Meeting = ({ meeting }: any) => {
  let startDateTime = parseISO(meeting.startDatetime);
  let endDateTime = parseISO(meeting.endDatetime);

  return (
    <li className="flex items-center justify-between px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <Link className="flex space-x-4 items-center" to={`./${meeting.id}`}>
        <img
          src={meeting.imageUrl}
          alt=""
          className="flex-none w-10 h-10 rounded-full"
        />
        <div className="flex-auto">
          <p className="text-gray-900">{meeting.name}</p>
          <p className="mt-0.5">
            <time dateTime={meeting.startDatetime}>
              {format(startDateTime, "h:mm a")}
            </time>{" "}
            -{" "}
            <time dateTime={meeting.endDatetime}>
              {format(endDateTime, "h:mm a")}
            </time>
          </p>
        </div>
      </Link>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <icons.EllipsisVertical className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={cls(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={cls(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
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
