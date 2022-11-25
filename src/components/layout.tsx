import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { initUser, User, userState } from "../atoms/user";
import icons from "./icons";
import { useRecoilState } from "recoil";
import { cls } from "../utils";
import { mainContent } from "../atoms/mainContent";
import { scrollable } from "../atoms/scrollable";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import useWindowKeyboard from "../hooks/window/useWindowKeyboard";
import Portal from "./Portal";

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
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[320px] w-1/2 h-3/4 rounded-xl border-4 border-primary-700 bg-white"
      >
        <div className="pt-4 px-4 flex justify-between">
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
            className="cursor-pointer w-12 h-8 bg-primary-700 font-bold text-white rounded-xl leading-7 text-center"
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
  no1,
  no2,
}: {
  main?: boolean;
  no1?: boolean;
  no2?: boolean;
}) => {
  const pages = [
    { name: "콘서트", path: "concerts" },
    { name: "티켓팅 연습", path: "mock-ticketing" },
    { name: "마이페이지", path: "user/mypage" },
  ];
  const { pathname } = useLocation();
  const [{ isLoggedin }, setUser] = useRecoilState<User>(userState);
  const [contentNo] = useRecoilState<number>(mainContent);
  const handleClick = () => {
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

  return (
    <Portal>
      <nav
        className={cls(
          "fixed left-1/2 -translate-x-1/2 top-0 w-screen py-2",
          pathname === "/" ? "" : "bg-white"
        )}
      >
        {no1 ? (
          <div className="flex items-center">
            <div className="min-w-[360px] w-[95%] xl:w-[1200px] mx-auto flex justify-between items-center">
              <div className="flex items-center gap-10 xl:gap-24">
                <div className="w-[140px] h-10 rounded">
                  <Link
                    className="w-full h-full block font-logo text-4xl"
                    to=""
                  >
                    Tgle
                  </Link>
                </div>
                <ul className="flex gap-4 xl:gap-10">
                  {pages.map((page, i) => (
                    <li key={i}>
                      <Link to={page.path}>{page.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-72 h-18 flex items-center justify-center gap-3 md:justify-between">
                <div
                  onClick={handleClickSearchOn}
                  className="w-14 md:w-36 h-10 border-4 border-primary-700 flex justify-center md:justify-between items-center p-2 px-4 rounded-full md:rounded-2xl cursor-pointer"
                >
                  <icons.Search strokeWidth={3} />
                  <div className="hidden md:block text-sm font-semibold">
                    Ctrl Shift f
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
                <div className="w-28 md:w-[140px] h-10 bg-primary-700 text-white font-bold flex justify-center items-center rounded-2xl">
                  {isLoggedin ? (
                    <div
                      className="w-full h-full flex justify-center items-center"
                      onClick={handleClick}
                    >
                      로그아웃
                    </div>
                  ) : (
                    <Link
                      className="w-full h-full flex justify-center items-center cursor-pointer"
                      to="/user/login"
                    >
                      로그인
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
            <div className="text-4xl py-2 font-logo cursor-pointer">Tgle</div>
            <ul className="flex gap-5 xl:gap-10 text-sm xl:text-base">
              {pages.map((page, i) => (
                <li key={i}>
                  <Link to={page.path}>{page.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
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
          <Nav main no2 />
          {children}
        </>
      ) : (
        <div className={cls("h-screen", getScrollable || "overflow-hidden")}>
          <Nav no1 />
          <div className="min-w-[360px] w-[95%] xl:w-[1200px] mx-auto min-h-screen border py-4 mt-24">
            {children}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
export default Layout;
