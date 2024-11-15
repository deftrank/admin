// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  clearAllState,
  deleteUser,
  getCityList,
  getListOfInternshipByAdmin,
  getListOfJobByAdmin,
  getSkillList,
  suspendUser,
  updateJob,
  verifyJob,
} from "../../../store/slice/onBoardingSlice";
import DeftInput from "../../../components/deftInput/deftInput";
import Confirmation from "../../../components/confirmationModel/confirmation";
import DeftDaterange from "../../../components/deftDaterange/index";
import moment from "moment-timezone"; // Import moment-timezone
import { changeDate } from "../../../utils/appConstant";
import LoadingBar from "react-top-loading-bar";
import { jobTypes } from "../jobInternshipConfig";
import CommonComponent from "../commonComponent";
import { JobType, jobVerifyStatus, status } from "../../../utils/statusEnums";
import { PAGES_ENUM } from "../../../utils/appEnums";

export default function index() {
  const { listOfInternshipByAdmin, jobTotalCount, jobCount,skillListData ,cityListData } = useSelector(
    (state) => state.onBoarding
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [changePasswordModal, setChangePasswordModal] = useState({});
  const [dateRange, setDateRange] = useState({});
  const [filter, setFilter] = useState({});
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const loadingBarRef = useRef(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(jobTotalCount / itemsPerPage);

  useEffect(() => {
    getJobList();
  }, []);

  useEffect(() => {
    getJobList();
  }, [currentPage]);

  useEffect(() => {
    getJobList();
  }, [searchData]);

  useEffect(() => {
    getJobList();
  }, [itemsPerPage]);

  useEffect(() => {
    getJobList();
  }, [dateRange]);


  useEffect(() => {
    fetchSkillList();
    fetchCitiesList("");
  }, []);

  // useEffect(() => {
  //   getJobList();
  // }, [filter]);

  const getJobList = (filterData) => {
    const utcDateForStart = dateRange[0]?.startDate;
    const utcDateForEnd = dateRange[0]?.endDate;

    const data = {
      search: searchData,
      page: currentPage,
      limit: itemsPerPage,
      sort_by: filterData?.sort_by?.value,
      skills: filter?.skills,
      location: filter?.location,
      job_status: filterData?.job_status,
      verify_job: filterData?.verify_job,
      language: "en",
    };
    dispatch(getListOfInternshipByAdmin(data, loadingBarRef));
  };
 
  const fetchSkillList = () => {
    let data = {
      page: PAGES_ENUM?.PAGE,
      limit: PAGES_ENUM?.PER_PAGE,
      search: "",
    };
    dispatch(getSkillList(data));
  };
  const fetchCitiesList = (search) => {
    let data = {
      state_id: 0,
      page: PAGES_ENUM?.PAGE,
      limit: PAGES_ENUM?.PER_PAGE,
      search: search,
    };
    dispatch(getCityList(data));
  };
  const handleClose = (id, flag) => {
    if (flag == "edit") {
      navigate(`/job-edit/${id}`);
    } else if (flag == "add") {
      navigate(`/job-add`);
    } else {
      navigate(`/job-details/${id}`);
    }
  };

  const verifyAccount = () => {
    const data = {
      id: changePasswordModal?.id,
      status: changePasswordModal?.value,
      type: JobType?.internship,
      language: "en",
    };
    dispatch(verifyJob(data, setChangePasswordModal, "internship"));
  };

  const suspentAccount = () => {

    const data = {
      id: changePasswordModal?.data?._id,
      type: JobType?.internship,
      status: changePasswordModal?.data?.status == status?.active ? status?.suspend: status?.active,
      language: "en",
    };
    dispatch(updateJob(data, setChangePasswordModal, "internship"));
  };

  return (
    <>
      <div className="card">
        <div className="p-3">
          <h4>Internship</h4>
          <div className="row">
            <div className="col-3  input-group-merge">
              <DeftInput
                placeholder="Search by name"
                type="text"
                value={searchData}
                onchange={(value) => {
                  setCurrentPage(1);
                  setSearchData(value);
                }}
                leftIcon={<i className="bx bx-search"></i>}
              />
            </div>
            {/* <div className="col-2  input-group-merge">
              <DeftInput
                placeholder="Search by name"
                type="text"
                value={searchData}
                onchange={(value) => {
                  setCurrentPage(1);
                  setSearchData(value);
                }}
                leftIcon={<i className="bx bx-search"></i>}
              />
            </div>
            <div className="col-2  input-group-merge">
              <DeftInput
                placeholder="Search by name"
                type="text"
                value={searchData}
                onchange={(value) => {
                  setCurrentPage(1);
                  setSearchData(value);
                }}
                leftIcon={<i className="bx bx-search"></i>}
              />
            </div> */}
            <div className="col-1">
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                Filter
              </button>

              <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <CommonComponent
                  title="Filter Job"
                  filter={filter}
                  skillListData={skillListData}
                  cityListData={cityListData}
                  setFilter={setFilter}
                  fetchCitiesList={fetchCitiesList}
                  applyFilter={getJobList}
                />
              </div>
            </div>
            {/* <div className="col-1">
              <div className="btn-group">
                <button
                  aria-label="Click me"
                  type="button"
                  className="btn btn-outline-primary dropdown-toggle text-capitalize"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Short By
                </button>
                <ul className="dropdown-menu">
                  {jobTypes?.map((item) => (
                    <li>
                      <a
                        style={{ cursor: "pointer" }}
                        aria-label="dropdown action link"
                        className="dropdown-item"
                        onClick={() => {
                          setFilter((filter) => ({
                            ...filter,
                            sort_by: item,
                          }));
                        }}
                      >
                        {item?.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-1">
              <div className="btn-group">
                <button
                  aria-label="Click me"
                  type="button"
                  className="btn btn-outline-primary dropdown-toggle text-capitalize"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Verified
                </button>
                <ul className="dropdown-menu">
                  {jobTypes?.map((item) => (
                    <li>
                      <a
                        style={{ cursor: "pointer" }}
                        aria-label="dropdown action link"
                        className="dropdown-item"
                        onClick={() => {
                          setFilter((filter) => ({
                            ...filter,
                            sort_by: item,
                          }));
                        }}
                      >
                        {item?.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-1">
              <div className="btn-group">
                <button
                  aria-label="Click me"
                  type="button"
                  className="btn btn-outline-primary dropdown-toggle text-capitalize"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Job Status
                </button>
                <ul className="dropdown-menu">
                  {jobTypes?.map((item) => (
                    <li>
                      <a
                        style={{ cursor: "pointer" }}
                        aria-label="dropdown action link"
                        className="dropdown-item"
                        onClick={() => {
                          setFilter((filter) => ({
                            ...filter,
                            sort_by: item,
                          }));
                        }}
                      >
                        {item?.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
          </div>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
              <th>Internship Title</th>
                <th>Company Name</th>
                <th>Office Locations</th>
                <th>Skills</th>
                <th>Positions</th>
                <th>Expected Join Date</th>
                <th>Post On</th>
                <th>Verified</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {listOfInternshipByAdmin?.map((item) => (
                <tr key={item?.id}>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item.title ? item.title : ""}
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.title ? item.title : "-"}
                    </div>
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item.title ? item.title : ""}
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.companyData?.firstName ? item?.companyData?.firstName : "-"}
                    </div>
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item.title ? item.title : ""}
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        display: " -webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.office_location?.map((location, index) => (
                        <>
                          {location}{" "}
                          {index < item.office_location?.length - 1 ? (
                            <span key={index}>,</span>
                          ) : (
                            ""
                          )}{" "}
                        </>
                      ))}
                      {item.office_location?.length == 0 ? "Remote" : ""}
                    </div>
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item.title ? item.title : ""}
                      style={{
                        width: "9vw",
                        overflow: "hidden",
                        display: " -webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {/* {item.supporting_skills?.map((location, index) => (
                        <>
                          {location}{" "}
                          {index < item.supporting_skills?.length - 1 ? (
                            <span>,</span>
                          ) : (
                            ""
                          )}{" "}
                        </>
                      ))} */}
                      {item.supporting_skills?.length == 0 ? "-" : ""}
                    </div>
                  </td>

                  <td>
                    <div
                      style={{
                        width: "1vw",
                      }}
                    >
                      {" "}
                      {item?.number_of_vacancies
                        ? item?.number_of_vacancies
                        : "-"}
                    </div>
                  </td>
                  <td>
                    <p className="mb-0">
                      {item?.expected_joining_date
                        ? changeDate(item?.expected_joining_date)
                        : "-"}
                    </p>
                  </td>
                  <td>
                    <p className="mb-0">
                      {item?.createdAt ? changeDate(item?.createdAt) : "-"}
                    </p>
                  </td>
                  <td>
                  <span
                      className={`badge ${
                        item?.is_verified == jobVerifyStatus?.create
                          ? "bg-label-warning"
                          : item?.is_verified == jobVerifyStatus?.verify
                          ? "bg-label-success"
                          : "bg-label-danger"
                      } me-1`}
                    >
                      {item?.is_verified ===jobVerifyStatus?.create
                        ? "pending"
                        : item?.is_verified === jobVerifyStatus?.verify
                        ? "verify"
                        : item?.is_verified === jobVerifyStatus?.suspended ?"suspend":"rejected"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        item?.status == status?.active
                          ? "bg-label-success"
                          : "bg-label-danger"
                      } me-1`}
                    >
                      {item?.status == 1 ? "Active" : "Deactive"}
                    </span>
                  </td>
                  <td>
                    <div className="dropdown">
                      <button
                        aria-label="Click me"
                        type="button"
                        className="btn p-0 dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                        {item?.is_verified ===jobVerifyStatus?.create || item?.is_verified === jobVerifyStatus?.reject || item?.is_verified == jobVerifyStatus?.suspended ? (
                          <a
                            aria-label="dropdown action option"
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setChangePasswordModal((changePasswordModal) => ({
                                ...changePasswordModal,
                                show: true,
                                id: item._id,
                                title: `Accept Job`,
                                data: item,
                                message: `Are you sure you want to accept this internship?`,
                                type: "verify",
                                value: 2,
                              }));
                            }}
                          >
                            <Icon
                              icon={
                                item?.is_verified == "active"
                                  ? "lsicon:disable-outline"
                                  : "fontisto:radio-btn-active"
                              }
                              height={20}
                              className={"me-1"}
                            />{" "}
                            Accept Internship
                          </a>
                        ) : (
                          ""
                        )}
                        {item?.is_verified == jobVerifyStatus?.create || item?.is_verified==jobVerifyStatus?.verify ? (
                          <a
                            aria-label="dropdown action option"
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setChangePasswordModal((changePasswordModal) => ({
                                ...changePasswordModal,
                                show: true,
                                id: item._id,
                                title: `Reject Company`,
                                data: item,
                                message: `Are you sure you want to reject this internship?`,
                                type: "verify",
                                value: 3,
                              }));
                            }}
                          >
                            <Icon
                              icon={
                                item?.is_verified == jobVerifyStatus?.create
                                  ? "lsicon:disable-outline"
                                  : "fontisto:radio-btn-active"
                              }
                              height={20}
                              className={"me-1"}
                            />{" "}
                            Reject Internship
                          </a>
                        ) : (
                          ""
                        )}
                        {item?.is_verified == jobVerifyStatus?.reject || item?.is_verified == jobVerifyStatus?.suspended||item?.is_verified===jobVerifyStatus?.verify ? (
                          <a
                            aria-label="dropdown action option"
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setChangePasswordModal((changePasswordModal) => ({
                                ...changePasswordModal,
                                show: true,
                                id: item._id,
                                title: `Reject Company`,
                                data: item,
                                message: `Are you sure you want to suspend this internship?`,
                                type: "verify",
                                value: 4,
                              }));
                            }}
                          >
                            <Icon
                              icon={
                                item?.is_verified == jobVerifyStatus?.create
                                  ? "lsicon:disable-outline"
                                  : "fontisto:radio-btn-active"
                              }
                              height={20}
                              className={"me-1"}
                            />{" "}
                           suspend Internship
                          </a>
                        ) : (
                          ""
                        )}
                        <a
                          aria-label="dropdown action option"
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setChangePasswordModal((changePasswordModal) => ({
                              ...changePasswordModal,
                              show: true,
                              id: item.job_id,
                              title: `${
                                item?.status == status?.active ?"Active" : "Deactive"
                              } Company`,
                              data: item,
                              message: `Are you sure you want to ${
                                item?.status == status?.active ? "Active" : "Deactive"
                              } this internship?`,
                              type: "disable",
                            }));
                          }}
                        >
                          <Icon
                            icon={
                              item?.status == status?.active
                                ? "lsicon:disable-outline"
                                : "fontisto:radio-btn-active"
                            }
                            height={20}
                            className={"me-1"}
                          />{" "}
                          {item?.status !== status?.active ? "Active" : "Deactive"} Internship
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {listOfInternshipByAdmin?.length == 0 && (
                <tr
                  style={{
                    height: "20rem",
                    fontSize: "2rem",
                    fontWeight: "600",
                  }}
                >
                  <td colSpan="12" className="text-center">
                    {jobCount == 0
                      ? "No companies have been listed yet!"
                      : "No result available"}
                  </td>
                </tr>
              )}
              <tr></tr>
            </tbody>
          </table>
        </div>

        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col">
              <span className="p-2">Show</span>
              <div className="btn-group">
                <select
                  className="btn btn-outline-primary dropdown-toggle"
                  onChange={(e) => setItemsPerPage(e.target.value)}
                >
                  <option value="5">5</option>
                  <option value="10" selected>
                    10
                  </option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <span className="p-2">entries</span>
            </div>

            <div className="col p-1">
              {" "}
              Showing <b>
                {currentPage * itemsPerPage - (itemsPerPage - 1)}
              </b>{" "}
              to <b>{currentPage * itemsPerPage}</b> of <b>{jobTotalCount}</b>{" "}
              entries
            </div>

            <div className="col">
              <div className="d-flex justify-content-end">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item
                      key={page + 1}
                      active={page + 1 === currentPage}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      {page + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>

      {changePasswordModal && (
        <Confirmation
          dialogData={changePasswordModal}
          open={changePasswordModal?.show}
          handleClose={() => setChangePasswordModal(false)}
          handleSubmit={() =>
            changePasswordModal?.type == "disable"
              ? suspentAccount()
              : verifyAccount()
          }
        />
      )}
      <LoadingBar color={"#0b0b7c"} height="0.5rem" ref={loadingBarRef} />
    </>
  );
}
