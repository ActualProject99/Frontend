import { MouseEventHandler, ReactNode } from "react";
import usePreventScroll from "../hooks/usePreventScroll";
import Portal from "./Portal";

const Modal = ({
  onClick,
  children,
  ...rest
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
  [key: string]: any;
}) => {
  usePreventScroll();
  return (
    <Portal>
      <div
        onClick={onClick}
        {...rest}
        className="fixed w-screen h-screen bg-white/60 backdrop-blur-sm top-0 left-0"
      />
      {children}
    </Portal>
  );
};

export default Modal;
