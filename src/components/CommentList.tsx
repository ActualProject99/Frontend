/* // @ts-nocheck */
import { isError, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { readComments, addComment } from "../apis/commentApi";
import { useState } from "react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IgetComment } from '../types';

export interface IComments {
  comment:IgetComment;
}

const Comment = () => {
  const { id } = useParams();

  const { mutate : addCommentFn } = useMutation(addComment, {
    onSuccess: (data, variable, context) => {
      console.log("add",'Success')
      refetch();
    }
  });

  const { register, handleSubmit, formState: {errors}, reset } = useForm();
  
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
  }, [/* currentPage, queryClient */]);
  /* 다음 페이지를 누르기 전에 다음 페이지 내용을 미리 불러옴. 
  딜레이 체감 없애기 */
  
  const { isLoading, isError, data, refetch } = useQuery<IgetComment[]>(
    ["allComments", currentPage],
    () => readComments(currentPage),
    { staleTime: 2000, keepPreviousData: true, refetchOnWindowFocus: false }
  );
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <h3>지금은 댓글을 불러올 수 없어요!</h3>;
  }
  console.log(data);

  const onValid = (data: any) => {
    addCommentFn({ postId:Number(id), comment:data.comment })
    reset();
  }
  
  return (
    <div>
      <h1>Comments</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input className='border 1px'  {...register("comment", { maxLength: {
          value: 30,
          message: "30자를 초과할 수 없습니다."
        }}) } 
        placeholder="댓글은 30자 이내로 입력해주세요"
        />
        <button>등록</button>
      </form>
      <ul>
        {data
          ?.filter((concert) => concert.postId == id)
          .map((comment) => (
            <Comment key={comment.id} {...comment}/>
          ))}
      </ul>
      <button
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        이전
      </button>
      <span>Page {currentPage}</span>
      <button
        disabled={currentPage >= maxPage}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        다음
      </button>
    </div>
  );
};

export default Comment;
