import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./page-auth.css";
import DeftInput from "../../components/deftInput/deftInput";
import { Icon } from "@iconify/react";
import { login } from "../../store/slice/authSlice";
import { isEmailValid } from "../../utils/appValidation";
import { useDispatch } from "react-redux";
// import { AuthWrapper } from "./AuthWrapper";

export const LoginPage = () => {
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    rememberMe: false,
  });

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
      <h4 className="mb-2">Sign In</h4>
      <p className="mb-4">
        Access powerful tools and features. Sign in to manage and oversee
        everything with ease.
      </p>

      <div className="mb-3">
        <DeftInput
          label="Email address"
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
          value={loginData.password}
          onchange={(value) => {
            setLoginData((loginData) => ({
              ...loginData,
              password: value,
              passwordErr: "",
            }));
          }}
          error={loginData.passwordErr}
          inputGroupText={
            <Icon
              icon={isShowPassword ? "ri:eye-line" : "mdi:eye-off-outline"}
              height={30}
            />
          }
          inputGroupTextClick={() => setIsShowPassword(!isShowPassword)}
        />
      </div>
      <div className="mb-3">
        <button
          aria-label="Click me"
          className="btn btn-primary d-grid w-100"
          type="submit"
          onClick={handleSubmit}
        >
          Sign in
        </button>
      </div>
    </>
  );
};
