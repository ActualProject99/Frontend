import { deactivate, activate } from "../instance";
import { IPayload } from '../../types';

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
  const { data } = await activate.delete(`comment/${payload}`);
  return data;
};

export const editComment = async (payload: IPayload) => {
  const { data } = await activate.patch(
    `comment/${payload.commentId}`,
    payload
  );
  return data;
};
