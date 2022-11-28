import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { cls } from "../utils";

interface Toast {
  id: number;
  text: string;
}

const useToast = (messages: string[], classes: string) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toasted = (i: number) => {
    setToasts((cur) => [...cur, { id: Date.now(), text: messages[i] }]);
    setTimeout(() => {
      setToasts((cur) => cur.slice(1));
    }, 2000);
  };
  const Toasts = useCallback(() => {
    return (
      <div className="fixed right-0 bottom-48">
        <AnimatePresence>
          {toasts?.map((toast) => (
            <motion.div
              initial={{ x: 700 }}
              animate={{ x: 0 }}
              exit={{ x: 700 }}
              key={toast.id}
              className={cls("w-72 h-12", classes)}
            >
              {toast.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }, []);
  return { Toasts, toasted };
};

export default useToast;
