// @ts-nocheck
import React, { useEffect, useState } from "react";
import DeftInput from "../../../component/deftInput/deftInput";
import DeftSelect from "../../../component/dropdown";
import defaultImage from "../../../assets/img/default.jpg";
import { useResponsive } from "../../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
// import DatePicker from "react-datepicker";
import StepperButton from "../../../component/stepperButton";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-country-state-city/dist/react-country-state-city.css";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
// } from "react-country-state-city";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
} from "../../../store/slice/onBoardingSlice";
import { FormControl } from "react-bootstrap";

export default function PersonalDetails({ handleDropdownClose }) {
  const { screenType } = useResponsive();
  const [formData, setFormData] = useState({});
  const [formDataError, setFormDataError] = useState({});
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.onBoarding);
  console.log("userData", userData);
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, [formData, dispatch]);

  const { currentStep } = useSelector((state) => state.onBoarding);
  const handleSubmit = () => {
    if (!formData?.dob) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        dob: "please Select dob ",
      }));
      return;
    }
    if (!formData?.gender) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        gender: "please Select Your gender ",
      }));
      return;
    }
    setFormDataError("");
    let data = {
      first_name: userData?.firstName,
      last_name: userData?.lastName,
      course_name: userData?.collegeName,
      semester: userData?.semester,
      college_name: userData?.collegeName,
      birth_date: formData?.dob,
      gender: formData?.gender[0]?.label,
      current_location: formData?.city?.name,
      state: formData?.state?.name,
      pin_code: formData?.pin_code,
      country: formData?.country,
      github_url: "https://github.com/johndoe",
      linkedin_url: formData?.linkedinId,
      profile_url: "https://profileurl.com/johndoe",
      language: "en",
    };
    dispatch(updateProfile(data));
  };

  return (
    <>
      <div>
        <h1
          className="text-black font-size-20"
          style={{ fontSize: 24, fontWeight: 700 }}
        >
          Personal Details
        </h1>
        <div>
          <div className="row">
            <div
              className={`col-md-10 col-sm-12 ${
                screenType === "MOBILE" ? "order-1" : ""
              }`}
            >
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 mb-3">
                  <DatePicker
                    placeholderText="Date of birth"
                    className="w-100"
                    selected={formData?.dob} // Ensure this is a Date object
                    onChange={(date) => {
                      setFormData({ ...formData, dob: date }); // Set the selected date
                    }}
                    customInput={
                      <FormControl
                        className="example-custom-input border rounded-2 "
                        style={{ height: 47 }}
                      />
                    }
                  />
                  {formDataError?.dob && (
                    <div
                      className="text-danger font-size-14"
                      style={{ fontWeight: 400 }}
                    >
                      {formDataError?.dob}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-sm-12 mb-3">
                
                  <DeftSelect
                    options={options}
                    error={formDataError?.gender}
                    value={[{
                      value:1,
                      label:userData?.gender || formData?.gender
                    }]}
                    placeholder="Gender"
                    dropdownHeight="200px"
                    multi={false}
                    onChange={(val) => {
                      setFormData({ ...formData, gender: val });
                    }}
                    onDropdownClose={handleDropdownClose}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 mb-3">
                  <CountrySelect
                    value={2}
                    inputClassName="border-0"
                    placeHolder="Country *"
                    onChange={(val) => {
                      console.log(val)
                      setFormData({ ...formData, country: val });
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 mb-3">
                  <StateSelect
                    inputClassName="border-0"
                    countryid={formData.country?.id}
                    onChange={(val) => {
                      setFormData({ ...formData, state: val });
                    }}
                    placeHolder="Select State *"
                  />
                </div>
              </div>

              <div className="row ">
                <div className="col-lg-6 col-md-6 mb-3">
                  <CitySelect
                    inputClassName="border-0"
                    placeHolder="City *"
                    countryid={formData.country?.id}
                    stateid={formData?.state?.id}
                    onChange={(val) => {
                      setFormData({ ...formData, city: val });
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 mb-3">
                  <DeftInput
                    placeholder="Pin Code *"
                    onchange={(e) => {
                      console.log(e, "here is the data ");
                      setFormData({ ...formData, pin_code: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 mb-3">
                  <DeftInput
                    placeholder="GitHub ID"
                    type="text"
                    value={formData?.gitHub_id}
                    onchange={(e) => {
                      setFormData({ ...formData, gitHub_id: e.target.value });
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <DeftInput
                    placeholder="LinkedIn ID"
                    type="text"
                    value={formData?.linkedinId}
                    onchange={(e) => {
                      setFormData({ ...formData, linkedinId: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className={`col-md-2 col-sm-12 pt-4 ${
                screenType === "MOBILE"
                  ? "order-0 my-3 d-flex justify-content-center"
                  : ""
              }`}
            >
              <img
                src={defaultImage}
                alt=""
                style={{ width: 100, height: 100 }}
                className="rounded-3"
              />
            </div>
          </div>
        </div>
      </div>
      <StepperButton
        currentStepIndex={currentStep}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
