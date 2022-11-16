import { atom } from "recoil";

const initContent = 0;
export const mainContent = atom<number>({
  key: "mainContent",
  default: initContent,
});
