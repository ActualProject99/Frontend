import React, { useRef, useEffect, useState } from "react";
import createScrollSnap from "scroll-snap";
const Main = () => {
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const ref3 = useRef<HTMLDivElement | null>(null);
  const ref4 = useRef<HTMLDivElement | null>(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const scrollTo = (top: number) => {
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };
  const snapScroll =
    (...scrollPoints: number[]) =>
    () => {
      // console.log(window.scrollY);
      // console.log(scrollPoints[0]);
      console.log(isScrolling);
      if (!isScrolling) {
        scrollTo(scrollPoints[0]);
        setTimeout(() => {
          setIsScrolling(false);
        }, 800);
        setIsScrolling(true);
      }
    };
  useEffect(() => {
    createScrollSnap(
      ref1.current as HTMLDivElement,
      {
        snapDestinationY: "100%",
      },
      () => console.log("snapped")
    );
  }, []);

  return (
    <div ref={ref1} className="h-screen overflow-y-scroll scrollbar-hide">
      <div className="h-screen bg-secondary-100">Enter</div>
      <div onClick={onClick} className="h-screen bg-secondary-200">
        Enter
      </div>
      <div className="h-screen bg-secondary-300">Enter</div>
      <div className="h-screen bg-secondary-400">Enter</div>
    </div>
  );
};

export default Main;
