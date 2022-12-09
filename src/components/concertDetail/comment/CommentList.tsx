// @ts-nocheck
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { readComments, addComment } from "../../../apis/query/commentApi";
import { useForm } from "react-hook-form";
import { IgetComment } from "../../../types";
import Commentfix from "./Commentfix";
import { regOptComment } from "../../../utils";
import { getCookieToken } from "../../../apis/cookie";
import useTicket from "../../../hooks/useTicketPop";

export interface IComments {
  comment?: IgetComment;
}

const CommentList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookie = getCookieToken();
  const queryClient = useQueryClient();
  const { mutate: addCommentFn } = useMutation(addComment, {
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries(["allComments"]);
      poped("댓글이 추가되었습니다.", { isToastOnly: true, newType: "ckeck" });
    },
  });
  const { Ticket, poped, userInput } = useTicket(
    "로그인 후 이용가능합니다😉\n 로그인으로 이동할까요?",
    {
      cacelButton: false,
      userInputs: {
        예: {
          value: () => {
            navigate("/user/login");
          },
          className: "bg-accent-main text-lime-800",
        },
        아니오: null,
      },
      toastOnly: false,
      type: "warn",
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { isLoading, isError, data } = useQuery<IgetComment[]>(
    ["allComments", id],
    () => readComments(id),
    { staleTime: 2000, keepPreviousData: true, refetchOnWindowFocus: false }
  );
  if (isLoading) {
    return <h3 className="p-4">Loading...</h3>;
  } else if (isError) {
    return <h3 className="p-4">지금은 댓글을 불러올 수 없어요!</h3>;
  }

  const onValid = (data: any) => {
    if (!cookie) return poped();
    const comment = {
      concertId: id,
      comment: data,
    };
    addCommentFn(comment);
    reset();
  };

  return (
    <div>
      <Ticket />
      <h1 className="p-4 pl-5 text-2xl font-bold">Comments</h1>
      <div className="relative w-[95%] h-[17rem] m-[0_auto] rounded-[0.3125rem] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]">
        <form
          className="px-[10px] py-[30px] font-normal"
          onSubmit={handleSubmit(onValid)}
        >
          <textarea
            className="w-full h-[8rem] border-none placeholder: pb-12 pl-4 outline-0 resize-none focus:ring-0"
            {...register(...regOptComment.comment())}
            maxLength={300}
            disabled={!cookie ? true : false}
            placeholder="게시물의 저작권 등 분쟁, 개인정보 노출로 인한 책임은 작성자 또는 게시자에게 있음을 유의하세요.&#13;&#10;(최소 3자 이상, 최대 300자 이내 댓글 입력)"
          />
          <span className="font-bold text-sm text-red-600">
            {errors.comment?.message as string}
          </span>

          <div className="flex justify-center items-center">
            <div className="absolute m-[0_auto] w-[95%] border-b-[1px] rounded-full" />
            <button className="relative w-[5rem] h-[5rem] rounded-[50%] flex justify-center items-center border-[10px] border-[#fff] z-[10] -translate-y-[2.5px] ml-[50rem]  bg-[#7151A1] hover:bg-primary-500 text-white">
              등록
            </button>
          </div>
        </form>
      </div>

      <div className="p-4 pl-5 text-xl font-bold mt-5 flex flex-row">
        등록된 댓글 <div className="mx-1 underline">{data.length}</div>개
      </div>
      <div className="border-t-[1px] w-[98.5%] max-h-[32.5rem] overflow-auto">
        <ul className="p-4 w-full">
          {data.map((comment) => (
            <Commentfix key={comment.id} comment={comment} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentList;
