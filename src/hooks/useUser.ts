import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookieToken } from "../apis/cookie";

const useUser = () => {
  const navigate = useNavigate();
  const cookie = getCookieToken();
  useEffect(() => {
    if (!cookie) {
      navigate("user/login", { replace: true, });
    }
  }, []);
  return {};
};
export default useUser;
