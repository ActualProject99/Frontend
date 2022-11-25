import { memo, ReactNode, useCallback, useState } from "react";
import { cls } from "../utils";
import { AnimatePresence, motion } from "framer-motion";

const useDrawer = ({
  component,
  side,
}: {
  component: ReactNode;
  side: "up" | "left" | "right" | "down";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handle = () => {
    setIsOpen((cur) => !cur);
  };
  const Content = ({ className }: { className?: string }) => {
    return (
      <div
        className={cls(
          className,
          "fixed transition-all",
          isOpen ? side === "up" && "top-10" : "top-0"
        )}
      >
        {component}
      </div>
    );
  };

  return { handle, Content };
};
export default useDrawer;
