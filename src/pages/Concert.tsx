import ConcertInfo from "../components/concertDetail/ConcertInfo";
import ConcertApi from "../apis/query/ConcertApi";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Concert = () => {
  const { data: concerts } = ConcertApi.GetConcerts();
  const { id } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {concerts &&
        concerts.map((concert) =>
          concert.concertId === Number(id) ? (
            <ConcertInfo key={concert.concertId} concert={concert} />
          ) : null
        )}
    </motion.div>
  );
};

export default Concert;
