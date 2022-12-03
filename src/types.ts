import { RegisterOptions } from "react-hook-form";
export type Option<T> = [keyof T, RegisterOptions];
export type SubOptionCreator<T> = (customOpts?: RegisterOptions) => Option<T>;
export type OptionCreator = <T>(option: Option<T>) => SubOptionCreator<T>;

export interface LoginForm {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  comfirm: string;
}

export interface CommentForm {
  comment: string;
  editcomment: string;
}

export interface IgetComment { 
  concertId?: number;
  userId?: number;
  commentId : number;
  comment: string;
  name : string,
  profileImg : string,
  createdAt : string
}
