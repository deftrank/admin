import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
// import OtpInput from "react-otp-input";
export default function index(props) {
  const { open, handleClose, dialogData, handleSubmit } = props;

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
            {dialogData?.message}
          </h6>
        </Modal.Body>
        <Modal.Footer className={"border-0"}>
          <Button variant="primary w-50 mx-auto" onClick={handleSubmit}>
            {dialogData?.buttonData}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
