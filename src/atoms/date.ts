import { atom } from "recoil";
import { startOfToday } from "date-fns";

export const initDate = startOfToday();
export const dateSelected = atom<Date>({
  key: "dateSelected",
  default: initDate,
});
