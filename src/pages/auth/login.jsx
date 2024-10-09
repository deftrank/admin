// @ts-nocheck
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { color } from "../../themes/color/color";
import DeftInput from "../../component/deftInput/deftInput";
import DeftButton from "../../component/deftButton/deftButton";
import { isEmailValid } from "../../utils/appValidation";
import { useResponsive } from "../../hooks/useResponsive";
import { login } from "../../store/slice/authSlice";

export default function Login() {
  const { screenType } = useResponsive();
  const navigate = useNavigate();
  // const [otpModal, setOtpModal] = useState(false);
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();

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
    if (!loginData?.password) {
      setLoginData((loginData) => ({
        ...loginData,
        passwordErr: "Please enter password",
      }));
      return;
    }
    if (loginData?.password?.length < 8) {
      setLoginData((loginData) => ({
        ...loginData,
        passwordErr: "Password must be at least 8 characters long",
      }));
      return;
    }

    const data = {
      email: loginData?.email ? loginData?.email : "",
      password: loginData?.password ? loginData?.password : "",
      language: "en",
    };
    dispatch(login(data, navigate));

    // handleOpenModal();
  };

  return (
    <>
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
            <h1 className="font-size-32">Signin</h1>
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
          <div className="my-3 ">
            <DeftInput
              placeholder="Enter password"
              type="password"
              value={loginData.password}
              onchange={(value) => {
                setLoginData((loginData) => ({
                  ...loginData,
                  password: value,
                  passwordErr: "",
                }));
              }}
              error={loginData.passwordErr}
            />
          </div>

          <div className="text-end">
            <a
              style={{ fontWeight: 700 }}
              onClick={() => navigate("/forget-password")}
            >
              Forget password
            </a>
          </div>
          <DeftButton
            btnName="Sign In"
            btnClass="w-100 h-75 my-3 rounded-2"
            onClick={handleSubmit}
          />
        </div>
      </section>
    </>
  );
}
