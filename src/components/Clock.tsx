import { addSeconds, format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Clock = ({
  start = true,
  time = new Date("2022.11.24 19:59:57"),
}: {
  start: boolean;
  time: Date;
}) => {
  const [countDown, setCountDown] = useState<Date>(time);
  useEffect(() => {
    const addSec = function* (countDown: Date) {
      let i = 0;
      while (true) {
        i++;
        yield addSeconds(countDown, i);
      }
    };
    const addSecStart = addSec(countDown);
    if (start) {
      setInterval(() => {
        setCountDown((cur) => addSeconds(cur, 1));
        sessionStorage.setItem(
          "countDownTime",
          JSON.stringify(addSecStart.next().value)
        );
      }, 1000);
    }
  }, [start]);
  useEffect(() => {
    const time =
      sessionStorage.getItem("countDownTime") &&
      addSeconds(
        parseISO(JSON.parse(sessionStorage.getItem("countDownTime") as string)),
        1
      );
    if (time) {
      setCountDown(time);
      setInterval(() => {
        setCountDown((cur) => addSeconds(cur, 1));
      }, 1000);
    }
  }, []);
  return <div>{format(countDown, "hh:mm:ss")}</div>;
};

export default Clock;
