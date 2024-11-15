import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios"; // Assuming you're using axios for fetching data

export default function CompTestQuery(props) {
  const { open, handleClose,data, handleSubmit } = props;


  // Function to fetch the data (simulated API call)


  return (
    <>
      <Modal show={open} centered backdrop="static" size="md">
        <Modal.Header>
          <h5 className="modal-title text-center" id="modalToggleLabel">
            Comp Test Query
          </h5>
          <button
            onClick={handleClose}
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>

        <Modal.Body className={"container px-5"}>
        
        <div className="d-flex justify-content-between">
            <h5>Test Title :</h5>
            <h5>{data.title}</h5>
        </div>
        <div className="d-flex justify-content-between">
            <h5>Test Description:</h5>
            <h5>{data?.description}</h5>
        </div>
        <div className="d-flex justify-content-between">
            <h5>Test Skills:</h5>
            <h5>{data.skills}</h5>
        </div>
        <div className="d-flex justify-content-between">
            <h5>Comp Test Type:</h5>
            <h5>{data.comp_test_type==1?"Beginners":data.comp_test_type==2?"Medium":"Advanced"}</h5>
        </div>
        <div className="d-flex justify-content-between">
            <h5>Complexity Level:</h5>
            <h5>{data.complexity_level==1?"Beginners":data.complexity_level==2?"Medium":"Advanced"}</h5>
        </div>
            
        
        </Modal.Body>

        <Modal.Footer className={"border-0"}>
          <div>
            <Button variant="primary" className={"mx-1"} onClick={handleSubmit}>
             Close
            </Button>
          
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
