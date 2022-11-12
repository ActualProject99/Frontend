import React, { useState } from "react";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import dayjs from "dayjs";

const MiniCalendar = () => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 20)
  );

  console.log("date", Date());
  return (
    <DatePicker
      className="w[18rem] flex justify-center rounded-lg m-auto"
      locale={ko}
      dateFormat="yyyy년 MM월 dd일 (eee) aa h시mm분 "
      selected={startDate}
      minDate={new Date()}
      maxDate={new Date()}
      onChange={(date: Date) => setStartDate(date)}
      showTimeSelect
      timeCaption="공연시간"
      minTime={setHours(setMinutes(new Date(), 0), 20)}
      maxTime={setHours(setMinutes(new Date(), 0), 20)}
      disabledKeyboardNavigation
      popperPlacement="auto"
      // renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (

      // )}
    />
  );
};
export default MiniCalendar;
