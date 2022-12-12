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
  const [isedit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
    if (!data.comment.trim()) return;
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

  useEffect(() => {
    watch("comment");
  }, [watch]);

  return (
    <li className="mb-3 w-full m-auto mt-0 pb-3 border-b">
      {isedit ? (
        <div className="relative w-[95%] h-[17rem] m-[0_auto] rounded-[0.3125rem] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]">
          <form
            onSubmit={handleSubmit(onEdit)}
            className="px-[0.625rem] py-[1.875rem] font-normal"
          >
            <div className="block absolute top-32 left-[86%]">
              {watch("comment.length") === 300 ? (
                <span className="font-bold text-red-600">
                  {watch("comment.length")} / 300
                </span>
              ) : (
                <span className="font-bold">
                  {watch("comment.length")} / 300
                </span>
              )}
            </div>
            <textarea
              className="w-full h-[8rem] border-none placeholder: pb-12 pl-4 outline-0 resize-none focus:ring-0"
              {...register(...regOptComment.editcomment())}
              maxLength={300}
              placeholder="게시물의 저작권 등 분쟁, 개인정보 노출로 인한 책임은 작성자 또는 게시자에게 있음을 유의하세요.&#13;&#10;(최소 3자 이상, 최대 300자 이내 수정된 댓글 입력)"
            />
            <span className="pl-5 font-bold w-full text-sm text-red-600">
              {errors.comment?.message as string}
            </span>
            <div className="flex justify-center items-center">
              <div className="absolute m-[0_auto] w-[95%] border-b-[1px] rounded-full" />
              <button className="relative w-[10.5rem] h-[4rem] rounded-2xl bg-[#7151A1] hover:bg-primary-500 border-[10px] border-[#fff] z-[10] ml-[35rem] text-white">
                등록
              </button>
              <button
                className="relative w-[10.5rem] h-[4rem] rounded-2xl bg-[#b1a89f] hover:bg-[#c1b9b1] border-[10px] border-[#fff] z-[10] text-white ml-5"
                onClick={hideEditMode}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex w-full">
          <img
            className="rounded-[50%] w-[6.25rem] h-[6.25rem] object-cover"
            src={comment?.profileImg}
          />
          <div className="flex-[1] ml-10 text-[#999999] font-bold">
            {comment?.nickname}
          </div>

          <div className="flex-col flex-[7]">
            <div className="p-[0.5rem] text-base w-[40.625rem] break-words">
              {comment?.comment}
            </div>
            {comment && comment.createdAt === comment.updatedAt ? (
              <p className="mt-[1rem] ml-[0.5rem] text-sm text-[#999999]">
                {dayjs(comment?.createdAt).format("YY.MM.DD A HH:MM")}
              </p>
            ) : (
              <p className="mt-[1rem] ml-[0.5rem] text-xs text-[#999999]">
                {dayjs(comment?.updatedAt).format("YY.MM.DD A HH:MM")}(수정됨)
              </p>
            )}{" "}
            {user?.userId === comment?.userId ? (
              <>
                <div className="pl-[0.5rem] flex font-bold text-[0.9rem] leading-[1.25rem] text-[#AAAAAA]">
                  <button className="mr-3 " onClick={showEditMode}>
                    수정
                  </button>
                  <div className="border-r-[0.1rem] h-3 my-auto border-r-[#AAAAAA]" />
                  <button className="ml-3" onClick={onDelete}>
                    삭제
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </li>
  );
};

export default Commentfix;
