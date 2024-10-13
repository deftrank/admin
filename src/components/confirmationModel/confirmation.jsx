import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Button, Modal } from "react-bootstrap";
// import OtpInput from "react-otp-input";
export default function index(props) {
  const { open, handleClose, dialogData, handleSubmit } = props;

  return (
    <>
      <Modal show={open} centered backdrop="static">
        <Modal.Header>
          <h5 className="modal-title" id="modalToggleLabel">
            {dialogData?.title}
          </h5>
          <button
            aria-label="Click me"
            onClick={handleClose}
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            ariaLabel="Close"
          ></button>
        </Modal.Header>
        <Modal.Body className={"container pt-4"}>
          <h6 className="font-size-20 " style={{ lineHeight: "29px" }}>
            {dialogData?.message}
          </h6>
        </Modal.Body>
        <Modal.Footer className={"border-0"}>
          <div>
            <Button variant="primary" className={"mx-1"} onClick={handleSubmit}>
              Yes
            </Button>
            <Button variant="primary" className={"mx-1"} onClick={handleClose}>
              No
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
