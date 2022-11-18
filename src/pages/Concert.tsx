import ConcertInfo from "../components/concertDetail/ConcertInfo";
import ConcertApi from "../apis/query/ConcertApi";
import { useParams } from "react-router-dom";
import MoreInfo from "../components/concertDetail/MoreInfo";
import { NaverMap } from "../components/concertDetail/NaverMap";
import useTaps from "../hooks/useTaps";
import Chat from "../components/concertDetail/Chat";
import CommentList from "../components/concertDetail/comment/CommentList";

const Concert = () => {
  const { data: concerts } = ConcertApi.GetConcerts();
  const { id } = useParams();

  return (
    <>
      {concerts &&
        concerts.map((concert) =>
          concert.concertId === Number(id) ? (
            <ConcertInfo concert={concert} />
          ) : null
        )}
    </>
  );
};

export default Concert;
