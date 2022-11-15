import { MouseEventHandler, useEffect } from "react";
import { cls } from "../utils";
import { useRecoilState } from "recoil";
import {
  HasBooked,
  hasBooked,
  HasPlaced,
  hasPlaced,
} from "../atoms/mockTicketing";
const Seat = ({
  isTaken,
  onClick,
}: {
  isTaken: boolean;
  onClick: MouseEventHandler;
}) => {
  return (
    <div
      onClick={onClick}
      className={cls(
        "w-3 h-3 cursor-pointer",
        isTaken ? "bg-slate-700" : "bg-slate-300"
      )}
    />
  );
};
const Group = ({
  index,
  rows,
  cols,
}: {
  index: number;
  rows: number;
  cols: number;
}) => {
  const [mockBooked, setMockBooked] = useRecoilState<HasBooked>(hasBooked);
  const handleClick = (index: number, i: number, j: number) => () => {
    setMockBooked((cur) =>
      cur.map((g, gi) =>
        gi === index
          ? [...g].map((r, ri) =>
              ri === i ? [...r].map((c, ci) => (ci === j ? true : c)) : r
            )
          : g
      )
    );
  };
  return (
    <div className="flex flex-col gap-1 mx-auto">
      {Array.from({ length: rows }).map((e, i) => (
        <div className="flex gap-1" key={i}>
          {Array.from({ length: cols }).map((e, j) => (
            <Seat
              onClick={handleClick(index, i, j)}
              isTaken={
                mockBooked.length === 1 ? false : mockBooked[index][i][j]
              }
              key={j}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
const Seats = () => {
  const [_, setMockBooked] = useRecoilState<HasBooked>(hasBooked);
  const [__, setHasPlaced] = useRecoilState<HasPlaced>(hasPlaced);
  const datas = [
    { isPlaced: true, rows: 3, cols: 6 },
    { isPlaced: false, rows: 0, cols: 0 },
    { isPlaced: true, rows: 3, cols: 6 },
    { isPlaced: true, rows: 3, cols: 10 },
    { isPlaced: true, rows: 5, cols: 10 },
    { isPlaced: true, rows: 3, cols: 10 },
  ];
  useEffect(() => {
    const initBooked = datas.map((data) =>
      Array.from({ length: data.rows }).fill(
        Array.from({ length: data.cols }).fill(false)
      )
    );
    setMockBooked(initBooked as HasBooked);
    const initPlaced = datas.map((data) => data.isPlaced);
    setHasPlaced(initPlaced);
  }, []);
  return (
    <div className="grid grid-cols-3 grid-rows-2  w-1/2 gap-2">
      {datas.map(({ isPlaced, ...rest }, i) =>
        isPlaced ? <Group key={i} index={i} {...rest} /> : <div key={i} />
      )}
    </div>
  );
};

export default Seats;
