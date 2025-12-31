// @ts-nocheck
import { useState } from "react";
// @ts-ignore
import { Link, useNavigate } from "react-router-dom";
import "./page-auth.css";
import DeftInput from "../../components/deftInput/deftInput";
import { Icon } from "@iconify/react";
import { login } from "../../store/slice/authSlice";
import {
  // @ts-ignore
  isEmailValid,
  isEmailValidAllowGmail,
} from "../../utils/appValidation";
import { useDispatch } from "react-redux";
// import { AuthWrapper } from "./AuthWrapper";

export const LoginPage = () => {
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  // @ts-ignore


  const handleSubmit = () => {
    // @ts-ignore
    if (!loginData?.email) {
      setLoginData((loginData) => ({
        ...loginData,
        emailErr: "Please enter your email address",
      }));
      return;
    }
    // @ts-ignore
    if (!isEmailValidAllowGmail(loginData?.email)) {
      setLoginData((loginData) => ({
        ...loginData,
        emailErr: "Please enter a valid email address",
      }));
      return;
    }
    // @ts-ignore
    if (!loginData?.password) {
      setLoginData((loginData) => ({
        ...loginData,
        passwordErr: "Please enter password",
      }));
      return;
    }
    // @ts-ignore
    if (loginData?.password?.length < 8) {
      setLoginData((loginData) => ({
        ...loginData,
        passwordErr: "Password must be at least 8 characters long",
      }));
      return;
    }

    const data = {
      // @ts-ignore
      email: loginData?.email ? loginData?.email : "",
      // @ts-ignore
      password: loginData?.password ? loginData?.password : "",
      language: "en",
    };
    // @ts-ignore
    dispatch(login(data, navigate));

    // handleOpenModal();
  };

  return (
    // @ts-ignore
    <>
      <h4 className="mb-2">Sign In</h4>
      <p className="mb-4">
      Access powerful administrative tools to manage users, systems, and platform operations with ease.

      </p>

      <div className="mb-3">
        <DeftInput
          label="Email address"
          placeholder="Enter email address"
          type="text"
          // @ts-ignore
          value={loginData.email}
          onchange={(value) => {
            setLoginData((loginData) => ({
              ...loginData,
              email: value.trimStart(),
              emailErr: "",
            }));
          }}
          // @ts-ignore
          error={loginData.emailErr}
        />
      </div>
      <div className="mb-3 form-password-toggle">
        <div className="d-flex justify-content-between">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          {/* <Link
            aria-label="Go to Forgot Password Page"
            to="/forget-password"
          >
            <small>Forgot Password?</small>
          </Link> */}
        </div>
        <DeftInput
          placeholder="Enter password"
          type={isShowPassword ? "text" : "password"}
          // @ts-ignore
          value={loginData.password}
          onchange={(value) => {
            setLoginData((loginData) => ({
              ...loginData,
              password: value.trimStart(),
              passwordErr: "",
            }));
          }}
          // @ts-ignore
          error={loginData.passwordErr}
          rightIcon={
            <Icon
              icon={isShowPassword ? "ri:eye-line" : "mdi:eye-off-outline"}
              height={30}
            />
          }
          rightIconClick={() => setIsShowPassword(!isShowPassword)}
        />
      </div>
      <div className="mb-3">

        <button className="btn-primary-gradient w-100" aria-label="Click me" type="submit"
          onKeyDown={(e) => {
            console.log(e);
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};
