import { RefObject, useEffect } from "react";

const useWheelEvent = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("wheel", callback);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("wheel", callback);
      }
    };
  }, []);
};
export default useWheelEvent;
