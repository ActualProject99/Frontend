import { useMutation } from '@tanstack/react-query';
import React from "react";
import { editComment, removeComment } from '../apis/commentApi';
import { IComments } from "../components/CommentList"



const Comment = (comment:IComments["comment"]) => {
  const { mutate : removeCommentFn } = useMutation(removeComment, {
    onSuccess: (data, variable, context) => {
      console.log("remove",'Success')
    },
    onError: (error) => { 
      console.log("remove",'Error');
    }
  }
)

  const onDelete = () => {
    const payload =  {id: comment.id, postId: comment.postId} 
     removeCommentFn(payload); 
   } 

/* const { mutate : editCommentFn } = useMutation(editComment) */
  return (
    <div>
      <li key={comment.id}>
        {comment.comment}
        <p>2022.11.11 22:59</p>
        <button onClick={() => {}}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </li>
    </div>
  );
};

export default Comment;
