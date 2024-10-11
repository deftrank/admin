// @ts-nocheck
import React, { useEffect, useState } from "react";
import DeftInput from "../../../../component/deftInput/deftInput";
import DeftSelect from "../../../../component/dropdown";
import defaultImage from "../../../../assets/img/default.jpg";
import { useResponsive } from "../../../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import StepperButton from "../../../../component/stepperButton";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
// } from "react-country-state-city";
import {
  getProfile,
  updateProfile,
} from "../../../../store/slice/onBoardingSlice";
import { FormControl } from "react-bootstrap";

export default function PersonalDetails({ handleDropdownClose }) {
  const { screenType } = useResponsive();
  const { userData, completeProfile } = useSelector(
    (state) => state?.onBoarding
  );
  const [formData, setFormData] = useState({
    dob: completeProfile?.birth_date || "",
    gender: completeProfile?.gender || "",
    country: completeProfile?.country || "",
    state: completeProfile?.state || "",
    city: completeProfile?.city || "",
    pin_code: completeProfile?.pin_code || "",
    linkedinId: completeProfile?.linkedin_url || "",
    gitHub_id: completeProfile?.github_url || "",
  });
  const [formDataError, setFormDataError] = useState({});
  const dispatch = useDispatch();
  console.log(completeProfile);
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const { currentStep } = useSelector((state) => state.onBoarding);

  const handleSubmit = (handleNextStep) => {
    const errors = {};
    if (!formData.dob) {
      errors.dob = "Please select your date of birth.";
    }
    if (!formData.gender) {
      errors.gender = "Please select your gender.";
    }
    setFormDataError(errors);
    if (Object.keys(errors).length > 0) return;

    const data = {
      first_name: userData?.firstName,
      last_name: userData?.lastName,
      course_name: userData?.collegeName,
      semester: userData?.semester,
      college_name: userData?.collegeName,
      birth_date: formData.dob,
      gender: formData.gender.label,
      current_location: formData.city?.name,
      state: formData.state?.name,
      pin_code: formData.pin_code,
      country: formData.country?.name,
      github_url: "https://github.com/johndoe",
      linkedin_url: formData.linkedinId,
      profile_url: "https://profileurl.com/johndoe",
      language: "en",
    };
    dispatch(updateProfile(data, handleNextStep));
  };

  return (
    <>
      <div>
        <h1
          className="text-black font-size-20"
          style={{ fontSize: 24, fontWeight: 700, paddingBottom: "1.5rem" }}
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
                    selected={formData.dob}
                    onChange={(date) => setFormData({ ...formData, dob: date })}
                    customInput={
                      <FormControl
                        className="example-custom-input border rounded-2"
                        style={{ height: 47 }}
                      />
                    }
                  />
                  {formDataError.dob && (
                    <div
                      className="text-danger font-size-14"
                      style={{ fontWeight: 400 }}
                    >
                      {formDataError.dob}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-sm-12 mb-3">
                  <DeftSelect
                    options={options}
                    error={formDataError.gender}
                    value={formData.gender ? [formData.gender] : []}
                    placeholder="Gender"
                    dropdownHeight="200px"
                    multi={false}
                    onChange={(val) =>
                      setFormData({ ...formData, gender: val[0] })
                    }
                    onDropdownClose={handleDropdownClose}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 mb-3">
                  {/* <CountrySelect
                    inputClassName="country-input"
                    placeHolder="Country *"
                    onChange={(val) =>
                      setFormData({ ...formData, country: val })
                    }
                  /> */}
                </div>
                <div className="col-lg-6 col-md-6 mb-3">
                  {/* <StateSelect
                    inputClassName="country-input"
                    countryid={formData.country?.id}
                    onChange={(val) => setFormData({ ...formData, state: val })}
                    placeHolder="Select State *"
                  /> */}
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 mb-3">
                  {/* <CitySelect
                    inputClassName="country-input"
                    placeHolder="City *"
                    countryid={formData.country?.id}
                    stateid={formData.state?.id}
                    onChange={(val) => setFormData({ ...formData, city: val })}
                  /> */}
                </div>
                <div className="col-lg-6 col-md-6 mb-3">
                  <DeftInput
                    maxLength={6}
                    type="number"
                    placeholder="Pin Code *"
                    onChange={(e) =>
                      setFormData({ ...formData, pin_code: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 mb-3">
                  <DeftInput
                    placeholder="GitHub ID"
                    type="text"
                    value={formData.gitHub_id}
                    onChange={(e) =>
                      setFormData({ ...formData, gitHub_id: e.target.value })
                    }
                  />
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <DeftInput
                    placeholder="LinkedIn ID"
                    type="text"
                    value={formData?.linkedinId}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedinId: e.target.value })
                    }
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
                alt="Default"
                style={{ width: 100, height: 100 }}
                className="rounded-3"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <StepperButton
        currentStepIndex={currentStep}
        handleSubmit={handleSubmit}
      /> */}
    </>
  );
}
