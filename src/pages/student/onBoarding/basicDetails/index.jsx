// @ts-nocheck
import { useEffect, useState } from "react";
import Logo from "../../../../assets/img/Logo.svg";
import DeftInput from "../../../../component/deftInput/deftInput";
import PhoneInputField from "../../../../component/phoneInput/phoneInput";
import DeftSelect from "../../../../component/dropdown";
import DeftButton from "../../../../component/deftButton/deftButton";
import { useResponsive } from "../../../../hooks/useResponsive";
import sideBg from "../../../../assets/img/bg/sidebar.png";
import { useLocation, useNavigate } from "react-router-dom";
import { sem, Course, collage } from "../../../../component/jsonData/index";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollageList,
  getCourseList,
} from "../../../../store/slice/onBoardingSlice";
import {
  generateOtp,
  register,
  setIdentifier,
} from "../../../../store/slice/authSlice";
import OtpModel from "../../../../component/modal/otpModal/otpModel";
import { toast } from "react-toastify";
import { color } from "../../../../themes/color/color";
// import { validEmail } from "../../../helper/Validations";

export default function BasicDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useLocation().search;
  const phone = new URLSearchParams(search).get("phone");
  const id = new URLSearchParams(search).get("id");

  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({});
  const [formDataError, setFormDataError] = useState({});
  const { screenType } = useResponsive();
  const [actionType, setActionType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { loginUserData, isVerified } = useSelector((state) => state.auth);
  const { collageList, courseList } = useSelector((state) => state.onBoarding);

  let phoneData = {
    countryCode: +91,
    phone: phone ?? loginUserData?.phone,
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (loginUserData) {
      if (loginUserData?.phone != "null") {
        setFormData((formData) => ({
          ...formData,
          phone: loginUserData?.phone * 1,
        }));
      }
      if (loginUserData?.email != "null") {
        setFormData((formData) => ({
          ...formData,
          email: loginUserData?.email,
        }));
      }
    }
  }, [loginUserData]);

  const handleSubmit = () => {
    console.log("registered");
    setFormDataError({});
    if (!formData?.first_name) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        first_name: "Please enter your first name.",
      }));
      return;
    }

    if (!formData?.last_name) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        last_name: "Please enter your last name.",
      }));
      return;
    }

    if (!checkIsEmpty(formData.email)) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        email: "Please enter your email address",
      }));
      return;
    }
    // else if (!validEmail(formData.email)) {
    //   setFormDataError((formDataError) => ({
    //     ...formDataError,
    //     email: "Please enter a valid email address",
    //   }));
    //   return;
    // }
    if (!formData?.phone || formData.phone.length < 10) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        phone: "Please enter your phone number.",
      }));
      return;
    }
    if (!formData?.courseName) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        courseName: "please select your course name",
      }));
      return;
    }
    if (!formData?.semester) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        semester: "please select your semester",
      }));
      return;
    }
    if (!formData?.collage) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        collage: "please select your college",
      }));
      return;
    }
    const data = {
      auth_id: loginUserData?.id,
      first_name: formData?.first_name,
      last_name: formData?.last_name,
      course_name: formData?.courseName[0]?.label,
      semester: formData?.semester[0]?.label,
      college_name: formData?.collage[0]?.label,
    };

    dispatch(register(data, navigate));
  };
  // here is fetching the list of collage
  const handleCollageList = () => {
    const data = {
      page: 1,
      limit: 20,
      search_type: 1,
      search: "",
    };
    dispatch(getCollageList(data));
  };

  //  here is generate otp
  const handleVerified = (type) => {
    setActionType(type);
    if (type === "email") {
      if (!formData.email) {
        setFormDataError((formDataError) => ({
          ...formDataError,
          email: "Please enter your email address",
        }));
        return;
      } else if (!validEmail.test(formData.email)) {
        setFormDataError((formDataError) => ({
          ...formDataError,
          email: "Please enter a valid email address",
        }));
        return;
      }
    }
    if (type === "phone") {
      if (!formData?.phone || formData.phone.length < 10) {
        setFormDataError((formDataError) => ({
          ...formDataError,
          phone: "Please enter your phone number.",
        }));
        return;
      }
    }
    const data = {
      identifier: actionType == "email" ? formData?.phone : formData?.email,
      notify_identifier:
        actionType != "email" ? formData?.phone : formData?.email,
      language: "en",
    };
    dispatch(generateOtp(data));
    setOtpModal(true);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    if (otp?.length < 4) {
      toast.error("Please enter valid OTP");
      return;
    }
    const data = {
      identifier: loginUserData?.phone
        ? loginUserData?.phone
        : loginUserData?.email,
      country_code: "+91",
      set_identifier: actionType != "email" ? formData?.phone : formData?.email,
      otp: parseInt(otp),
      language: "en",
    };
    dispatch(setIdentifier(data, setOtpModal));
  };
  useEffect(() => {
    const data = {
      page: 1,
      limit: 20,
      search: "",
    };
    dispatch(getCourseList(data));
    handleCollageList();
  }, []);
  return (
    <>
      <div
        className={`container-fluid ${
          screenType == "TABLET" ? "mx-0 px-0" : ""
        }`}
      >
        <div
          className="row"
          style={{ height: screenType == "TABLET" ? "100%" : "100vh" }}
        >
          <div className="col-12">
            <div className="container">
              <div className={"pb-0"}>
                <h4>Basic Details</h4>
                <div
                  className={"fs-6 fw-bold "}
                  style={{ color: color.grey, marginTop: "0.6rem" }}
                ></div>
                <div className="mt-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 co-sm-6 mb-3">
                      <DeftInput
                        placeholder="First Name *"
                        error={formDataError?.first_name}
                        value={formData?.first_name}
                        type="text"
                        onchange={(val) => {
                          setFormData((formData) => ({
                            ...formData,
                            first_name: val.target.value,
                          }));
                          setFormDataError((formDataError) => ({
                            ...formDataError,
                            first_name: "",
                          }));
                        }}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 mb-3">
                      <DeftInput
                        placeholder="Last Name *"
                        value={formData?.last_name}
                        type="text"
                        error={formDataError?.last_name}
                        onchange={(val) => {
                          setFormData((formData) => ({
                            ...formData,
                            last_name: val.target.value,
                          }));
                          setFormDataError((formDataError) => ({
                            ...formDataError,
                            last_name: "",
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-6 mb-3 ">
                      <DeftInput
                        readOnly={
                          loginUserData?.email && loginUserData?.email != "null"
                            ? true
                            : false
                        }
                        value={
                          loginUserData?.email && loginUserData?.email != "null"
                            ? loginUserData?.email
                            : formData?.email
                        }
                        placeholder="Email id *"
                        error={formDataError?.email}
                        onchange={(val) => {
                          setFormData((formData) => ({
                            ...formData,
                            email: val.target.value,
                          }));
                          setFormDataError((formDataError) => ({
                            ...formDataError,
                            email: "",
                          }));
                        }}
                      />
                      {formData?.email &&
                        (!loginUserData?.email ||
                          !loginUserData?.email != "null") && (
                          <h6
                            className={`font-size-12  text-end ${
                              isVerified ? "text-success" : "text-danger"
                            }`}
                            onClick={() => handleVerified("email")}
                            style={{ cursor: "pointer" }}
                          >
                            {isVerified
                              ? " verified "
                              : " Please verify email "}
                          </h6>
                        )}
                    </div>
                    <div className="col-lg-6 col-sm-6 mb-3 ">
                      <PhoneInputField
                        error={formDataError?.phone}
                        PhoneData={phoneData || formData}
                        setPhoneData={setFormData}
                        setFormDataError={setFormDataError}
                      />
                      {formData?.phone && !loginUserData?.phone && (
                        <h6
                          className={`font-size-12  text-end ${
                            isVerified ? "text-success" : "text-danger"
                          }`}
                          onClick={() => handleVerified("phone")}
                          style={{ cursor: "pointer" }}
                        >
                          {isVerified ? " verified " : " Please verify phone "}
                        </h6>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8 col-sm-12 mb-3">
                      <DeftSelect
                        error={formDataError?.courseName}
                        options={courseList}
                        value={formData?.courseName}
                        onChange={(val) => {
                          setFormData((formData) => ({
                            ...formData,
                            courseName: val,
                          }));
                          setFormDataError((formDataError) => ({
                            ...formDataError,
                            courseName: "",
                          }));
                        }}
                        placeholder="Current Course Name *"
                        dropdownHeight="200px"
                        multi={false}
                        onDropdownClose={handleDropdownClose}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12 mb-3">
                      <DeftSelect
                        error={formDataError?.semester}
                        options={sem}
                        value={formData?.semester}
                        onChange={(val) => {
                          setFormData((formData) => ({
                            ...formData,
                            semester: val,
                          }));
                          setFormDataError((formDataError) => ({
                            ...formDataError,
                            semester: "",
                          }));
                        }}
                        placeholder="Semester  *"
                        dropdownHeight="200px"
                        multi={false}
                        onDropdownClose={handleDropdownClose}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <DeftSelect
                        error={formDataError?.collage}
                        options={collageList}
                        value={formData?.collage}
                        onChange={(val) => {
                          setFormData((formData) => ({
                            ...formData,
                            collage: val,
                          }));
                          setFormDataError((formDataError) => ({
                            ...formDataError,
                            collage: "",
                          }));
                        }}
                        placeholder="College Name *"
                        dropdownHeight="200px"
                        multi={false}
                        onDropdownClose={handleDropdownClose}
                      />
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-end "
                    style={{ marginTop: "4rem" }}
                  >
                    <DeftButton
                      onClick={() => {
                        handleSubmit;
                      }}
                      btnName="Save & Next"
                      btnClass=" h-75 my-3 rounded-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {otpModal && (
        <OtpModel
          open={otpModal}
          handleClose={() => {
            setOtpModal(false);
          }}
          actionType={actionType}
          number={formData}
          otp={otp}
          HandleOtp={(value) => {
            setOtp(value);
          }}
          handleGenerateOtp={handleVerified}
          handleSubmit={handleVerifyOtp}
        />
      )}
    </>
  );
}
