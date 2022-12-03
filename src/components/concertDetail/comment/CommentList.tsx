import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { readComments, addComment } from "../../../apis/query/commentApi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IgetComment } from "../../../types";
import Commentfix from "./Commentfix";
import ArrowLeft from "../../../svg/ArrowLeft";
import ArrowRight from "../../../svg/ArrowRight";
import { regOptComment } from "../../../utils";

export interface IComments {
  comment?: IgetComment;
  userId?: IgetComment;
}

const CommentList = () => {
  const { concertId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: addCommentFn } = useMutation(addComment, {
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries(["allComments"]);
      window.alert("댓글을 추가했습니다.");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  /* const [currentPage, setCurrentPage] = useState(1);
  const maxPage = 5;
  
  useEffect(() => {
    if (currentPage < maxPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["allComments", nextPage], () =>
        readComments(nextPage)
      );
    }
  }, [currentPage, queryClient]);

  /* 다음 페이지를 누르기 전에 다음 페이지 내용을 미리 불러옴. 
  딜레이 체감 없애기 */
  /* const { isLoading, isError, data } = useQuery<IgetComment[]>(
    ["allComments", currentPage],
    () => readComments(currentPage),
    { staleTime: 2000, keepPreviousData: true, refetchOnWindowFocus: false }
  );
  if (isLoading) {
    return <h3 className="p-4">Loading...</h3>;
  } else if (isError) {
    return <h3 className="p-4">지금은 댓글을 불러올 수 없어요!</h3>;
  }  */

  const { isLoading, isError, data } = useQuery<IgetComment[]>(
    ["allComments", readComments],
    { staleTime: 2000, keepPreviousData: true, refetchOnWindowFocus: false }
  );
  
  if (isLoading) {
    return <h3 className="p-4">Loading...</h3>;
  } else if (isError) {
    return <h3 className="p-4">지금은 댓글을 불러올 수 없어요!</h3>;
  }

  const onValid = (data: any) => {
    /* addCommentFn({ concertId: concertId, comment: data }); */
    reset();
  };

  return (
    <div>
      <h1 className="p-4 pl-5 font-bold">Comments</h1>
      <form
        className="pl-4 grid grid-cols-[1fr_165px]"
        onSubmit={handleSubmit(onValid)}
      >
        <textarea
          className="block bg-gray-200 w-full h-28 placeholder: pb-12 pl-4 relative rounded-lg rounded-r-none rounded-br-none resize-none"
          {...register(...regOptComment.comment())}
          maxLength={300}
          placeholder="게시물의 저작권 등 분쟁, 개인정보 노출로 인한 책임은 작성자 또는 게시자에게 있음을 유의하세요.&#13;&#10;(최소 3자 이상, 최대 300자 이내 댓글 입력)"
        />
        <button className="border 1px w-[9.3rem] h-28 hover:bg-secondary-main bg-secondary-300 rounded-lg rounded-l-none rounded-bl-none">
          등록
        </button>
        <span className="font-bold text-sm text-red-600">
          {errors.comment?.message as string}
        </span>
      </form>

      <ul className="p-4 w-full max-h-[65rem]">
        <>
          {data
            ?.filter((concert) => concert.userId === concertId)
            .map((comment) => {
              <Commentfix key={comment.commentId} comment={comment} />;
            })}
        </>
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

