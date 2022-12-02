import { useNavigate } from "react-router-dom";
import { CardsProps } from "../types";

const Cards = ({
  concert,
  data,
  horizontal,
  vertical,
  ...rest
}: CardsProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`./${data.id}`);
  };
  return (
    <>
      {concert && vertical ? (
        <div
          className="p-6 border w-56 h-96 cursor-pointer"
          onClick={handleClick}
        >
          <img
            className="w-[180px] h-[250px] mx-auto"
            src={data.imageUrl}
            alt=""
          />
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
      ) : null}
      {concert && horizontal ? (
        <div
          className="p-6 border w-56 h-96 cursor-pointer"
          onClick={handleClick}
        >
          <img
            className="w-[180px] h-[250px] mx-auto"
            src={data.imageUrl}
            alt=""
          />
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
      ) : null}
    </>
  );
};
export default Cards;
