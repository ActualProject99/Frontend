import Calendar, { CalenderDrawer } from "../components/Calendar";
import { useEffect, useState } from "react";
import { cls } from "../utils";
import Cards from "../components/Cards";
import {
  concertsDatesFiltered,
  dateAllConcerts,
  dateSelected,
} from "../atoms/date";
import { useRecoilState } from "recoil";
import useFixoluteBox from "../hooks/useFixsolute";
import { Concert, datedConcerts, showingConcerts } from "../atoms/concert";
import useWindowSize from "../hooks/useWindowSize";
import Modal from "../components/Modal";
import useDrawer from "../hooks/useDrawer";
import { AnimatePresence, motion } from "framer-motion";
import Portal from "../components/Portal";

const groups = [
  "전체",
  "아이돌",
  "발라드/R&B",
  "트로트",
  "힙합",
  "인디/록",
  "POP",
];
const Concerts = ({ no1, no2 }: { no1?: boolean; no2?: boolean }) => {
  const [select, setSelect] = useState(0);
  const [getShowingConcerts, setShowingConcerts] =
    useRecoilState<Concert[]>(showingConcerts);
  const [getdateAllConcerts, setdateAllConcerts] =
    useRecoilState<Date[]>(dateAllConcerts);
  const {
    refs: { fixsolute, limit },
    fixoluteStyle,
  } = useFixoluteBox();
  const { width, height, isMd } = useWindowSize();
  const [dateChosen] = useRecoilState<Date>(dateSelected);
  const { handle, Content } = useDrawer({
    component: <>hi</>,
    side: "up",
  });
  const handleClick = (i: number) => () => {
    setSelect(i);
    setdateAllConcerts(concertsDatesFiltered(i));
    setShowingConcerts(datedConcerts(i, dateChosen.getDate()));
  };
  useEffect(() => {
    setShowingConcerts(datedConcerts(select, dateChosen.getDate()));
    setIsVisible(false);
  }, [select, dateChosen]);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="pt-16 mb-8 min-h-[700px]">
      <div className="max-w-md px-4 mx-auto md:max-w-6xl h-full">
        <div className="md:grid md:grid-cols-3 md:divide-x md:divide-gray-200 h-full">
          <div className="relative h-full">
            {isMd ? (
              <div className="w-80" ref={fixsolute} style={fixoluteStyle}>
                <Calendar selectable checkedDates={getdateAllConcerts} />
                <ul className="flex justify-center gap-3 flex-wrap mt-12 md:px-8">
                  {groups.map((group, i) => (
                    <li
                      key={group}
                      className={cls(
                        "px-3 py-1 rounded-full cursor-pointer flex items-center justify-center font-bold border transition-colors",
                        i === select && "bg-primary-main text-white"
                      )}
                      onClick={handleClick(i)}
                    >
                      {group}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <Portal>
                  <button
                    className={cls(
                      "fixed top-1/4 transition-all",
                      isVisible ? "-left-16" : "left-0"
                    )}
                    onClick={() => {
                      setIsVisible((cur) => !cur);
                    }}
                  >
                    <CalenderDrawer />
                  </button>
                </Portal>
                <AnimatePresence>
                  {isVisible ? (
                    <Modal
                      onClick={() => {
                        setIsVisible((cur) => !cur);
                      }}
                    >
                      <div className="fixed left-0 top-0">
                        <Calendar
                          selectable
                          checkedDates={getdateAllConcerts}
                        />
                        <ul className="flex justify-center gap-3 flex-wrap mt-12 md:px-8">
                          {groups.map((group, i) => (
                            <li
                              key={group}
                              className={cls(
                                "px-3 py-1 rounded-full cursor-pointer flex items-center justify-center font-bold border transition-colors",
                                i === select && "bg-primary-main text-white"
                              )}
                              onClick={handleClick(i)}
                            >
                              {group}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Modal>
                  ) : null}
                </AnimatePresence>
              </>
            )}
          </div>
          <section
            ref={limit}
            className="mt-12 md:min-h-[700px] md:mt-0 md:pl-8 flex flex-col justify-center items-center gap-10 md:col-span-2"
          >
            {/* <h2 className="font-semibold text-gray-900">
                Schedule for{" "}
                <time dateTime={format(dateChosen, "yyyy-MM-dd")}>
                  {format(dateChosen, "MMM dd, yyy")}
                </time>
              </h2> */}

            <div className="hidden xl:flex gap-4 justify-center mt-12 flex-wrap">
              {getShowingConcerts.length > 0 ? (
                getShowingConcerts.map((consert, i) => (
                  <Cards key={i} vertical concert data={consert} />
                ))
              ) : (
                <p>No concerts for today.</p>
              )}
            </div>
            <div className="flex xl:hidden gap-2 justify-center mt-12 flex-wrap">
              {getShowingConcerts.length > 0 ? (
                getShowingConcerts.map((consert, i) => (
                  <Cards key={i} horizontal concert data={consert} />
                ))
              ) : (
                <p>No concerts for today.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Concerts;
