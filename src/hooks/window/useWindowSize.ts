import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMd: window.innerWidth > 765,
  });
  useEffect(() => {
    const sizeSetter = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMd: window.innerWidth > 765,
      });
    };
    window.addEventListener("resize", sizeSetter);
    return () => {
      window.removeEventListener("resize", sizeSetter);
    };
  }, []);
  return size;
};
export default useWindowSize;
