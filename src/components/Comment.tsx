import {
  isError,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { commentList, addComment } from "../apis/query/commentApi";
import { useState } from "react";
import React, { useEffect } from "react"

interface IComments {
  id: number;
  postId?: number;
  comment: string;
}

const Comment = () => {
  const { id } = useParams();
  const { mutate } = useMutation(addComment)
  
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = 5;
  const queryClient = useQueryClient();

  useEffect(()=>{
    if(currentPage < maxPage) {
    const nextPage = currentPage + 1;
    queryClient.prefetchQuery(["allComments", nextPage], () => commentList(nextPage))}
  },[currentPage, queryClient]);

  const { isLoading, isError, data } = useQuery<IComments[]>(
    ["allComments", currentPage],
    () => commentList(currentPage),
    {
      staleTime:2000,
      keepPreviousData: true,
    }
  );
  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>지금은 댓글을 불러올 수 없어요!</h3>;
  
  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Comments</h1>
      <form onSubmit={onSubmit}>
      <input type="text"  />
      <button onClick={() => {}}>등록</button>
      </form>
      <ul>
        {data
          ?.filter((concert) => concert.postId == id)
          .map((comment) => (
            <li key={comment.id}>
              {comment.comment}
              <p>2022.11.11 22:59</p>
            </li>
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
