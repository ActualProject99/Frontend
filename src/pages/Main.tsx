import { useRef, useEffect, ReactNode, forwardRef, LegacyRef } from "react";
import { useRecoilState } from "recoil";
import createScrollSnap from "scroll-snap";
import { mainContent, mainScrollRef } from "../atoms/mainContent";
import { AnimatePresence, motion } from "framer-motion";
import icons from "../components/icons";
import Portal from "../components/Portal";
import main1 from "../image/main1.png";
import main2 from "../image/main2.png";
import main3 from "../image/main3.png";
import main4 from "../image/main4.png";
import main5 from "../image/main5.png";
import main6 from "../image/main6.png";
import { cls } from "../utils";
const contrastColorNos = [1];
const Indicator = () => {
  const [contentNo] = useRecoilState<number>(mainContent);
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
  const [contentNo] = useRecoilState<number>(mainContent);
  const [getMainScrollRef, setMainScrollRef] =
    useRecoilState<HTMLDivElement | null>(mainScrollRef);
  const handleClick = () => {
    getMainScrollRef?.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };
  return (
    <Portal>
      <icons.ArrowTurnUp
        onClick={handleClick}
        className={cls(
          "fixed right-3 bottom-10 w-12 h-12 rounded-full shadow-lg flex justify-center items-center cursor-pointer",
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
const Main = () => {
  const snapContainer = useRef<HTMLDivElement | null>(null);
  const content1 = useRef<HTMLDivElement | null>(null);
  const content2 = useRef<HTMLDivElement | null>(null);
  const content3 = useRef<HTMLDivElement | null>(null);
  const content4 = useRef<HTMLDivElement | null>(null);
  const content5 = useRef<HTMLDivElement | null>(null);
  const content6 = useRef<HTMLDivElement | null>(null);
  const content7 = useRef<HTMLDivElement | null>(null);
  const [contentNo, setContentNo] = useRecoilState<number>(mainContent);
  const [getMainScrollRef, setMainScrollRef] =
    useRecoilState<HTMLDivElement | null>(mainScrollRef);
  useEffect(() => {
    setContentNo(0);
  }, []);
  useEffect(() => {
    createScrollSnap(
      snapContainer.current as HTMLDivElement,
      {
        snapDestinationY: "100%",
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
              offsetTop < snapContainer.current?.scrollTop + 10 &&
              offsetTop > snapContainer.current?.scrollTop - 10
            ) {
              setContentNo(i);
            }
          }
        });
      }
    );
  }, []);
  useEffect(() => {
    if (snapContainer.current) {
      setMainScrollRef(snapContainer.current);
    }
  }, []);
  const Content = forwardRef(
    ({ children }: { children: ReactNode }, ref: LegacyRef<HTMLDivElement>) => {
      return (
        <div
          className="h-screen flex justify-center gap-3 items-center w-11/12 lg:px-2 lg:w-[970px] mx-auto relative"
          ref={ref}
        >
          {children}
        </div>
      );
    }
  );
  return (
    <>
      <Indicator />
      <ScrollTop />
      <div
        ref={snapContainer}
        className="h-screen overflow-y-scroll scrollbar-hide"
      >
        <div
          ref={content1}
          className="h-screen flex justify-center gap-3 items-center w-11/12 sm:w-[600px] md:w-[800px] mx-auto relative "
        >
          <div className="w-[320px]">
            {contentNo === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/60 translate-y-20 py-3 rounded-3xl backdrop-blur-sm"
              >
                <motion.p
                  className="text-[40px] leading-[48px] font-extrabold mb-6 w-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  혼자만의 공연이 함께가 되는 곳
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-2xl"
                >
                  너와 나의 티켓고리
                </motion.p>
              </motion.div>
            )}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -z-10 lg:static lg:translate-x-0">
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
                    <motion.div
                      key={e}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 * i }}
                      className={cls(i === 4 && "text-secondary-main")}
                    >
                      {e}
                    </motion.div>
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
                    <motion.div
                      key={e}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 * i }}
                      className={cls(i === 4 && "text-secondary-main")}
                    >
                      {e}
                    </motion.div>
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
        <Content ref={content3}>
          <ContentCopy
            no="01"
            main={
              <>
                콘서트 일일이 찾아봐? <br />
                Tgle엔 다 있어!
              </>
            }
            sub={
              <>
                콘서트 정보 여기저기 퍼져있어서 찾기 힘드셨죠? <br />
                앞으론 그럴 필요 없습니다.
                <br /> Tgle이 편리하게 당신을 도와줄겁니다.
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
        </Content>
        <Content ref={content4}>
          <ContentCopy
            no="02"
            main={
              <>
                티켓팅 놓쳤다고 <br /> 울지마세요! <br />
                앞으로는 Tgle과 함께!
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
        </Content>
        <Content ref={content5}>
          <ContentCopy
            no="03"
            main={
              <>
                관심 설정해 놓은 <br /> 공연들을 <br />
                Tgle이 알려드려요!
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
        </Content>
        <Content ref={content6}>
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
        </Content>
        <div ref={content7}>
          <div
            className="flex justify-center items-center h-screen w-screen relative overflow-hidden"
            style={{ perspective: 300 }}
          >
            <div
              className="grid grid-rows-4 grid-flow-col min-w-[1200px] absolute -translate-y-[98%] scale-125"
              style={{ transform: "rotate3d(3,0,1,20deg)" }}
            >
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
              <img
                className="bg-black w-52 h-40 object-contain"
                src={main5}
                alt=""
              />
            </div>
            <div className="h-screen w-screen absolute bg-gradient-to-b from-white via-transparent to-white z-50 flex justify-center items-center"></div>
            <AnimatePresence>
              {contentNo === 6 && (
                <>
                  <motion.div
                    initial={{ backdropFilter: "blur(0px)" }}
                    animate={{ backdropFilter: "blur(5px)" }}
                    transition={{ delay: 0.3 }}
                    className="h-screen w-screen absolute flex justify-center items-center"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 200 }}
                    transition={{ delay: 0.6 }}
                    className="absolute z-50"
                  >
                    <p className="font-black text-7xl  text-gray-800 translate-y-40">
                      티켓팅을 즐겁게
                      <br />
                      <span className="text-primary-main">Tgle</span>
                    </p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
