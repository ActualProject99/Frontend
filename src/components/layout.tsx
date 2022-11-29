import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { initUser, User, userState } from "../atoms/user";
import icons from "./icons";
import { useRecoilState } from "recoil";
import { cls } from "../utils";
import { mainContent } from "../atoms/mainContent";
import { scrollable } from "../atoms/scrollable";
import { Modal, useModal } from "./Portal";
import { useForm } from "react-hook-form";
import useWindowKeyboard from "../hooks/window/useWindowKeyboard";
import Portal from "./Portal";
import userDefault from "../image/userDefault.png";
import UserInfo from "./userInfo/UserInfo";
import { getCookieToken, removeCookieToken } from "../apis/cookie";
import useToast from "../hooks/useToast";

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

  const pages = [
    { name: "홈", path: "/", title: "Home | Tgle", isNav: false },
    { name: "Concert", path: "concerts", title: "Concert | Tgle", isNav: true },
    {
      name: "Game",
      path: "game",
      title: "Play Ticketing | Tgle",
      isNav: true,
    },
    {
      name: "My Picks!",
      path: "user/mypick",
      title: "my Picks | Tgle",
      isNav: true,
    },
    { name: "login", path: "user/login", title: "log in | Tgle", isNav: false },
    {
      name: "signup",
      path: "user/signup",
      title: "sign up | Tgle",
      isNav: false,
    },
  ];
  const { pathname } = useLocation();
  const [{ isLoggedin }, setUser] = useRecoilState<User>(userState);
  const [contentNo] = useRecoilState<number>(mainContent);
  const { Toasts, toasted } = useToast("로그인이후 이용해주세요");
  const cookie = getCookieToken();
  const navigate = useNavigate();

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
    // setUser(initUser);
  };
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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
  useEffect(() => {
    pages.forEach((page) => {
      if (pathname.includes(page.path)) {
        document.title = page.title;
      }
    });
  }, [pathname]);

  return (
    <Portal>
      <Toasts />
      <nav
        className={cls(
          "fixed left-1/2 -translate-x-1/2 top-0 w-screen py-2 font-base",
          pathname === "/" ? "" : "bg-white"
        )}
      >
        {normal ? (
          <div className="flex items-center">
            <div className="min-w-[360px] w-[95%] xl:w-[1200px] mx-auto flex justify-between items-center">
              <div className="flex items-center gap-10">
                <div className="w-[140px] h-10 rounded">
                  <Link
                    className="w-full h-full block font-logo text-4xl"
                    to=""
                  >
                    Tgle
                  </Link>
                </div>
                <ul className="flex gap-4 xl:gap-10 font-logo self-end">
                  {pages.map((page, i) =>
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
              <div className="w-60 h-18 flex items-center justify-between gap-3">
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
                        src="https://res.cloudinary.com/dwlshjafv/image/upload/v1668536436/AKR20210520093900005_04_i_P4_hwz8en.jpg"
                        className="cursor-pointer relative w-10 h-10 bg-primary-700 flex justify-center items-center rounded-full"
                        onClick={handleClickProfile}
                      ></img>
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
          <div
            className={cls(
              "min-w-[360px] w-[95%] xl:w-[1200px] mx-auto flex justify-between gap-12 items-center",
              contentNo === 1 ? "text-white" : "text-black"
            )}
          >
            <div className="text-5xl py-2 font-logo cursor-pointer">Tgle</div>
            <ul className="flex gap-10 text-lg font-logo">
              {pages.map((page, i) =>
                page.isNav ? (
                  <li key={i}>
                    <Link to={page.path}>{page.name}</Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
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
  return (
    <div className="bg-primary-800 h-96 pt-28 flex">
      <div className="w-[1200px] h-full mx-auto flex justify-center items-start gap-24 text-white">
        <div className="flex flex-col items-center">
          <div className="font-logo text-7xl"> Tgle</div>
          <div className="mt-4">티켓팅을 즐겁게</div>
        </div>
        <div className="flex gap-16">
          {["frontend", "backend", "designer"].map((position) => (
            <div key={position} className="flex flex-col items-center">
              <span className="text-xl inline-block mb-3 capitalize">
                {position}
              </span>
              {members.map((member) =>
                member.position === position ? (
                  <div key={member.name} className="flex gap-3">
                    <div>{member.name}</div>
                  </div>
                ) : null
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const [getScrollable] = useRecoilState<boolean>(scrollable);
  return (
    <>
      {pathname === "/" ? (
        <>
          <Nav main landing />
          {children}
        </>
      ) : (
        <div
          className={cls("min-h-screen", getScrollable || "overflow-hidden")}
        >
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
