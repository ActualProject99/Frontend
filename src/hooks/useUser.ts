import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookieToken } from "../apis/cookie";
import { useJwt } from "react-jwt";
import { loginOnlyPaths, pages } from "../routes";

const useUser = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accessToken = getCookieToken();
  const { decodedToken: decodedAccessToken, isExpired } = useJwt(accessToken);
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    if (!accessToken && loginOnlyPaths.includes(pathname.slice(1))) {
      navigate(pages.login.path, { replace: true });
    } else {
      console.log("decodedAccessToken : ", decodedAccessToken);
    }
  }, [pathname]);
  useEffect(() => {
    if (!accessToken) {
      setIsLoggedin(false);
    } else {
      setIsLoggedin(true);
    }
  }, [accessToken]);
  return { isLoggedin };
};
export default useUser;
