//@ts-nocheck
import Seats from "../components/Seats";
import useMock from "../hooks/useMock";
import { useEffect, useRef, useState } from "react";
import Clock from "../components/Clock";
import { cls } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import {
  isGameDone,
  IsGameDone,
  isGameSuccess,
  IsGameSuccess,
  IsRefreshedValid,
  isRefreshedValid,
} from "../atoms/mockTicketing";

const MockTicketing = () => {
  const { StartBtn } = useMock();
  const [toasts, setToasts] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<"" | "easy">("");
  const [isGamming, setIsGamming] = useState(false);
  const [isCountDownStart, setIsCountDownStart] = useState(false);
  const resetSession = () => {
    sessionStorage.removeItem("game");
    sessionStorage.removeItem("countDownTime");
  };
  const handleChange = ({ target }) => {
    setDifficulty(target.value);
  };
  const handleClickStart = () => {
    sessionStorage.setItem("game", "started");
    setIsCountDownStart(true);
  };
  const handleClickBook = () => {
    setIsGamming(true);
    resetSession();
  };
  useEffect(() => {
    return () => {
      resetSession();
    };
  }, []);
  const isGameStated = useRef(sessionStorage.getItem("game"));
  const [getIsRefreshedValid, setIsRefreshedValid] =
    useRecoilState<IsRefreshedValid>(isRefreshedValid);
  const [getIsGameSuccess, setIsGameSuccess] =
    useRecoilState<IsGameSuccess>(isGameSuccess);
  const [getIsGameDone, setIsGameDone] = useRecoilState<IsGameDone>(isGameDone);
  const [countDown, setCountDown] = useState<Date>(
    new Date("2022.11.24 19:59:57")
  );
  const handleClickBack = () => {
    setIsRefreshedValid(null);
    setIsGameDone(false);
    resetSession();
    isGameStated.current = false;
    setIsGamming(false);
    setCountDown(new Date("2022.11.24 19:59:57"));
  };
  useEffect(() => {
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
        <div className="flex-[3] flex flex-col">
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
          <div className="flex-[1] flex items-center gap-3 justify-center">
            <div className="relative">
              <div className="absolute -top-7 w-64">
                정각이되면 새로고침을 눌러주세요
              </div>
              <Clock start={isCountDownStart} time={countDown} />
            </div>
            {isGameStated.current ? (
              <StartBtn>
                <button
                  className="p-1.5 rounded-2xl text-2xl bg-primary-800 text-white "
                  onClick={handleClickBook}
                >
                  예매하기
                </button>
              </StartBtn>
            ) : (
              <button
                className="p-1.5 rounded-2xl text-2xl bg-primary-800 text-white relative hover:overflow-hidden hover:scale-110 ease-in-out transition-transform"
                onClick={handleClickStart}
              >
                시작하기
                <div
                  className={cls(
                    "h-full w-full absolute rounded-2xl text-2xl bg-primary-800 text-white top-0 left-0 -z-10",
                    isCountDownStart || "animate-ping-small"
                  )}
                ></div>
              </button>
            )}
          </div>
        </div>
        <div className="flex-[1] bg-slate-600"></div>
      </div>
      <div className="fixed left-0 top-48">
        <AnimatePresence>
          {toasts?.map((toast) => (
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
      {getIsRefreshedValid === false ? (
        <Modal onClick={() => {}}>
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-primary-700 rounded-xl w-1/2 h-3/4 px-4 py-8">
            <div className="flex flex-col mx-auto">
              you lose! 새로고침을 너무 일찍 했습니다.
              <button
                onClick={handleClickBack}
                className="bg-primary-700 text-white"
              >
                돌아가기
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {getIsGameDone ? (
        <Modal onClick={() => {}}>
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-primary-700 rounded-xl w-1/2 h-3/4 px-4 py-8">
            <div className="flex flex-col mx-auto">
              you lose 어렵나요 이게
              <button
                onClick={handleClickBack}
                className="bg-primary-700 text-white"
              >
                돌아가기
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default MockTicketing;
