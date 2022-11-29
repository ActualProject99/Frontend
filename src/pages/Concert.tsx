import ConcertInfo from "../components/concertDetail/ConcertInfo";
import ConcertApi from "../apis/query/ConcertApi";
import { useParams } from "react-router-dom";

const Concert = () => {
  const { data: concerts } = ConcertApi.GetConcerts();
  console.log("콘서트조회", concerts);
  const { id } = useParams();
  console.log("data22", concerts);
  console.log("id", id);

  return (
    <>
      {concerts &&
        concerts.map((concert) =>
          concert.concertId === Number(id) ? (
            <ConcertInfo key={concert.concertId} concert={concert} />
          ) : null
        )}
    </>
  );
};

export default Concert;
