import { useState, useEffect } from "react";

const Countdown = (targetDate: Date): string[] => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );
  //   useInterval(() => {
  //     setCountDown(countDownDate - new Date().getTime());
  //   }, 1000);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [countDownDate]);
  return getReturnValues(countDown).map((value) => value + "");
};
const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export default Countdown;
