import { isPast } from "date-fns";
import Countdown from "./Countdown";

interface CountProps {
  dday: Date;
}

const ShowCountDown = ({ dday }: CountProps) => {
  const [days, hours, minutes, seconds] = Countdown(dday);

  return isPast(dday) ? null : (
    <div className="flex gap-2">
      <p className="font-bold mr-1">D-day </p>
      <div className="flex items-center gap-1 font-bold text-accent-main">
        <p>{days}</p>
        <p className="text-xs text-[#707070]">D</p>
      </div>
      <div className="flex items-center gap-1 font-bold text-accent-main">
        <p>{hours}</p>
        <p className="text-xs text-[#707070]">H</p>
      </div>
      <div className="flex items-center gap-1 font-bold text-accent-main">
        <p>{minutes}</p>
        <p className="text-xs text-[#707070]">M</p>
      </div>
      <div className="flex items-center gap-1 font-bold text-accent-main">
        <p>{seconds}</p>
        <p className="text-xs text-[#707070]">S</p>
      </div>
    </div>
  );
};

export default ShowCountDown;
