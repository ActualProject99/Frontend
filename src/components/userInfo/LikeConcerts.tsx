import React from "react";
import UserApi from "../../apis/query/UserApi";
import LikeConcert from "./LikeConcert";

const LikeConcerts = (): JSX.Element => {
  const { data: concerts } = UserApi.GetLikeConcert();
  console.log("data333", concerts);

  return (
    <div className="flex flex-col w-[95%] h-[40rem] p-7 border mx-auto my-5 gap-6 ">
      <div className="flex justify-center flex-wrap w-full h-full  gap-x-10 gap-y-14 overflow-y-scroll scrollbar-hide">
        {concerts &&
          concerts.map((concert) => (
            <LikeConcert key={concert.id} concert={concert} />
          ))}
      </div>
    </div>
  );
};

export default LikeConcerts;
