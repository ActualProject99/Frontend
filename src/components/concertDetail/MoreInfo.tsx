import React from "react";

const MoreInfo = () => {
  return (
    <div className="px-5 py-8">
      <p className="text-2xl mb-7 ">출연진</p>
      <div className="flex gap-x-7 mb-10">
        <div className="grid content-center justify-start justify-items-center items-center">
          <img
            className="w-24 h-24 rounded-[50%]"
            alt="artist"
            src="https://cdnimg.melon.co.kr/cm2/artistcrop/images/018/65/556/1865556_20221028132435.jpg/melon/thumbnail/320x300"
          />
          <p>SAAY</p>
        </div>
        <div className="grid content-center justify-start justify-items-center items-center">
          <img
            className="w-24 h-24 rounded-[50%]"
            alt="artist"
            src="https://cdnimg.melon.co.kr/cm2/artistcrop/images/018/65/556/1865556_20221028132435.jpg/melon/thumbnail/320x300"
          />
          <p>SAAY</p>
        </div>
      </div>
      <div className="mb-10">
        <p className="text-2xl mb-5 ">공연시간</p>
        <p className="pl-1">2022년 12월 15일(목) 오후 8시</p>
      </div>
      <div className="mb-10">
        <p className="text-2xl mb-5 ">작품설명</p>
        <img
          alt="concertInfo"
          src="https://cdnticket.melon.co.kr/resource/image/upload/product/2022/10/202210271723577c456247-ac91-478d-a0dd-7a730e6fa234.jpg/melon/quality/90/optimize"
          className="pl-1"
        ></img>
      </div>
    </div>
  );
};

export default MoreInfo;
