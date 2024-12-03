import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DeftInput from "../../../components/deftInput/deftInput";
import defaultImg from "../../../assets/img/default.jpg";
import { color } from "../../../themes/color/color";
import { useResponsive } from "../../../hooks/useResponsive";
import { APPLICANT_FILTERS, ApplicationStatus } from "../../../utils/appEnums";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Applicants(props) {
  const {
    title,
    open,
    handleClose,
    data,
    hasMore,
    isLoading,
    loadMoreApplicants,
    sort,
    setSort,
  } = props;
  const { screenType } = useResponsive();

  return (
    <>
      <Modal
        show={open}
        centered
        backdrop="static"
        className="applicants-modal"
      >
        <Modal.Header className="border-0">
          <h5 className="modal-title" id="modalToggleLabel">
            {title} Applicant List
          </h5>
          <button
            onClick={handleClose}
            type="button"
            className="btn-close shadow-none"
            aria-label="Close"
          ></button>
        </Modal.Header>

        <Modal.Body className="container pt-4">
          <div className="d-flex gap-2">
            <DeftInput
              placeholder="Search by Name"
              type="text"
              value={sort?.name}
              onChange={(e) => setSort({ ...sort, name: e.target.value })}
              leftIcon={<i className="bx bx-search"></i>}
            />

            <div className="btn-group">
              <button
                style={{ minWidth: 120 }}
                aria-label="Click me"
                type="button"
                className="btn btn-outline-primary dropdown-toggle text-capitalize"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {sort ? `${sort?.title}` : "Sort By "}
              </button>
              <ul className="dropdown-menu">
                {APPLICANT_FILTERS?.map((item, index) => {
                  return (
                    <>
                      <li>
                        <a
                          style={{ cursor: "pointer" }}
                          aria-label="dropdown action link"
                          className="dropdown-item"
                          onClick={() =>
                            setSort((sort) => ({
                              ...sort,
                              title: item?.title,
                              value: item?.value,
                            }))
                          }
                        >
                          {item?.title}
                        </a>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <InfiniteScroll
            dataLength={data?.length || 0} // Number of items currently loaded
            next={loadMoreApplicants} // Function to call when scrolled to the bottom
            hasMore={hasMore} // Flag to indicate if there are more items to load
            loader={<div className="text-center">Loading...</div>} // Loading spinner
            endMessage={
              <div className="text-center">
                You have reached the end of the list.
              </div>
            } // End message when no more items are left
            scrollThreshold={1} // Start loading when the user is 90% down
            scrollableTarget="applicant-list-container" // Set the scrollable container
          >
            <div
              className="applicant-list-container"
              style={{ height: "25rem" }}
            >
              {data?.map((item, index) => (
                <div
                  className="row mt-3 align-items-center applicant-card cursor-pointer"
                  key={index}
                >
                  <div className="col-1">
                    <h5 className="text-dark mb-0">{index + 1}</h5>
                  </div>
                  <div className="col-1 p-0">
                    <img
                      src={defaultImg}
                      style={{ width: 40, height: 40 }}
                      className="rounded-circle shadow-sm"
                      alt="Profile"
                    />
                  </div>
                  <div className="col-10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-dark text-start mb-1">{`${item?.student_info?.first_name} ${item?.student_info?.last_name}`}</h6>
                        <h6 className={"text-dark text-start mb-1"}>
                          {item?.student_info?.course_data?.full_name}
                        </h6>
                        <p className="text-muted text-start mb-1">
                          {`Available for ${title}, ${moment(
                            item?.student_info?.employability[0]?.start_date
                          ).format("MMM,YY")}`}
                        </p>
                      </div>
                      <div className="d-flex align-items-end flex-column justify-content-center">
                        <div
                          className={`badge border rounded-pill ms-2 ${
                            item?.application_status === ApplicationStatus.apply
                              ? " text-bg-primary"
                              : item?.application_status ===
                                ApplicationStatus.reject
                              ? "text-bg-danger"
                              : "text-bg-success"
                          }  `}
                          style={{
                            fontSize: screenType == "MOBILE" && "10px",
                            padding: "9px 12px",
                          }}
                        >
                          <span>
                            {item?.application_status ===
                            ApplicationStatus.apply
                              ? "Applied"
                              : item?.application_status ===
                                ApplicationStatus.reject
                              ? "Rejected"
                              : item?.application_status ===
                                ApplicationStatus.shortlist
                              ? "ShortListed"
                              : "Joined"}
                          </span>
                        </div>
                        <p className="text-muted text-start">
                          {`${item?.student_info?.current_location}, ${item?.student_info?.state}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {data?.length == 0 && (
                <div
                  className={"d-flex justify-content-center align-items-center"}
                  style={{ minHeight: "12rem" }}
                >
                  <h5 className={"text-center fs-4"}>No data Found</h5>
                </div>
              )}
            </div>
          </InfiniteScroll>
        </Modal.Body>
      </Modal>
    </>
  );
}
