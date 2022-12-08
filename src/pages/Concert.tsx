//@ts-nocheck

import ConcertInfo from "../components/concertDetail/ConcertInfo";
import ConcertApi from "../apis/query/ConcertApi";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Concert = () => {
  // const { data: concerts } = ConcertApi.GetConcerts();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const concerts = queryClient.getQueryState(["concert"]);
  // const concert = concerts?.find((concert) => concert.concertId === +id);
  console.log(concerts);
  return (
    <>
      {/* {concerts &&
        concerts.map((concert) =>
          concert.concertId === Number(id) ? (
            <ConcertInfo key={concert.concertId} concert={concert} />
          ) : null
        )} */}
    </>
  );
};

export default Concert;
