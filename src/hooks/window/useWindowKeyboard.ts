import { useCallback, useEffect } from "react";

const useWindowKeyboard = (
  keyName: string,
  callback: () => void,
  {
    altKey = false,
    ctrlKey = false,
    shiftKey = false,
    isActivate = true,
  }: {
    altKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    isActivate?: boolean | (() => boolean);
  } = {
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    isActivate: true,
  }
) => {
  const pressKey = useCallback((e: globalThis.KeyboardEvent) => {
    const excuter = () => {
      if (
        e.key !== keyName ||
        e.altKey !== altKey ||
        e.ctrlKey !== ctrlKey ||
        e.shiftKey !== shiftKey
      )
        return;
      return callback();
    };
    if (typeof isActivate === "boolean") return isActivate && excuter();
    return isActivate() && excuter();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", pressKey);
    return () => {
      window.addEventListener("keydown", pressKey);
    };
  }, []);
};
export default useWindowKeyboard;
