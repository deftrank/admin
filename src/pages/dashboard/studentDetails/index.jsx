import React, { useState } from "react";
import { color } from "../../../themes/color/color";
import bg_card from "../../../assets/img/bg/bg-card.png";
import DeftButton from "../../../component/deftButton/deftButton";
// import { ProgressBar } from "react-bootstrap";
import { dashBoardData, skillData } from "../../../component/jsonData";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
import brand from "../../../assets/img/brand/md.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useResponsive } from "../../../hooks/useResponsive";
export default function StudentDetails() {
  const percentage = 66;
  const { screenType } = useResponsive();
  const data = [1, 2, 3];
  return (
    <>
      <div
        className="p-3 ps-5 rounded-2 mt-3"
        style={{ background: color.dashboardHeader }}
      >
        <div className="row">
          <div className="col-lg-8 col-sm-12 col-md-9">
            <div className="d-flex flex-column">
              <div>
                <h6
                  className="font-size-32"
                  style={{ fontWeight: 600, lineHeight: "42px" }}
                >
                  Welcome back !
                </h6>
                <h6
                  className="font-size-14"
                  style={{ color: color.secondaryGray, fontWeight: 500 }}
                >
                  Your Dashboard: Tailored for Success
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="comingSoon">
        <h3>Launching soon! Stay tuned for more information</h3>
      </div>
      {/* <div className="row mt-3">
        {dashBoardData?.map((item) => {
          return (
            <>
              <div className="col-lg-3 col-md-4 mb-3">
                <div
                  className="rounded-2 border p-3"
                  style={{ background: `${item?.bg}` }}
                >
                  <h6 className="font-size-12" style={{ fontWeight: 400 }}>
                    {item?.title}
                  </h6>
                  <h6 className="font-size-230">{item?.value}</h6>
                </div>
              </div>
            </>
          );
        })}
      </div> */}
      {/* *************************************skill & rank ******************************** */}
      {/* <div className="row mt-3">
        <div className="col-lg-8 col-sm-12 mb-3">
          <div className="border rounded-4 p-3 px-5">
            <div className="d-flex justify-content-between">
              <h6 className="font-size-18" style={{ fontWeight: 600 }}>
                Skill Rank
              </h6>
              <h6 className="font-size-18" style={{ fontWeight: 600 }}>
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
        <div className="col-lg-4 col-sm-12 ">
          <div className="border rounded-3 p-3">
            <h6 className="font-size-18" style={{ fontWeight: 600 }}>
              All India Rank
            </h6>
            <div className="p-3 d-flex justify-content-center"> */}
      {/* <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                background
                className="circular-width"
                maxValue={100}
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#F7DE8E",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: "transparent",
                })}
              /> */}
      {/* </div>
          </div>
        </div>
      </div> */}
      {/* *************************************my test card******************************** */}
      {/* <div className="d-flex justify-content-between mt-3">
        <h6 className="font-size-20 " style={{ fontWeight: 600 }}>
          My Tests
        </h6>
        <h6 className="font-size-14">View All</h6>
      </div>
      <div className="row">
        {data?.map((item) => {
          return (
            <>
              <div
                className={`${screenType === "MOBILE" ? "col-12" : "col-4"}`}
              >
                <div className="card  rounded-3  m-1 py-2">
                  <div className="d-flex  flex-column align-items-center mt-2">
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
                    <div
                      className={`${
                        screenType === "MOBILE" ? "col-3" : "col-3"
                      }`}
                    >
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
                    <div
                      className={`${
                        screenType === "MOBILE" ? "col-9" : "col-9"
                      }`}
                    >
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
              </div>
            </>
          );
        })}
      </div> */}
      {/* *************************************My Internships card******************************** */}
      {/* <div className="d-flex justify-content-between mt-3">
        <h6 className="font-size-20 " style={{ fontWeight: 600 }}>
          My Internships
        </h6>
        <h6 className="font-size-14">View All</h6>
      </div>
      <div className="row">
        {data?.map((item) => {
          return (
            <>
              <div
                className={`${screenType === "MOBILE" ? "col-12" : "col-4"}`}
              >
                <div className="card w-100 rounded-3 px-2 m-1 py-2">
                  <div className="d-flex  j flex-row  mt-2">
                    <div className="row">
                      <div className="col-2">
                        <img
                          src={brand}
                          style={{ width: 25, height: 25 }}
                          className="rounded-circle ms-2"
                        />
                      </div>
                      <div className="col-10">
                        <div className="ms-2">
                          <h6 className={"font-size-14 mb-0"}>
                            Product Designer
                          </h6>
                          <h6 className="font-size-12">Mcdonalds India</h6>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6
                      className={"font-size-12 mb-0"}
                      style={{ color: color.secondaryGray }}
                    >
                      Primary Skill : Java
                    </h6>
                    <h6
                      className={"font-size-12 mb-0"}
                      style={{ color: color.secondaryGray }}
                    >
                      Secondary Skill : Rest API, Jira{" "}
                    </h6>
                    <h6
                      className={"font-size-12 mb-0"}
                      style={{ color: color.secondaryGray }}
                    >
                      Stipend: Rs 10,000 p.m
                    </h6>
                  </div>
                  <h6
                    className="font-size-14 ellipsis-text mt-3 "
                    style={{ webkitLineClamp: 2, fontWeight: 500 }}
                  >
                    The Visual Designer conveys design concepts into wireframes
                    and high fidelity, quality prototypes that match project
                    requirement, product objective
                  </h6>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <Icon
                        icon="mingcute:location-line"
                        className={"fs-5"}
                        style={{ color: color.secondaryGray }}
                      />
                      <h6 className="font-size-14 mb-0">Noida</h6>
                    </div>
                    <div className="d-flex  align-items-center gap-2 ">
                      <Icon
                        icon="teenyicons:clock-solid"
                        className={"fs-5"}
                        style={{ color: color.grey }}
                      />
                      <h6 className="font-size-14 mb-0">Noida</h6>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div> */}
      {/* *************************************My JOb card******************************** */}
      {/* <div className="d-flex justify-content-between mt-3">
        <h6 className="font-size-20 " style={{ fontWeight: 600 }}>
          My Job
        </h6>
        <h6 className="font-size-14">View All</h6>
      </div>
      <div className="row">
        {data?.map((item) => {
          return (
            <>
              <div
                className={`${screenType === "MOBILE" ? "col-12" : "col-4"}`}
              >
                <div className="card w-100 rounded-3 px-2 m-1 py-2">
                  <div className="d-flex  j flex-row  mt-2">
                    <div className="row">
                      <div className="col-2">
                        <img
                          src={brand}
                          style={{ width: 25, height: 25 }}
                          className="rounded-circle ms-2"
                        />
                      </div>
                      <div className="col-10">
                        <div className="ms-2">
                          <h6 className={"font-size-14 mb-0"}>
                            Product Designer
                          </h6>
                          <h6 className="font-size-12">Mcdonalds India</h6>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6
                      className={"font-size-12 mb-0"}
                      style={{ color: color.secondaryGray }}
                    >
                      Primary Skill : Java
                    </h6>
                    <h6
                      className={"font-size-12 mb-0"}
                      style={{ color: color.secondaryGray }}
                    >
                      Secondary Skill : Rest API, Jira{" "}
                    </h6>
                    <h6
                      className={"font-size-12 mb-0"}
                      style={{ color: color.secondaryGray }}
                    >
                      Stipend: Rs 10,000 p.m
                    </h6>
                  </div>
                  <h6
                    className="font-size-14 ellipsis-text mt-3 "
                    style={{ webkitLineClamp: 2, fontWeight: 500 }}
                  >
                    The Visual Designer conveys design concepts into wireframes
                    and high fidelity, quality prototypes that match project
                    requirement, product objective
                  </h6>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <Icon
                        icon="mingcute:location-line"
                        className={"fs-5"}
                        style={{ color: color.secondaryGray }}
                      />
                      <h6 className="font-size-14 mb-0">Noida</h6>
                    </div>
                    <div className="d-flex  align-items-center gap-2 ">
                      <Icon
                        icon="teenyicons:clock-solid"
                        className={"fs-5"}
                        style={{ color: color.grey }}
                      />
                      <h6 className="font-size-14 mb-0">Noida</h6>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div> */}
      {/* *************************************my comp test card******************************** */}
      {/* <div className="d-flex justify-content-between mt-3">
        <h6 className="font-size-20 " style={{ fontWeight: 600 }}>
          My Comp Tests
        </h6>
        <h6 className="font-size-14">View All</h6>
      </div>
      <div className="row">
        {data?.map((item) => {
          return (
            <>
              <div
                className={`${screenType === "MOBILE" ? "col-12" : "col-4"}`}
              >
                <div className="card  rounded-3  m-1 py-2">
                  <div className="d-flex  flex-column align-items-center mt-2">
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
                    <div
                      className={`${
                        screenType === "MOBILE" ? "col-3" : "col-3"
                      }`}
                    >
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
                    <div
                      className={`${
                        screenType === "MOBILE" ? "col-9" : "col-9"
                      }`}
                    >
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
              </div>
            </>
          );
        })}
      </div> */}
    </>
  );
}
