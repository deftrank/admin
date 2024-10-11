// @ts-nocheck
import React, { useEffect, useState } from "react";
import { color } from "../../../themes/color/color";
import { Accordion, Form, FormControl } from "react-bootstrap";
import DeftSelect from "../../../component/dropdown";
import StepperButton from "../../../component/stepperButton";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { cities, ctcRanges, stipend } from "../../../component/jsonData";
import { submitEmployabilityData } from "../../../store/slice/onBoardingSlice";

export default function EmployabilityDetails() {
  const [activeKey, setActiveKey] = useState(null);
  const [formData, setFormData] = useState({});
  const [formDataError, setFormDataError] = useState({});
  const [isNavigate, setNavigate] = useState(false);
  const dispatch = useDispatch();
  const { currentStep, userData } = useSelector((state) => state.onBoarding);
  const noc = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const handleAccordionToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey); // Toggle logic
  };

  const handleSubmit = (handleNextStep) => {
    // const errors = {}; // Object to hold error messages

    // // Internship validation
    // if (!formData.startDate) {
    //   errors.startDate = "Please select the start date.";
    // }
    // if (!formData.endDate) {
    //   errors.endDate = "Please select the end date.";
    // }
    // if (
    //   formData.startDate &&
    //   formData.endDate &&
    //   formData.startDate > formData.endDate
    // ) {
    //   errors.endDate = "End date must be after the start date.";
    // }
    // if (!formData.noc) {
    //   errors.noc = "Please select the NOC.";
    // }
    // if (!formData.stipend) {
    //   errors.stipend = "Please provide the stipend range.";
    // }
    // if (!formData.location) {
    //   errors.location = "Please choose your preferred location.";
    // }

    // // Job validation
    // if (activeKey === "1") {
    //   if (!formData.jobStartDate) {
    //     errors.jobStartDate = "Please select the job start date.";
    //   }
    //   if (
    //     formData.jobStartDate &&
    //     formData.jobEndDate &&
    //     formData.jobStartDate > formData.jobEndDate
    //   ) {
    //     errors.jobEndDate = "Job end date must be after the job start date.";
    //   }
    //   if (!formData.nocForJob) {
    //     errors.nocForJob = "Please select the NOC for the job.";
    //   }
    //   if (!formData.ctc) {
    //     errors.ctc = "Please provide the expected CTC.";
    //   }
    //   if (!formData.jobLocation) {
    //     errors.jobLocation = "Please choose your preferred job location.";
    //   }
    // }

    // // Check if there are any errors
    // if (Object.keys(errors).length > 0) {
    //   setFormDataError(errors);
    //   return;
    // }

    const data = {
      id: userData?.id,
      job_search:
        activeKey == "0" ? formData?.readyForInternship : formData?.readyForJob,
      employ_type: activeKey == "0" ? 1 : 2,
      start_date:
        activeKey == "0" ? formData?.startDate : formData?.jobStartDate,
      end_date: activeKey == "0" ? formData?.endDate : "",
      noc_avail:
        activeKey == "0"
          ? formData?.noc[0].value
          : formData?.nocForJob[0].value,
      salary:
        activeKey == "0" ? formData?.stipend[0].label : formData?.ctc[0].label,
      location:
        activeKey == "0"
          ? formData?.location[0].label
          : formData?.jobLocation[0].label,
    };
    dispatch(submitEmployabilityData(data, handleNextStep));
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
          Employability Details
        </h1>
        <p
          className="font-size-14"
          style={{ color: color.secondaryGray, fontWeight: 500 }}
        >
          Enter your personal details for us to serve you better
        </p>

        <div className="d-flex align-items-center border-top mt-4">
          <Accordion activeKey={activeKey} flush style={{ width: "100%" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={() => handleAccordionToggle("0")}>
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
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      className="custom-check shadow-none"
                      onChange={(e) => {
                        setFormData((formData) => ({
                          ...formData,
                          readyForInternship: e.target.checked,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="my-3">
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DatePicker
                        placeholderText="Start Date"
                        className="w-100"
                        selected={formData.startDate}
                        onChange={(date) => {
                          setFormData({ ...formData, startDate: date });
                          setFormDataError((prev) => ({
                            ...prev,
                            startDate: undefined,
                          })); // Clear error
                        }}
                        customInput={
                          <FormControl
                            className="example-custom-input border rounded-2"
                            style={{ height: 47 }}
                          />
                        }
                      />
                      {formDataError.startDate && (
                        <p className="text-danger">{formDataError.startDate}</p>
                      )}
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DatePicker
                        placeholderText="End Date"
                        className="w-100"
                        selected={formData.endDate}
                        onChange={(date) => {
                          setFormData({ ...formData, endDate: date });
                          setFormDataError((prev) => ({
                            ...prev,
                            endDate: undefined,
                          })); // Clear error
                        }}
                        customInput={
                          <FormControl
                            className="example-custom-input border rounded-2"
                            style={{ height: 47 }}
                          />
                        }
                      />
                      {formDataError.endDate && (
                        <p className="text-danger">{formDataError.endDate}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={noc}
                        value={formData.noc}
                        onChange={(e) => {
                          setFormData({ ...formData, noc: e });
                          setFormDataError((prev) => ({
                            ...prev,
                            noc: undefined,
                          })); // Clear error
                        }}
                        placeholder="College NOC Available"
                        dropdownHeight="200px"
                        multi={false}
                      />
                      {formDataError.noc && (
                        <p className="text-danger">{formDataError.noc}</p>
                      )}
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={stipend}
                        value={formData.stipend}
                        onChange={(e) => {
                          setFormData({ ...formData, stipend: e });
                          setFormDataError((prev) => ({
                            ...prev,
                            stipend: undefined,
                          })); // Clear error
                        }}
                        placeholder="Expected Stipend Amount"
                        dropdownHeight="200px"
                        multi={false}
                      />
                      {formDataError.stipend && (
                        <p className="text-danger">{formDataError.stipend}</p>
                      )}
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={cities}
                        value={formData.location}
                        onChange={(e) => {
                          setFormData({ ...formData, location: e });
                          setFormDataError((prev) => ({
                            ...prev,
                            location: undefined,
                          })); // Clear error
                        }}
                        placeholder="Preferred Location"
                        dropdownHeight="200px"
                        multi={false}
                      />
                      {formDataError.location && (
                        <p className="text-danger">{formDataError.location}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header onClick={() => handleAccordionToggle("1")}>
                <div className="d-flex flex-column">
                  <h6>Job Details</h6>
                  <p className="font-size-14" style={{ fontWeight: 400 }}>
                    Please fill or edit the details if you are looking for
                    full-time job opportunities
                  </p>
                </div>
              </Accordion.Header>
              <Accordion.Body className={"px-0"}>
                <div className="d-flex justify-content-start">
                  <div className="d-flex gap-3 align-items-center">
                    <h6 className="fs-6 mb-0" style={{ fontWeight: 600 }}>
                      Ready for Job
                    </h6>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      className="custom-check shadow-none"
                      onChange={(e) => {
                        setFormData((formData) => ({
                          ...formData,
                          readyForJob: e.target.checked,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="my-3">
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DatePicker
                        placeholderText="Start Date"
                        className="w-100"
                        selected={formData.jobStartDate}
                        onChange={(date) => {
                          setFormData({ ...formData, jobStartDate: date });
                          setFormDataError((prev) => ({
                            ...prev,
                            jobStartDate: undefined,
                          })); // Clear error
                        }}
                        customInput={
                          <FormControl
                            className="example-custom-input border rounded-2"
                            style={{ height: 47 }}
                          />
                        }
                      />
                      {formDataError.jobStartDate && (
                        <p className="text-danger">
                          {formDataError.jobStartDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={noc}
                        value={formData.nocForJob}
                        onChange={(e) => {
                          setFormData({ ...formData, nocForJob: e });
                          setFormDataError((prev) => ({
                            ...prev,
                            nocForJob: undefined,
                          })); // Clear error
                        }}
                        placeholder="College NOC Available"
                        dropdownHeight="200px"
                        multi={false}
                      />
                      {formDataError.nocForJob && (
                        <p className="text-danger">{formDataError.nocForJob}</p>
                      )}
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        options={ctcRanges}
                        value={formData.ctc}
                        onChange={(e) => {
                          setFormData({ ...formData, ctc: e });
                          setFormDataError((prev) => ({
                            ...prev,
                            ctc: undefined,
                          })); // Clear error
                        }}
                        placeholder="Expected CTC Amount"
                        dropdownHeight="200px"
                        multi={false}
                      />
                      {formDataError.ctc && (
                        <p className="text-danger">{formDataError.ctc}</p>
                      )}
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                      <DeftSelect
                        error={formDataError.jobLocation}
                        options={cities}
                        value={formData.jobLocation}
                        onChange={(e) => {
                          setFormData({ ...formData, jobLocation: e });
                          setFormDataError((prev) => ({
                            ...prev,
                            jobLocation: undefined,
                          })); // Clear error
                        }}
                        placeholder="Preferred Location"
                        dropdownHeight="200px"
                        multi={false}
                      />
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="mt-4">
          <StepperButton
            currentStepIndex={currentStep}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}
