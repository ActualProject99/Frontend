import { useEffect, useState } from "react";
import { Modal } from "../components/Portal";
import { cls } from "../utils";
import icons from "../components/icons";
import ticket from "../image/ticket.png";
import useWindowKeyboard from "./window/useWindowKeyboard";

interface Option {
  userInputs?: {
    [key: string]: any;
  };
  cacelButton: boolean;
  toastOnly: boolean;
  type: "ckeck" | "warn" | "info" | "only msg";
}

const useTicket = (
  message: string | (() => string),
  { userInputs = {}, cacelButton, toastOnly, type }: Option
) => {
  const [userInput, setUserInput] = useState<string | null>(null);
  const buttonTexts = Object.keys(userInputs);
  const buttonValues = Object.values(userInputs);
  if (buttonTexts.length > 4) {
    throw new Error(
      "Number of userInputs(property of Option which is the second param of useTicket) should less than 5!"
    );
  }
  const [isPoped, setIsPoped] = useState(false);

  useEffect(() => {}, []);
  const Poped = () => {
    setIsPoped(true);
  };

  const Icon = () => {
    return (
      <>
        {type === "ckeck" ? (
          <icons.RoundCheck iconClassName="w-12 h-12 text-lime-700" />
        ) : null}
        {type === "warn" ? (
          <icons.Warn iconClassName="w-12 h-12 text-rose-700" />
        ) : null}
        {type === "info" ? (
          <icons.Info iconClassName="w-12 h-12 text-blue-700" />
        ) : null}
      </>
    );
  };
  const Ticket = () => {
    useWindowKeyboard("Escape", () => {
      setIsPoped(false);
    });
    const handleClickModalBack = () => {
      setIsPoped(false);
    };
    const handleAnimationEnd = () => {
      if (toastOnly) {
        setIsPoped(false);
      }
    };
    const handleClickCancel = () => {
      setIsPoped(false);
    };
    const handleClickButton = (i: number) => () => {
      setUserInput(buttonValues[i]);
      setIsPoped(false);
    };
    return isPoped ? (
      <Modal onClick={handleClickModalBack}>
        <div
          onAnimationEnd={handleAnimationEnd}
          className={cls(
            "p-3 px-6 fixed top-1/4 w-[717px] h-[384px] rounded font-bold",
            toastOnly
              ? "animate-toast-right opacity-0"
              : "animate-popup-right opacity-1 right-1/2 translate-x-1/2"
          )}
        >
          <img src={ticket} className="object-cover" alt=""></img>
          <div className="absolute right-[15%] top-16">
            <div className="w-[372px] h-64">
              <div
                className={cls(
                  "text-base font-logo  text-right pb-1 pr-3 text-slate-600"
                )}
              >
                Tgle
              </div>
              <div
                className={cls(
                  "w-full h-[1px] bg-gradient-to-br to-slate-300",
                  type === "ckeck"
                    ? "from-lime-200"
                    : type === "warn"
                    ? "from-rose-200"
                    : type === "info"
                    ? "from-blue-200"
                    : "from-gray-200"
                )}
              />
              <div className="flex flex-col items-center justify-center h-48 gap-2">
                <Icon />
                <span className="font-bold text-xl">
                  {typeof message === "string" ? message : message()}
                </span>
                <div className="flex mt-3 text-sm divide-x-2 ">
                  {!toastOnly
                    ? buttonTexts?.map((text, i) => (
                        <button
                          key={i}
                          className={cls(
                            "h-7  bg-gray-700 text-white first:rounded-l-lg",
                            cacelButton || "last:rounded-r-lg",
                            buttonTexts.length > 3 ? "w-16" : "w-24"
                          )}
                          onClick={handleClickButton(i)}
                        >
                          {text}
                        </button>
                      ))
                    : null}
                  {cacelButton ? (
                    <button
                      className={cls(
                        "h-7 rounded-r-lg bg-gray-300 text-gray-600",
                        (buttonTexts?.length === 0 || toastOnly) &&
                          "rounded-l-lg",
                        buttonTexts.length > 3 ? "w-16" : "w-24"
                      )}
                      onClick={handleClickCancel}
                    >
                      cancel
                    </button>
                  ) : null}
                </div>
              </div>
              <div
                className={cls(
                  "w-full h-[3px] bg-gradient-to-br from-slate-300",
                  type === "ckeck"
                    ? "to-lime-200"
                    : type === "warn"
                    ? "to-rose-200"
                    : type === "info"
                    ? "to-blue-200"
                    : "to-gray-200"
                )}
              ></div>
            </div>
          </div>
        </div>
      </Modal>
    ) : null;
  };
  return { Ticket, Poped, userInput };
};
export default useTicket;
