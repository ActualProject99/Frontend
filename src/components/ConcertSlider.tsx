import { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Next from "../image/Next.png";
import Prev from "../image/Prev.png";
import { useNavigate } from "react-router-dom";
import { IGetHotConcert } from "../types";

interface hotConcertProps {
  hotConcerts: IGetHotConcert[] | undefined;
}

const ConcertSlider = ({ hotConcerts }: hotConcertProps): JSX.Element => {
  const navigate = useNavigate();

  const [dragging, setDragging] = useState<boolean>(false);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, []);

  const handleAfterChange = useCallback((i: number) => {
    setDragging(false);
  }, []);
  useEffect(() => {
    console.log("dd", document.querySelector(".slick-prev"));
    setTimeout(() => {
      document
        .querySelector(".slick-prev")
        ?.setAttribute("style", "z-index: 1");
    }, 300);
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerPadding: "60px",
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 1000,
    arrows: true,
    variableWidth: false,
    touchThreshold: 100,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: (
      <div>
        <div className="flex justify-items-center items-center rounded-[50%] w-14 h-14 leading-8 z-10 absolute left-14 top-[1.25rem;] bg-black/30">
          <img alt="prev" src={Prev} />
        </div>
      </div>
    ),
    nextArrow: (
      <div>
        <div className=" flex justify-items-center items-center rounded-[50%] w-14 h-14 leading-8 z-1 absolute text-right right-16 bg-black/30">
          <img className="ml-1" alt="next" src={Next} />
        </div>
      </div>
    ),
  };
  return (
    <div className="relative">
      <div className="flex flex-col justify-center w-screen-scroll h-[43rem] absolute -top-[41.735rem] left-1/2 -translate-x-1/2 overflow-hidden bg-primary-900 ">
        <div className="flex justify-center items-center w-64 h-16 text-3xl text-accent-main font-logo">
          <p className="ml-5 -mt-5 text-shadow">
            HOT <span className="text-white text-shadow1">CONCERT</span>
          </p>
        </div>
        <Slider {...settings}>
          {hotConcerts &&
            hotConcerts?.map((hotConcert) => (
              <div key={hotConcert.concertId}>
                <div
                  className="flex flex-col relative overflow-hidden w-[26rem] group m-5 font-bold text-white cursor-pointer shadow-lg shadow-black rounded"
                  onClick={() => navigate(`/concerts/${hotConcert.concertId}`)}
                >
                  <div className="flex flex-col justify-between w-full h-[40%] absolute -bottom-full bg-black/80 group-hover:bottom-0 transition-all duration-700 peer z-10 p-4">
                    <div>
                      <p className="text-2xl">{hotConcert.posterName}</p>
                    </div>
                    <div className="flex flex-col justify-end items-end gap-x-3">
                      {hotConcert.exclusion === "인터파크 단독" ? (
                        <div className="flex justify-center items-center w-28 bg-[#EF554D]/60 text-white rounded">
                          인터파크 단독
                        </div>
                      ) : null}
                      {hotConcert.exclusion === "멜론티켓 단독" ? (
                        <div className="flex justify-center items-center w-28 bg-[#41D26B]/60 text-white rounded">
                          melon 단독
                        </div>
                      ) : null}
                      {hotConcert.exclusion === "yes24 단독" ? (
                        <div className="flex justify-center items-center w-28 bg-[#196ab3]/60 text-white rounded">
                          yes24 단독
                        </div>
                      ) : null}
                      <p className="text-xl text-accent-main">
                        {hotConcert.ticketingDate}
                      </p>
                      <p className="text-xl">{hotConcert.locationName}</p>
                    </div>
                  </div>
                  <img
                    title={hotConcert.posterName}
                    className="w-[26rem] h-[33rem] m-auto transition-all duration-700 ease-in-out rounded hover:scale-110 peer-hover:scale-110"
                    alt="img"
                    src={hotConcert.posterImg}
                  />
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};
export default ConcertSlider;
