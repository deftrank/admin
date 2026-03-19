import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Button, Modal } from "react-bootstrap";
// import OtpInput from "react-otp-input";
export default function index(props) {
  const { open, handleClose, dialogData, handleSubmit, isLoading } = props;

  return (
    <>
      <Modal show={open} centered backdrop="static">
        <Modal.Header>
          <h5 className="modal-title" id="modalToggleLabel">
            {dialogData?.title}
          </h5>
          <button
            onClick={handleClose}
            type="button"
            className="btn-close  shadow-none"
            data-bs-dismiss="modal"
            aria-label="Close"
            disabled={isLoading}
          ></button>
        </Modal.Header>
        <Modal.Body className={"container pt-4"}>
          <h6 className="font-size-20 " style={{ lineHeight: "29px" }}>
            {dialogData?.message}
          </h6>
        </Modal.Body>
        <Modal.Footer className={"border-0"}>
          <div>
            <Button
              variant="primary"
              className={"mx-1"}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Processing...
                </>
              ) : (
                "Yes"
              )}
            </Button>
            <Button
              variant="primary"
              className={"mx-1"}
              onClick={handleClose}
              disabled={isLoading}
            >
              No
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
