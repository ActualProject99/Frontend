import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icons from "./icons";
import { useRecoilState } from "recoil";
import { cls } from "../utils";
import { mainContent, mainScrollRef } from "../atoms/mainContent";
import { Modal, useModal } from "./Portal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useWindowKeyboard from "../hooks/window/useWindowKeyboard";
import Portal from "./Portal";
import UserInfo from "./userInfo/UserInfo";
import {
  getCookieToken,
  removeCookieToken,
  removeRefreshCookieToken,
} from "../apis/cookie";
import { pages } from "../routes";
import { motion as m, AnimatePresence } from "framer-motion";
import useIsScrolled from "../hooks/window/useHowMuchScroll";
import UserApi from "../apis/query/UserApi";
import { MainContent, MainScrollRef } from "../types";
import useTicketPop from "../hooks/useTicketPop";
import { ReactComponent as Logo } from "../image/tgleLogo1.svg";
import { useQueryClient } from "@tanstack/react-query";
import ConcertApi from "../apis/query/ConcertApi";
import { IGetArtist, IGetArtistConcert } from "../types";
import { format } from "date-fns";

const Search = ({
  viewer,
}: {
  viewer: { on: () => void; off: () => void };
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { register, handleSubmit, reset, setFocus, setValue } = useForm();
  const [payload, setPayload] = useState("");
  const [isShowRecent, setIsShowRecent] = useState(false);
  const { data: searchedData } = ConcertApi.GetSearchData(payload);
  const [artists, concerts]: [IGetArtist[], IGetArtistConcert[]] = searchedData
    ? searchedData
    : [[], []];
  const [recent, setRecent] = useState<{ date: string; queries: string[] }[]>(
    []
  );
  const recentQeury = (query: string) => {
    const todayQueries = window.localStorage.getItem("search_query");
    const queriesOnDates = (todayQueries: string | null) => {
      if (!todayQueries)
        return {
          [format(new Date(), "yyyy.MM.dd")]: [query],
        };
      if (!JSON.parse(todayQueries)[format(new Date(), "yyyy.MM.dd")])
        return {
          ...JSON.parse(todayQueries),
          [format(new Date(), "yyyy.MM.dd")]: [query],
        };
      if (
        !JSON.parse(todayQueries)[format(new Date(), "yyyy.MM.dd")].includes(
          query
        )
      )
        return {
          ...JSON.parse(todayQueries),
          [format(new Date(), "yyyy.MM.dd")]:
            JSON.parse(todayQueries)[format(new Date(), "yyyy.MM.dd")].concat(
              query
            ),
        };
      return JSON.parse(todayQueries);
    };
    window.localStorage.setItem(
      "search_query",
      JSON.stringify(queriesOnDates(todayQueries))
    );
  };
  const navigate = useNavigate();
  const getLocalQuery = () => {
    const searchQueries = localStorage.getItem("search_query");
    if (searchQueries) {
      const parsedQueries = JSON.parse(searchQueries);
      const dates = Object.keys(parsedQueries);
      const queries = Object.values(parsedQueries) as string[][];

      setRecent(dates.map((date, i) => ({ date, queries: queries[i] })));
    }
  };
  const onValid: SubmitHandler<FieldValues> = async ({ query }) => {
    query = query.trim();
    if (query.length === 0) {
      reset();
      return;
    }
    setPayload(query);
    reset();
    recentQeury(query);
    window.setTimeout(() => getLocalQuery(), 200);
    buttonRef.current?.focus();
  };
  const handleClickRecent = (query: string) => () => {
    setValue("query", query);
    setFocus("query");
    setIsShowRecent(false);
  };
  const handleFocusSearch = () => {
    setIsShowRecent(true);
  };
  const handleBlurSearch = () => {
    window.setTimeout(() => setIsShowRecent(false), 100);
  };
  const handleClickArtist = (artistId: number) => () => {
    navigate("artist/" + artistId);
    viewer.off();
  };
  const handleClickConcert = (concertId: number) => () => {
    navigate(pages.Concert.path + "/" + concertId);
    viewer.off();
  };
  useEffect(() => {
    setFocus("search");
  }, [setFocus]);
  useWindowKeyboard("Escape", viewer.off);

  useEffect(() => {
    getLocalQuery();
  }, []);

  return (
    <Modal onClick={viewer.off}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[320px] w-1/2 h-3/4 rounded-xl bg-white overflow-hidden shadow-lg shadow-black/20"
      >
        <div className="pt-4 px-4 flex justify-between relative">
          <div className="flex items-center w-full relative h-16">
            <label className="flex items-center">
              <icons.Search />
              <input
                type="text"
                spellCheck="false"
                className="w-full selection:bg-primary-200 text-lg font-bold text-primary-700 selection:text-primary-500 border-none focus:ring-0 caret-primary-700"
                autoComplete="off"
                {...register("query")}
                onFocus={handleFocusSearch}
                onBlur={handleBlurSearch}
              />
            </label>
            <div
              className={cls(
                "absolute top-12 left-3 bg-white/50 px-2 pb-2 rounded-lg",
                isShowRecent || "hidden"
              )}
            >
              <div className="text-xs ml-6 ">최근검색어</div>
              <div className="bg-secondary-50 rounded-lg px-4 py-1 flex flex-col gap-1">
                {recent.map((query) => (
                  <div className="flex gap-3 items-center">
                    <div className="text-xs" key={query.date}>
                      {query.date}
                    </div>
                    <div className="flex gap-2">
                      {query.queries.map((q) => (
                        <div
                          className="bg-secondary-200 rounded-full px-1 flex-wrap cursor-pointer"
                          key={q}
                          onClick={handleClickRecent(q)}
                        >
                          {q}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              ref={buttonRef}
              className="w-1 h-1 overflow-hidden focus:ring-0 focus:ring-offset-0 border-none focus:outline-none"
            >
              search
            </button>
          </div>
          <div
            onClick={viewer.off}
            className="absolute -top-2 text-xs -right-2 cursor-pointer w-12 h-8 bg-accent-main font-bold text-white rounded-xl leading-8 pl-3"
          >
            esc
          </div>
        </div>
        <div className="px-3">
          <div className="text-xs bg-primary-800 text-white p-1 px-4 font-bold rounded-lg w-fit mb-1">
            가수
          </div>
          <div
            className={cls(
              "mb-2",
              artists && artists?.length > 0 && "bg-primary-50 p-1 px-1"
            )}
          >
            {artists?.map((artist) => (
              <div className="flex items-center gap-2 p-1">
                <img
                  className="w-12 h-12 rounded-full"
                  src={artist.artistImg}
                  alt=""
                />
                <div
                  key={artist.artistId}
                  className="cursor-pointer"
                  onClick={handleClickArtist(artist.artistId)}
                >
                  {artist.artistName}
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs bg-primary-800 text-white p-1 px-4 font-bold rounded-lg w-fit mb-1">
            공연
          </div>
          <div
            className={cls(
              "",
              concerts && concerts?.length > 0 && "bg-primary-50 p-1 px-1"
            )}
          >
            {concerts?.map((concert) => (
              <div className="flex items-center gap-2 p-1">
                <img
                  className="w-12 h-18 rounded-sm"
                  src={concert.concertImg}
                  alt=""
                />
                <div
                  key={concert.concertId}
                  className="cursor-pointer"
                  onClick={handleClickConcert(concert.concertId)}
                >
                  {concert.concertName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
};
const Nav = ({
  main,
  normal,
  landing,
}: {
  main?: boolean;
  normal?: boolean;
  landing?: boolean;
}) => {
  const { pathname } = useLocation();
  const [contentNo] = useRecoilState<MainContent>(mainContent);
  const cookie = getCookieToken();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [getMainScrollRef] = useRecoilState<MainScrollRef>(mainScrollRef);
  const { data: user } = UserApi.GetUserInfo();
  const { mutateAsync: DeleteUser } = UserApi.DeleteUser();
  const queryClient = useQueryClient();

  const { Ticket, poped, userInput } = useTicketPop(
    "정말 로그아웃 하시겠어요?",
    {
      cacelButton: false,
      userInputs: {
        예: {
          value: () => {
            removeCookieToken();
            removeRefreshCookieToken();
            window.location.replace("/concerts");
          },
          className: "bg-accent-main text-white",
        },
        아니요: null,
      },
      toastOnly: false,
      type: "info",
    }
  );
  const {
    Ticket: DelTicket,
    poped: deletePoped,
    userInput: delInput,
  } = useTicketPop("정말 회원탈퇴를 하시겠어요?🥹", {
    cacelButton: false,
    userInputs: {
      예: {
        value: () => {
          DeleteUser().then(() => {
            queryClient.invalidateQueries(["userInfo"]);
          });
          removeCookieToken();
          window.location.replace("/concerts");
          toggler();
          poped("회원탈퇴가 되었습니다!", { isToastOnly: true });
        },
        className: "bg-accent-main text-white",
      },
      아니요: null,
    },
    toastOnly: false,
    type: "info",
  });
  const { toggler, ModalContent } = useModal(
    "sm",
    <UserInfo deletePoped={deletePoped} />
  );
  const handleClickPage = (path: string) => () => {
    if (pathname !== "user/mypick" && path === "user/mypick" && !cookie)
      return poped("로그인 후 이용해주세요!😉", {
        isToastOnly: true,
        newType: "warn",
      });
    if (pathname !== "/" + path) return navigate(path);
  };
  const handleClickProfile = () => {
    toggler();
  };
  const handleClickLogout = () => {
    poped();
  };

  const handleClickSearchOn = () => {
    setIsSearchVisible(true);
  };
  const handleClickSearchOff = () => {
    setIsSearchVisible(false);
  };
  const handleKeyDownSearch = () => {
    setIsSearchVisible(true);
  };
  useWindowKeyboard("F", handleKeyDownSearch, {
    ctrlKey: true,
    shiftKey: true,
    altKey: false,
  });
  const { getIsScrolled } = useIsScrolled({
    ref: getMainScrollRef,
    value: window.innerHeight * 10 - 100,
  });
  useEffect(() => {
    Object.values(pages).forEach((page) => {
      if (pathname.includes(page.path)) {
        document.title = page.title;
      }
    });
  }, [pathname]);

  return (
    <Portal>
      <Ticket />
      <DelTicket />
      <nav
        id="nav"
        className={cls(
          "fixed left-1/2 -translate-x-1/2 top-0 ",
          pathname === "/" ? "" : "bg-white"
        )}
      >
        {normal ? (
          <div className="flex items-center w-screen h-16 ">
            <div className="min-w-[360px] w-[1200px] mx-auto flex justify-between items-center">
              <div className="flex items-center gap-10">
                <div
                  className="w-[180px] h-10 rounded cursor-pointer mb-2"
                  onClick={() => navigate("/", { state: { isVisited: true } })}
                >
                  <Logo width="11rem" height="3.5rem" />
                </div>
                <ul className="flex gap-4 xl:gap-10 font-bold text-xl self-end">
                  {Object.values(pages).map((page, i) =>
                    page.isNav ? (
                      <li
                        key={i}
                        className={cls(
                          "transition-colors",
                          pathname.includes(page.path) && "text-accent-main"
                        )}
                      >
                        <button onClick={handleClickPage(page.path)}>
                          {page.name}
                        </button>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
              <div className="w-60 h-18 flex items-center justify-between">
                <button
                  onClick={handleClickSearchOn}
                  className="w-10 h-10 hover:w-36 group bg-primary-50 rounded-full transition-all overflow-hidden"
                >
                  <div className="w-28 flex justify-between items-center">
                    <div className="w-10 h-10 flex justify-center items-center">
                      <icons.Search className="text-black" strokeWidth={3} />
                    </div>
                    <div className="text-xs font-semibold text-gray-600">
                      Ctrl Shift F
                    </div>
                  </div>
                </button>
                <div className="relative group w-16 pl-4 h-12 font-bold flex justify-center items-center ">
                  {cookie ? (
                    <>
                      <button
                        className="text-xs flex justify-center items-center absolute group-hover:-translate-x-12 hover:-translate-x-12 transition-all bg-primary-50 w-10 h-10 rounded-full leading-3"
                        onClick={handleClickLogout}
                      >
                        log
                        <br />
                        out
                      </button>
                      <img
                        alt=""
                        src={user?.profileImg}
                        className="cursor-pointer relative w-10 h-10 bg-primary-700 flex justify-center items-center rounded-full"
                        onClick={handleClickProfile}
                      />
                    </>
                  ) : (
                    <Link
                      className="cursor-pointer text-xs flex justify-center items-center absolute text-white bg-primary-700 w-10 h-10 rounded-full leading-3"
                      to="/user/login"
                    >
                      log
                      <br />
                      in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {getIsScrolled ? (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cls(
                  "min-w-[360px] w-screen-scroll-double mx-auto flex justify-between gap-12 items-center",
                  contentNo === 1 ? "text-white" : "text-black"
                )}
              >
                <div className="text-5xl py-2  cursor-pointer">Tgle</div>
                <ul className="flex gap-10 text-lg ">
                  {Object.values(pages).map((page, i) =>
                    page.isNav ? (
                      <li key={i}>
                        <Link to={page.path}>{page.name}</Link>
                      </li>
                    ) : null
                  )}
                </ul>
              </m.div>
            ) : null}
          </AnimatePresence>
        )}
      </nav>
      {isSearchVisible ? (
        <Search
          viewer={{
            on: handleClickSearchOn,
            off: handleClickSearchOff,
          }}
        />
      ) : null}
      <ModalContent />
    </Portal>
  );
};
const Footer = () => {
  return (
    <div className="bg-primary-800 h-96 pt-20 flex">
      <div className="w-[1200px] h-full mx-auto flex justify-center items-start gap-24 ">
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center w-[32rem]">
            <div className="flex items-baseline w-[27rem] h-12 rounded-tl-md pt-1 bg-accent-main gap-2">
              <p className="font-bold text-black text-3xl ml-4"> Tgle</p>
              <p className="text-[#e8e8e8] text-sm font-bold">
                Have Fun Ticketing ♬
              </p>
            </div>
            <div className="flex items-center justify-center text-xs font-bold border-l-2 border-dashed rounded-tr-md w-[6.2rem] h-12 bg-accent-main">
              <p>
                T<span className="text-[#e8e8e8]">icket</span> Jun
                <span className="text-[#e8e8e8]">gle</span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center w-[32rem] h-44 rounded-b-md bg-white gap-9 shadow-xl shadow-black/80">
            <div className="flex gap-8">
              {["frontend", "backend", "designer"].map((position) => (
                <div
                  key={position}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-lg font-bold inline-block mb-1 capitalize">
                    {position}
                  </span>
                  {members.map((member) =>
                    member.position === position ? (
                      <div
                        title={member.github}
                        key={member.name}
                        className="flex gap-3 font-bold cursor-pointer hover:text-accent-main"
                        onClick={() => window.open(member.github)}
                      >
                        <div>{member.name}</div>
                      </div>
                    ) : null
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center w-14 border-l-2 border-dashed">
              <img
                className="h-44 ml-10"
                alt="barcode"
                src="https://res.cloudinary.com/dwlshjafv/image/upload/v1669909776/pngegg_3_p83lrn.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  const { data: concerts } = ConcertApi.GetConcerts();

  return (
    <>
      {pathname === "/" ? (
        <>
          <Nav main landing />
          {children}
        </>
      ) : (
        <div className={cls("min-h-screen")}>
          <Nav normal />
          <div className="min-w-[360px] w-[1200px] mx-auto min-h-screen py-4 mt-24">
            {children}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
export default Layout;
const members = [
  {
    name: "임요한",
    position: "frontend",
    github: "https://github.com/obov",
  },
  {
    name: "김혁진",
    position: "frontend",
    github: "https://github.com/rklskhj",
  },
  {
    name: "이민기",
    position: "frontend",
    github: "https://github.com/Pasilda123",
  },
  {
    name: "예지완",
    position: "backend",
    github: "https://github.com/kmdet1235",
  },
  {
    name: "박민호",
    position: "backend",
    github: "https://github.com/maino96",
  },
  {
    name: "김정환",
    position: "backend",
    github: "https://github.com/jeongpal",
  },
];
