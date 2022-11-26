import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
      path: "mock-ticketing",
      title: "Play Ticketing | Tgle",
      isNav: true,
    },
    {
      name: "My Picks!",
      path: "user/mypage",
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

  const handleClickProfile = () => {
    toggler();
  };

  const handleClickLogout = () => {
    setUser(initUser);
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
      <nav
        className={cls(
          "fixed left-1/2 -translate-x-1/2 top-0 w-screen py-2",
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
                        <Link to={page.path}>{page.name}</Link>
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
                    <div className="text-xs font-semibold text-black">
                      Ctrl Shift f
                    </div>
                  </div>
                </div>

                {isSearchVisible ? (
                  <Search
                    viewer={{
                      on: handleClickSearchOn,
                      off: handleClickSearchOff,
                    }}
                  />
                ) : null}
                <div className="relative group w-12 pr-2 h-12 font-bold flex justify-center items-center ">
                  {isLoggedin ? (
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
                        src={userDefault}
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
      <ModalContent />
    </Portal>
  );
};
const Footer = () => {
  return (
    <div className="bg-slate-200 h-96 flex items-center">
      <div className="bg-slate-400 w-[1200px] mx-auto ">footer</div>
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
          <div className="min-w-[360px] w-[1200px] mx-auto min-h-screen border py-4 mt-24">
            {children}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
export default Layout;
