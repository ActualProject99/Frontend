// @ts-nocheck
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { editComment, removeComment } from '../../../apis/commentApi';
import { useState, useEffect } from "react";
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
/* import { useRecoilState, useSetRecoilState } from 'recoil';
import { showEditModeAtom } from '../../../atoms/commentAtom'; */

const Commentfix = ({ comment }) => {
  const [isedit, setIsEdit] = useState(false);
  /* const isedit = useRecoilState(showEditModeAtom);
  const ShowEdit = useSetRecoilState(showEditModeAtom) */
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
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
    const {id, postId} = comment;
    const payload = { id, postId: postId };
    removeCommentFn(payload);
  };
  
  const onEdit = (data: any) => {
    const {id, postId} = comment;
    editCommentFn({id, body: {postId, comment:data.editcomment}});
    setIsEdit((cur)=>!cur)
  };

  const showEditMode = () => {
    setIsEdit((cur)=>!cur)
  }

  useEffect(()=>{
    if(isedit) {
      setValue("editcomment", comment?.comment)
    }
  },[isedit])
  
  return (
    <li className="mb-3 w-full item-end m-auto mt-0 pb-3 border-b">
        {isedit ? (
          <>
           <form onSubmit={handleSubmit(onEdit)} className="flex">
            <textarea className="border 1px w-2/3 h-28 placeholder: pb-12 pl-4 rounded-lg rounded-r-none rounded-br-none resize-none"
            {...register("editcomment", {
              maxLength: {
                value: 300,
                message: "300자를 초과할 수 없습니다.",
              },
              minLength: {
                value: 3,
                message: "최소 3자 이상을 입력해야 합니다.",
              },
            })}
            maxLength={300}
            placeholder="최소 3자 300자 이내로 수정된 댓글을 입력해주세요" />
            
            <button className="border 1px w-14 h-14"
              className="border 1px w-[9.5rem] h-28 bg-secondary-300"
            >
              등록
            </button>
            <button className="border 1px w-14 h-14"
              className="border 1px w-[9.5rem] h-28 bg-primary-300 rounded-lg rounded-l-none rounded-bl-none"
              onClick={showEditMode}
            >
              취소
            </button>
            </form>
            </>
        ) : (
          <>
          {comment.comment}
            <p className="text-xs mt-2">2022.11.11 22:59</p>
            <button className="mt-1 mr-1 text-xs" onClick={showEditMode}>
              수정
            </button>
            <button className="mt-1 mr-1 text-xs" onClick={onDelete}>
              삭제
            </button>
            </>
        )}
    </li>
  );
};

export default Commentfix;
