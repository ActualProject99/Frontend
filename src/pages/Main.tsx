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
    <div className="fixed flex flex-row bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 gap-2 lg:flex-col lg:gap-6 lg:top-1/2 lg:-translate-y-1/2 lg:left-10">
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <div
          key={i}
          className={cls(
            "w-9 sm:w-12 h-1.5 sm:h-2 lg:w-2 lg:h-2 transition-colors duration-300 rounded-full",
            contrastColorNos.includes(contentNo)
              ? contentNo === i
                ? "bg-slate-100 lg:bg-slate-200"
                : "bg-slate-500 lg:bg-slate-600"
              : contentNo === i
              ? "bg-slate-400 lg:bg-slate-800"
              : "bg-slate-200 lg:bg-slate-400"
          )}
        ></div>
      ))}
    </div>
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
      <div className="hidden md:block p-2">
        <p className="mb-6 pl-1 font-bold">{no}</p>
        <p className="text-[40px] leading-[48px] font-extrabold mb-6 w-full">
          {main}
        </p>
        <p className="text-base">{sub}</p>
      </div>
      <div className="md:hidden backdrop-blur-sm bg-white/60 p-2">
        <p className="mb-6 pl-1 font-bold">{no}</p>
        <p className="text-[36px] leading-[48px] font-extrabold mb-6 w-full">
          {main}
        </p>
        <p className="text-sm">{sub}</p>
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
          className="h-screen flex justify-center gap-3 items-center w-[600px] md:w-[760px] mx-auto relative"
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
          <div className="bg-white">
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
            <p className="text-white text-4xl font-extrabold mb-8 w-[540px] absolute left-48 bottom-32">
              나와 아티스트 / 콘서트 / 티켓을 연결하는
              <span className="text-secondary-main">Tgle</span>
            </p>
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
          <div className="absolute left-1/2 -translate-x-1/2 -z-10 md:static md:translate-x-0">
            <img
              className="w-[400px] h-[600px] md:w-[330px] md:h-[375px] object-contain"
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
          <div className="absolute left-1/2 -translate-x-1/2 -z-10 md:static md:translate-x-0">
            <img
              className="w-[420px] h-[600px] md:w-[218px] md:h-96 object-contain"
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
          <div className="absolute left-1/2 -translate-x-1/2 -z-10 md:static md:translate-x-0">
            <img
              className="md:w-[330px] h-96 object-cover"
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
          <div className="absolute left-1/2 -translate-x-1/2 -z-10 md:static md:translate-x-0">
            <img
              className="md:w-[380px] h-96 object-contain"
              src={main6}
              alt=""
            />
          </div>
        </Content>
      </div>
    </>
  );
};

export default Main;
