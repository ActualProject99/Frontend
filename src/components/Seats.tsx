import { MouseEventHandler, useEffect, useMemo } from "react";
import { cls, highDimArr } from "../utils";
import { useRecoilState } from "recoil";
import {
  hasBooked,
  hasPlaced,
  isGameSuccess,
  userSelected,
} from "../atoms/mockTicketing";
import { HasBooked, HasPlaced, IsGameSuccess, UserSelected } from "../types";
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
  const [, setIsGameSuccess] = useRecoilState<IsGameSuccess>(isGameSuccess);
  const [getHasBooked, setHasBooked] = useRecoilState<HasBooked>(hasBooked);
  const [, setUserSelected] = useRecoilState<UserSelected>(userSelected);
  const handleClick = (index: number, i: number, j: number) => () => {
    setIsGameSuccess((cur) => [
      !highDimArr(getHasBooked, [index, i, j]),
      cur[0],
    ]);
    setUserSelected([index, i, j]);
    setHasBooked((cur) =>
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
                getHasBooked.length === 1 ? false : getHasBooked[index][i][j]
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
  const [, setMockBooked] = useRecoilState<HasBooked>(hasBooked);
  const [, setHasPlaced] = useRecoilState<HasPlaced>(hasPlaced);
  const datas = useMemo(
    () => [
      { isPlaced: true, rows: 3, cols: 6 },
      { isPlaced: false, rows: 0, cols: 0 },
      { isPlaced: true, rows: 3, cols: 6 },
      { isPlaced: true, rows: 3, cols: 10 },
      { isPlaced: true, rows: 5, cols: 10 },
      { isPlaced: true, rows: 3, cols: 10 },
    ],
    []
  );
  useEffect(() => {
    const initBooked = datas.map((data) =>
      Array.from({ length: data.rows }).fill(
        Array.from({ length: data.cols }).fill(false)
      )
    );
    setMockBooked(initBooked as HasBooked);
    const initPlaced = datas.map((data) => data.isPlaced);
    setHasPlaced(initPlaced);
  }, [datas, setHasPlaced, setMockBooked]);
  return (
    <div className="grid grid-cols-3 grid-rows-2  w-1/2 gap-2">
      {datas.map(({ isPlaced, ...rest }, i) =>
        isPlaced ? <Group key={i} index={i} {...rest} /> : <div key={i} />
      )}
    </div>
  );
};

export default Seats;
