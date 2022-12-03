import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import {
  hasBooked,
  isGameDone,
} from "../atoms/mockTicketing";
import { HasBooked, IsGameDone } from "../types";
import { shuffle } from "../utils";

const useMock = () => {
  const [, setHasBooked] = useRecoilState<HasBooked>(hasBooked);
  const bookASeat = (index: number, i: number, j: number) => {
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
  const StartBtn = ({ children }: { children: ReactNode }) => {
    const [getHasBooked] = useRecoilState<HasBooked>(hasBooked);
    const [, setIsGameDone] = useRecoilState<IsGameDone>(isGameDone);
    const datas = [
      { isPlaced: true, rows: 3, cols: 6 },
      { isPlaced: false, rows: 0, cols: 0 },
      { isPlaced: true, rows: 3, cols: 6 },
      { isPlaced: true, rows: 3, cols: 10 },
      { isPlaced: true, rows: 5, cols: 10 },
      { isPlaced: true, rows: 3, cols: 10 },
    ];
    const tuplify = (index: number, data: any[]) =>
      data.reduce(
        (acc, cur, i, arr) => {
          const boolsNum: number = arr.reduce(
            (a, c, j) => (i > j ? a + c.rows * c.cols : a),
            0
          );
          if (index >= boolsNum && index < boolsNum + cur.rows * cur.cols)
            return [
              i,
              Math.floor((index - boolsNum) / cur.cols),
              (index - boolsNum) % cur.cols,
            ];
          return acc;
        },
        [0, 0, 0]
      );
    function* generator(data: any[]) {
      let i = 0;
      while (i < data.length) {
        yield data[i++];
      }
    }
    const gen = generator(
      shuffle(getHasBooked.flat(2).map((_, i) => tuplify(i, datas)))
    );

    const handleClick = () => {
      const intervalId = setInterval(() => {
        const { value, done } = gen.next();
        if (!done) {
          bookASeat(...(value as [number, number, number]));
        } else {
          setIsGameDone(true);
          clearInterval(intervalId);
        }
      }, 20);
    };
    return (
      <div className="cursor-pointer" onClick={handleClick}>
        {children}
      </div>
    );
  };
  return { StartBtn };
};

export default useMock;
