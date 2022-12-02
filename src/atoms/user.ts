import { atom } from "recoil";
import { User } from "../types";

export const initUser: User = {
  isLoggedin: false,
  id: null,
  email: null,
};

// TodoInput에서 입력하는 값을 atom으로 관리하는 방식
export const inputUser = atom<string>({
  key: "inputUser",
  // key의 값은 항상 고유값이어야 합니다.

  default: "",
});

// 업데이트 시킬 Todos atom 배열
export const userState = atom<User>({
  key: "user",

  // default에는 임의의 데이터를 넣어줍시다.
  default: initUser,
});
