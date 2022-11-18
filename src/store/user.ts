import { atom } from "recoil";

export interface IUesrTypes {
  id: number;
  email: any;
  nickname: string;
  phone: string;
  userImg: string;
}

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
