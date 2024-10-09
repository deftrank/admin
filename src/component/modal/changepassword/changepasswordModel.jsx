// @ts-nocheck
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import DeftInput from "../../deftInput/deftInput";
import { useDispatch } from "react-redux";
// import OtpInput from "react-otp-input";
export default function index(props) {
  const { open, handleClose } = props;
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();

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
    if (loginData?.newPassword != loginData?.confirmPassword) {
      setLoginData((loginData) => ({
        ...loginData,
        confirmPasswordErr: "confirm password do not match with new pass",
      }));
      return;
    }

    const data = {
      email: loginData?.email ? loginData?.email : "",
      password: loginData?.password ? loginData?.password : "",
      language: "en",
    };
    console.log("data -- ", data);
    // dispatch(login(data, navigate));

    // handleOpenModal();
  };

  const handleLogout = () => {
    secureLocalStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        centered
        backdrop="static"
        className="otp-radius "
      >
        <Modal.Header className={"border-0"} closeButton >
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"container"}>
          <div className="my-3 ">
            <DeftInput
              placeholder="Enter old password"
              type="password"
              value={loginData.oldPassword}
              onchange={(value) => {
                setLoginData((loginData) => ({
                  ...loginData,
                  oldPassword: value,
                  oldPasswordErr: "",
                }));
              }}
              error={loginData.oldPasswordErr}
            />
          </div>
          <div className="my-3 ">
            <DeftInput
              placeholder="Enter new password"
              type="password"
              value={loginData.newPassword}
              onchange={(value) => {
                setLoginData((loginData) => ({
                  ...loginData,
                  newPassword: value,
                  newPasswordErr: "",
                }));
              }}
              error={loginData.newPasswordErr}
            />
          </div>
          <div className="my-3 ">
            <DeftInput
              placeholder="Enter confirm password"
              type="password"
              value={loginData.confirmPassword}
              onchange={(value) => {
                setLoginData((loginData) => ({
                  ...loginData,
                  confirmPassword: value,
                  confirmPasswordErr: "",
                }));
              }}
              error={loginData.confirmPasswordErr}
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
