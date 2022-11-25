import { atom } from "recoil";

export const scrollable = atom<boolean>({
  key: "scrollable",
  default: true,
});
