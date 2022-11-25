import { useEffect } from "react";
import Slider from "react-slick";
import UserApi from "../apis/query/UserApi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Next from "../image/Next.png";
import Prev from "../image/Prev.png";
import { useNavigate } from "react-router-dom";

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
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 1000,
    arrows: true,
    prevArrow: (
      <div>
        <div className="flex justify-items-center items-center rounded-[50%] w-14 h-14 leading-8 z-10 absolute left-14 top-[1.25rem;] bg-[#ffffff6b]">
          <img alt="prev" src={Prev} />
        </div>
      </div>
    ),
    nextArrow: (
      <div>
        <div className=" flex justify-items-center items-center rounded-[50%] w-14 h-14 leading-8 z-1 absolute text-right right-16 bg-[#ffffff6b]">
          <img alt="next" src={Next} />
        </div>
      </div>
    ),
  };
  return (
    <div className="relative">
      <div className="flex flex-col w-screen-scroll h-[43rem] absolute left-1/2 -translate-x-1/2 overflow-hidden bg-[#63468f]">
        <div className="flex justify-center items-center  w-52 h-14  text-2xl font-bold">
          HOT CONCERT
        </div>
        <Slider {...settings}>
          {concerts &&
            concerts.map((concert) => (
              <div>
                <div className="flex flex-col justify-center items-start m-5 gap-2 font-bold">
                  <img
                    className="w-full h-[25rem] m-auto transition-all ease-in-out hover:scale-110 shadow-md shadow-white/50"
                    alt="img"
                    src={concert.posterUrl}
                  />
                  {concert.title.length < 11 ? (
                    <p className="flex mt-5 w-72 text-xl">{concert.title}</p>
                  ) : (
                    <p className="w-72 mt-5 text-xl overflow-hidden text-ellipsis whitespace-nowrap">
                      {concert.title}
                    </p>
                  )}
                  <p>{concert.showTimes}</p>
                  <p>{concert.location}</p>
                  <button
                    className="w-full h-10 rounded border-none mt-3 shadow-2xl bg-white text-[#7151A1] hover:text-white hover:bg-[#4b208c]"
                    onClick={() => navigate(`/concerts/${concert.concertId}`)}
                  >
                    예매
                  </button>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};
export default ConcertSlider;
