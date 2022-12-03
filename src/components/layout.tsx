import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icons from "./icons";
import { useRecoilState } from "recoil";
import { cls } from "../utils";
import { mainContent, mainScrollRef } from "../atoms/mainContent";
import { Modal, useModal } from "./Portal";
import { useForm } from "react-hook-form";
import useWindowKeyboard from "../hooks/window/useWindowKeyboard";
import Portal from "./Portal";
import UserInfo from "./userInfo/UserInfo";
import { getCookieToken, removeCookieToken } from "../apis/cookie";
import useToast from "../hooks/useToast";
import { pages } from "../routes";
import { motion as m, AnimatePresence } from "framer-motion";
import useIsScrolled from "../hooks/window/useHowMuchScroll";
import UserApi from "../apis/query/UserApi";
import { MainContent, MainScrollRef } from "../types";
import useTicketPop from "../hooks/useTicketPop";

const Search = ({
  viewer,
}: {
  viewer: { on: () => void; off: () => void };
}) => {
  const { register, handleSubmit, reset, setFocus } = useForm();
  const onValid = () => {
    reset();
  };
  useEffect(() => {
    setFocus("search");
  }, [setFocus]);
  useWindowKeyboard("Escape", viewer.off);
  return (
    <Modal onClick={viewer.off}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[320px] w-1/2 h-3/4 rounded-xl bg-white overflow-hidden shadow-lg shadow-black/20"
      >
        <div className="pt-4 px-4 flex justify-between relative">
          <div className="flex items-center w-full">
            <icons.Search />
            <input
              type="text"
              spellCheck="false"
              className="w-full selection:bg-primary-200 text-lg font-bold text-primary-700 selection:text-primary-500 border-none focus:ring-0 caret-primary-700"
              autoComplete="off"
              {...register("search")}
            />
            <button className="w-1 h-1 overflow-hidden">search</button>
          </div>
          <div
            onClick={viewer.off}
            className="absolute -top-2 -right-2 cursor-pointer w-12 h-8 bg-accent-main font-bold text-white rounded-xl leading-8 pl-2"
          >
            esc
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
  const { toggler, ModalContent } = useModal("sm", <UserInfo />);
  const { pathname } = useLocation();
  const [contentNo] = useRecoilState<MainContent>(mainContent);
  const { Toasts, toasted } = useToast("로그인이후 이용해주세요");
  const cookie = getCookieToken();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [getMainScrollRef] = useRecoilState<MainScrollRef>(mainScrollRef);
  const { data: user } = UserApi.GetUserInfo();
  const handleClickPage = (path: string) => () => {
    if (pathname !== "user/mypick" && path === "user/mypick" && !cookie)
      return toasted();
    if (!pathname.includes(path)) return navigate(path);
  };
  const handleClickProfile = () => {
    toggler();
  };
  const handleClickLogout = () => {
    window.alert("로그아웃 되었습니다.");
    removeCookieToken();
    navigate("/");
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
      <Toasts />
      <nav
        id="nav"
        className={cls(
          "fixed left-1/2 -translate-x-1/2 top-0 w-screen-scroll-double py-2 font-base",
          pathname === "/" ? "" : "bg-white"
        )}
      >
        {normal ? (
          <div className="flex items-center">
            <div className="min-w-[360px] w-[95%] xl:w-[1200px] mx-auto flex justify-between items-center">
              <div className="flex items-center gap-10">
                <div
                  className="w-[140px] h-10 rounded relative cursor-pointer bottom-4"
                  onClick={() => navigate("/")}
                >
                  <img
                    className="absolute"
                    alt="logo"
                    src="https://res.cloudinary.com/dwlshjafv/image/upload/v1669947023/%ED%8B%B0%EC%BC%93_euyskm.png"
                  />
                  <div className="flex justify-center items-center w-28 h-12 font-logo text-4xl absolute left-3.5 top-3.5 border-2 border-dashed pb-1">
                    Tgle
                  </div>
                </div>
                <ul className="flex gap-4 xl:gap-10 font-logo self-end">
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
              <div className="w-60 h-18 flex items-center justify-between pr-12">
                <div
                  onClick={handleClickSearchOn}
                  className="w-10 h-10 hover:w-36 group bg-primary-50 rounded-full cursor-pointer transition-all overflow-hidden"
                >
                  <div className="w-28 flex justify-between items-center">
                    <div className="w-10 h-10 flex justify-center items-center">
                      <icons.Search className="text-black" strokeWidth={3} />
                    </div>
                    <div className="text-xs font-semibold text-gray-600">
                      Ctrl Shift F
                    </div>
                  </div>
                </div>
                <div className="relative group w-12 pr-2 h-12 font-bold flex justify-center items-center ">
                  {cookie ? (
                    <>
                      <div
                        className="cursor-pointer text-xs flex justify-center items-center absolute group-hover:translate-x-12 hover:translate-x-12 transition-all bg-gray-300 w-10 h-10 rounded-full leading-3"
                        onClick={handleClickLogout}
                      >
                        log
                        <br />
                        out
                      </div>
                      <img
                        alt="profile"
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
                  "min-w-[360px] w-[95%] xl:w-[1200px] mx-auto flex justify-between gap-12 items-center",
                  contentNo === 1 ? "text-white" : "text-black"
                )}
              >
                <div className="text-5xl py-2 font-logo cursor-pointer">
                  Tgle
                </div>
                <ul className="flex gap-10 text-lg font-logo">
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
              <p className="font-logo text-black text-3xl ml-4"> Tgle</p>
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
                  <span className="text-lg font-logo inline-block mb-1 capitalize">
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
  { name: "이주연", position: "designer", github: "" },
];
