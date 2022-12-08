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
    navigate(`./${data.concertId}`);
  };
  return (
    <>
      {concert && vertical ? (
        <div
          className="p-6 border w-56 h-[22rem] cursor-pointer relative"
          onClick={handleClick}
        >
          <img
            className="w-[180px] h-[250px] mx-auto"
            src={data.concertImg}
            alt=""
          />
          <p className="whitespace-nowrap overflow-hidden text-ellipsis text-base font-bold">
            {data.concertName}
          </p>
          <p className="text-xs">{data.locationName}</p>
          {data.saleDone === "판매완료" ? (
            <p className="flex items-center justify-center absolute top-7 right-5 w-16 h-5 text-sm text-white font-bold rounded bg-slate-500 mr-2">
              {data.saleDone}
            </p>
          ) : (
            <p className="flex items-center justify-center absolute top-7 right-5 w-16 h-5 text-sm text-white font-bold rounded bg-accent-main mr-2">
              {data.saleDone}
            </p>
          )}
        </div>
      ) : null}
      {concert && horizontal ? (
        <div
          className="p-6 border w-56 h-96 cursor-pointer"
          onClick={handleClick}
        >
          <img
            className="w-[180px] h-[250px] mx-auto"
            src={data.concertImg}
            alt=""
          />
          <p className="whitespace-nowrap overflow-hidden text-ellipsis text-base font-bold">
            {data.concertName}
          </p>
          {/* <p className="text-xs">
        {format(parseISO(data.startDatetime), "yyyy-MM-dd") +
          " ~ " +
          format(parseISO(data.startDatetime), "yyyy-MM-dd")}
      </p> */}
          <p className="text-xs">{data.locationName}</p>
          <div className="flex justify-end">
            {data.saleDone === "판매완료" ? (
              <p className="flex items-center justify-center w-16 h-5 text-sm text-white font-bold rounded bg-slate-500 mr-2">
                {data.saleDone}
              </p>
            ) : (
              <p className="flex items-center justify-center w-16 h-5 text-sm text-white font-bold rounded bg-accent-main mr-2">
                {data.saleDone}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Cards;
