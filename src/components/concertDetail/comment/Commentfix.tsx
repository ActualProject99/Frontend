// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import { removeComment, editComment } from "../../../apis/query/commentApi";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { regOptComment } from "../../../utils";
import { IComments } from "../../../types";
import { getCookieToken } from "../../../apis/cookie";

const Commentfix = ({ comment }: IComments) => {
  console.log(comment?.createdAt);
  console.log((comment?.createdAt.split('T')[0].slice(5)),(comment?.createdAt.split('T')[1].slice(0,11)));
  const cookie = getCookieToken();
  const commentId = comment.commentId;
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
      removeCommentFn(comment.commentId);
    }
  };

  const onEdit = (data: any) => {
    const { comment } = data;
    const askConfirm = window.confirm("작성하신 댓글로 변경하시겠습니까?");
    if (askConfirm) {
      const EditData = {
        commentId: commentId,
        comment,
      };
      editCommentFn(EditData);
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
      setValue("comment", comment?.comment);
    }
  }, [isedit, comment?.comment, setValue]);

  return (
    <li className="mb-3 w-full m-auto mt-0 pb-3 border-b">
      {isedit ? (
        <>
          <form onSubmit={handleSubmit(onEdit)} className="flex">
            <textarea
              className="border 1px w-5/6 h-28 placeholder: pb-12 pl-4 rounded-lg rounded-r-none rounded-br-none resize-none"
              {...register(...regOptComment.editcomment())}
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
          <span className="font-bold text-sm text-red-600">
            {errors.editcomment?.message as string}
          </span>
        </>
      ) : (
        <div className='flex'>
          <img className="rounded-[50%] w-10 h-10" src={comment?.profileImg} />
          <div className="ml-3 text-[#999999] font-bold">{comment?.nickname}</div>
          <div className='w-[80%]'>{comment?.comment}</div>
          <p className=" ml-1 text-xs mt-2 ">{comment?.createdAt.split('T')[0].slice(5)+comment?.createdAt.split('T')[1].slice(0,11)}</p>
          <p className="ml-1 text-xs mt-2">{comment?.updatedAt.split('T')[0].slice(5)+comment?.updatedAt.split('T')[1].slice(0,11)}(수정됨)</p>
          {cookie ? (
            <>
              <button className="mt-1 mr-1 text-xs" onClick={showEditMode}>
                수정 |
              </button>
              <button className="mt-1 mr-1 text-xs" onClick={onDelete}>
                삭제
              </button>
            </>
          ) : 
            null
          }
        </div>
      )}
    </li>
  );
};

export default Commentfix;
