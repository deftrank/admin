import React from "react";
import { Button, Modal } from "react-bootstrap";
// import OtpInput from "react-otp-input";
export default function OtpModel(props) {
  const {
    open,
    handleClose,
    number,
    otp,
    HandleOtp,
    handleSubmit,
    handleGenerateOtp,
  } = props;
  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        centered
        backdrop="static"
        className="otp-radius "
      >
        <Modal.Header className={"border-0"}></Modal.Header>
        <Modal.Body className={"container"}>
          <h6
            className="text-center font-size-20 "
            style={{ lineHeight: "29px" }}
          >
            Please enter the code that we’ve just sent to your{" "}
            {number?.phone ? (
              <>
                Mobile No. {number?.countryCode}&nbsp;{number?.phone}
              </>
            ) : (
              <>Email: {number?.email}</> // Replace `email` with the actual variable holding the email
            )}
          </h6>
          <div className="my-3 d-flex justify-content-center">
            {/* <OtpInput
              value={otp}
              inputStyle="inputStyle"
              onChange={(e) => HandleOtp(e)}
              numInputs={4}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
            /> */}
          </div>
          <div className="d-flex justify-content-between px-4">
            <h6 onClick={handleGenerateOtp} style={{ cursor: "pointer" }}>
              Resend OTP
            </h6>
            <h6 onClick={handleClose} style={{ cursor: "pointer" }}>
              Change Number
            </h6>
          </div>
        </Modal.Body>
        <Modal.Footer className={"border-0"}>
          <Button variant="primary w-100" onClick={handleSubmit}>
            submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
