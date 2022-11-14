import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { deactivate, activate } from "./instance";

interface DeletePayload {
  id: number;
  postId?: number;
}

export const readComments = async (pageNum: number) => {
  const { data } = await deactivate.get(`comments?_limit=10&_page=${pageNum}`);
  return data; // 코멘트를 페이지 당 10개씩 불러오게 지정
};

export const addComment = async (body: { postId: number, comment: string }) => {
  const { data } = await activate.post("comments", body);
  return data;
};

export const removeComment = async ( payload : DeletePayload ) => {
  const { data } = await activate.delete(`comments/${payload.id}`);
  return data;
};

export const editComment = async (id: number, body: {postId: number, comment: string}) => {
  const { data } = await activate.patch(`comments/${id}`, body);
  return data;
};
