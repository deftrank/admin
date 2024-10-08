import React, { useEffect, useState } from "react";
import { color } from "../../../themes/color/color";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Outlet, useNavigate } from "react-router-dom";
import ReadyFor from "./subcomponent/readyFor";
import TypeOfJob from "./subcomponent/jobType";
import CareerDomain from "./subcomponent/careerDomain";
import Courses from "./subcomponent/courses";
import StepperButton from "../../../component/stepperButton";
import { useSelector } from "react-redux";

export default function CareerPath() {
  const [role, setRole] = useState("Default");
  const [JobType, setJobType] = useState();
  const [status, setStatus] = useState(false);
  const navigate=useNavigate()
  const { currentStep } = useSelector((state) => state.onBoarding);
  const handleForJob = () => {
    setRole("Job");
  };
  const handleForInternship = () => {
    setRole("Internship");
  };
  const goToDashboard=()=>{
   
   navigate("/");
  }
  const handleJobRole = (type) => {
    setJobType(type);
    setStatus(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container px-0">
        <h1
          className="text-black font-size-20"
          style={{ fontSize: 24, fontWeight: 700 }}
        >
          Career Path
        </h1>
        <p
          className="font-size-14"
          style={{ color: color.secondaryGray, fontWeight: 500 }}
        >
          Select the option below that best suits you{" "}
        </p>
        {role === "Default" && !status && (
          <ReadyFor
            handleForJob={handleForJob}
            handleForInternship={handleForInternship}
          />
        )}
        {role !== "Default" && !status && (
          <TypeOfJob handleJobRole={handleJobRole} />
        )}
        {status && <Courses />}

        <div className="mt-4">
          <StepperButton currentStepIndex={currentStep}  goToDashboard={goToDashboard}/>
        </div>
      </div>
    </>
  );
}
