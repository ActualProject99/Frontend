import ReactDOM from "react-dom";
import { MouseEventHandler, ReactNode, useState } from "react";
import usePreventScroll from "../hooks/window/usePreventScroll";
import useWindowKeyboard from "../hooks/window/useWindowKeyboard";

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

export const useModal = (content: ReactNode) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggler = () => {
    setIsOpened((cur) => !cur);
  };
  const ModalContent = () => {
    useWindowKeyboard("Escape", toggler);
    return isOpened ? (
      <Modal onClick={toggler}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[320px] w-1/2 h-3/4 rounded-xl bg-white overflow-hidden shadow-lg shadow-black/20">
          <div
            onClick={toggler}
            className="absolute -top-2 -right-2 cursor-pointer w-12 h-8 bg-accent-main font-bold text-white rounded-xl leading-8 pl-2"
          >
            esc
          </div>
          {content}
        </div>
      </Modal>
    ) : null;
  };
  return {
    isOpened,
    toggler,
    ModalContent,
  };
};
export default Portal;
