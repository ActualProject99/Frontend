import Example from "../components/Calendar";
import { useState } from "react";
import { cls } from "../utils";

const concerts = [
  {
    id: 1,
    group: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-11-11T13:00",
    endDatetime: "2022-11-11T14:30",
  },
  {
    id: 2,
    group: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-11-20T09:00",
    endDatetime: "2022-11-20T11:30",
  },
  {
    id: 3,
    group: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 4,
    group: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-11-09T13:00",
    endDatetime: "2022-11-09T14:30",
  },
  {
    id: 5,
    group: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-11-13T14:00",
    endDatetime: "2022-11-13T14:30",
  },
];

const groups = [
  "전체",
  "아이돌",
  "발라드/R&B",
  "트로트",
  "힙합",
  "인디/록",
  "POP",
];
const Concerts = () => {
  const [select, setSelect] = useState(0);
  const handleClick = (i: number) => () => {
    setSelect(i);
  };
  return (
    <>
      <ul className="flex justify-center gap-3">
        {groups.map((group, i) => (
          <li
            key={group}
            className={cls(
              "px-3 py-1 rounded-full cursor-pointer flex items-center justify-center font-bold ",
              i === select && "bg-primary text-white"
            )}
            onClick={handleClick(i)}
          >
            {group}
          </li>
        ))}
      </ul>
      <Example
        concerts={concerts.filter(
          (concert) => !select || concert.group === select
        )}
      />
    </>
  );
};

export default Concerts;
