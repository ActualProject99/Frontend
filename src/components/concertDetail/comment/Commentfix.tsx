import React from "react";
import { useMutation } from "@tanstack/react-query";
import { editComment, removeComment } from "../../../apis/query/commentApi";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IComments } from "./CommentList";

const Commentfix = ({ comment }: IComments) => {
  const [isedit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const queryClient = useQueryClient();

  const { mutate: removeCommentFn } = useMutation(removeComment, {
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries(["allComments"]);
    },
  });

  const { mutate: editCommentFn } = useMutation(editComment, {
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries(["allComments"]);
    },
  });

  const onDelete = () => {
    const removeConfirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
    if (removeConfirm) {
      /* const {id, postId} = comment; */
      const payload = { id: comment?.id, postId: comment?.postId };
      removeCommentFn(payload);
    }
  };

  const onEdit = (data: any) => {
    const askConfirm = window.confirm("작성하신 댓글로 변경하시겠습니까?");
    if (askConfirm) {
      /* const {id, postId} = comment; */
      editCommentFn({
        id: comment?.id,
        body: { postId: comment?.postId, comment: data.editcomment },
      });
      setIsEdit((cur) => !cur);
    }
  };

  const showEditMode = () => {
    const editConfirm = window.confirm("해당 댓글을 수정하시겠습니까?");
    if (editConfirm) {
      setIsEdit((cur) => !cur);
    }
  };

  const hideEditMode = () => {
    setIsEdit((cur) => !cur);
  };

  useEffect(() => {
    if (isedit) {
      setValue("editcomment", comment?.comment);
    }
  }, [isedit]);

  return (
    <li className="mb-3 w-full m-auto mt-0 pb-3 border-b">
      {isedit ? (
        <>
          <form onSubmit={handleSubmit(onEdit)} className="flex ">
            <textarea
              className="border 1px w-5/6 h-28 placeholder: pb-12 pl-4 rounded-lg rounded-r-none rounded-br-none resize-none"
              {...register("editcomment", {
                maxLength: {
                  value: 300,
                  message: "",
                },
                minLength: {
                  value: 3,
                  message: "3자 미만으로 작성할 수 없습니다.",
                },
              })}
              maxLength={300}
              placeholder="게시물의 저작권 등 분쟁, 개인정보 노출로 인한 책임은 작성자 또는 게시자에게 있음을 유의하세요.&#13;&#10;(최소 3자 이상, 최대 300자 이내 수정된 댓글 입력)"
            />
            <button className="border 1px w-[10.5rem] h-[7.1rem] hover:bg-secondary-main bg-secondary-300">
              등록
            </button>
            <button
              className="border 1px w-[10.5rem] h-[7.1rem] hover:bg-primary-main bg-primary-300 rounded-lg rounded-l-none rounded-bl-none"
              onClick={hideEditMode}
            >
              취소
            </button>
          </form>
          {errors.editcomment && errors.editcomment?.type === "minLength" && (
            <span className="font-bold text-sm text-red-600">{`${errors.editcomment.message}`}</span>
          )}
        </>
      ) : (
        <>
          {comment?.comment}
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