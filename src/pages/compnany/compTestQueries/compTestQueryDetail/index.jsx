import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios"; // Assuming you're using axios for fetching data

export default function CompTestQuery(props) {
  const { open, handleClose, data, handleSubmit } = props;

  // Function to fetch the data (simulated API call)

  return (
    <>
      <Modal show={open} centered backdrop="static" size="lg">
        <Modal.Header>
          <h5 className="modal-title text-center" id="modalToggleLabel">
            Comp Test Query
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
            <h5>Test Title :</h5>
            <h6>{data.title}</h6>
          </div>
          <div className="d-flex flex-column">
            <h5 className={"m-0"}>Test Description:</h5>
            <h6 className={"my-3"}>{data?.description}</h6>
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Test Skills</th>
                  <th>Comp Test Type</th>
                  <th>Complexity Levell</th>
                 
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                <tr>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data.skills}
                    </div>
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data.comp_test_type == 1
                        ? "Beginners"
                        : data.comp_test_type == 2
                        ? "Medium"
                        : "Advanced"}
                    </div>
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        display: " -webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {data.complexity_level == 1
                        ? "Beginners"
                        : data.complexity_level == 2
                        ? "Medium"
                        : "Advanced"}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      
        </Modal.Body>

        <Modal.Footer className={"border-0"}>
          <div>
            <Button variant="primary" className={"mx-1"} onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
