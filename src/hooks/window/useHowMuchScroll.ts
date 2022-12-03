import { useState, useEffect } from "react";

const useIsScrolled = ({
  ref,
  value,
}: {
  ref: HTMLElement | null;
  value: number;
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  useEffect(() => {
    if (ref) {
      const logging = () => {
        setIsScrolled(ref?.scrollTop > value);
      };
      ref?.addEventListener("scroll", logging);
      return () => {
        ref?.removeEventListener("scroll", logging);
      };
    }
  }, [ref]);
  return { isScrolled };
};
export default useIsScrolled;
