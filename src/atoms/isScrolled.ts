import { atom } from "recoil";
import { IsScrolled } from "../types";

export const isScrolled = atom<IsScrolled>({
  key: "isScrolled",
  default: false,
});
