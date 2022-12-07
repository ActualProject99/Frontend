import { useState } from "react";
import { cls } from "../utils";
const januses: { [key: string]: string } = {
  멜론티켓: "janus1",
  인터파크: "janus2",
  yes24: "janus3",
};
const Janusface = ({ url, title }: { url: string; title: string }) => {
  const [isJanus, setIsJanus] = useState(true);
  return (
    <button
      onMouseOver={() => {
        setIsJanus(false);
      }}
      onMouseOut={() => {
        setIsJanus(true);
      }}
      className="flex-auto h-[3rem] rounded-md flex justify-center items-center bg-primary-400"
      onClick={() => window.open(url)}
    >
      {isJanus ? (
        <div className="text-white">{title}</div>
      ) : (
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="text-white">{title}</div>
          <div
            className={cls(
              "absolute left-0 top-0 bg-no-repeat bg-center w-full h-full rounded-md flex justify-center items-center",
              title === "인터파크" ? "bg-white" : "bg-primary-800",
              januses[title]
            )}
          />
        </div>
      )}
    </button>
  );
};
export default Janusface;
