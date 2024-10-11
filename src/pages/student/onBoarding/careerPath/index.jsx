import React, { useEffect, useState } from "react";
import { color } from "../../../themes/color/color";
import { useNavigate } from "react-router-dom";
import ReadyFor from "./subcomponent/readyFor";
import TypeOfJob from "./subcomponent/jobType";
import CareerDomain from "./subcomponent/careerDomain";
import Courses from "./subcomponent/courses";
import StepperButton from "../../../component/stepperButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getCareerPath,
  getSubCareerPath,
} from "../../../store/slice/onBoardingSlice";

export default function CareerPath() {
  const [role, setRole] = useState("Default");
  const [jobType, setJobType] = useState(false);
  const [subCareer, setSubCareer] = useState(false);
  const [course, setCourse] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Ensure this is defined
  const { currentStep } = useSelector((state) => state.onBoarding);

  const handleGetCareerPath = (val) => {
    const data = {
      career_type: val,
      language: "en",
    };
    dispatch(getCareerPath(data));
    setJobType(false);
    setCourse(true);
  };

  const goToDashboard = () => {
    navigate("/");
  };

  const handleJobRole = (type) => {
    setJobType(type);
  };

  const handleSubCareerPath = (data) => {

    dispatch(getSubCareerPath(data));
    setSubCareer(true);
    setCourse(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container px-0">
      <h1 className="text-black" style={{ fontSize: 24, fontWeight: 700 }}>
        Career Path
      </h1>
      <p
        className="font-size-14"
        style={{ color: color.secondaryGray, fontWeight: 500 }}
      >
        Select the option below that best suits you
      </p>

      {role === "Default" && (
        <ReadyFor
          handleForJob={() => {
            setJobType(true);
            setRole("null");
          }}
        />
      )}
      {jobType && <TypeOfJob handleJobRole={handleGetCareerPath} />}

      {course && (
        <CareerDomain
          handleSubCareerPath={handleSubCareerPath} // Pass the function correctly
        />
      )}
      {subCareer && <Courses />}

      <div className="mt-4">
        <StepperButton
          currentStepIndex={currentStep}
          goToDashboard={goToDashboard}
        />
      </div>
    </div>
  );
}
