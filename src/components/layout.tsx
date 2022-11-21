import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { initUser, User, userState } from "../atoms/user";
import icons from "./icons";
import { useRecoilState } from "recoil";
import { cls } from "../utils";
import { mainContent } from "../atoms/mainContent";

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
  const [{ isLoggedin }, setUser] = useRecoilState<User>(userState);
  const [contentNo, setContentNo] = useRecoilState<number>(mainContent);
  const handleClick = () => {
    setUser(initUser);
  };

  return no1 ? (
    <nav
      className={cls(
        "h-24 flex items-center",
        main && "fixed left-1/2 -translate-x-1/2"
      )}
    >
      <div className="min-w-[360px] w-[95%] xl:w-[1200px] mx-auto flex justify-between items-center">
        <div className="h-18 flex items-center gap-10 xl:gap-24">
          <div className="w-[140px] h-10 bg-primary-main rounded">
            <Link className="w-full h-full block" to=""></Link>
          </div>
          <ul className="flex gap-4 xl:gap-10">
            {pages.map((page, i) => (
              <li key={i}>
                <Link to={page.path}>{page.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-32 h-18 flex items-center justify-between">
          <icons.Search />
          <div className="w-[140px] h-10 bg-secondary-main flex justify-center items-center rounded-2xl">
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
    </nav>
  ) : (
    <nav className="fixed left-1/2 -translate-x-1/2 z-10 w-full">
      <div
        className={cls(
          "min-w-[360px] w-[95%] xl:w-[1200px] mx-auto flex justify-between gap-12 items-center",
          contentNo === 1 ? "text-white" : "text-black"
        )}
      >
        <div className="text-4xl font-extrabold py-2">Tgle</div>
        <ul className="flex gap-5 xl:gap-10 text-sm xl:text-base">
          {pages.map((page, i) => (
            <li key={i}>
              <Link to={page.path}>{page.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
const Footer = () => {
  return (
    <div className="bg-slate-200 h-96 flex items-center">
      <div className="bg-slate-400 xl:w-[1200px] mx-auto ">footer</div>
    </div>
  );
};
const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/" ? (
        <>
          <Nav main no2 />
          {children}
        </>
      ) : (
        <>
          <Nav no1 />
          <div className="min-w-[360px] w-[95%] xl:w-[1200px] mx-auto min-h-screen border py-4">
            {children}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
