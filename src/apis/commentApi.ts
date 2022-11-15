import axios from "axios";
import { deactivate, activate } from "./instance";

interface IPayload {
  id?: number;
  postId?: number;
  body? : {
    postId: number;
    comment:string;
  }
}

export const readComments = async (pageNum: number) => {
  const { data } = await deactivate.get(`comments?_limit=10&_page=${pageNum}`);
  return data; // 페이지 당 코멘트 10개씩 불러오도록 지정
};

export const addComment = async ( payload : IPayload ) => {
  const { data } = await activate.post("comments", payload);
  return data;
};

export const removeComment = async ( payload : IPayload ) => {
  const { data } = await activate.delete(`comments/${payload.id}`);
  return data;
};

export const editComment = async ( payload : IPayload ) => {
  const { data } = await activate.patch(`comments/${payload.id}`, payload.body );
  return data;
};
