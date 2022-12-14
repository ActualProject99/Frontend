import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pages } from "../routes";
import { mainScrollRef } from "../atoms/mainContent";

export default function ScrollToTop() {
  const location = useLocation();
  const [getMainScrollRef] = useRecoilState(mainScrollRef);
  const { innerHeight: screenHeight } = window;

  useEffect(() => {
    if (pages.Home.path === location.pathname) {
      if (getMainScrollRef && location.state && location.state.isVisited) {
        getMainScrollRef.scrollTo(0, screenHeight * 10);
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, getMainScrollRef]);

  return null;
}
