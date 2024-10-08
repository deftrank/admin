import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { color } from "../../../themes/color/color";
import c_badge from "../../../assets/img/icons/badge.png";
import problem from "../../../assets/img/icons/badge2.png";
import { useResponsive } from "../../../hooks/useResponsive";
import SlickSlider from "./swiper";
import { companies } from "../../../component/jsonData";

export default function index() {
  const { screenType } = useResponsive();
  const skillData = [
    { id: 1, skill: "java", level: "Beginner", rank: "200/300" },
    { id: 2, skill: "Cloud", level: "Medium", rank: "10/3000" },
    { id: 3, skill: "Angular", level: "Advanced", rank: "3/300" },
  ];
  const badges = [
    {
      src: c_badge,
    },
    {
      src: problem,
    },
    {
      src: c_badge,
    },
    {
      src: c_badge,
    },
    {
      src: c_badge,
    },
    {
      src: c_badge,
    },
    {
      src: problem,
    },
    {
      src: c_badge,
    },
    {
      src: problem,
    },
    {
      src: problem,
    },
    {
      src: problem,
    },
  ];
  return (
    <section className="py-4 mt-5 container">
      <div className=" py-3 ">
        <div className="shadow-lg position-relative rounded-4">
          <div
            style={{
              // backgroundImage: `url(${profileBg})`,
              height: 140,
              backgroundSize: "cover",
            }}
            className=" rounded-top-4"
          ></div>
          <img
            // src={studentProfile}
            alt=""
            className="img-fluid position-absolute rounded-circle top-25"
            style={{
              width: 100,
              height: 100,
              transform: "translate(40px, -50px)",
            }}
          />
          <div className="mt-5 pb-4 ">
            <div className="container ms-2">
              <div className="row">
                <div className="col-6">
                  <h6 className="font-size-20 ">Ritesh</h6>
                  <div className="row align-items-center">
                    <div className="col-1">
                      <Icon
                        icon="icon-park-outline:degree-hat"
                        className="fs-2"
                        style={{ color: color.secondaryGray }}
                      />
                    </div>
                    <div className="col-11">
                      <h6
                        style={{ color: color.secondaryGray }}
                        className="mb-0"
                      >
                        B.Tech •7th Semester
                      </h6>
                    </div>
                  </div>{" "}
                  <div className="row mt-2 align-items-center">
                    <div className="col-1">
                      <Icon
                        icon="carbon:location-filled"
                        className="fs-2"
                        style={{ color: color.secondaryGray }}
                      />
                    </div>
                    <div className="col-11">
                      <h6
                        style={{ color: color.secondaryGray }}
                        className="mb-0"
                      >
                        Noida, Uttar Pradesh
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* here is user details  */}
      <div className="row mt-5">
        <div className="col-lg-6 col-md-12  ">
          <div className="border rounded-4 p-3 px-5">
            <h6 className="font-size-18" style={{ fontWeight: 500 }}>
              Details
            </h6>
            <div className="row mt-3  pb-2 border-bottom">
              <div className="col-lg-6 col-sm-12 col-md-6">
                <h6 className={"fs-6 text-start"} style={{ fontWeight: 600 }}>
                  Available For Internship
                </h6>
                <h6
                  className={"text-start font-size-14 mb-0"}
                  style={{ fontWeight: 400 }}
                >
                  Yes
                </h6>
              </div>
              <div className="col-lg-6 col-sm-12 col-md-6">
                <h6 className={"fs-6 text-start"} style={{ fontWeight: 600 }}>
                  Available For Job{" "}
                </h6>
                <h6
                  className={"text-start font-size-14 mb-0"}
                  style={{ fontWeight: 400 }}
                >
                  Yes
                </h6>
              </div>
            </div>
            <div className="row mt-3  pb-2 border-bottom">
              <div className="col-lg-6 col-sm-12 col-md-6">
                <h6 className={"fs-6 text-start"} style={{ fontWeight: 600 }}>
                  Available For Internship From
                </h6>
                <h6
                  className={"text-start font-size-14 mb-0"}
                  style={{ fontWeight: 400 }}
                >
                  May 2024
                </h6>
              </div>
              <div className="col-lg-6 col-sm-12 col-md-6">
                <h6 className={"fs-6 text-start"} style={{ fontWeight: 600 }}>
                  Available For Job From
                </h6>
                <h6
                  className={"text-start font-size-14 mb-0"}
                  style={{ fontWeight: 400 }}
                >
                  20-Mar-24
                </h6>
              </div>
            </div>
            <div className="row mt-3  pb-2">
              <div className="col-lg-6 col-sm-12 col-md-6">
                <h6 className={"fs-6 text-start"} style={{ fontWeight: 600 }}>
                  Preferred Location
                </h6>
                <h6
                  className={"text-start font-size-14 mb-0"}
                  style={{ fontWeight: 400 }}
                >
                  Lucknow, Noida, Bengaluru
                </h6>
              </div>
            </div>
          </div>
        </div>
        {/* here is skill rank */}
        <div
          className={
            screenType === "MOBILE"
              ? "col-lg-6 col-md-12  mt-4 "
              : screenType === "TABLET"
              ? "mt-4 col-lg-6 col-md-12"
              : "col-6"
          }
        >
          <div className="border rounded-4 p-3 px-5">
            <div className="d-flex justify-content-between">
              <h6 className="font-size-18" style={{ fontWeight: 500 }}>
                Skill Rank
              </h6>
              <h6 className="font-size-18" style={{ fontWeight: 500 }}>
                AIR 20/5423
              </h6>
            </div>
            <div className="row mt-3  pb-2 border-bottom">
              <div className="col-4">
                <h6
                  className={"font-size-14  text-start"}
                  style={{ fontWeight: 700, color: color.secondaryGray }}
                >
                  skill
                </h6>
              </div>
              <div className="col-4">
                <h6
                  className={"font-size-14  text-start"}
                  style={{ fontWeight: 700, color: color.secondaryGray }}
                >
                  Level
                </h6>
              </div>
              <div className="col-4">
                <h6
                  className={"font-size-14  text-start"}
                  style={{ fontWeight: 700, color: color.secondaryGray }}
                >
                  Rank
                </h6>
              </div>
            </div>
            {skillData?.map((item, key) => {
              return (
                <>
                  <div
                    className={`row mt-3 pb-2 ${
                      skillData.length === item?.id ? "" : "border-bottom"
                    }`}
                    key={key}
                  >
                    {" "}
                    <div className="col-4">
                      <h6
                        className={"font-size-14  text-start"}
                        style={{
                          fontWeight: 400,
                          color: color.secondaryGray,
                        }}
                      >
                        {item?.skill}
                      </h6>
                    </div>
                    <div className="col-4">
                      <h6
                        className={"font-size-14  text-start"}
                        style={{
                          fontWeight: 400,
                          color: color.secondaryGray,
                        }}
                      >
                        {item?.level}
                      </h6>
                    </div>
                    <div className="col-4">
                      <h6
                        className={"font-size-14  text-start"}
                        style={{
                          fontWeight: 400,
                          color: color.secondaryGray,
                        }}
                      >
                        {item?.rank}
                      </h6>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      {/* here is badges and test result row  */}
      <div className="row mt-4">
        <div
          className={`col-lg-3 col-md-4 ${
            screenType === "MOBILE" ? "mb-4" : ""
          }`}
        >
          <div className="shadow-lg p-4 rounded-3" style={{ minHeight: 285 }}>
            <div>
              <h6 className={"font-size-18"} style={{ fontWeight: 500 }}>
                All Badges
              </h6>
              <div className="d-flex flex-wrap gap-3 justify-content-start">
                {badges?.map((item) => {
                  return (
                    <>
                      <img src={item?.src} style={{ width: 41, height: 41 }} />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`col-lg-9 col-md-8 ${
            screenType === "MOBILE" ? "mt-4" : ""
          }`}
        >
          <div className="shadow-lg rounded-3 px-2 pb-4 pt-2">
            <h6 className={"font-size-18 pt-2 ps-3"}>Notable Test Passed</h6>
            <SlickSlider />
          </div>
        </div>
      </div>
      {/* here is notable comp test */}
      <div className="row mt-4">
        <div
          className={`col-lg-3   col-sm-12 col-md-4 ${
            screenType === "MOBILE" ? "mt-4 mb-2" : ""
          }`}
        >
          <div
            className="shadow-lg p-4 px-3 rounded-3"
            style={{ height: 305, overflowY: "scroll" }}
          >
            {companies?.map((item) => {
              return (
                <>
                  <div className={"mb-4"}>
                    <h6 className={"font-size-18"} style={{ fontWeight: 500 }}>
                      internship Feedback
                    </h6>
                    <div className="d-flex align-items-center gap-1">
                      <span
                        className={"font-size-14"}
                        style={{ fontWeight: 500 }}
                      >
                        4.6
                      </span>
                      <span style={{ marginTop: "-3px" }}>
                        {" "}
                        {Array.from({ length: 5 }, (_, i) => (
                          <Icon
                            key={i}
                            icon="ic:round-star"
                            className="text-warning"
                            style={{ fontSize: "14px" }} // Adjust size as needed
                          />
                        ))}
                      </span>
                      <span
                        className={"font-size-14"}
                        style={{ fontWeight: 500 }}
                      >
                        Total 2 Feedbacks
                      </span>
                    </div>
                    <div className={"mt-4 mb-3"}>
                      <h6
                        className={"fs-6 mb-0"}
                        style={{ fontWeight: 600, lineHeight: "21.6px" }}
                      >
                        {item?.title}
                      </h6>
                      <h6
                        className="font-size-14"
                        style={{
                          fontWeight: 400,
                          color: color.secondaryGray,
                        }}
                      >
                        Technology Services Company
                      </h6>

                      <h6
                        className={"font-size-14"}
                        style={{ color: color.green, fontWeight: 500 }}
                      >
                        Sponsered By
                      </h6>
                    </div>
                    {/* skill and rating section  */}
                    {item?.rank?.map((rating, key) => {
                      return (
                        <>
                          <div className="d-flex align-items-center justify-content-between">
                            <h6
                              className={"font-size-14 mb-0"}
                              style={{
                                color: color.primaryBlack,
                                fontWeight: 500,
                              }}
                            >
                              {rating?.text1
                                ? rating?.text1
                                : rating?.text2
                                ? rating?.text2
                                : rating?.text3
                                ? rating?.text3
                                : rating?.text4}
                            </h6>
                            <span>
                              {Array.from(
                                {
                                  length: rating?.Skill
                                    ? rating?.Skill
                                    : rating?.Availability
                                    ? rating?.Availability
                                    : rating?.Learning_attitude
                                    ? rating?.Learning_attitude
                                    : rating?.Professionalism,
                                },
                                (_, i) => (
                                  <Icon
                                    key={i}
                                    icon="ic:round-star"
                                    className="text-warning"
                                    style={{ fontSize: "14px" }} // Adjust size as needed
                                  />
                                )
                              )}
                            </span>
                          </div>
                        </>
                      );
                    })}
                    <hr />
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div
          className={`col-lg-9 col-sm-12 col-md-8 ${
            screenType === "MOBILE" ? "mt-4" : ""
          }`}
        >
          <div className="shadow-lg rounded-3 px-2 pb-4 pt-2">
            <h6 className={"font-size-18 pt-2 ps-3"}>Notable Comp Tests</h6>
            <SlickSlider Sponsered="Sponsered By" />
          </div>
        </div>
      </div>
    </section>
  );
}
