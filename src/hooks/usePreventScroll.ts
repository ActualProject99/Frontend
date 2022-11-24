import { useEffect } from "react";

const usePreventScroll = () => {
  useEffect(() => {
    document.querySelector("body")?.setAttribute("style", "overflow: hidden;");
    return () => {
      document.querySelector("body")?.setAttribute("style", "");
    };
  });
};
export default usePreventScroll;
