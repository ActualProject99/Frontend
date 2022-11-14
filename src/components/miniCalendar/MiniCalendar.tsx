import React, { useState } from "react";

import DatePicker from "react-datepicker";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./miniCalendet.css";
import icons from "../icons";

const MiniCalendar = ({
  concert,
}: {
  concert: {
    posterUrl: string;
    title: string;
    showTimes: string[];
    location: string;
    runningTime: string;
    viewableGrade: string;
    genre: string;
    latitude: number;
    longitude: number;
    hour: number;
    minute: number;
    ticketingUrl: {
      melon: string;
    };
  };
}) => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(`2022 11 13`), concert.minute), concert.hour)
  );

  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <icons.Calendar
        className="cursor-pointer"
        onClick={() => setShow(!show)}
      />
      {show ? (
        <DatePicker
          className="flex justify-center w-72 h-10 rounded-full m-auto"
          locale={ko}
          inline
          dateFormat="yyyy년 MM월 dd일 (eee) aa h시mm분 "
          selected={startDate}
          minDate={new Date()}
          maxDate={new Date()}
          onChange={(date: Date) => setStartDate(date)}
          // showTimeSelect
          // timeCaption="공연시간"
          // minTime={setHours(setMinutes(new Date(), 0), 20)}
          // maxTime={setHours(setMinutes(new Date(), 0), 20)}
          disabledKeyboardNavigation
          popperPlacement="auto"
          renderCustomHeader={({
            date,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
            decreaseMonth,
            increaseMonth,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <icons.Prev
                className="cursor-pointer"
                ariaDisabled={prevMonthButtonDisabled}
                onClick={decreaseMonth}
              />
              <div className="font-bold text-2xl ml-5 mr-5">
                {getYear(date)}.{getMonth(date) + 1}
              </div>
              <icons.Next
                className="cursor-pointer"
                ariaDisabled={nextMonthButtonDisabled}
                onClick={increaseMonth}
              />
            </div>
          )}
        />
      ) : null}
    </div>
  );
};
export default MiniCalendar;
