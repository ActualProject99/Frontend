import { atom } from "recoil";
import { startOfToday, parseISO, startOfMonth } from "date-fns";

export const initDateSelected = null;
const initMonth = startOfMonth(startOfToday());
export const dateSelected = atom<Date | null>({
  key: "dateSelected",
  default: initDateSelected,
});

export const monthConcerts = atom<Date | number>({
  key: "monthConcerts",
  default: initMonth,
});
