// @ts-nocheck
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { IgetMyComment } from "../../types";
import UserApi from '../../apis/query/UserApi';

const MyComments = (): JSX.Element => {
  const { data } = useQuery<IgetMyComment[]>(
    ["allMyComments", userId],
    () => UserApi.readMyComments(userId),
    { staleTime: 2000, keepPreviousData: true, refetchOnWindowFocus: false }
  );
  console.log("comments", data);

  return (
    <div className="flex flex-col w-[95%] h-[25rem] p-7 border mx-auto my-5 gap-6 ">
      <div>
        {data?.map((comment) => (
          <li></li>
        ))}
      </div>
    </div>
  );
};

export default MyComments;
