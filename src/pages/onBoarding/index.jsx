import React, { useEffect, useState } from "react";
// import Stepper from "@keyvaluesystems/react-stepper";
import { color } from "../../themes/color/color";
import Logo from "../../assets/img/black_logo.svg";
import { useResponsive } from "../../hooks/useResponsive";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { stepsArray } from "./stepperConstant";

export default function OnBoardingLayout() {
  const { screenType } = useResponsive();
  const navigate = useNavigate();
  // const { currentStep, completedStep } = useSelector((state) => state.onBoarding);

  const [completedSteps, setCompletedSteps] = useState([false, false, false, false, false, false]);
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


//  here is the function for checking  the array complete status 
  // useEffect(() => {
  //   // navigate(stepsArray[currentStep].url)

  //   const newCompletedSteps = Array(stepsArray.length).fill(false);
  //   completedStep.forEach((isCompleted, index) => {
  //     newCompletedSteps[index] = isCompleted;
  //   });
  //   setCompletedSteps(newCompletedSteps);
  // }, [completedStep,currentStep]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-3">
        <div className="d-flex gap-2 align-items-center justify-content-start p-2">
          <img src={Logo} alt="Deft Rank" style={{ width: 40, height: 40 }} />
          <h1 className="text-black font-size-20">Deft Rank</h1>
        </div>
        <span className="font-size-14">
          Having trouble? &nbsp;
          <span style={{ color: color.blue, fontWeight: 600 }}>Get Help</span>
        </span>
      </div>
      <div className="row">
        <div className="col-lg-3 col-sm-12">
          <div className="stepper-padding">
            {/* <Stepper
              steps={stepsArray.map((step, index) => ({
                ...step,
                completed: completedSteps[index+1],
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
            /> */}
          </div>
        </div>
        <div className="col-lg-9 col-md-12">
          <div className="container" style={{ paddingTop: "1.5rem" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
