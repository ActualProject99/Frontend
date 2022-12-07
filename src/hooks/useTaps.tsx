import React, { MouseEventHandler, ReactNode, useState } from "react";
import { Tap } from "../types";

const Selector = ({
  name,
  onClick,
  className,
}: {
  name: string;
  className: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className={className} onClick={onClick}>
      {name}
    </div>
  );
};
const useTaps = (styleNo: number, ...taps: Tap[]) => {
  const styles = [
    [
      "flex justify-center items-center h-10 gap-x-28 border border-x-0 border-solid",
      "cursor-pointer",
    ],
    [
      "flex justify-center items-center h-10 gap-x-32 border border-x-0 border-solid",
      "cursor-pointer text-[#c2c3c5] border-b-2 hover:border-b-2 hover:border-accent-main hover:text-[#222222]",
    ],
  ];
  const [index, setIndex] = useState(0);
  const handleClick = (i: number) => () => {
    setIndex(i);
  };
  const Taps = () => {
    return (
      <div className={styles[styleNo][0]}>
        {taps.map((tap, i) => (
          <Selector
            key={i}
            className={styles[styleNo][1]}
            onClick={handleClick(i)}
            name={tap[0]}
          />
        ))}
      </div>
    );
  };
  const Viewer = () => {
    return <>{taps[index][1]}</>;
  };
  return { Taps, Viewer };
};
export default useTaps;
