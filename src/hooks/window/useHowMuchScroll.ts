import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isScrolled } from "../../atoms/isScrolled";
import { IsScrolled } from "../../types";

const useIsScrolled = ({
  ref,
  value,
}: {
  ref: HTMLElement | null;
  value: number;
}) => {
  const [getIsScrolled, setIsScrolled] = useRecoilState<IsScrolled>(isScrolled);
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
  return { getIsScrolled };
};
export default useIsScrolled;
