import { deactivate, activate } from "../instance";

interface IPayload {
  concertId?: number;
  commentId?: number;
  userId: number;
  comment: string;
  name : string,
  profileImg : string,
  createdAt : string
  body?: {
    commentId?: number;
    comment: string;
  };
}

export const readComments = async ( userId: number ) => {
  const { data } = await deactivate.get(`comment/user/${userId}`);
  console.log(userId);
  return data;
};

export const addComment = async (payload: IPayload) => {
  const { data } = await activate.post(`comment/${payload.concertId}`, payload.comment);
  return data;
};

export const removeComment = async (payload: IPayload) => {
  const { data } = await activate.delete(`comment/${payload.concertId}`);
  return data;
};

export const editComment = async (payload: IPayload) => {
  const { data } = await activate.patch(`comment/${payload.concertId}`, payload.body);
  return data;
};
