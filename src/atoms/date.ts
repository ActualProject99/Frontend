import { atom } from "recoil";
import { startOfToday, parseISO, startOfMonth } from "date-fns";
import { initConcerts } from "./concert";

export const initDateSelected = null;
export const initMonth = startOfMonth(startOfToday());
export const dateSelected = atom<Date | null>({
  key: "dateSelected",
  default: initDateSelected,
});

export const monthConcerts = atom<Date | number>({
  key: "monthConcerts",
  default: initMonth,
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
