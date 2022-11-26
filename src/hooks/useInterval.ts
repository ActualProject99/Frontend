import { useState } from "react";

const useInterval = (callback: () => void, ms: number) => {
  const [intervalId, setIntervalId] = useState<number>(NaN);
  const intervalOn = () => {
    setIntervalId(window.setInterval(callback, ms));
  };
  const intervalOff = () => {
    window.clearInterval(intervalId);
  };
  return [intervalOn, intervalOff];
};
export default useInterval;
