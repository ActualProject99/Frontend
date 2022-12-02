import { atom } from "recoil";
import {
  HasBooked,
  HasPlaced,
  IsGameDone,
  IsGameSuccess,
  IsRefreshedValid,
  UserSelected,
} from "../types";

const initBooked = [[[]]];

export const hasBooked = atom<HasBooked>({
  key: "hasBooked",
  default: initBooked,
});

export const userSelected = atom<UserSelected>({
  key: "userSelected",
  default: [null, null, null],
});

export const hasPlaced = atom<HasPlaced>({
  key: "hasPlaced",
  default: [],
});

export const isGameSuccess = atom<IsGameSuccess>({
  key: "isGameSuccess",
  default: [null, null],
});

export const isRefreshedValid = atom<IsRefreshedValid>({
  key: "isRefreshedValid",
  default: null,
});

export const isGameDone = atom<IsGameDone>({
  key: "isGameDone",
  default: false,
});
