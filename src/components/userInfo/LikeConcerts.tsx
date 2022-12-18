import { useMemo } from "react";
import LikeConcert from "./LikeConcert";
import ConcertApi from "../../apis/query/ConcertApi";
import { IGetConcert, likeConcertProps } from "../../types";

const LikeConcerts = (): JSX.Element => {
  const { data: concerts } = ConcertApi.GetConcerts();
  const { data: concertLike } = ConcertApi.GetLikeConcertList();

  const likeConcerts = useMemo(() => {
    return (
      concertLike &&
      concertLike.map((concertList: likeConcertProps) => concertList.concertId)
    );
  }, [concertLike]);

  return (
    <div className="flex flex-col w-[95%] h-[40rem] p-7 border mx-auto my-5 gap-6 ">
      <div className="flex justify-center flex-wrap w-full h-full  gap-x-10 gap-y-14 overflow-y-scroll scrollbar-hide">
        {concerts &&
          concerts.map((concert: IGetConcert) =>
            likeConcerts?.includes(concert.concertId) ? (
              <LikeConcert key={concert.concertId} concert={concert} />
            ) : null
          )}
      </div>
    </div>
  );
};

export default LikeConcerts;
