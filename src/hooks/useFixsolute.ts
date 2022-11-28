import { CSSProperties, useEffect, useRef, useState } from "react";

const useFixoluteBox = (marginTop: number) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isSecondAbsolute, setIsSecondAbsolute] = useState(false);
  const fixsolute = useRef<HTMLDivElement | null>(null);
  const limit = useRef<HTMLDivElement | null>(null);
  const fixoluteStyle: CSSProperties = !isFixed
    ? {
        position: "absolute",
      }
    : !isSecondAbsolute
    ? { position: "fixed", top: marginTop }
    : {
        position: "absolute",
        top:
          (limit.current?.scrollHeight ?? 0) -
          (fixsolute.current?.scrollHeight ?? 0),
      };
  useEffect(() => {
    const changeState = () => {
      if (marginTop > (limit.current?.getBoundingClientRect().y as number)) {
        setIsFixed(() => true);
      } else {
        setIsFixed(() => false);
      }
      if (
        limit.current &&
        window.scrollY >
          (limit.current?.scrollHeight ?? 0) -
            (fixsolute.current?.scrollHeight ?? 0) +
            window.scrollY +
            limit.current?.getBoundingClientRect().y -
            marginTop
      ) {
        setIsSecondAbsolute(() => true);
      } else {
        setIsSecondAbsolute(() => false);
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
