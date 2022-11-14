import {
  isError,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { readComments, addComment, removeComment } from "../apis/query/commentApi";
import { useState } from "react";
import React, { useEffect } from "react"

interface IComments {
  id: number;
  postId?: number;
  comment: string;
}

const Comment = () => {
  const { id } = useParams();
  const { mutate : addCommentFn } = useMutation(addComment);
  const { mutate : removeCommentFn } = useMutation(removeComment);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = 5; 
  /* 10개씩 가져온 코멘트들의 페이지를 최대 5페이지까지로 지정. 
  *src\apis\query\commentApi.ts 참고. */

  const queryClient = useQueryClient();
  useEffect(()=>{   
    if(currentPage < maxPage) {
    const nextPage = currentPage + 1;
    queryClient.prefetchQuery(["allComments", nextPage], () => readComments(nextPage))}
  },[currentPage, queryClient]);
  /* 다음 페이지를 누르기 전에 다음 페이지 내용을 미리 불러옴. 
  딜레이 체감 없애기 */

  const { isLoading, isError, data } = useQuery<IComments[]>(
    ["allComments", currentPage],
    
    () => readComments(currentPage),
    {
      staleTime:2000,
      keepPreviousData: true,
    }
  );
  
  
  if (isLoading) {
    return <h3>Loading...</h3>; 
  }
  if (isError) {
    return <h3>지금은 댓글을 불러올 수 없어요!</h3>;
  }

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
              <button onClick={()=>{}}>삭제</button>
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
