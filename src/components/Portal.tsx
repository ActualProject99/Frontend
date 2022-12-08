import ReactDOM from "react-dom";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import usePreventScroll from "../hooks/window/usePreventScroll";
import useWindowKeyboard from "../hooks/window/useWindowKeyboard";
import { cls } from "../utils";
import useInert from "../hooks/useInert";

const Portal = ({ children }: { children: ReactNode }) => {
  const modalElement = document.querySelector("#portal");
  return ReactDOM.createPortal(children, modalElement as Element);
};

export const Modal = ({
  onClick,
  children,
  ...rest
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
  [key: string]: any;
}) => {
  usePreventScroll();
  useInert();
  return (
    <Portal>
      <div
        id="modal"
        onClick={onClick}
        {...rest}
        className="fixed w-screen h-screen backdrop-blur-sm backdrop-brightness-90 top-0 left-0"
      />
      {children}
    </Portal>
  );
};

export const useModal = (size: "md" | "sm", content: ReactNode) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggler = () => {
    setIsOpened((cur) => !cur);
  };
  const ModalContent = () => {
    const ConTent = () => {
      useWindowKeyboard("Escape", toggler);
      return (
        <Modal onClick={toggler}>
          <div
            className={cls(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[320px] rounded-xl bg-white overflow-hidden shadow-lg shadow-black/20",
              size === "md" && "w-1/2 h-3/4",
              size === "sm" && "w-1/4 h-1/2"
            )}
          >
            <div
              onClick={toggler}
              className="absolute -top-2 -right-2 cursor-pointer w-12 h-8 bg-accent-main font-bold text-white rounded-xl leading-8 pl-2"
            >
              esc
            </div>
            {content}
          </div>
        </Modal>
      );
    };

    return isOpened ? <ConTent /> : null;
  };
  return {
    isOpened,
    toggler,
    ModalContent,
  };
};
export default Portal;
