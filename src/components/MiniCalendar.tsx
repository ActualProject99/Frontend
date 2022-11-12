import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
const MiniCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());

  let handleColor = (time: any) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <DatePicker
      className="w[100px] flex justify-center rounded-lg m-auto"
      showTimeSelect
      locale={ko}
      dateFormat="yyyy년 MM월 dd일 (eee)"
      selected={startDate}
      minDate={new Date()}
      onChange={(date: Date) => setStartDate(date)}
      timeClassName={handleColor}
      disabledKeyboardNavigation
      popperPlacement="auto"
    />
  );
};
export default MiniCalendar;
