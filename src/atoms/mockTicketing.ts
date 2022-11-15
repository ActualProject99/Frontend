import { atom } from "recoil";

const initBooked = [[[]]];
export type HasBooked = boolean[][][];

export const hasBooked = atom<HasBooked>({
  key: "hasBooked",
  default: initBooked,
});

export type HasPlaced = boolean[];
export const hasPlaced = atom<HasPlaced>({
  key: "hasPlaced",
  default: [],
});
