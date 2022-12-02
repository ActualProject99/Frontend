import { deactivate, activate } from "../instance";

interface IPayload {
  id?: number;
  postId?: number;
  comment?: string;
  body?: {
    postId?: number;
    comment: string;
  };
}

export const readComments = async () => {
  const { data } = await deactivate.get("comments");
  return data;
};

export const addComment = async (payload: IPayload) => {
  const { data } = await activate.post("comments", payload);
  return data;
};

export const removeComment = async (payload: IPayload) => {
  const { data } = await activate.delete(`comments/${payload.id}`);
  return data;
};

export const editComment = async (payload: IPayload) => {
  const { data } = await activate.patch(`comments/${payload.id}`, payload.body);
  return data;
};
