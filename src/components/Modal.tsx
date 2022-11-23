import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import { scrollable } from "../atoms/scrollable";
import Portal from "./Portal";

const Modal = ({
  children,
  ...rest
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const [getScrollable, setScrollable] = useRecoilState<boolean>(scrollable);
  useEffect(() => {
    setScrollable(false);
    return () => {
      setScrollable(true);
    };
  }, []);
  return (
    <Portal>
      <div
        {...rest}
        className="fixed w-screen h-screen bg-white/60 backdrop-blur-sm top-0 left-0"
      />
      {children}
    </Portal>
  );
};

export default Modal;
