import { useEffect } from "react";

const useInert = () => {
  useEffect(() => {
    const root = document.querySelector("#root");
    const nav = document.querySelector("#nav");
    root?.setAttribute("inert", "");
    nav?.setAttribute("inert", "");
    return () => {
      root?.removeAttribute("inert");
      nav?.removeAttribute("inert");
    };
  }, []);
}; //
export default useInert;
