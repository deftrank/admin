import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import brand from "../../../assets/img/brand/md.png";
import { color } from "../../../themes/color/color";
import { useResponsive } from "../../../hooks/useResponsive";

const SlickSlider = (props) => {
  const {screenType}=useResponsive()
  const { Sponsered } = props;
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  const settings = {
    dots: false, // Show dots for navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: screenType==="MOBILE"?1: screenType==="TABLET"?1:3, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    arrows: true,
  };

  return (
    <div className="slick-slider mx-4">
      {" "}
      {/* Ensure that this class name is used in your CSS */}
      <Slider {...settings}>
        {data?.map((item) => {
          return (
            <>
              <div className="card  rounded-3  m-1 py-2">
                <h6 className="font-size-14 ms-1 " style={{color:color.green,fontWeight:500}}>{Sponsered}</h6>
                <div className="d-flex  flex-column align-items-center">
                  <img
                    src={brand}
                    style={{ width: 60, height: 60 }}
                    className="rounded-circle"
                  />
                  <h6 className={"font-size-18"} style={{ fontWeight: 500 }}>
                    Java Assessment
                  </h6>
                </div>
                <h6
                  className="text-center my-1 font-size-14"
                  style={{ fontWeight: 400, color: color.secondaryGray }}
                >
                  Beginner
                </h6>
                <div className="row my-2 px-1">
                  <div className="col-lg-3 col-sm-2">
                    <div
                      className=" rounded-3"
                      style={{
                        background: color.lightGreen,
                        width: 60,
                        padding: 2,
                      }}
                    >
                      <h6
                        className={"font-size-12 text-center mb-0"}
                        style={{ fontWeight: 600, fontSize: 10 }}
                      >
                        Score
                      </h6>
                      <h6
                        className="font-size-14 text-center mb-0"
                        style={{ color: color.green, fontSize: 12 }}
                      >
                        40/100
                      </h6>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-10">
                    <div
                      className=" rounded-3"
                      style={{
                        background: color.yellowLight,

                        padding: 2,
                      }}
                    >
                      {" "}
                      <h6
                        className={"font-size-12 text-center mb-0"}
                        style={{ fontWeight: 600, fontSize: 10 }}
                      >
                        Time ( Time Taken / Total Time)
                      </h6>
                      <h6
                        className="font-size-14 text-center mb-0"
                        style={{ color: color.yellow, fontSize: 12 }}
                      >
                        45 minutes/120 minutes
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlickSlider;
