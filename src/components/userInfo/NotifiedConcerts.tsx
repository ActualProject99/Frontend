import React, { useMemo } from "react";
import ConcertApi from "../../apis/query/ConcertApi";
import { alarmConcertProps, IGetConcert } from "../../types";
import NotifiedConcert from "./NotifiedConcert";

const NotifiedConcerts = (): JSX.Element => {
  const { data: concerts } = ConcertApi.GetConcerts();
  const { data: concertAlarm } = ConcertApi.GetAlarmConcertList();

  const alarmConcerts = useMemo(() => {
    return (
      concertAlarm &&
      concertAlarm.map(
        (concertList: alarmConcertProps) => concertList.concertId
      )
    );
  }, [concertAlarm]);

  return (
    <div className="flex flex-col w-[95%] h-[40rem] p-7 border mx-auto my-5 gap-6 ">
      <div className="flex justify-center flex-wrap w-full h-full  gap-x-10 gap-y-14 overflow-y-scroll scrollbar-hide">
        {concerts &&
          concerts.map((concert: IGetConcert) =>
            alarmConcerts?.includes(concert.concertId) ? (
              <NotifiedConcert key={concert.concertId} concert={concert} />
            ) : null
          )}
      </div>
    </div>
  );
};

export default NotifiedConcerts;
