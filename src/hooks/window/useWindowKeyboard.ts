import { useEffect } from "react";

const useWindowKeyboard = (
  keyName: string,
  callback: () => void,
  option: { altKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean } = {
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
  }
) => {
  useEffect(() => {
    const pressKey = (e: globalThis.KeyboardEvent) => {
      if (
        e.key !== keyName ||
        e.altKey !== option.altKey ||
        e.ctrlKey !== option.ctrlKey ||
        e.shiftKey !== option.shiftKey
      )
        return;
      return callback();
    };
    window.addEventListener("keydown", pressKey);
    return () => {
      window.addEventListener("keydown", pressKey);
    };
  }, []);
};
export default useWindowKeyboard;
