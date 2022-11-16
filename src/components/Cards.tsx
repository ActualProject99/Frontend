import { format, isSameDay, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
interface Concert {
  id: number;
  group: number;
  name: string;
  location: string;
  imageUrl: string;
  startDatetime: string;
  endDatetime: string;
}
const Cards = ({ concert, data }: { concert?: boolean; data: Concert }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`./${data.id}`);
  };
  return concert ? (
    <div className="p-6 border w-56 h-96 cursor-pointer" onClick={handleClick}>
      <img className="w-[180px] h-[250px] mx-auto" src={data.imageUrl} alt="" />
      <p className="whitespace-nowrap overflow-hidden text-ellipsis text-base font-bold">
        {data.name}
      </p>
      {/* <p className="text-xs">
        {format(parseISO(data.startDatetime), "yyyy-MM-dd") +
          " ~ " +
          format(parseISO(data.startDatetime), "yyyy-MM-dd")}
      </p> */}
      <p className="text-xs">{data.location}</p>
    </div>
  ) : null;
};

export default Cards;