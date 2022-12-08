// @ts-nocheck
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { IgetMyComment } from "../../types";
import UserApi from "../../apis/query/UserApi";
import ConcertApi from "../../apis/query/ConcertApi";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

const MyComments = (): JSX.Element => {
  const { data: user } = UserApi.GetUserInfo();
  const { data: concert } = ConcertApi.GetConcerts();
  const { data: comment } = useQuery<IgetMyComment[]>(
    ["allMyComments"],
    () => UserApi.readMyComments(user.userId),
    { staleTime: 2000, keepPreviousData: true, refetchOnWindowFocus: false }
  );


  console.log("userInfo", user);
  console.log("addComments", comment);
  console.log("comcertInfo", concert);


  return (
    <div className="flex flex-col w-[95%] max-h-[32.5rem] overflow-auto p-7 border mx-auto my-5 gap-6 ">
      <div className="ml-2 text-2xl font-bold mt-5 flex flex-row">
        내가 등록한 댓글 총
        <div className="mx-1 text-[red] underline decoration-black">
          {comment?.length}
        </div>
        개
      </div>
      <ul>
        {comment?.map((comments) => (
          <li
            key={comments.id}
            className="mb-3 m-auto mt-0 pb-3 border-b w-[98.5%]"
          >
            
            <div>{comments.comment}</div>
            {comments && comments.createdAt === comments.updatedAt ? (
              <p className="mt-4 text-sm text-[#999999]">
                {dayjs(comments?.createdAt).format("YY.MM.DD A HH:MM")}
              </p>
            ) : (
              <p className="mt-4 text-xs text-[#999999]">
                {dayjs(comments?.updatedAt).format("YY.MM.DD A HH:MM")}(수정됨)
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComments;
