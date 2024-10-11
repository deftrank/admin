import React, { useEffect, useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import { color } from "../../../themes/color/color";
import Logo from "../../../assets/img/black_logo.svg";
import { useResponsive } from "../../../hooks/useResponsive";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stepsArray, stepsArrayProfile } from "./stepperConstant";
import { useLocation } from "preact-iso";

export default function OnBoardingLayout() {
  const { screenType } = useResponsive();
  const navigate = useNavigate();
  const path = window.location.pathname;
  const { currentStep, completedStep, isProfile } = useSelector(
    // @ts-ignore
    (state) => state.onBoarding
  );

  console.log("here route", isProfile);

  console.log("here route", currentStep, " == ", completedStep);

  console.log("here route", stepsArray);
  const dispatch = useDispatch();
  const [completedSteps, setCompletedSteps] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // here is custom css of stepper
  const styles = {
    ActiveNode: () => ({
      backgroundColor: color.primary,
      fontSize: "16px",
      fontWeight: 500,
    }),
    CompletedNode: () => ({
      backgroundColor: "#028A0F",
      fontSize: "20px",
      fontWeight: 500,
      width: "40px",
      height: "40px",
    }),
    InactiveNode: () => ({
      backgroundColor: "#ccc",
      fontSize: "20px",
      fontWeight: 500,
      width: "40px",
      height: "40px",
    }),
  };

  // useEffect(() => {
  //   dispatch(getCompleteProfile());
  // }, []);
  //  here is the function for checking  the array complete status

  // useEffect(() => {
  //   //navigate(isProfile?stepsArrayProfile[currentStep].url:stepsArray[currentStep].url);

  //   const newCompletedSteps = Array(stepsArray.length).fill(false);
  //   completedStep.forEach((isCompleted, index) => {
  //     newCompletedSteps[index] = isCompleted;
  //   });
  //   setCompletedSteps(newCompletedSteps);
  // }, [completedStep, currentStep]);

  console.log("path == ", path.includes("personal-detail"));

  return (
    <div
      className={screenType === "MOBILE" ? "container" : ""}
      style={{
        paddingLeft: screenType === "MOBILE" ? "" : "4rem",
        paddingRight: screenType === "MOBILE" ? "" : "4rem",
      }}
    >
      <div>
        <div className="row bg-white ">
          <div className="col-lg-3 col-sm-12">
            <div className="stepper-padding">
              <Stepper
                steps={stepsArrayProfile.map((step, index) => ({
                  ...step,
                  completed: completedSteps[index + 1],
                }))}
                currentStepIndex={currentStep}
                styles={styles}
                orientation={
                  screenType === "TABLET" || screenType === "MOBILE"
                    ? "horizontal"
                    : "vertical"
                }
                labelPosition={
                  screenType === "TABLET" || screenType === "MOBILE"
                    ? "bottom"
                    : "right"
                }
              />
            </div>
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="container" style={{ paddingTop: "1.5rem" }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
