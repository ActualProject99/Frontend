import { atom } from "recoil";
import { User } from "../types";

export const initUser: User = {
  isLoggedin: false,
  id: null,
  email: null,
};

export const inputUser = atom<string>({
  key: "inputUser",
  default: "",
});

export const userState = atom<User>({
  key: "user",
  default: initUser,
});
