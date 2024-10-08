// @ts-nocheck
import { useEffect, useState } from "react";
import { color } from "../../../themes/color/color";
import Logo from "../../../assets/img/Logo.svg";
import DeftInput from "../../../component/deftInput/deftInput";
import PhoneInputField from "../../../component/phoneInput/phoneInput";
import DeftSelect from "../../../component/dropdown";
import DeftButton from "../../../component/deftButton/deftButton";
import { useResponsive } from "../../../hooks/useResponsive";
import sideBg from "../../../assets/img/bg/sidebar.png";
import { useNavigate } from "react-router-dom";
import { sem, Course, collage } from "../../../component/jsonData/index";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollageList,
  getCourseList,
} from "../../../store/slice/onBoardingSlice";
import {
  generateOtp,
  register,
  setIdentifier,
} from "../../../store/slice/authSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import OtpModel from "../../../component/modal/otpModal/otpModel";
export default function BasicDetails() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const { loginUserData, isVerified } = useSelector((state) => state.auth);
  const {collageList,courseList} = useSelector((state) => state.onBoarding);

  let phoneData = {
    countryCode: +91,
    phone: loginUserData?.phone,
  };
  const [otpModal, setOtpModal] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDataError, setFormDataError] = useState({});
  const { screenType } = useResponsive();
  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //  here is submit and validation
  const handleSubmit = () => {
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
    dispatch(register(data,navigate));
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
  const handleVerified = () => {
    const data = {
      identifier: loginUserData?.phone
        ? loginUserData?.phone
        : loginUserData?.email,
      notify_identifier: formData?.phone ? formData?.phone : formData?.email,
      language: "en",
    };
    dispatch(generateOtp(data));
    setOtpModal(true);
  };

  //  here is otp value

  const HandleOtp = (value) => {
    setOtp(value);
  };
  const handleVerifyOtp = () => {
    const data = {
      identifier: loginUserData?.phone
        ? loginUserData?.phone
        : loginUserData?.email,
      country_code: "+91",
      set_identifier: formData?.phone ? formData?.phone : formData?.email,
      otp: parseInt(otp),
      language: "en",
    };
    dispatch(setIdentifier(data));
    setOtpModal(false)
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
        className={`container bg-white ${
          screenType == "TABLET" ? "mx-0 px-0" : ""
        }`}
      >
        <div
          className="row"
          style={{ height: screenType == "TABLET" ? "100%" : "100vh" }}
        >
          <div className="col-lg-4 col-md-5">
            <div
              style={{
                backgroundImage: `url(${sideBg})`,
                backgroundSize: "cover",
                height: "100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={` p-4 container-fluid ${
                screenType == "MOBILE"
                  ? ""
                  : "d-flex justify-content-between flex-column"
              }`}
            >
              <div className="d-flex gap-2 align-items-center justify-content-start p-2">
                <img src={Logo} style={{ width: 40, height: 40 }} />

                <h1 className={"text-white font-size-20"}>Deft Rank</h1>
              </div>
              <div
                className={`  pb-4 ${
                  screenType == "MOBILE" ? "px-2 mt-4 " : " px-4 "
                }`}
              >
                <h1
                  className={"font-size-32 text-white"}
                  style={{ fontSize: screenType == "MOBILE" ? "20px" : "" }}
                >
                  A few clicks away from unlocking your potential.
                </h1>
                <h6 className={"font-size-14 text-white "}>
                  Start your lorem ipsum dolot sit amet save time and money.
                </h6>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7 ">
            {/* *****************here is basic details form******************************* */}
            <div className="container py-4">
              <div className="d-flex justify-content-end">
                <span className={"font-size-14"}>
                  Having trouble? &nbsp;
                  <span style={{ color: color.blue, fontWeight: 600 }}>
                    Get Help
                  </span>
                </span>
              </div>
              <div
                style={{
                  padding:
                    screenType == "TABLET" || screenType == "MOBILE"
                      ? "2rem 1rem"
                      : "5rem",
                }}
                className={"pb-0"}
              >
                <h4>Basic Details</h4>
                <h6 className={"font-size-14"} style={{ color: color.grey }}>
                  Enter your basic details for us to serve you better{" "}
                </h6>
                <div className="container mt-3">
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
                        value={
                          loginUserData?.email
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
                      {!loginUserData?.email && (
                        <h6
                          className={`font-size-12  text-end ${
                            isVerified ? "text-success" : "text-danger"
                          }`}
                          onClick={handleVerified}
                          style={{ cursor: "pointer" }}
                        >
                          {isVerified ? " verified " : " Please verify email "}
                        </h6>
                      )}
                    </div>
                    <div className="col-lg-6 col-sm-6 mb-3 ">
                      <PhoneInputField
                        error={formDataError?.phone}
                        PhoneData={phoneData || formData}
                        setPhoneData={setFormData}
                      />
                      {!loginUserData?.phone && (
                        <h6
                          className={`font-size-12  text-end ${
                            isVerified ? "text-success" : "text-danger"
                          }`}
                          onClick={handleVerified}
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
                      onClick={handleSubmit}
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
          number={formData}
          otp={otp}
          HandleOtp={HandleOtp}
          handleGenerateOtp={handleVerified}
          handleSubmit={handleVerifyOtp}
        />
      )}
    </>
  );
}
