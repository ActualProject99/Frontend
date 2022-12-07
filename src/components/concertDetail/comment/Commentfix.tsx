// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import { removeComment, editComment } from "../../../apis/query/commentApi";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { regOptComment } from "../../../utils";
import { IComments } from "../../../types";
import UserApi from "../../../apis/query/UserApi";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

const Commentfix = ({ comment }: IComments) => {
  const { data: user } = UserApi.GetUserInfo();
  const commentId = comment.commentId;
  console.log("댓글", comment?.profileImg);
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
        <div className="flex w-full justify-start items-end">
          <img
            className="rounded-[50%] w-[3.125rem] h-[3.125rem] object-cover"
            src={comment?.profileImg}
          />
          <div className="flex ml-3 text-[#999999] font-bold">
            {comment?.nickname}
          </div>
          <div className="w-[80%] p-[0.5rem] text-base flex-[7]">
            {comment?.comment}
          </div>
          {comment && comment.createdAt === comment.updatedAt ? (
            <p className="text-sm flex-[1.5] text-[#999999]">
              {dayjs(comment?.createdAt).format("YY.MM.DD A HH:MM")}
            </p>
          ) : (
            <p className="text-xs flex-[1.7] text-[#999999]">
              {dayjs(comment?.updatedAt).format("YY.MM.DD A HH:MM")}(수정됨)
            </p>
          )}{" "}
          {user?.userId === comment?.userId ? (
            <>
              <div className="flex flex-[1.3] font-bold text-[0.9rem] leading-[1.25rem]">
                <button className="mr-3" onClick={showEditMode}>
                  수정
                </button>
                <div className="border-r-[0.14rem] border-r-[black]" />
                <button className="ml-3" onClick={onDelete}>
                  삭제
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}
    </li>
  );
};

export default Commentfix;
