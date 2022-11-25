import React, { useRef, useState } from "react";

import DatePicker from "react-datepicker";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./miniCalendet.css";
import icons from "../../icons";
import { spawn } from "child_process";
import useDebounce from "../../../hooks/useDebounce";
import ConcertApi from "../../../apis/query/ConcertApi";

const MiniCalendar = ({
  concert,
}: {
  concert: {
    concertId: string;
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
  const { mutateAsync: PostConcertSMS } = ConcertApi.PostConcertSMS();
  const { mutateAsync: DeleteConcertSMS } = ConcertApi.DeleteConcertSMS();
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date("2022.11.13"), concert.minute), concert.hour)
  );

  const [show, setShow] = useState(false);
  const debouncer = useDebounce(1000);
  const PostDebounced = useRef(
    debouncer(({ concertId }: { concertId: number }) => {
      PostConcertSMS({ concertId });
      setShow(!show);
    })
  ).current;
  const PostSMS = () => {
    PostDebounced(concert.concertId);
  };

  const DeleteDebounced = useRef(
    debouncer(({ concertId }: { concertId: number }) => {
      DeleteConcertSMS({ concertId });
      setShow(!show);
    })
  ).current;
  const DeleteSMS = () => {
    DeleteDebounced(concert.concertId);
  };

  return (
    <div className="flex flex-col items-center  border w-72 h-[95%] rounded-md">
      <DatePicker
        locale={ko}
        inline
        dateFormat="yyyy년 MM월 dd일 (eee) aa h시mm분 "
        selected={startDate}
        minDate={new Date("2022.11.13")}
        maxDate={new Date("2022.11.13")}
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
          <div className="flex justify-between items-center m-3 w-56 border-dashed border-b">
            <div className="font-bold text-2xl ">
              <span className="text-[#BBBABF] mr-1">{getYear(date)}</span>
              <span>{getMonth(date) + 1}</span>
            </div>
            <div className="flex">
              <icons.Prev
                className="cursor-pointer"
                ariaDisabled={prevMonthButtonDisabled}
                onClick={decreaseMonth}
              />
              <icons.Next
                className="cursor-pointer"
                ariaDisabled={nextMonthButtonDisabled}
                onClick={increaseMonth}
              />
            </div>
          </div>
        )}
      />
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between w-56 text-xs font-bold">
          <span>날짜</span>
          <span>{concert.showTimes}</span>
        </div>
        <div className="flex justify-between w-56 text-xs font-bold">
          <span>가수</span>
          <span>임영웅</span>
        </div>
        <div className="flex justify-between w-56 text-xs font-bold">
          <span>장소</span>
          <span>{concert.location}</span>
        </div>
      </div>
      {!show ? (
        <button
          className="flex items-center justify-center w-56 h-9 rounded-xl mt-4 text-xs font-bold border border-[#7151A1] text-[#7151A1] gap-x-2"
          onClick={DeleteSMS}
        >
          <icons.Bell />
          <span>공연 알림 설정하기</span>
        </button>
      ) : (
        <button
          className="flex items-center justify-center w-56 h-9 rounded-xl mt-4 text-xs font-bold text-white bg-[#7151A1] gap-x-2"
          onClick={PostSMS}
        >
          <icons.Bell />
          <span>공연 알림 취소하기</span>
        </button>
      )}
    </div>
  );
};
export default MiniCalendar;

{
  /* <icons.Calendar
        className="cursor-pointer"
        onClick={() => setShow(!show)}
      /> */
}

{
  /* {show ? (
        
      ) : null} */
}
