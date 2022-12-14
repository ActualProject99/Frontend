//@ts-nocheck
import {
  useRef,
  useEffect,
  ReactNode,
  forwardRef,
  LegacyRef,
  useState,
  useMemo,
  memo,
} from "react";
import { useRecoilState } from "recoil";
import createScrollSnap from "scroll-snap";
import {
  isMainsSrollUp,
  MainContent,
  mainContent,
  mainScrollRef,
} from "../atoms/mainContent";
import {
  AnimatePresence,
  motion as m,
  useScroll,
  useTransform,
} from "framer-motion";
import icons from "../components/icons";
import main1 from "../image/main1.png";
import main2 from "../image/main2.png";
import main3 from "../image/main3.png";
import main4 from "../image/main4.png";
import main5 from "../image/main5.png";
import main6 from "../image/main6.png";
import { cls, cme_scrollToY } from "../utils";
import Portal from "../components/Portal";
import { isScrolled } from "../atoms/isScrolled";
import { IsScrolled } from "../types";
import useWindowKeyboard from "../hooks/window/useWindowKeyboard";
const contrastColorNos: (number | null)[] = [1];
const Indicator = () => {
  const [contentNo] = useRecoilState<MainContent>(mainContent);
  return (
    <Portal>
      <div className="h-6 lg:h-fit fixed flex flex-row items-end lg:items-start bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 gap-2 lg:flex-col lg:gap-2 lg:top-1/2 lg:-translate-y-1/2 lg:left-10">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <div
            key={i}
            className={cls(
              "w-9 sm:w-16 transition-all duration-300 lg:h-12",
              contrastColorNos.includes(contentNo)
                ? contentNo === i
                  ? "bg-slate-100 h-1 lg:w-1"
                  : "bg-slate-500 h-0.5 lg:w-0.5"
                : contentNo === i
                ? "bg-slate-400 h-1 lg:w-1"
                : "bg-slate-200 h-0.5 lg:w-0.5"
            )}
          ></div>
        ))}
      </div>
    </Portal>
  );
};
const ScrollTop = () => {
  const [contentNo] = useRecoilState<MainContent>(mainContent);
  const [getMainScrollRef] = useRecoilState(mainScrollRef);
  const handleClick = () => {
    cme_scrollToY(0, 1200, getMainScrollRef);
  };
  return (
    <Portal>
      <icons.ArrowTurnUp
        onClick={handleClick}
        className={cls(
          "fixed right-12 bottom-10 w-12 h-12 rounded-full shadow-lg flex justify-center items-center cursor-pointer",
          contrastColorNos.includes(contentNo) ? "text-white" : "text-black"
        )}
      />
    </Portal>
  );
};
const ContentCopy = ({
  no,
  main,
  sub,
}: {
  no?: string;
  main: ReactNode;
  sub: ReactNode;
}) => {
  return (
    <>
      <div className="hidden lg:block p-2">
        <p className="mb-6 pl-1 font-bold">{no}</p>
        <p className="text-[40px] leading-[48px] font-extrabold mb-6 w-full">
          {main}
        </p>
        <p className="text-base">{sub}</p>
      </div>
      <div className="lg:hidden min-w-[375px] translate-y-32 backdrop-blur-sm bg-white/60 p-2 rounded-2xl">
        <p className="mb-6 pl-1 font-bold">{no}</p>
        <p className="text-3xl leading-[48px] font-extrabold mb-6 w-full">
          {main}
        </p>
        <p className="text-xs font-bold">{sub}</p>
      </div>
    </>
  );
};
const s = 0.0625; // === 1/16
const k = 10 * s - (1 / 2) * s;
const Main = () => {
  const snapContainer = useRef<HTMLDivElement | null>(null);
  const content1 = useRef<HTMLDivElement | null>(null);
  const content2 = useRef<HTMLDivElement | null>(null);
  const content3 = useRef<HTMLDivElement | null>(null);
  const content4 = useRef<HTMLDivElement | null>(null);
  const content5 = useRef<HTMLDivElement | null>(null);
  const content6 = useRef<HTMLDivElement | null>(null);
  const content7 = useRef<HTMLDivElement | null>(null);
  const [contentNo, setContentNo] = useRecoilState<number | null>(mainContent);
  const [getMainScrollRef, setMainScrollRef] = useRecoilState(mainScrollRef);
  const [getIsScrolled] = useRecoilState<IsScrolled>(isScrolled);

  const { scrollYProgress } = useScroll({
    container: snapContainer,
  });
  useEffect(() => {
    setContentNo(0);
  }, [setContentNo]);
  useEffect(() => {
    const { bind, unbind } = createScrollSnap(
      snapContainer.current as HTMLDivElement,
      {
        snapDestinationY: "100%",
        timeout: 30,
        duration: 200,
        easing: (t) => t * t,
      },
      () => {
        [
          content1.current?.offsetTop,
          content2.current?.offsetTop,
          content3.current?.offsetTop,
          content4.current?.offsetTop,
          content5.current?.offsetTop,
          content6.current?.offsetTop,
          content7.current?.offsetTop,
        ].forEach((offsetTop, i) => {
          if (typeof offsetTop !== "undefined" && snapContainer.current) {
            if (
              offsetTop < snapContainer.current?.scrollTop + 100 &&
              offsetTop > snapContainer.current?.scrollTop - 100
            ) {
              setContentNo(i);
            }
          }
        });
      }
    );
    unbind();
    const conditionalBind = () => {
      if (scrollYProgress.get() > 9.5 / 16) {
        bind();
      } else {
        unbind();
      }
    };
    snapContainer.current?.addEventListener("scroll", conditionalBind);
    return () => {
      snapContainer.current?.addEventListener("scroll", conditionalBind);
    };
  }, [setContentNo, scrollYProgress]);
  useEffect(() => {
    if (snapContainer && !getMainScrollRef) {
      setMainScrollRef(snapContainer.current);
    }
    return () => {
      setMainScrollRef(null);
    };
  }, [setMainScrollRef]);

  return (
    <>
      {getIsScrolled ? (
        <>
          <Indicator />
          <ScrollTop />
        </>
      ) : null}
      <div
        ref={snapContainer}
        className="relative h-screen overflow-y-scroll overflow-x-hidden [&:-webkit-scrollbar]:bg-black "
      >
        <EnterButton
          scrollYProgress={scrollYProgress}
          snapContainer={snapContainer}
        />
        <Intro scrollYProgress={scrollYProgress} />
        <div
          ref={content1}
          className="h-screen flex justify-center gap-3 items-center w-11/12 sm:w-[600px] md:w-[800px] mx-auto relative"
        >
          <div className="w-[320px]">
            {contentNo === 0 && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/60 translate-y-20 py-3 rounded-3xl backdrop-blur-sm"
              >
                <m.p
                  className="text-[40px] leading-[48px] font-extrabold mb-6 w-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  혼자만의 공연이 함께가 되는 곳
                </m.p>
                <m.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-2xl"
                >
                  너와 나의 티켓고리
                </m.p>
              </m.div>
            )}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <img
              className="min-w-[340px] sm:min-w-[500px] h-[600px] md:min-w-[320px] md:w-[450px] md:h-[600px] object-contain"
              src={main1}
              alt=""
            />
          </div>
        </div>
        <div ref={content2} className="h-screen">
          <div className="relative h-full">
            <div className="lg:hidden text-white text-3xl md:text-5xl font-extrabold mb-8 w-[540px] absolute left-[3%] top-[14%]">
              {contentNo === 1 && (
                <>
                  {[
                    "나와",
                    "아티스트",
                    "콘서트",
                    "티켓을 연결하는",
                    "Tgle",
                  ].map((e, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 * i }}
                      className={cls(
                        i === 4 && "text-secondary-main font-bold"
                      )}
                    >
                      {e}
                    </m.div>
                  ))}
                </>
              )}
            </div>
            <div className="lg:block hidden text-white text-4xl font-extrabold mb-8 w-[540px] absolute left-[12%] bottom-[5%]">
              {contentNo === 1 && (
                <>
                  {[
                    "나와",
                    "아티스트",
                    "콘서트",
                    "티켓을 연결하는",
                    "Tgle",
                  ].map((e, i) => (
                    <m.div
                      key={e}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 * i }}
                      className={cls(
                        i === 4 && "text-secondary-main font-bold"
                      )}
                    >
                      {e}
                    </m.div>
                  ))}
                </>
              )}
            </div>
            <img
              className="w-full h-screen object-cover absolute top-0 left-0 -z-10"
              src={main2}
              alt=""
            />
          </div>
        </div>
        <div
          className="h-screen flex justify-center gap-3 items-center w-11/12 lg:px-2 lg:w-[970px] mx-auto relative -z-20"
          ref={content3}
        >
          <ContentCopy
            no="01"
            main={
              <>
                콘서트 일일이 찾아봐? <br />
                <span className="font-bold text-accent-main">Tgle</span>엔 다
                있어!
              </>
            }
            sub={
              <>
                콘서트 정보 여기저기 퍼져있어서 찾기 힘드셨죠? <br />
                앞으론 그럴 필요 없습니다.
                <br /> <span className="font-bold text-purple-600">Tgle</span>이
                편리하게 당신을 도와줄겁니다.
              </>
            }
          />
          <div className="cursor-pointer absolute left-1/2 -translate-x-1/2 -z-10 lg:static lg:translate-x-0">
            <img
              className="min-w-[400px] sm:min-w-[500px] h-[600px] md:w-[330px] md:h-[375px] object-contain"
              src={main3}
              alt=""
            />
          </div>
        </div>
        <div
          className="h-screen flex justify-center gap-3 items-center w-11/12 lg:px-2 lg:w-[970px] mx-auto relative -z-20"
          ref={content4}
        >
          <ContentCopy
            no="02"
            main={
              <>
                티켓팅 놓쳤다고 <br /> 울지마세요! <br />
                앞으로는 <span className="font-bold text-purple-600">Tgle</span>
                과 함께!
              </>
            }
            sub={
              <>
                티켓팅 예매처 서버시간을 <br />
                실시간으로 확인할 수 있습니다.
              </>
            }
          />
          <div className="absolute left-1/2 -translate-x-1/2 -z-10 lg:static lg:translate-x-0">
            <img
              className="translate-x-[10%] min-w-[400px] sm:min-w-[500px] h-[600px] md:w-[360px] md:h-[540px] object-contain"
              src={main4}
              alt=""
            />
          </div>
        </div>
        <div
          className="h-screen flex justify-center gap-3 items-center w-11/12 lg:px-2 lg:w-[970px] mx-auto relative -z-20"
          ref={content5}
        >
          <ContentCopy
            no="03"
            main={
              <>
                관심 설정해 놓은 <br /> 공연들을 <br />
                <span className="font-bold text-secondary-main">Tgle</span>이
                알려드려요!
              </>
            }
            sub={
              <>
                보고싶은 콘서트
                <br /> 티켓팅 일정을 <br /> 알림으로 받아보세요!
              </>
            }
          />
          <div className="absolute left-1/2 -translate-x-1/2 -z-10 lg:static lg:translate-x-0">
            <img
              className="min-w-[400px] sm:min-w-[500px] h-[600px] md:w-[330px] md:h-[375px] object-contain"
              src={main5}
              alt=""
            />
          </div>
        </div>
        <div
          className="h-screen flex justify-center gap-3 items-center w-11/12 lg:px-2 lg:w-[970px] mx-auto relative -z-20"
          ref={content6}
        >
          <ContentCopy
            no="04"
            main={
              <>
                기다렸던 티켓팅에 <br />
                실패하지 않도록 <br />
                미리 워밍업 해보세요!
              </>
            }
            sub={
              <>
                예매할 때와 비슷한 환경으로 <br />
                실패없는 티켓팅을 준비해보세요
              </>
            }
          />
          <div className="absolute left-1/2 -translate-x-1/2 -z-10 lg:static lg:translate-x-0">
            <img
              className="min-w-[400px] sm:min-w-[500px] h-[600px] md:w-[330px] md:h-[375px] object-contain"
              src={main6}
              alt=""
            />
          </div>
        </div>
        <div
          className="h-screen flex justify-center gap-3 items-center w-11/12 lg:px-2 lg:w-[970px] mx-auto relative -z-20"
          ref={content7}
        >
          <div
            className="flex justify-center items-center h-screen w-screen relative overflow-hidden"
            style={{ perspective: 300 }}
          >
            {contentNo === 6 && (
              <>
                <m.div
                  initial={{
                    transform: "rotate3d(3,0,1,0deg)",
                    opacity: 0,
                  }}
                  animate={{
                    transform: "rotate3d(3,0,1,20deg)",
                    opacity: 1,
                  }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-rows-3 grid-flow-col min-w-[1200px] absolute -translate-y-[98%] scale-125"
                >
                  {posters.map((poster) => (
                    <img
                      className="w-[180px] h-[254px] object-cover"
                      src={poster}
                      alt=""
                    />
                  ))}
                </m.div>
                <div className="h-screen w-screen absolute bg-gradient-to-b from-white via-transparent to-white z-50 flex justify-center items-center"></div>
                <AnimatePresence>
                  <>
                    <m.div
                      initial={{ backdropFilter: "blur(0px)" }}
                      animate={{ backdropFilter: "blur(5px)" }}
                      transition={{ delay: 0.4 }}
                      className="h-screen w-screen absolute flex justify-center items-center"
                    ></m.div>
                    <m.div
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 200 }}
                      transition={{ delay: 0.7 }}
                      className="absolute z-50"
                    >
                      <p className="font-black text-7xl  text-gray-800 translate-y-40">
                        <span className="text-black">티켓팅을 즐겁게</span>
                        <br />
                        <span className="text-primary-main text-9xl font-bold">
                          Tgle
                        </span>
                      </p>
                    </m.div>
                  </>
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
        <Clipper scrollYProgress={scrollYProgress} />
      </div>
    </>
  );
};
const EnterButton = memo(({ scrollYProgress, snapContainer }) => {
  const [isButtonShow, setIsButtonShow] = useState({
    isGoingUpOrStoped: true,
    isIntroing: true,
  });
  const [isScrolling, setIsScrolling] = useState(
    () => scrollYProgress.getVelocity() > 0.05
  );
  const [isIntroEnd, setIsIntroEnd] = useState(scrollYProgress.get() > 9 / 16);
  const [getIsMainsSrollUp, setIsMainsSrollUp] =
    useRecoilState<boolean>(isMainsSrollUp);
  const { innerHeight: screenHeight } = window;
  const handleClick = () => {
    const duration = 8200 * (1 - (16 * scrollYProgress.get()) / 10); // 어디서 눌러도 같은 속도로
    cme_scrollToY(screenHeight * 10, duration, snapContainer.current);
  };
  useWindowKeyboard(
    "Enter",
    () => {
      const duration = 8200 * (1 - (16 * scrollYProgress.get()) / 10); // 어디서 눌러도 같은 속도로
      cme_scrollToY(screenHeight * 10, duration, snapContainer.current);
    },
    { isActivate: () => scrollYProgress.get() < 10 / 16 }
  );
  useEffect(() => {
    const progesslog = () => {
      const isGoingUpOrStoped = scrollYProgress.getVelocity() < 0;
      const isIntroing = scrollYProgress.get() < 9 / 16;
      setIsButtonShow((cur) => ({
        isGoingUpOrStoped,
        isIntroing,
      }));
      const velocity = scrollYProgress.getVelocity() > 0.05;
      setIsScrolling(() => velocity);
      setIsIntroEnd(!isIntroing);
    };
    snapContainer.current.addEventListener("scroll", progesslog);
  }, []);
  return (
    <button
      className={cls(
        "flex flex-col gap-1 items-center font-Clip text-xl bg-transparent text-white fixed bottom-12 transition-all ease-in-out duration-1000 p-8 [text-shadow:_0_0_2px_pink,_0_0_4px_pink,_0_0_8px_pink,_0_0_16px_pink,_0_0_32px_pink]",
        Object.values(isButtonShow).every((e) => e)
          ? "right-1/2 translate-x-1/2"
          : "right-36 translate-x-1/2",
        isScrolling ? "opacity-0" : "opacity-100",
        isIntroEnd ? "hidden" : "block"
      )}
      onClick={handleClick}
    >
      <p
        className={cls(
          "transition-all duration-1000 p-2 px-12 hover:opacity-0 scale-105 hover:scale-[2]",
          Object.values(isButtonShow).every((e) => e)
            ? "opacity-100"
            : "opacity-0"
        )}
      >
        &#9663;
      </p>
      <p
        className={cls(
          "transition-all duration-1000 p-2 px-12 hover:opacity-0 scale-105 hover:scale-[2]",
          Object.values(isButtonShow).every((e) => e)
            ? "opacity-100"
            : "opacity-0"
        )}
      >
        &#9662;
      </p>
      <p className="my-2">press Enter</p>
      <p
        className={cls(
          "transition-all duration-1000 p-2 px-12 hover:opacity-0 scale-105 hover:scale-[2]",
          Object.values(isButtonShow).every((e) => e)
            ? "opacity-100"
            : "opacity-0"
        )}
      >
        &#9662;
      </p>
      <p
        className={cls(
          "transition-all duration-1000 p-2 px-12 hover:opacity-0 scale-105 hover:scale-[2]",
          Object.values(isButtonShow).every((e) => e)
            ? "opacity-100"
            : "opacity-0"
        )}
      >
        &#9663;
      </p>
    </button>
  );
});

const Intro = ({ scrollYProgress }) => {
  const scale1 = useTransform(
    scrollYProgress,
    [0, 4 * s, 9 * s, k],
    [1.2, 1.2 + 0.8 * Math.random(), 4.5, 10]
  );
  const scale2 = useTransform(
    scrollYProgress,
    [0, 4 * s, 9 * s + s / 10, k],
    [1.2, 1.2 + 0.6 * Math.random(), 4.5 - 0.3 * Math.random(), 10]
  );
  const scale3 = useTransform(
    scrollYProgress,
    [0, 4 * s, 9 * s + (s / 10) * 2, k],
    [1.2, 1.2 + 0.4 * Math.random(), 2.2 + 0.6 * Math.random(), 10]
  );
  const scale4 = useTransform(
    scrollYProgress,
    [0, 4 * s, 9 * s + (s / 10) * 3, k],
    [1.2, 1.2 + 0.2 * Math.random(), 2.2 + 0.9 * Math.random(), 10]
  );
  const scale5 = useTransform(
    scrollYProgress,
    [0, 4 * s, 9 * s + (s / 10) * 4, k],
    [1.2, 1.2, 2.2 + 1.2 * Math.random(), 10]
  );
  const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
  const centerRandom = (val: number) => Math.random() * val - val / 2;
  const transformValues = (size: number) => {
    const rndValue = centerRandom(size);
    return [
      scrollYProgress,
      [0, 4 * s, k],
      [rndValue, rndValue, centerRandom(size / 2)],
    ];
  };
  const transformXValues = (size: number) => {
    const rndValue = centerRandom(size);
    return [
      scrollYProgress,
      [0, 4 * s, k],
      [rndValue - 100, rndValue - 100, centerRandom(size / 2) - 100],
    ];
  };
  const transformYValues = (size: number) => {
    const rndValue = centerRandom(size);
    return [
      scrollYProgress,
      [0, 4 * s, k],
      [rndValue - 150, rndValue - 150, centerRandom(size / 2) - 150],
    ];
  };
  const transformOpasity = (poster: number) => {
    return [
      scrollYProgress,
      [0, 4 * s - 0.1 * s, 4 * s - poster / 256, k - poster / 256],
      [0, 0, 1, 0],
    ];
  };
  const x1 = useTransform(...transformXValues(screenWidth));
  const y1 = useTransform(...transformYValues(screenHeight));
  const r1 = useTransform(...transformValues(90));
  // const o1 = useTransform(...transformOpasity(1));
  const x2 = useTransform(...transformXValues(screenWidth));
  const y2 = useTransform(...transformYValues(screenHeight));
  const r2 = useTransform(...transformValues(90));
  // const o2 = useTransform(...transformOpasity(2));
  const x3 = useTransform(...transformXValues(screenWidth));
  const y3 = useTransform(...transformYValues(screenHeight));
  const r3 = useTransform(...transformValues(90));
  // const o3 = useTransform(...transformOpasity(3));
  const x4 = useTransform(...transformXValues(screenWidth));
  const y4 = useTransform(...transformYValues(screenHeight));
  const r4 = useTransform(...transformValues(90));
  // const o4 = useTransform(...transformOpasity(4));
  const x5 = useTransform(...transformXValues(screenWidth));
  const y5 = useTransform(...transformYValues(screenHeight));
  const r5 = useTransform(...transformValues(90));
  // const o5 = useTransform(...transformOpasity(5));
  const x6 = useTransform(...transformXValues(screenWidth));
  const y6 = useTransform(...transformYValues(screenHeight));
  const r6 = useTransform(...transformValues(90));
  // const o6 = useTransform(...transformOpasity(6));
  const x7 = useTransform(...transformXValues(screenWidth));
  const y7 = useTransform(...transformYValues(screenHeight));
  const r7 = useTransform(...transformValues(90));
  // const o7 = useTransform(...transformOpasity(7));
  const x8 = useTransform(...transformXValues(screenWidth));
  const y8 = useTransform(...transformYValues(screenHeight));
  const r8 = useTransform(...transformValues(90));
  // const o8 = useTransform(...transformOpasity(8));
  const x9 = useTransform(...transformXValues(screenWidth));
  const y9 = useTransform(...transformYValues(screenHeight));
  const r9 = useTransform(...transformValues(90));
  // const o9 = useTransform(...transformOpasity(9));
  const x10 = useTransform(...transformXValues(screenWidth));
  const y10 = useTransform(...transformYValues(screenHeight));
  const r10 = useTransform(...transformValues(90));
  const o10 = useTransform(...transformOpasity(10));
  const x11 = useTransform(...transformXValues(screenWidth));
  const y11 = useTransform(...transformYValues(screenHeight));
  const r11 = useTransform(...transformValues(90));
  const o11 = useTransform(...transformOpasity(11));
  const x12 = useTransform(...transformXValues(screenWidth));
  const y12 = useTransform(...transformYValues(screenHeight));
  const r12 = useTransform(...transformValues(90));
  const o12 = useTransform(...transformOpasity(12));
  const x13 = useTransform(...transformXValues(screenWidth));
  const y13 = useTransform(...transformYValues(screenHeight));
  const r13 = useTransform(...transformValues(90));
  const o13 = useTransform(...transformOpasity(13));
  const x14 = useTransform(...transformXValues(screenWidth));
  const y14 = useTransform(...transformYValues(screenHeight));
  const r14 = useTransform(...transformValues(90));
  const o14 = useTransform(...transformOpasity(14));
  const x15 = useTransform(...transformXValues(screenWidth));
  const y15 = useTransform(...transformYValues(screenHeight));
  const r15 = useTransform(...transformValues(90));
  const o15 = useTransform(...transformOpasity(15));
  const x16 = useTransform(...transformXValues(screenWidth));
  const y16 = useTransform(...transformYValues(screenHeight));
  const r16 = useTransform(...transformValues(90));
  const o16 = useTransform(...transformOpasity(16));
  const x17 = useTransform(...transformXValues(screenWidth));
  const y17 = useTransform(...transformYValues(screenHeight));
  const r17 = useTransform(...transformValues(90));
  const o17 = useTransform(...transformOpasity(17));
  const x18 = useTransform(...transformXValues(screenWidth));
  const y18 = useTransform(...transformYValues(screenHeight));
  const r18 = useTransform(...transformValues(90));
  const o18 = useTransform(...transformOpasity(18));
  const x19 = useTransform(...transformXValues(screenWidth));
  const y19 = useTransform(...transformYValues(screenHeight));
  const r19 = useTransform(...transformValues(90));
  const o19 = useTransform(...transformOpasity(19));
  const x20 = useTransform(...transformXValues(screenWidth));
  const y20 = useTransform(...transformYValues(screenHeight));
  const r20 = useTransform(...transformValues(90));
  const o20 = useTransform(...transformOpasity(20));
  const x21 = useTransform(...transformXValues(screenWidth));
  const y21 = useTransform(...transformYValues(screenHeight));
  const r21 = useTransform(...transformValues(90));
  const o21 = useTransform(...transformOpasity(21));
  const x22 = useTransform(...transformXValues(screenWidth));
  const y22 = useTransform(...transformYValues(screenHeight));
  const r22 = useTransform(...transformValues(90));
  const o22 = useTransform(...transformOpasity(22));
  const x23 = useTransform(...transformXValues(screenWidth));
  const y23 = useTransform(...transformYValues(screenHeight));
  const r23 = useTransform(...transformValues(90));
  const o23 = useTransform(...transformOpasity(23));
  const x24 = useTransform(...transformXValues(screenWidth));
  const y24 = useTransform(...transformYValues(screenHeight));
  const r24 = useTransform(...transformValues(90));
  const o24 = useTransform(...transformOpasity(24));
  const x25 = useTransform(...transformXValues(screenWidth));
  const y25 = useTransform(...transformYValues(screenHeight));
  const r25 = useTransform(...transformValues(90));
  const o25 = useTransform(...transformOpasity(25));
  const x26 = useTransform(...transformXValues(screenWidth));
  const y26 = useTransform(...transformYValues(screenHeight));
  const r26 = useTransform(...transformValues(90));
  const o26 = useTransform(...transformOpasity(26));
  const x27 = useTransform(...transformXValues(screenWidth));
  const y27 = useTransform(...transformYValues(screenHeight));
  const r27 = useTransform(...transformValues(90));
  const o27 = useTransform(...transformOpasity(27));
  const x28 = useTransform(...transformXValues(screenWidth));
  const y28 = useTransform(...transformYValues(screenHeight));
  const r28 = useTransform(...transformValues(90));
  const o28 = useTransform(...transformOpasity(28));
  const x29 = useTransform(...transformXValues(screenWidth));
  const y29 = useTransform(...transformYValues(screenHeight));
  const r29 = useTransform(...transformValues(90));
  const o29 = useTransform(...transformOpasity(29));
  const x30 = useTransform(...transformXValues(screenWidth));
  const y30 = useTransform(...transformYValues(screenHeight));
  const r30 = useTransform(...transformValues(90));
  const o30 = useTransform(...transformOpasity(30));
  const x31 = useTransform(...transformXValues(screenWidth));
  const y31 = useTransform(...transformYValues(screenHeight));
  const r31 = useTransform(...transformValues(90));
  const o31 = useTransform(...transformOpasity(31));
  const x32 = useTransform(...transformXValues(screenWidth));
  const y32 = useTransform(...transformYValues(screenHeight));
  const r32 = useTransform(...transformValues(90));
  const o32 = useTransform(...transformOpasity(32));
  const x33 = useTransform(...transformXValues(screenWidth));
  const y33 = useTransform(...transformYValues(screenHeight));
  const r33 = useTransform(...transformValues(90));
  const o33 = useTransform(...transformOpasity(33));
  const x34 = useTransform(...transformXValues(screenWidth));
  const y34 = useTransform(...transformYValues(screenHeight));
  const r34 = useTransform(...transformValues(90));
  const o34 = useTransform(...transformOpasity(34));
  const opacity = useTransform(
    scrollYProgress,
    [0, 4 * s - 0.1 * s, 4 * s, k],
    [0, 0, 1, 0]
  );
  const opacityBack = useTransform(
    scrollYProgress,
    [0, 7 * s, 9 * s],
    [1, 1, 0]
  );
  const opacityBlock = useTransform(
    scrollYProgress,
    [0, 1 * s, 2 * s],
    [1, 1, 0]
  );
  const motionProps = [
    [x1, y1, scale1, opacity, r1],
    [x2, y2, scale1, opacity, r2],
    [x3, y3, scale1, opacity, r3],
    [x4, y4, scale1, opacity, r4],
    [x5, y5, scale1, opacity, r5],
    [x6, y6, scale1, opacity, r6],
    [x7, y7, scale1, opacity, r7],
    [x8, y8, scale1, opacity, r8],
    [x9, y9, scale1, opacity, r9],
    [x10, y10, scale1, o10, r10],
    [x11, y11, scale1, o11, r11],
    [x12, y12, scale1, o12, r12],
    [x13, y13, scale2, o13, r13],
    [x14, y14, scale2, o14, r14],
    [x15, y15, scale3, o15, r15],
    [x16, y16, scale3, o16, r16],
    [x17, y17, scale3, o17, r17],
    [x18, y18, scale4, o18, r18],
    [x19, y19, scale4, o19, r19],
    [x20, y20, scale4, o20, r20],
    [x21, y21, scale4, o21, r21],
    [x22, y22, scale4, o22, r22],
    [x23, y23, scale4, o23, r23],
    [x24, y24, scale4, o24, r24],
    [x25, y25, scale4, o25, r25],
    [x26, y26, scale4, o26, r26],
    [x27, y27, scale5, o27, r27],
    [x28, y28, scale5, o28, r28],
    [x29, y29, scale5, o29, r29],
    [x30, y30, scale5, o30, r30],
    [x31, y31, scale5, o31, r31],
    [x32, y32, scale5, o32, r32],
    [x33, y33, scale5, o33, r33],
    [x34, y34, scale5, o34, r34],
  ].map((e, i) => ({
    style: { x: e[0], y: e[1], scale: e[2], opacity: e[3], rotate: e[4] },
    src: posters[i],
  }));
  return (
    <div className="bg-gradient-to-b h-[1000vh] w-8">
      <m.div
        style={{ opacity: opacityBlock }}
        className="w-screen h-screen top-0 left-0 -z-10 fixed bg-[url('https://previews.123rf.com/images/rawpixel/rawpixel1603/rawpixel160305951/53433656-%EB[…]%EA%B5%AC%EC%B2%B4%EC%A0%81%EC%9D%B8-%EA%B0%9C%EB%85%90.jpg')]"
      ></m.div>
      <m.div
        className="fixed w-screen h-screen top-0 left-0 -z-10 bg-radial flex justify-center items-center "
        style={{ opacity: opacityBack }}
      >
        <m.span
          style={{ opacity: opacityBlock }}
          className="font-NeonBines animate-flicker text-9xl text-white flex justify-center items-center"
        >
          Tgle
        </m.span>
      </m.div>
      {motionProps.map((prop, i) => {
        return (
          <m.img
            key={i}
            {...prop}
            className="w-[calc(200px_+_4vw)] h-[calc(300px_+_6vw)] fixed -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          ></m.img>
        );
      })}
    </div>
  );
};

const Clipper = ({ scrollYProgress }) => {
  const background = useTransform(
    scrollYProgress,
    [
      0,
      1.3 * s,
      4 * s - s / 10,
      4 * s,
      8.5 * s,
      9 * s,
      10 * s,
      11 * s,
      11.5 * s,
      12 * s,
      12.5 * s,
      13 * s,
      13.5 * s,
      14 * s,
      14.5 * s,
      15 * s,
      1,
    ],
    [
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 100%,rgba(26, 18, 33,0.8) 100%,rgba(26, 18, 33,0.3) 100%,rgba(225, 225, 225, 1) 100%)", //0
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 30%,rgba(26, 18, 33,0.8) 30%,rgba(26, 18, 33,0.3) 100%,rgba(225, 225, 225, 1) 100%)", //2 * s
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 20%,rgba(26, 18, 33,0.8) 20%,rgba(26, 18, 33,0.3) 100%,rgba(225, 225, 225, 1) 100%)", //4 * s - s / 10
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 100%,#ffffff 100%,#ffffff 100%,rgba(2, 0, 36, 1) 100%)", //4 * s
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 100%,#ffffff 100%,#ffffff 100%,rgba(2, 0, 36, 1) 100%)", //8.5 * s
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 2%,#ffffff 2%,#ffffff 100%,rgba(2, 0, 36, 1) 100%)", //9 * s
      "radial-gradient(circle at 50% -200%,rgba(0, 0, 0, 0) 0%,#ffffff 0%,#ffffff 100%,rgba(2, 0, 36, 1) 100%)", //10 * s
      "radial-gradient(circle at 40% 30%,rgba(0, 0, 0, 0) 70%,rgba(255, 255, 255,0.3) 70%,rgba(255, 255, 255,0.1) 100%,rgba(2, 0, 36, 1) 100%)", //11 * s
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 20%,rgba(0, 0, 0,0.6) 20%,rgba(0, 0, 0,0.4) 100%,rgba(2, 0, 36, 1) 100%)", //11.5 * s
      "radial-gradient(circle at 60% 40%,rgba(0, 0, 0, 0) 80%,rgba(26, 18, 33,0.2) 80%,rgba(0, 0, 0, 0.6) 100%,rgba(2, 0, 36, 1) 100%)", //12 * s
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 100%,rgba(26, 18, 33,0.2) 100%,rgba(0, 0, 0, 0.6) 100%,rgba(2, 0, 36, 1) 100%)", //12.5 * s
      "radial-gradient(circle at 45% 60%,rgba(0, 0, 0, 0) 75%,rgba(26, 18, 33,0.2) 75%,rgba(0, 0, 0, 0.6) 100%,rgba(2, 0, 36, 1) 100%)", //13 * s
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 105%,rgba(26, 18, 33,0.2) 105%,rgba(0, 0, 0, 0.6) 100%,rgba(2, 0, 36, 1) 100%)", //13.5 * s
      "radial-gradient(circle at 60% 20%,rgba(0, 0, 0, 0) 80%,rgba(26, 18, 33,0.2) 80%,rgba(0, 0, 0, 0.6) 100%,rgba(2, 0, 36, 1) 100%)", //14 * s
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 100%,rgba(26, 18, 33,0.2) 100%,rgba(0, 0, 0, 0.6) 100%,rgba(2, 0, 36, 1) 100%)", //14.5 * s
      "radial-gradient(circle at 30% 80%,rgba(0, 0, 0, 0) 80%,rgba(26, 18, 33,0.2) 80%,rgba(0, 0, 0, 0.6) 100%,rgba(2, 0, 36, 1) 100%)", //15 * s
      "radial-gradient(circle at 50% 50%,rgba(0, 0, 0, 0) 10%,#ffffff 10%,#ffffff 100%,rgba(2, 0, 36, 1) 100%)", //1
    ]
  );
  return (
    <m.div
      style={{
        background,
      }}
      className="fixed left-0 top-0 w-screen h-screen -z-10"
    ></m.div>
  );
};

export default Main;

const posters = [
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/10/2022101210464406c2f97c-f12d-4632-8c75-7b84502afa7b.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221123095349d67af859-d516-4334-bbce-38d5a6ff1c42.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111715300206344042-acfa-46fa-a724-d5dbf2fc2197.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111719432656049e10-97aa-4cbf-8594-a87a9dfdccbc.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022110811345758ee1f95-5e61-4a59-831e-c7e0ea501de5.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221117195835ebb6e0bc-3552-457c-9ad0-511efed8eaa0.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221118160940cc8a8c98-33f8-4835-886e-ca8d687ff52a.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221122132637652860e8-5da5-4ae9-be23-6322201e50c9.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221117141650ccedb235-0e17-46e7-beba-4dd098898d00.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221114133100dc5098f2-05e9-407c-bb84-6e9d5b6f6d88.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111617504259941190-29ff-4acd-87cd-2f1390737d68.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022112217510488bd7320-b505-475b-8de6-b2ba74e0f686.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111613020119cf2680-f853-45ec-bb26-1d1431f9f811.png/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111516155683da8dd3-8b80-498a-afc2-4f60a8fbc640.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111713273557b8678c-6059-454b-a4ea-32672a0cea4e.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/202211211139255d01329c-3c96-4f47-88be-6b83594e2a99.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221116171930250efe46-45cb-4ab9-b325-6d1a386df348.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/202211091324577ac1fd6b-45d7-422e-9428-191f7b2fd343.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/202211221316515ae7aab9-75ac-4f1a-a8c2-111d91ebf3bb.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/202211171135039cb03922-1be2-4c21-a3ee-4ea381c2b56f.jpg/melon/resize/180x250/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221115153103511be5f8-d8f8-49a0-ab93-08351cb7738a.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/202211211009461108650b-ba69-4ce5-891f-2305234468cb.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111813572990e0c433-4424-4217-8490-9e845543704a.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221114164634f34e8b41-894b-41d6-918e-0b4c36118d67.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221104143802d3234174-4711-4d11-bed2-3f2625bda4de.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/202211111316062f887edd-c02b-42b8-86be-32baba700500.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221116181122add9e9b7-6782-427a-bafc-1ad5abf0af6b.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111116433648f75e17-ab02-47b3-aa3f-9b59f68cc70d.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111719432656049e10-97aa-4cbf-8594-a87a9dfdccbc.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221114133922b5c1dff3-7435-46d8-ba17-303bc18769c8.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221114114152db099f86-a006-4626-af46-5bc648720d0d.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221116125917358d9f1c-1d50-4b36-b313-c23a1e82b6ca.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/20221121182038d18fbe09-ef9f-4415-9a8c-ea8e36fc081a.jpg/melon/resize/180x254/strip/true/quality/90/optimize",
  "https://res.cloudinary.com/dwlshjafv/image/upload/v1669811278/nahoona55th_bridge_big_tqczd6.jpg",
  "https://res.cloudinary.com/dwlshjafv/image/upload/v1669811279/%EC%95%84%EC%9D%B4%EC%9C%A0_n8qclt.jpg",
  "https://res.cloudinary.com/dwlshjafv/image/upload/v1668610025/10cm_%ED%8F%AC%EC%8A%A4%ED%84%B0_udawch.png",
  "https://res.cloudinary.com/dwlshjafv/image/upload/v1669811267/EGGTMSMMBSWGNZRU3FIY6KGOVQ_uhy71h.webp",
  "https://res.cloudinary.com/dwlshjafv/image/upload/v1669811267/20141104084410_534084_400_600_nvxiu2.jpg",
  "https://res.cloudinary.com/dwlshjafv/image/upload/v1669811279/2022110114012832258_1_c4vjpz.jpg",
  "https://res.cloudinary.com/dwlshjafv/image/upload/v1669811364/image_readtop_2022_968182_16672057175215847_xlztje.jpg",
];
