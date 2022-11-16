import { useRef, useEffect } from "react";
import createScrollSnap from "scroll-snap";
import Main1 from "../svg/main1";
const Main = () => {
  const snapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    createScrollSnap(
      snapContainer.current as HTMLDivElement,
      {
        snapDestinationY: "100%",
      },
      () => console.log("snapped")
    );
  }, []);

  return (
    <div
      ref={snapContainer}
      className="h-screen overflow-y-scroll scrollbar-hide"
    >
      <div className="h-screen bg-secondary-100 flex justify-center items-center">
        <div>
          <p className="text-xl font-extrabold pt-40">
            혼자만의 공연이 함께가 되는 곳
          </p>
          <p>너와 나의 티켓고리</p>
        </div>
        <div>
          <Main1 />
        </div>
      </div>
      <div className="h-screen bg-secondary-200"></div>
      <div className="h-screen bg-secondary-300">Enter</div>
      <div className="h-screen bg-secondary-400">Enter</div>
    </div>
  );
};

export default Main;
