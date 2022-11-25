import { atom } from "recoil";
import { startOfToday, parseISO } from "date-fns";
import { initConcerts } from "./concert";

export const initDateSelected = startOfToday();
export const dateSelected = atom<Date>({
  key: "dateSelected",
  default: initDateSelected,
});

export const concertsDatesFiltered = (groupNo: number) => {
  return initConcerts
    .filter((concert) => groupNo === 0 || concert.group === groupNo)
    .map((concert) => parseISO(concert.startDatetime));
};
export const initDateAllConcerts = concertsDatesFiltered(0);
export const dateAllConcerts = atom<Date[]>({
  key: "dateAllConcerts",
  default: initDateAllConcerts,
});
