// @ts-nocheck
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { readComments, addComment } from "../../../apis/query/commentApi";
import { useForm } from "react-hook-form";
import { IgetComment } from "../../../types";
import Commentfix from "./Commentfix";
import ArrowLeft from "../../../svg/ArrowLeft";
import ArrowRight from "../../../svg/ArrowRight";
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
      <h1 className="p-4 pl-5 font-bold">Comments</h1>
      <form
        className="pl-4 grid grid-cols-[1fr_165px]"
        onSubmit={handleSubmit(onValid)}
      >
        <textarea
          className="block bg-gray-200 w-full h-28 placeholder: pb-12 pl-4 relative rounded-lg rounded-r-none rounded-br-none resize-none"
          {...register(...regOptComment.comment())}
          maxLength={300}
          disabled={!cookie ? true : false}
          placeholder="게시물의 저작권 등 분쟁, 개인정보 노출로 인한 책임은 작성자 또는 게시자에게 있음을 유의하세요.&#13;&#10;(최소 3자 이상, 최대 300자 이내 댓글 입력)"
        />
        <button className="border 1px w-[9.3rem] h-28 hover:bg-secondary-main bg-secondary-300 rounded-lg rounded-l-none rounded-bl-none">
          등록
        </button>
        <span className="font-bold text-sm text-white">
          {errors.comment?.message as string}
        </span>
      </form>

      <ul className="p-4 w-full max-h-[65rem]">
        {data.map((comment) => (
          <Commentfix key={comment.id} comment={comment} />
        ))}
      </ul>

      <div className="flex w-full justify-around">
        <button
        /* disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)} */
        >
          <ArrowLeft />
        </button>
        {/*  <span>{currentPage}</span> */}
        <button
        /* disabled={currentPage >= maxPage}
          onClick={() => setCurrentPage((prev) => prev + 1)} */
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CommentList;
