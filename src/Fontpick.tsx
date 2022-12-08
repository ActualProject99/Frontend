import React from "react";

const Fontpick = () => {
  const fontname: any = {
    한나air: "BMHANNAAir",
    한나pro: "BMHANNAPro",
    나눔: "NanumSquareNeo-Variable",
    모노: "MonoplexKR-Regular",
    한림: "HallymGothic-Regular",
    웰컴: "OTWelcomeRA",
    프리: "Pretendard-Regular",
  };
  const handleClickFont = (e: any) => () => {
    document
      .querySelector("body")
      ?.setAttribute("style", `font-family: ${fontname[e]}, sans-serif`);
  };
  return process.env.NODE_ENV === "development" ? (
    <div className="flex flex-col fixed left-0 bottom-20 gap-2">
      {Object.keys(fontname).map((e: string) => (
        <button
          className="w-20 h-10 font-bold bg-accent-main hover:bg-white hover:border hover:border-accent-main rounded"
          onClick={handleClickFont(e)}
        >
          {e}
        </button>
      ))}
    </div>
  ) : null;
};

export default Fontpick;
