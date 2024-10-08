// @ts-nocheck
import { Form } from "react-bootstrap";
import { color } from "../../../themes/color/color";
import DeftButton from "../../../component/deftButton/deftButton";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "preact/hooks";
import PhoneInputField from "../../../component/phoneInput/phoneInput";
import black_logo from "../../../assets/img/black_logo.svg";
import { useResponsive } from "../../../hooks/useResponsive";
import DeftInput from "../../../component/deftInput/deftInput";
export default function LoginForm(props) {
  const { screenType } = useResponsive();
  const {
    handleChange,
    selectedUserType,
    loginType,
    setLoginData,
    handleLoginChange,
    loginData,

    handleSubmit,
  } = props;

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
            // value={entry.percentage}
            onchange={(e) => handleChange(index, "percentage", e.target.value)}
            // error={errors[`percentage-${index}`]}
          />
        </div>
        <div className="my-3 ">
          <DeftInput
            placeholder="Enter password"
            type="text"
            // value={entry.percentage}
            onchange={(e) => handleChange(index, "percentage", e.target.value)}
            // error={errors[`percentage-${index}`]}
          />
        </div>

        <DeftButton
          btnName="Sign In"
          btnClass="w-100 h-75 my-3 rounded-2"
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
}
