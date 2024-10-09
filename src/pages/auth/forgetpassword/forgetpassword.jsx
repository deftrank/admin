// @ts-nocheck
import { color } from "../../../themes/color/color";
import { useState } from "preact/hooks";
import DeftInput from "../../../component/deftInput/deftInput";
import DeftButton from "../../../component/deftButton/deftButton";
import { useResponsive } from "../../../hooks/useResponsive";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmailValid } from "../../../utils/appValidation";
import { forgetPassword } from "../../../store/slice/authSlice";
export default function index(props) {
  const { screenType } = useResponsive();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("Mobile");
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (key, value) => {
    // setSelectedUserType(user);
    setLoginData((loginData) => ({
      ...loginData,
      [key]: value,
    }));
  };

  const handleLoginChange = (login) => {
    setLoginType(login);
  };

  // const handleCloseModal = () => {
  //   setOtpModal(false);
  // };
  // const handleOpenModal = () => {
  //   setOtpModal(true);
  // };
  const handleSubmit = () => {
    if (!loginData?.email) {
      setLoginData((loginData) => ({
        ...loginData,
        emailErr: "Please enter your email address",
      }));
      return;
    }
    if (!isEmailValid(loginData?.email)) {
      setLoginData((loginData) => ({
        ...loginData,
        emailErr: "Please enter a valid email address",
      }));
      return;
    }

    const data = {
      email: loginData?.email ? loginData?.email : "",
      password: loginData?.password ? loginData?.password : "",
      language: "en",
    };
    dispatch(forgetPassword(data, navigate));

    // handleOpenModal();
  };
  return (
    <section>
      <div
        className="container h-100"
        style={{
          padding:
            screenType == "MOBILE"
              ? "0rem 0.5rem"
              : screenType == "TABLET"
              ? "0rem 4rem"
              : "0rem 6rem",
        }}
      >
        <div className="r">
          <h1 className="font-size-32">Forget Password</h1>
          <div
            className="font-size-14 my-3"
            style={{ color: color.secondaryGray }}
          >
            Unlock the world of endless possibilities
          </div>
        </div>
        <div className="my-3 ">
          <DeftInput
            placeholder="Enter email address"
            type="text"
            value={loginData.email}
            onchange={(value) => {
              setLoginData((loginData) => ({
                ...loginData,
                email: value,
                emailErr: "",
              }));
            }}
            error={loginData.emailErr}
          />
        </div>

        <div className="text-end">
          <a style={{ fontWeight: 700 }} onClick={() => navigate("/")}>
            Back To Login
          </a>
        </div>
        <DeftButton
          btnName="Submit"
          btnClass="w-100 h-75 my-3 rounded-2"
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
}
