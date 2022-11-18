import { useCallback } from "react";

const useDebounce = (ms: number) => {
  const debouncer = useCallback(
    (callback: Function) => {
      let isAllowed = true;
      let timeoutIndex: NodeJS.Timeout;
      return (...params: any[]) => {
        if (isAllowed) {
          callback(...params);
          isAllowed = false;
        } else {
          clearTimeout(timeoutIndex);
        }
        timeoutIndex = setTimeout(() => {
          isAllowed = true;
        }, ms);
      };
    },
    [ms]
  );
  return debouncer;
};

export default useDebounce;
