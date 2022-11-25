import { atom } from "recoil";

const initBooked = [[[]]];
export type HasBooked = boolean[][][];

export const hasBooked = atom<HasBooked>({
  key: "hasBooked",
  default: initBooked,
});
export type UserSelected = [number, number, number] | [null, null, null];
export const userSelected = atom<UserSelected>({
  key: "userSelected",
  default: [null, null, null],
});

export type HasPlaced = boolean[];
export const hasPlaced = atom<HasPlaced>({
  key: "hasPlaced",
  default: [],
});

export type IsGameSuccess = [boolean | null, boolean | null];
export const isGameSuccess = atom<IsGameSuccess>({
  key: "isGameSuccess",
  default: [null, null],
});
export type IsRefreshedValid = null | boolean;
export const isRefreshedValid = atom<IsRefreshedValid>({
  key: "isRefreshedValid",
  default: null,
});
export type IsGameDone = boolean;
export const isGameDone = atom<IsGameDone>({
  key: "isGameDone",
  default: false,
});
