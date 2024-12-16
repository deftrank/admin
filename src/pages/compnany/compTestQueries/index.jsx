// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  getCityList,
  getListOfQueriesTestByAdmin,
  getSkillList,
  updateJob,
  verifyJob,
} from "../../../store/slice/onBoardingSlice";
import DeftInput from "../../../components/deftInput/deftInput";
import Confirmation from "../../../components/confirmationModel/confirmation";

import moment from "moment-timezone"; // Import moment-timezone
import { changeDate } from "../../../utils/appConstant";
import LoadingBar from "react-top-loading-bar";

import CommonComponent from "../commonComponent";
import CompTestQuery from "./compTestQueryDetail";
import CompTestID from "./compTestIDModal";

export default function CompTestList() {
  const {
    listOfQueriesTestByAdmin,
    queriesTotalCount,
    queriesCount,

    skillListData,
    cityListData,
  } = useSelector((state) => state.onBoarding);
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
  const [queryDetailModal, setQueryDetailModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const totalPages = Math.ceil(queriesTotalCount / itemsPerPage);
  const [showInputModal,setShowInputModal]=useState(false)

  useEffect(() => {
    getTestList();
  }, [currentPage]);

  useEffect(() => {
    getTestList();
  }, [searchData]);

  useEffect(() => {
    getTestList();
  }, [itemsPerPage]);

  // useEffect(() => {
  //   getTestList();
  // }, [dateRange]);

  useEffect(() => {
    getTestList();
    1;
  }, [filter]);
  console.log(filter);
  useEffect(() => {
    fetchSkillList();
    fetchCitiesList("");
    getTestList();
  }, []);

  const getTestList = () => {
    let data = {
      page: currentPage ? currentPage : 1,
      limit: itemsPerPage ? parseInt(itemsPerPage) : 10,
      search: searchData ? searchData : "",
      sort_by: filter?.sort_by?.value,
      skills: filter?.skills,
      language: "en",
    };
    dispatch(getListOfQueriesTestByAdmin(data));
  };
  const fetchSkillList = () => {
    let data = {
      page: 1,
      limit: 100,
      search: "",
    };
    dispatch(getSkillList(data));
  };
  const fetchCitiesList = (search) => {
    let data = {
      state_id: 0,
      page: 1,
      limit: 100,
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

  const handleDetail = (data) => {
    setQueryDetailModal(true);
    setDetail(data);
  };

  return (
    <>
      <div className="card">
        <div className="p-3">
          <h4>Comp Test Queries</h4>
          <div className="row">
            <div className="col-3  input-group-merge">
              <DeftInput
                placeholder="Search by title "
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
            {/* <div className="col-1">
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
                  // cityListData={cityListData}
                  setFilter={setFilter}
                  // fetchCitiesList={fetchCitiesList}
                  // applyFilter={getTestList()}
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Job Title</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Contact Person </th>

                <th>Create Date </th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {listOfQueriesTestByAdmin?.map((item) => (
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
                      {item?.companyData?.firstName
                        ? item?.companyData?.firstName
                        : "-"}
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
                      {item?.authData?.email ? item?.authData?.email : "-"}
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
                      {/* {item.primary_skills[0]} */}
                      {item?.companyData?.contact_person_name
                        ? item?.companyData?.contact_person_name
                        : "-"}
                    </div>
                  </td>

                  <td>
                    <p className="mb-0">
                      {item?.createdAt ? changeDate(item?.createdAt) : "-"}
                    </p>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        item?.auth_id?.suspend_status == "active"
                          ? "bg-label-success"
                          : item?.auth_id?.suspend_status == "pending"
                          ? "bg-label-warning"
                          : "bg-label-danger"
                      } me-1 text-capitalize`}
                    >
                      {"Pending"}
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
                        <a
                          aria-label="dropdown action option"
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDetail(item)}
                        >
                          <Icon
                            icon={"mdi:eye"}
                            height={20}
                            className={"me-1"}
                          />{" "}
                          View Detail
                        </a>
                        <a
                          aria-label="dropdown action option"
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}

                        >
                          <Icon
                            icon={"streamline:discussion-converstion-reply-solid"}
                            height={20}
                            className={"me-1"}
                          />{" "}
                       Under Discussion 
                        </a>
                        <a
                          aria-label="dropdown action option"
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
            
                        >
                          <Icon
                            icon={"fluent:notepad-edit-20-filled"}
                            height={20}
                            className={"me-1"}
                          />{" "}
                    Under Review
                        </a>
                        <a
                          aria-label="dropdown action option"
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowInputModal(true)}
                        >
                          <Icon
                            icon={"carbon:task-complete"}
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Complete
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {listOfQueriesTestByAdmin?.length == 0 && (
                <tr
                  style={{
                    height: "20rem",
                    fontSize: "2rem",
                    fontWeight: "600",
                  }}
                >
                  <td colSpan="12" className="text-center">
                    {queriesCount == 0
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
              to <b>{currentPage * itemsPerPage}</b> of{" "}
              <b>{queriesTotalCount}</b> entries
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

      {queryDetailModal && (
        <CompTestQuery
          data={detail}
          open={queryDetailModal}
          handleClose={() => setQueryDetailModal(false)}
        />
      )}
      <LoadingBar color={"#0b0b7c"} height="0.5rem" ref={loadingBarRef} />
      {showInputModal && (<CompTestID open={showInputModal} handleClose={() => setShowInputModal(false)}  title="Comp Test ID"/>)}
    </>
  );
}
