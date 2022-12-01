import { RefObject } from "react";
import { atom } from "recoil";

const initContent = null;
export type MainContent = number | null;
export const mainContent = atom<MainContent>({
  key: "mainContent",
  default: initContent,
});
const initRef = null;
export type MainScrollRef = HTMLElement | null;
export const mainScrollRef = atom<MainScrollRef>({
  key: "mainScrollRef",
  default: initRef,
});
