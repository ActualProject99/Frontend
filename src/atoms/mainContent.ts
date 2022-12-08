import { atom } from "recoil";
import { MainContent, MainScrollRef } from "../types";

const initContent = null;

export const mainContent = atom<MainContent>({
  key: "mainContent",
  default: initContent,
});
const initRef = null;

export const mainScrollRef = atom<MainScrollRef>({
  key: "mainScrollRef",
  default: initRef,
});
export const isMainsSrollUp = atom<boolean>({
  key: "isMainScrollup",
  default: true,
});
