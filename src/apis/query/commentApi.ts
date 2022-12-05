import { deactivate, activate } from "../instance";

interface IPayload {
  concertId: string;
  commentId: number;
  id:number;
  userId: number;
  comment: string;
  name: string;
  profileImg: string;
  createdAt: string;
  body?: {
    commentId: number;
    comment: string;
  };
}

export const readComments = async ( concertId: IPayload) => {
  const { data } = await deactivate.get(`comment/${concertId}`);
  return data;
};

export const addComment = async (payload: IPayload) => {
  const { data } = await activate.post(
    `comment/${payload.concertId}`,
    payload.comment
  );
  return data;
};

export const removeComment = async (payload: IPayload) => {
  const { data } = await activate.delete(`/comment/detail/${payload}`);
  return data;
};

export const editComment = async (payload: IPayload) => {
  const { data } = await activate.patch(
    `comment/${payload.commentId}`,
    payload
  );
  return data;
};
