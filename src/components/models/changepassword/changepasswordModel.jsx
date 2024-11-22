// @ts-nocheck
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import DeftInput from "../../deftInput/deftInput";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../store/slice/authSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function index(props) {
  const { open, handleClose } = props;
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const [isShownewPassword, setIsShownewPassword] = useState(false);
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [isShowConPassword, setIsShowConPassword] = useState(false);

  const handleSubmit = () => {
    if (!loginData?.oldPassword) {
      setLoginData((loginData) => ({
        ...loginData,
        oldPasswordErr: "Please enter old password",
      }));
      return;
    }
    if (loginData?.oldPassword?.length < 8) {
      setLoginData((loginData) => ({
        ...loginData,
        oldPasswordErr: "Password must be at least 8 characters long",
      }));
      return;
    }
    if (!loginData?.newPassword) {
      setLoginData((loginData) => ({
        ...loginData,
        newPasswordErr: "Please enter new password",
      }));
      return;
    }
    if (loginData?.newPassword?.length < 8) {
      setLoginData((loginData) => ({
        ...loginData,
        newPasswordErr: "Password must be at least 8 characters long",
      }));
      return;
    }
    if (!loginData?.confirmPassword) {
      setLoginData((loginData) => ({
        ...loginData,
        confirmPasswordErr: "Please enter confirm password",
      }));
      return;
    }
    if (loginData?.confirmPassword?.length < 8) {
      setLoginData((loginData) => ({
        ...loginData,
        confirmPasswordErr: "Password must be at least 8 characters long",
      }));
      return;
    }
    console.log(loginData?.newPassword,"here is new pass",loginData?.confirmPassword);
    if (loginData?.newPassword != loginData?.confirmPassword) {
      setLoginData((loginData) => ({
        ...loginData,
        confirmPasswordErr: "confirm password do not match with new pass",
      }));
      return;
    }

    const data = {
      oldPassword: loginData?.oldPassword,
      newPassword: loginData?.newPassword,
      language: "en",
    };

    dispatch(changePassword(data, handleClose));

    // handleOpenModal();
  };
  console.log("type of new ",typeof(loginData?.newPassword) );
  console.log("type of old ",typeof(loginData?.confirmPassword ));
console.log("login",loginData,loginData?.newPassword !== loginData?.confirmPassword);
  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        centered
        backdrop="static"
        className="otp-radius "
      >
        <Modal.Header className={"border-0 p-3"}>
          <Modal.Title>Change password</Modal.Title>
          <button
            onClick={handleClose}
            type="button"
            className="btn-close  shadow-none"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body className={"container"}>
          <div className="my-3 ">
            <DeftInput
              placeholder="Enter old password"
              type={isShownewPassword ? "text" : "password"}
              value={loginData.oldPassword}
              onchange={(value) => {
                setLoginData((loginData) => ({
                  ...loginData,
                  oldPassword: value.trimStart(),
                  oldPasswordErr: "",
                }));
              }}
              error={loginData.oldPasswordErr}
              rightIcon={
                <Icon
                  icon={
                    isShownewPassword ? "ri:eye-line" : "mdi:eye-off-outline"
                  }
                  height={30}
                />
              }
              rightIconClick={() =>
                setIsShownewPassword(!isShownewPassword)
              }
            />
          </div>
          <div className="my-3 ">
            <DeftInput
              placeholder="Enter new password"
              type={isShowOldPassword ? "text" : "password"}
              value={loginData.newPassword}
              onchange={(value) => {
                setLoginData((loginData) => ({
                  ...loginData,
                  newPassword: value.trimStart(),
                  newPasswordErr: "",
                }));
              }}
              error={loginData.newPasswordErr}
              rightIcon={
                <Icon
                  icon={
                    isShowOldPassword ? "ri:eye-line" : "mdi:eye-off-outline"
                  }
                  height={30}
                />
              }
              rightIconClick={() =>
                setIsShowOldPassword(!isShowOldPassword)
              }
            />
          </div>
          <div className="my-3 ">
            <DeftInput
              placeholder="Enter confirm password"
              value={loginData?.confirmPassword}
              type={isShowConPassword ? "text" : "password"}
              onchange={(value) => {
                setLoginData((loginData) => ({
                  ...loginData,
                  confirmPassword: value.trimStart(),
                  confirmPasswordErr: "",
                }));
              }}
              error={loginData.confirmPasswordErr}
              rightIcon={
                <Icon
                  icon={
                    isShowConPassword ? "ri:eye-line" : "mdi:eye-off-outline"
                  }
                  height={30}
                />
              }
              rightIconClick={() =>
                setIsShowConPassword(!isShowConPassword)
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer className={"border-0"}>
          <Button variant="primary w-100" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
