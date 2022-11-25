import {
  useRef,
  useEffect,
  ReactNode,
  forwardRef,
  LegacyRef,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import createScrollSnap from "scroll-snap";
import { mainContent } from "../atoms/mainContent";
import main1 from "../image/main1.png";
import main2 from "../image/main2.png";
import main3 from "../image/main3.png";
import main4 from "../image/main4.png";
import main5 from "../image/main5.png";
import main6 from "../image/main6.png";
import { cls } from "../utils";
const Indicator = () => {
  const [contentNo] = useRecoilState<number>(mainContent);
  const contrastColorNos = [1];
  return (
    <div className="fixed flex flex-col gap-6 top-1/2 -translate-y-1/2 left-10">
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <div
          key={i}
          className={cls(
            "w-2 h-2 transition-colors duration-300 rounded-full",
            contrastColorNos.includes(contentNo)
              ? contentNo === i
                ? "bg-slate-200"
                : "bg-slate-600"
              : contentNo === i
              ? "bg-slate-800"
              : "bg-slate-400"
          )}
        ></div>
      ))}
    </div>
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
  const [_, setContentNo] = useRecoilState<number>(mainContent);
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
  const Content = forwardRef(
    ({ children }: { children: ReactNode }, ref: LegacyRef<HTMLDivElement>) => {
      return (
        <div
          className="h-screen flex justify-between items-center w-[800px] mx-auto"
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
      <div
        ref={snapContainer}
        className="h-screen overflow-y-scroll scrollbar-hide"
      >
        <div
          ref={content1}
          className="h-screen flex justify-center items-center gap-12"
        >
          <div>
            <p className="text-[40px] leading-[48px] font-extrabold pt-40 mb-6 w-80">
              혼자만의 공연이 함께가 되는 곳
            </p>
            <p className="text-2xl">너와 나의 티켓고리</p>
          </div>
          <div>
            <img
              className="w-[520px] h-[640px] object-contain"
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
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 * i }}
                      className={cls(
                        i === 4 && "text-secondary-main font-logo"
                      )}
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
                      className={cls(
                        i === 4 && "text-secondary-main font-logo"
                      )}
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
                <span className="font-logo">Tgle</span>엔 다 있어!
              </>
            }
            sub={
              <>
                콘서트 정보 여기저기 퍼져있어서 찾기 힘드셨죠? <br />
                앞으론 그럴 필요 없습니다.
                <br /> <span className="font-logo">Tgle</span>이 편리하게 당신을
                도와줄겁니다.
              </>
            }
          />
          <div className="cursor-pointer absolute left-1/2 -translate-x-1/2 -z-10 lg:static lg:translate-x-0">
            <img
              className="w-[330px] h-[375px] object-contain"
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
                앞으로는 <span className="font-logo">Tgle</span>과 함께!
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
                <span className="font-logo">Tgle</span>이 알려드려요!
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
          <div>
            <p className="mb-6 pl-1 font-bold"> 04</p>
            <p className="text-[40px] leading-[48px] font-extrabold mb-6 w-[420px]">
              기다렸던 티켓팅에 <br />
              실패하지 않도록 <br />
              미리 워밍업 해보세요!
            </p>
            <p className="text-base">
              예매할 때와 비슷한 환경으로 <br />
              실패없는 티켓팅을 준비해보세요
            </p>
          </div>
          <div>
            <img className="w-[430px] h-96 object-cover" src={main6} alt="" />
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
                      <span className="text-primary-main font-logo">Tgle</span>
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
