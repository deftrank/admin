import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
// import OtpInput from "react-otp-input";
export default function index(props) {
  const { open, handleClose } = props;
  const navigate = useNavigate();

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
        <Icon
          icon="iconamoon:close-light"
          className="position-absolute"
          style={{
            right: "22px",
            top: "18px",
          }}
          height={30}
          onClick={handleClose}
        />
        {/* <Modal.Header className={"border-0"}></Modal.Header> */}
        <Modal.Body className={"container pt-4"}>
          <h6
            className="text-center font-size-20 "
            style={{ lineHeight: "29px" }}
          >
            Are you sure you want to logout?
          </h6>
        </Modal.Body>
        <Modal.Footer className={"border-0"}>
          <Button variant="primary w-50 mx-auto" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
