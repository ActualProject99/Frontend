import { atom } from "recoil";
import { IUesrTypes } from "../types";

export const userState = atom<IUesrTypes>({
  key: "userState",
  default: {
    id: 0,
    email: "",
    nickname: "",
    phone: "",
    userImg: "",
  },
});
