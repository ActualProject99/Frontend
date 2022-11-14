import React, { MouseEventHandler, useState } from "react";
type Tap = [string, React.ReactNode];
const Selector = ({
  name,
  onClick,
}: {
  name: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {name}
    </div>
  );
};
const useTaps = (...taps: Tap[]) => {
  const [index, setIndex] = useState(0);
  const handleClick = (i: number) => () => {
    setIndex(i);
  };
  const Taps = () => {
    return (
      <div className="flex justify-center items-center h-10 gap-x-28 border border-x-0 border-solid">
        {taps.map((tap, i) => (
          <Selector key={i} onClick={handleClick(i)} name={tap[0]} />
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
