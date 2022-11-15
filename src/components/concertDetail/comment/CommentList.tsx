// @ts-nocheck
import {
  isError,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { readComments, addComment  } from '../../../apis/commentApi';
import { useState } from "react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IgetComment } from "../../../types";
import Commentfix from './Commentfix';

export interface IComments {
  comment: IgetComment;
}

const CommentList = () => {
  const { id } = useParams();

  const { mutate: addCommentFn } = useMutation(addComment, {
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries("allComments");
      window.alert("댓글을 추가했습니다.");
    },
  });

  const { register,handleSubmit,formState: { errors },reset } = useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = 5;
  const queryClient = useQueryClient();
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

  const { isLoading, isError, data } = useQuery<IgetComment[]>(
    ["allComments", currentPage],
    () => readComments(currentPage),
    { staleTime: 2000, keepPreviousData: true, refetchOnWindowFocus: false }
  );
  if (isLoading) {
    return <h3 className='p-4'>Loading...</h3>;
  }
  if (isError) {
    return <h3 className='p-4'>지금은 댓글을 불러올 수 없어요!</h3>;
  }

  const onValid = (data: any) => {
    addCommentFn({ postId: Number(id), comment: data.comment });
    reset();
  };

  return (
    <div>
      <h1 className="p-4">Comments</h1>
      <form
        className="pl-4 grid grid-cols-[1fr_500px]"
        onSubmit={handleSubmit(onValid)}
      >
        <textarea 
          className="block bg-gray-200 outline-transparent w-full h-28 placeholder: pb-12 pl-4 relative rounded-lg rounded-r-none rounded-br-none resize-none"
          {...register("comment", {
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
          placeholder="최소 3자 최대 300자 이내로 댓글을 입력해주세요"
          
        />
        <button className="border 1px w-28 h-28  hover:bg-secondary-main bg-secondary-300 rounded-lg rounded-l-none rounded-bl-none">
          등록
        </button>
        <span></span>
      </form>

      <ul className="p-4 w-full max-h-[40rem] overflow-y-auto">
        {data
          ?.filter((concert) => concert.postId == id)
          .map((comment) => (
            <Commentfix key={comment.id} comment={comment}/>
          ))}
      </ul>

      <button
        className="pt-4 pl-4"
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        이전
      </button>
      <span className="pt-4 pl-4">Page {currentPage}</span>
      <button
        className="pt-4 pl-4"
        disabled={currentPage >= maxPage}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        다음
      </button>
    </div>
  );
};

export default CommentList;
