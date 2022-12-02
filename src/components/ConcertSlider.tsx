import { useEffect } from "react";
import Slider from "react-slick";
import UserApi from "../apis/query/UserApi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Next from "../image/Next.png";
import Prev from "../image/Prev.png";
import { useNavigate } from "react-router-dom";
import { cls } from "../utils";

const ConcertSlider = (): JSX.Element => {
  const { data: concerts } = UserApi.GetLikeConcert();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector(".slick-prev")
        ?.setAttribute("style", "z-index: 1");
    }, 100);
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
    arrows: true,
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
          <img alt="next" src={Next} />
        </div>
      </div>
    ),
  };
  return (
    <div className="relative">
      <div className="flex flex-col justify-center w-screen-scroll h-[43rem] absolute left-1/2 -translate-x-1/2 overflow-hidden bg-primary-900">
        {/* <div className="flex justify-center items-center w-64 h-16 text-3xl text-accent-main font-logo">
          <p className="ml-5 text-shadow">HOT CONCERT</p>
        </div> */}
        <Slider {...settings}>
          {concerts &&
            concerts.map((concert) => (
              <div key={concert.id}>
                <div
                  className="flex flex-col relative overflow-hidden group m-5 gap-2 font-bold text-white cursor-pointer"
                  onClick={() => navigate(`/concerts/${concert.concertId}`)}
                >
                  <div className="flex flex-col justify-between w-full h-1/3 absolute -bottom-full bg-black/80 group-hover:bottom-0 transition-all duration-700 peer z-10 p-4">
                    <div>
                      <p className="text-2xl">{concert.title}</p>
                    </div>
                    <div className="flex flex-col justify-end items-end gap-x-3">
                      {concert.buy === "인터파크 단독" ? (
                        <div className="flex justify-center items-center w-28 bg-[#EF554D]/60 text-white rounded">
                          인터파크 단독
                        </div>
                      ) : null}
                      {concert.buy === "melon 단독" ? (
                        <div className="flex justify-center items-center w-28 bg-[#41D26B]/60 text-white rounded">
                          melon 단독
                        </div>
                      ) : null}
                      {concert.buy === "yse24 단독" ? (
                        <div className="flex justify-center items-center w-28 bg-[#196ab3]/60 text-white rounded">
                          yse24 단독
                        </div>
                      ) : null}
                      <p className="text-xl text-accent-main">
                        {concert.showTimes}
                      </p>
                      <p className="text-xl">{concert.location}</p>
                    </div>
                  </div>
                  <img
                    title={concert.title}
                    className="w-[26rem] h-[33rem] m-auto transition-all duration-700 ease-in-out hover:scale-110 peer-hover:scale-110"
                    alt="img"
                    src={concert.posterUrl}
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
