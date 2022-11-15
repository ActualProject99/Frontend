// @ts-nocheck
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { editComment, removeComment } from "../apis/commentApi";
import { useState } from "react";
import { useQueryClient } from '@tanstack/react-query';

const Commentfix = ({ comment }) => {
  const [isedit, setIsEdit] = useState(true);
  const queryClient = useQueryClient();
  const { mutate: removeCommentFn } = useMutation(removeComment, {
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries("allComments")
      window.alert("해당 댓글을 삭제했습니다.")
    },
  });

  const { mutate: editCommentFn } = useMutation(editComment, {
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries("allComments")
      window.alert("해당 댓글을 수정했습니다.")
    },
  });

  const onDelete = () => {
    const payload = { id: comment?.id, postId: comment?.postId };
    console.log(payload);
    removeCommentFn(payload);
  };
  
  const onEdit = () => {
    const payload = {
      id: comment?.id,
      postId: comment?.postId,
      editcomment: comment?.comment,
    };
    editCommentFn(payload);
  };

  const EditMode = () => setIsEdit((current) => !current);

  return (
    <li className="mb-3 w-2/3 item-end mt-0 ml-1 mr-1 pb-3 border-b">
      {comment.comment}
      <p className="text-xs mt-2">2022.11.11 22:59</p>

      <div className="flex">
        {!isedit ? (
          <>
            <input className="border 1px w-full h-28 rounded-lg rounded-r-none rounded-br-none" />
            <button
              className="border 1px w-[9.5rem] h-28 bg-secondary-300"
              onClick={onEdit}
            >
              등록
            </button>
            <button
              className="border 1px w-[9.5rem] h-28 bg-primary-300 rounded-lg rounded-l-none rounded-bl-none"
              onClick={EditMode}
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button className="mt-1 mr-1 text-xs" onClick={EditMode}>
              수정
            </button>
            <button className="mt-1 mr-1 text-xs" onClick={onDelete}>
              삭제
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default Commentfix;
