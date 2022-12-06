import React, { useState } from "react";

const MouseStalker = () => {
  const pos = document.documentElement;
  const [Janusface, setJanusface] = useState(true);
  pos.addEventListener("mousemove", (e) => {
    pos.style.setProperty("--x", e.offsetX + "px");
    pos.style.setProperty("--y", e.offsetY + "px");
  });

  /* 
    https://bit.ly/3H2hrMK 멜론티켓
    https://bit.ly/3FeC0nD 인터파크
    https://bit.ly/3VrmFpE YES24
  */

  return (
    <>
      <button
        onMouseOver={() => {
          setJanusface(false);
        }}
        onMouseOut={() => {
          setJanusface(true);
        }}
        className="w-[11.8rem] h-[3rem] rounded-3xl flex justify-center items-center bg-[#7151a1]"
      >
        {Janusface ? (
          <div className="text-white">예매하기</div>
        ) : (
          <>
            <div className="text-white">예매하기</div>
            <div className="janus absolute bg-no-repeat bg-contain w-[10rem] h-[2rem] bg-[#7151a1]" />
          </>
        )}
      </button>
      
    </>
  );
};

export default MouseStalker;
