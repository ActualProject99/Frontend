import { RefObject } from "react";
import { atom } from "recoil";

const initContent = 0;
export const mainContent = atom<number>({
  key: "mainContent",
  default: initContent,
});
const initRef = undefined;
export const mainScrollRef = atom<RefObject<HTMLElement> | undefined>({
  key: "mainScrollRef",
  default: initRef,
});
