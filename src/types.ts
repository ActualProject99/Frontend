import { RegisterOptions } from "react-hook-form";
export type Option<T> = [keyof T, RegisterOptions];
export type SubOptionCreator<T> = (customOpts?: RegisterOptions) => Option<T>;
export type OptionCreator = <T>(option: Option<T>) => SubOptionCreator<T>;

export interface LoginForm {
  email: string;
  password: string;
}

export interface CommentForm {
  comment: string;
  editcomment: string;
}

export interface IgetComment { 
  id?: number;
  postId?: number;
  comment: string;
};
