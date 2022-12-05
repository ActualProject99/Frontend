import { useEffect, useState } from "react";
import { Modal } from "../components/Portal";
import { cls, filterClassStartwith } from "../utils";
import icons from "../components/icons";
import ticket from "../image/ticket.png";
import useWindowKeyboard from "./window/useWindowKeyboard";
import z from "zod";
import { AfterToasted, IconType, PopupOptions, UserValue } from "../types";

const useTicket = (
  message: string | (() => string),
  { userInputs = {}, cacelButton, toastOnly, type }: PopupOptions
) => {
  const [userInput, setUserInput] = useState<UserValue>(null);
  const [msg, setMsg] = useState(message);
  const [tp, setTp] = useState(type);
  const [getAfterToasted, setAfterToasted] = useState<AfterToasted | null>(
    null
  );
  const [getToastOnly, setToastOnly] = useState<boolean>(toastOnly);
  const buttonTexts = Object.keys(userInputs);
  const buttonValues = Object.values(userInputs);
  if (buttonTexts.length > 4) {
    throw new Error(
      "Number of userInputs(property of Option which is the second param of useTicket) should less than 5!"
    );
  }
  const [isPoped, setIsPoped] = useState(false);

  const poped = (
    newMessage: string | null = null,
    {
      newType,
      afterToasted,
      isToastOnly,
    }: {
      newType?: IconType;
      afterToasted?: AfterToasted;
      isToastOnly?: boolean;
    } = {
      newType: undefined,
      afterToasted: undefined,
      isToastOnly: undefined,
    }
  ) => {
    if (newMessage) {
      setMsg(newMessage);
    } else {
      setMsg(message);
    }
    if (newType) {
      setTp(newType);
    } else {
      setTp(type);
    }
    if (afterToasted) {
      setAfterToasted(() => afterToasted);
    } else {
      setAfterToasted(null);
    }
    if (typeof isToastOnly === "undefined") {
      setToastOnly(toastOnly);
    } else {
      setToastOnly(isToastOnly);
    }
    setIsPoped(true);
  };
  useEffect(() => {}, [isPoped]);

  useEffect(() => {
    if (typeof userInput === "function") {
      userInput();
    }
  }, [userInput]);

  const Icon = () => {
    return (
      <>
        {tp === "ckeck" ? (
          <icons.RoundCheck iconClassName="w-12 h-12 text-lime-700" />
        ) : null}
        {tp === "warn" ? (
          <icons.Warn iconClassName="w-12 h-12 text-rose-700" />
        ) : null}
        {tp === "info" ? (
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
      if (getToastOnly) {
        setIsPoped(false);
        if (getAfterToasted) {
          getAfterToasted();
        }
      }
    };
    const handleClickCancel = () => {
      setIsPoped(false);
    };

    const userInputSchema = z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.null(),
      z.function(),
    ]);
    const userInputObjectSchema = z.object({
      value: userInputSchema,
      className: z.string(),
    });
    const handleClickButton = (i: number) => () => {
      if (userInputSchema.safeParse(buttonValues[i]).success) {
        setUserInput(buttonValues[i] as z.infer<typeof userInputSchema>);
      } else if (userInputObjectSchema.safeParse(buttonValues[i]).success) {
        //@ts-ignore
        setUserInput(buttonValues[i].value);
      }
      setIsPoped(false);
    };
    return isPoped ? (
      <Modal onClick={handleClickModalBack}>
        <div
          onAnimationEnd={handleAnimationEnd}
          className={cls(
            "p-3 px-6 fixed top-1/4 z-10 w-[717px] h-[384px] rounded font-bold",
            getToastOnly
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
                  tp === "ckeck"
                    ? "from-lime-200"
                    : tp === "warn"
                    ? "from-rose-200"
                    : tp === "info"
                    ? "from-blue-200"
                    : "from-gray-200"
                )}
              />
              <div className="flex flex-col items-center justify-center h-48 gap-2">
                <Icon />
                <span className="font-bold text-xl whitespace-pre">{msg}</span>
                <div className="flex mt-3 text-sm divide-x-2 ">
                  {!getToastOnly
                    ? buttonTexts?.map((text, i) => {
                        return (
                          <button
                            key={i}
                            className={cls(
                              "h-7 first:rounded-l-lg",
                              typeof cacelButton === "boolean"
                                ? cacelButton || "last:rounded-r-lg"
                                : cacelButton.value || "last:rounded-r-lg",
                              buttonTexts.length > 3 ? "w-16" : "w-24",
                              userInputSchema.safeParse(buttonValues[i]).success
                                ? "bg-gray-700 text-white"
                                : filterClassStartwith(
                                    //@ts-ignore
                                    buttonValues[i].className,
                                    "bg",
                                    "text"
                                  )
                            )}
                            onClick={handleClickButton(i)}
                          >
                            {text}
                          </button>
                        );
                      })
                    : null}
                  {typeof cacelButton === "boolean" ? (
                    cacelButton ? (
                      <button
                        className={cls(
                          "h-7 rounded-r-lg bg-gray-300 text-gray-600",
                          (buttonTexts?.length === 0 || getToastOnly) &&
                            "rounded-l-lg",
                          buttonTexts.length > 3 ? "w-16" : "w-24"
                        )}
                        onClick={handleClickCancel}
                      >
                        cancel
                      </button>
                    ) : null
                  ) : cacelButton.value ? (
                    <button
                      className={cls(
                        "h-7 rounded-r-lg",
                        (buttonTexts?.length === 0 || getToastOnly) &&
                          "rounded-l-lg",
                        buttonTexts.length > 3 ? "w-16" : "w-24",
                        filterClassStartwith(
                          cacelButton.className,
                          "bg",
                          "text"
                        )
                      )}
                      onClick={handleClickCancel}
                    >
                      {cacelButton.buttonText}
                    </button>
                  ) : null}
                </div>
              </div>
              <div
                className={cls(
                  "w-full h-[3px] bg-gradient-to-br from-slate-300",
                  tp === "ckeck"
                    ? "to-lime-200"
                    : tp === "warn"
                    ? "to-rose-200"
                    : tp === "info"
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
  return { Ticket, poped, userInput };
};
export default useTicket;
