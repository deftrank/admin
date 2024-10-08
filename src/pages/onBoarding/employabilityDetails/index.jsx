// @ts-nocheck
import React, { useEffect, useState } from "react";
import { color } from "../../../themes/color/color";
import { Accordion } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DeftInput from "../../../component/deftInput/deftInput";
import DeftSelect from "../../../component/dropdown";
import StepperButton from "../../../component/stepperButton";
import { useSelector } from "react-redux";

export default function EmployabilityDetails() {
  const [education, setEducation] = useState();
  const { currentStep } = useSelector((state) => state.onBoarding);
  const eductionLevel = [
    {
      value: 1,
      label: "High School",
    },
    {
      value: 2,
      label: "Intermediate",
    },
    {
      value: 3,
      label: "Graduate",
    },
    {
      value: 4,
      label: "Post Graduate",
    },
  ];
  useEffect
  (() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container px-0">
        <h1
          className="text-black font-size-20"
          style={{ fontSize: 24, fontWeight: 700 }}
        >
          Employability Details
        </h1>
        <p
          className="font-size-14"
          style={{ color: color.secondaryGray, fontWeight: 500 }}
        >
          Enter your personal details for us to serve you better{" "}
        </p>

        <div className="d-flex align-items-center border-top mt-4">
          <Accordion defaultActiveKey="0" flush style={{ width: "100%" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="d-flex flex-column">
                  <h6 style={{ fontWeight: 600 }}>Internship Details</h6>
                  <p
                    className="font-size-14"
                    style={{ fontWeight: 400, color: color.grey }}
                  >
                    Please fill or edit the details if you are looking for
                    internship opportunities
                  </p>
                </div>
              </Accordion.Header>
              <Accordion.Body className={"px-0"}>
                <div className="d-flex justify-content-start">
                  <div className="d-flex gap-3 align-items-center">
                    <h6 className="fs-6 mb-0" style={{ fontWeight: 600 }}>
                      Ready for internship
                    </h6>
                    <Form.Check // prettier-ignore
                      type="switch"
                      id="custom-switch"
                      className="custom-check  shadow-none"
                    />
                  </div>
                </div>
                <div className=" my-3">
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftInput placeholder="" type="date" />
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftInput placeholder="" type="date" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={eductionLevel} // Assuming you have different options for location
                        value={education}
                        onChange={setEducation}
                        placeholder="College NOC Available"
                        dropdownHeight="200px"
                        multi={false}
                        // onDropdownClose={handleDropdownClose}
                      />
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={eductionLevel} // Assuming you have different options for location
                        value={education}
                        onChange={setEducation}
                        placeholder="Expected Stipend Amount"
                        dropdownHeight="200px"
                        multi={false}
                        // onDropdownClose={handleDropdownClose}
                      />
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={eductionLevel} // Assuming you have different options for location
                        value={education}
                        onChange={setEducation}
                        placeholder="Preferred Location"
                        dropdownHeight="200px"
                        multi={false}
                        // onDropdownClose={handleDropdownClose}
                      />
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                {" "}
                <div className="d-flex flex-column">
                  <h6>Job Details</h6>
                  <p className="font-size-14" style={{ fontWeight: 400 }}>
                    Please fill or edit the details if you are looking for full
                    time job opportunities
                  </p>
                </div>
              </Accordion.Header>
              <Accordion.Body className={"px-0"}>
                <div className="d-flex justify-content-start">
                  <div className="d-flex gap-3 align-items-center">
                    <h6 className="fs-6 mb-0" style={{ fontWeight: 600 }}>
                      Ready for Job
                    </h6>
                    <Form.Check // prettier-ignore
                      type="switch"
                      id="custom-switch"
                      className="custom-check  shadow-none"
                    />
                  </div>
                </div>
                <div className=" my-3">
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftInput placeholder="" type="date" />
                    </div>
           
                  </div>
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={eductionLevel} // Assuming you have different options for location
                        value={education}
                        onChange={setEducation}
                        placeholder="College NOC Available"
                        dropdownHeight="200px"
                        multi={false}
                        // onDropdownClose={handleDropdownClose}
                      />
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={eductionLevel} // Assuming you have different options for location
                        value={education}
                        onChange={setEducation}
                        placeholder="Expected Stipend Amount"
                        dropdownHeight="200px"
                        multi={false}
                        // onDropdownClose={handleDropdownClose}
                      />
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={eductionLevel} // Assuming you have different options for location
                        value={education}
                        onChange={setEducation}
                        placeholder="Preferred Location"
                        dropdownHeight="200px"
                        multi={false}
                        // onDropdownClose={handleDropdownClose}
                      />
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>


         
        </div>
        <div className="mt-4">
          <StepperButton currentStepIndex={currentStep} />
          </div>
      </div>
    </>
  );
}
