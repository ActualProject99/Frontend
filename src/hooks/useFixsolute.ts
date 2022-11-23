import { CSSProperties, useEffect, useRef, useState } from "react";

const useFixoluteBox = () => {
  const [isFixed, setIsFixed] = useState(true);
  const fixsolute = useRef<HTMLDivElement | null>(null);
  const limit = useRef<HTMLDivElement | null>(null);
  const fixoluteStyle: CSSProperties = isFixed
    ? { position: "fixed" }
    : {
        position: "absolute",
        top:
          (limit.current?.scrollHeight ?? 0) -
          (fixsolute.current?.scrollHeight ?? 0),
      };
  useEffect(() => {
    const changeState = () => {
      if (
        limit.current &&
        window.scrollY >
          (limit.current?.scrollHeight ?? 0) -
            (fixsolute.current?.scrollHeight ?? 0)
      ) {
        setIsFixed(() => false);
      } else {
        setIsFixed(() => true);
      }
    };
    document.addEventListener("scroll", changeState);
    return () => {
      document.removeEventListener("scroll", changeState);
    };
  });
  return { refs: { fixsolute, limit }, fixoluteStyle };
};

export default useFixoluteBox;
