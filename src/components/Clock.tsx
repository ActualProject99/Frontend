import { addSeconds, format, getHours, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  IsGameDone,
  isGameDone,
  IsGameSuccess,
  isGameSuccess,
  IsRefreshedValid,
  isRefreshedValid,
} from "../atoms/mockTicketing";
import useInterval from "../hooks/useInterval";

const Clock = ({
  start = true,
  time = new Date("2022.11.24 19:59:57"),
}: {
  start: boolean;
  time: Date;
}) => {
  const [countDown, setCountDown] = useState<Date>(time);
  const [, setIsRefreshedValid] =
    useRecoilState<IsRefreshedValid>(isRefreshedValid);
  const [getIsGameDone] = useRecoilState<IsGameDone>(isGameDone);
  const [getIsGameSuccess] = useRecoilState<IsGameSuccess>(isGameSuccess);
  const addSec = function* (countDown: Date) {
    let i = 0;
    while (true) {
      i++;
      yield addSeconds(countDown, i);
    }
  };
  const addSecStart = addSec(countDown);
  const [firstCounterOn] = useInterval(() => {
    setCountDown((cur) => addSeconds(cur, 1));
    sessionStorage.setItem(
      "countDownTime",
      JSON.stringify(addSecStart.next().value)
    );
  }, 1000);
  useEffect(() => {
    if (start) {
      firstCounterOn();
    }
  }, [start]);

  const [secondCounterOn, secondCounterOff] = useInterval(() => {
    setCountDown((cur) => addSeconds(cur, 1));
  }, 1000);
  useEffect(() => {
    const time =
      sessionStorage.getItem("countDownTime") &&
      addSeconds(
        parseISO(JSON.parse(sessionStorage.getItem("countDownTime") as string)),
        1
      );
    if (time) {
      if (getHours(addSeconds(time, -1)) > 19) {
        setIsRefreshedValid(true);
        setCountDown(time);
        secondCounterOn();
      }
    }
  }, []);
  useEffect(() => {
    if (getIsGameDone || getIsGameSuccess[0]) {
      secondCounterOff();
      setCountDown(new Date("2022.11.24 19:59:57"));
    }
  }, [getIsGameDone, getIsGameSuccess]);
  return (
    <span className="text-4xl font-bold">{format(countDown, "hh:mm:ss")}</span>
  );
};

export default Clock;
