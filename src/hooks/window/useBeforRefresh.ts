//@ts-nocheck
import { useEffect } from "react";

const useBeforeRefresh = (callback: () => any) => {
  useEffect(() => {
    const trigger = () => {
      callback();
    };
    window.addEventListener("beforeunload", trigger);
    return () => {
      window.removeEventListener("beforeunload", trigger);
    };
  }, []);
};
export default useBeforeRefresh;
