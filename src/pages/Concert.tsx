import ConcertInfo from "../components/concertDetail/ConcertInfo";
import ConcertApi from "../apis/query/ConcertApi";
import { useParams } from "react-router-dom";

const Concert = () => {
  const { data: concerts } = ConcertApi.GetConcerts();
  const { id } = useParams();

  return (
    <>
      {concerts &&
        concerts.map((concert) =>
          concert.concertId === Number(id) ? (
            <ConcertInfo key={concert.id} concert={concert} />
          ) : null
        )}
    </>
  );
};

export default Concert;
