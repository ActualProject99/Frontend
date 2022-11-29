import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import icons from "../components/icons";
import Portal from "../components/Portal";
import { cls } from "../utils";

const useToast = (message: string) => {
  const [isToasted, setIsToasted] = useState<boolean>(false);
  const toasted = () => {
    setIsToasted(true);
  };
  const { pathname } = useLocation();
  useEffect(() => {
    if (isToasted) {
      setIsToasted(false);
    }
  }, [pathname]);
  const Toasts = () => {
    const handleAnimationEnd = () => {
      setIsToasted(false);
    };
    return (
      <Portal>
        <div className="fixed right-0 top-1/2">
          {isToasted ? (
            <div
              onAnimationEnd={handleAnimationEnd}
              className={cls(
                "p-3 px-6 fixed opacity-0 min-w-[320px] animate-toast-right rounded bg-white font-bold shadow-xl text-3xl"
              )}
            >
              <div className="font-logo text-sm flex justify-end mb-1 ">
                tgle
              </div>
              <div className="flex items-center gap-4">
                <icons.RoundCheck iconClassName="w-9 h-9" />
                {message}
              </div>
            </div>
          ) : null}
        </div>
      </Portal>
    );
  };
  return { Toasts, toasted };
};

export default useToast;
