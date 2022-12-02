import Seats from "../components/Seats";
import useMock from "../hooks/useMock";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import Clock from "../components/Clock";
import { cls } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "../components/Portal";
import { useRecoilState } from "recoil";
import {
  isGameDone,
  IsGameDone,
  isGameSuccess,
  IsGameSuccess,
  IsRefreshedValid,
  isRefreshedValid,
} from "../atoms/mockTicketing";
import { parseISO } from "date-fns";
import icons from "../components/icons";
import useToast from "../hooks/useToast";
import { getCookieToken } from "../apis/cookie";
import useTicketPop from "../hooks/useTicketPop";

const MockTicketing = () => {
  const { StartBtn } = useMock();
  const [toasts, setToasts] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<"" | "easy">("");
  const [date, setDate] = useState<
    "선택해주세요" | "101회차" | "102회차" | "103회차" | "104회차"
  >("선택해주세요");
  const [isGaming, setIsGaming] = useState(false);
  const [isCountDownStart, setIsCountDownStart] = useState(false);
  const [seltedDate, setSelectedDate] = useState<number | null>(null);
  const { Toasts, toasted } = useToast("로그인 후 이용 가능합니다!");

  const cookie = getCookieToken();

  const { Ticket, Poped, userInput } = useTicketPop(
    () => (Math.random() > 0.5 ? "안녕하세요" : "방가방가"),
    {
      cacelButton: false,
      userInputs: {
        "ok 😆": "ok",
        no: "no",
      },
      toastOnly: false,
      type: "only msg",
    }
  );

  const handleClickDate = (i: number) => () => {
    setSelectedDate(i);
  };
  const resetSession = () => {
    sessionStorage.removeItem("game");
    sessionStorage.removeItem("countDownTime");
  };
  const handleChangeDifficulty: ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    setDifficulty(target.value as "" | "easy");
  };
  const handleChangeDate: ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    setDate(target.value as "101회차" | "102회차" | "103회차" | "104회차");
  };

  const handleClickStart = () => {
    if (!cookie) {
      toasted();
    } else {
      sessionStorage.setItem("game", "started");
      setIsCountDownStart(true);
    }
  };
  const handleClickBook = () => {
    setIsGaming(true);
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
    isGameStated.current = null;
    setIsGaming(false);
    setCountDown(new Date("2022.11.24 19:59:57"));
    setIsGameSuccess([null, null]);
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

  useEffect(() => {
    const countdownTime = sessionStorage.getItem("countDownTime");
    if (countdownTime && parseISO(JSON.parse(countdownTime)).getHours() < 20) {
      setIsRefreshedValid(false);
    } else {
      setIsRefreshedValid(true);
    }
  }, []);

  return (
    <>
      <Ticket />
      {userInput}
      <button
        onClick={() => {
          Poped();
        }}
      >
        hihi
      </button>
      <div
        className={cls("flex justify-center ", isGaming ? "block" : "hidden")}
      >
        <Seats />
      </div>

      <Toasts />
      <div className={cls("w-full h-96 flex", isGaming ? "hidden" : "block")}>
        <div className="flex-[3] flex flex-col">
          <div className="flex-[3] p-3 flex gap-2">
            <div className="h-full w-full flex justify-center items-center flex-col border-2 border-primary-700">
              <span className="text-lg font-logo mb-2">Ticketing Game</span>
              <span className="text-sm">
                가볍게 손풀면서 티켓팅을 준비해보세요!
              </span>
              <span className="text-sm">실패 없는 티켓팅을 도와드립니다.</span>
              <br />
              <div>
                <span>1. 시작하기 버튼을 누릅니다</span>
                <br />
                <span>
                  2. 8시 정각에 새로 고침
                  <code className="bg-gray-100 p-1 rounded-md border-b border-r border-r-gray-300 border-b-gray-300 text-sm">
                    f5
                  </code>
                  를 해주세요
                </span>
                <br />
                <span>3. 새로고침 이후 예매하기 버튼을 누릅니다.</span>
                <br />
                <span>4. 빈좌석을 클릭!</span>
                <br />
              </div>
              <br />
            </div>
            <div className="w-1/2 flex flex-col text-sm text-gray-700">
              <div className="flex w-full h-8 items-center">
                <div className="w-24">장소</div>
                <div>티켓팅 연습 Hall</div>
              </div>
              <div className="flex w-full h-8 items-center">
                <div className="w-24">기간</div>
                <div>0000.00.00 ~ 0000.00.00</div>
              </div>
              <div className="flex w-full h-8 items-center">
                <div className="w-24">출연</div>
                <div>슈퍼스타</div>
              </div>
              <div className="flex w-full h-8 items-center">
                <div className="w-24">가격정보</div>
                <div>100원</div>
              </div>
              <div className="flex w-full h-8 items-center">
                <div className="w-24">기본가</div>
                <div></div>
                <div></div>
              </div>
              <div className="flex w-full h-8 items-center">
                <div className="w-24">부가할인</div>
                <div></div>
              </div>
              <div className="flex w-full h-8 items-center">
                <div className="w-24">게임난이도</div>
                <select
                  className="text-xs p-0.5 pr-8 "
                  onChange={handleChangeDifficulty}
                  value={difficulty}
                >
                  <option value="">선택해주세요</option>
                  <option value="easy">쉬움</option>
                </select>
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
        <div className="flex-[1] text-xs">
          <div className="bg-red-50 h-3/4 p-3">
            <div className="h-12 flex">
              <div className="flex-[2]">
                예매가능 공연일자
                <br />
                0000.00.00 ~ 0000.00.00
              </div>
              <div className="flex-[1] flex items-start">
                <div className="flex bg-stone-200 w-1/2 h-6 items-center justify-center border-y border-stone-500">
                  달력
                </div>
                <div className="flex bg-stone-400 w-1/2 h-6 items-center justify-center border-y border-stone-500">
                  공연일
                </div>
              </div>
            </div>
            <div className="h-56">
              <div className="h-48 p-2 border bg-white">
                <div className="h-6 border-b-2 flex justify-around items-center">
                  <icons.ChevronLeft
                    className="w-4 h-4"
                    iconClassName="w-4 h-4"
                  />
                  <span className="text-sm">0000.00</span>
                  <icons.ChevronRight
                    className="w-4 h-4"
                    iconClassName="w-4 h-4"
                  />
                </div>
                <div className="h-6 border-b-2 grid grid-cols-7 items-center">
                  <div className="flex justify-center text-red-400">일</div>
                  <div className="flex justify-center">월</div>
                  <div className="flex justify-center">화</div>
                  <div className="flex justify-center">수</div>
                  <div className="flex justify-center">목</div>
                  <div className="flex justify-center">금</div>
                  <div className="flex justify-center">토</div>
                </div>
                <div className="h-28 grid grid-cols-7">
                  {Array(32)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        className="flex justify-center items-center cursor-pointer"
                        key={i}
                        onClick={handleClickDate(i - 1)}
                      >
                        <div
                          className={cls(
                            "w-5 h-5 flex justify-center items-center border",
                            i % 7
                              ? i === 30
                                ? seltedDate === i - 1
                                  ? "bg-red-600 text-white"
                                  : "border-red-400"
                                : seltedDate === i - 1
                                ? "bg-red-600 text-white border-transparent"
                                : "border-transparent"
                              : seltedDate === i - 1
                              ? "bg-red-600 text-white border-transparent"
                              : "text-red-400 border-transparent"
                          )}
                        >
                          {i > 1 ? i - 1 : ""}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="h-4 flex justify-end gap-1 text-[8px]">
                  <div>
                    <span className="inline-block w-2.5 h-2.5 border border-red-400 mr-1"></span>
                    오늘
                  </div>
                  <div>
                    <span className="inline-block w-2.5 h-2.5 bg-red-400 mr-1"></span>
                    공연일
                  </div>
                  <div>
                    <span className="inline-block w-2.5 h-2.5 bg-red-600 mr-1"></span>
                    선택
                  </div>
                </div>
              </div>
              <div className="h-8 pt-1">
                <select
                  className="text-xs p-0.5 pr-8 w-full"
                  onChange={handleChangeDate}
                  value={date}
                >
                  <option value="101회차">101회차</option>
                  <option value="102회차">102회차</option>
                  <option value="103회차">103회차</option>
                  <option value="104회차">104회차</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-red-50 h-1/4"></div>
        </div>
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
            <button
              onClick={handleClickBack}
              className="bg-primary-700 text-white"
            >
              돌아가기
            </button>
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
      {getIsGameDone && getIsGameSuccess[0] === false ? (
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
