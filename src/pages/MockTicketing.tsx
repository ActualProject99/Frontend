//@ts-nocheck
import Seats from "../components/Seats";
import useMock from "../hooks/useMock";
import { useEffect, useRef, useState } from "react";
import Clock from "../components/Clock";
import { cls, highDimArr } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import usePreventWheel from "../hooks/usePreventScroll";
import { useRecoilState } from "recoil";
import {
  hasBooked,
  hasPlaced,
  isGameSuccess,
  IsGameSuccess,
  userSelected,
  UserSelected,
} from "../atoms/mockTicketing";
import { z } from "zod";

const MockTicketing = () => {
  const { StartBtn } = useMock();
  const [toasts, setToasts] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<"" | "easy">("");
  const [isGamming, setIsGamming] = useState(false);
  const [isCountDownStart, setIsCountDownStart] = useState(false);
  const handleChange = ({ target }) => {
    setDifficulty(target.value);
  };
  const handleClick = () => {
    sessionStorage.setItem("key", "value");
    setIsCountDownStart(true);
  };
  const handleClickStart = () => {
    setIsGamming(true);
    sessionStorage.removeItem("key");
    sessionStorage.removeItem("countDownTime");
  };
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("key");
      sessionStorage.removeItem("countDownTime");
    };
  }, []);
  const isGameStated = useRef(sessionStorage.getItem("key")).current;
  const [getHasBooked, setHasBooked] = useRecoilState(hasBooked);
  const [getIsGameSuccess, setIsGameSuccess] =
    useRecoilState<IsGameSuccess>(isGameSuccess);
  const [getUserSelected, setUserSelected] =
    useRecoilState<UserSelected>(userSelected);
  useEffect(() => {
    // const seatIndexSchema = z.tuple([z.number(), z.number(), z.number()]);
    // console.log("getHasBooked : ", getHasBooked);
    // console.log("getUserSelected : ", getUserSelected);
    // // console.log(seatIndexSchema.safeParse(getUserSelected));
    // if (seatIndexSchema.safeParse(getUserSelected).success) {
    //   console.log(
    //     highDimArr(
    //       getHasBooked,
    //       getUserSelected as z.infer<typeof seatIndexSchema>
    //     )
    //   );
    // }
    console.log(getIsGameSuccess);
    if (
      getIsGameSuccess.every((success) => success === false) ||
      (getIsGameSuccess[0] === false && getIsGameSuccess[1] === null)
    ) {
      setToasts((cur) => cur.concat(Date.now()));
      setTimeout(() => {
        setToasts((cur) => [...cur.slice(1)]);
      }, 2000);
    }
  }, [getIsGameSuccess]);
  return (
    <>
      <div className={cls(isGamming ? "block" : "hidden")}>
        <Seats />
      </div>
      <div
        className={cls(
          "w-full h-96 border border-red-300 flex",
          isGamming ? "hidden" : "block"
        )}
      >
        <div className="flex-[3] bg-slate-400 flex flex-col">
          <div className="flex-[3] p-3 bg-blue-400 flex gap-2">
            <div className="bg-slate-600 h-full w-full" />
            <div className="bg-slate-400 w-1/2 flex flex-col">
              <div className="flex bg-fuchsia-300 w-full h-8">
                <div className="w-24 bg-lime-200">장소</div>
                <div></div>
              </div>
              <div className="flex bg-fuchsia-300 w-full h-8">
                <div className="w-24 bg-lime-200">기간</div>
                <div></div>
              </div>
              <div className="flex bg-fuchsia-300 w-full h-8">
                <div className="w-24 bg-lime-200">출연</div>
                <div></div>
              </div>
              <div className="flex bg-fuchsia-300 w-full h-8">
                <div className="w-24 bg-lime-200">가격정보</div>
                <div></div>
              </div>
              <div className="flex bg-fuchsia-300 w-full h-8">
                <div className="w-24 bg-lime-200">기본가</div>
                <div></div>
              </div>
              <div className="flex bg-fuchsia-300 w-full h-8">
                <div className="w-24 bg-lime-200">부가할인</div>
                <div></div>
              </div>
              <div className="flex bg-fuchsia-300 w-full h-8">
                <div className="w-24 bg-lime-200">게임난이도</div>
                <div>
                  <select onChange={handleChange} value={difficulty}>
                    <option value="">선택해주세요</option>
                    <option value="easy">쉬움</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[1] bg-blue-500">
            <Clock start={isCountDownStart} />
            {isGameStated ? (
              <StartBtn>
                <button onClick={handleClickStart}>예매하기</button>
              </StartBtn>
            ) : (
              <button onClick={handleClick}>시작하기</button>
            )}
          </div>
        </div>
        <div className="flex-[1] bg-slate-600"></div>
      </div>
      <button
        onClick={() => {
          setToasts((cur) => cur.concat(Date.now()));
          setTimeout(() => {
            setToasts((cur) => [...cur.slice(1)]);
          }, 2000);
        }}
      >
        toast
      </button>
      <div className="fixed left-0 top-48">
        <AnimatePresence>
          {toasts?.map((toast, i) => (
            <motion.div
              initial={{ x: -700 }}
              animate={{ x: 0 }}
              exit={{ x: -700 }}
              key={toast}
              className="w-72 h-12 bg-red-200 flex justify-end"
            >
              머하나요?
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {getIsGameSuccess[0] ? (
        <Modal onClick={() => setIsGameSuccess((cur) => [false, cur[0]])}>
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-primary-700 rounded-xl w-1/2 h-3/4">
            you win
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default MockTicketing;
