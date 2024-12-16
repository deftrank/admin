import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios"; // Assuming you're using axios for fetching data
import DeftInput from "../../../../components/deftInput/deftInput";

export default function CompTestID(props) {
  const { open, handleClose, title, handleSubmit } = props;

  // Function to fetch the data (simulated API call)

  return (
    <>
      <Modal show={open} centered backdrop="static" size="sm">
        <Modal.Header>
          <h5 className="modal-title text-center" id="modalToggleLabel">
          {title}
          </h5>
          <button
            onClick={handleClose}
            type="button"
            className="btn-close shadow-none"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>

        <Modal.Body className={"container px-5"}>
          <div className="d-flex align-items-center gap-2 ">

          <DeftInput type="text" placeholder="Please Enter Test ID"/>
          </div>
        
      
        </Modal.Body>

        <Modal.Footer className={"border-0"}>
          <div>
            <Button variant="primary" className={"mx-1"} onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className={"mx-1"} onClick={handleClose}>
             Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
