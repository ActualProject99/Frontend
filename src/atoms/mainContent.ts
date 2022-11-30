import { RefObject } from "react";
import { atom } from "recoil";

const initContent = null;
export type MainContent = number | null;
export const mainContent = atom<MainContent>({
  key: "mainContent",
  default: initContent,
});
const initRef = undefined;
export const mainScrollRef = atom<RefObject<HTMLElement> | undefined>({
  key: "mainScrollRef",
  default: initRef,
});
