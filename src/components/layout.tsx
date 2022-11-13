import { ReactNode } from "react";
import { Link } from "react-router-dom";
import icons from "./icons";
const Nav = () => {
  const pages = [
    { name: "홈", path: "" },
    { name: "콘서트", path: "concerts" },
    { name: "장소", path: "" },
    { name: "티켓팅 연습", path: "mock-ticketing" },
    { name: "마이페이지", path: "user/mypage" },
  ];
  return (
    <nav className="h-40 flex items-center">
      <div className="w-[1200px] mx-auto flex justify-between items-center">
        <div className="h-32 flex items-center gap-24">
          <div className="w-[140px] h-10 bg-secondary rounded">
            <Link className="w-full h-full block" to=""></Link>
          </div>
          <ul className="flex gap-10">
            {pages.map((page, i) => (
              <li key={i}>
                <Link to={page.path}>{page.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-32 h-32 flex items-center justify-between">
          <icons.Search />
          <div className="w-[140px] h-10 bg-secondary flex justify-center items-center rounded-2xl">
            <Link
              className="w-full h-full flex justify-center items-center"
              to="/user/login"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
const Footer = () => {
  return (
    <div className="bg-slate-200 h-40 flex items-center">
      <div className="bg-slate-400 w-[1200px] mx-auto ">footer</div>
    </div>
  );
};
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav />
      <div className="w-[1200px] mx-auto h-screen border">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
