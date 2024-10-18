// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  clearAllState,
  deleteUser,
  getListOfCompanyByAdmin,
  suspendUser,
} from "../../store/slice/onBoardingSlice";
import DeftInput from "../../components/deftInput/deftInput";
import CompanyDefault from "../../assets/img/companyDefaul.png";
import Confirmation from "../../components/confirmationModel/confirmation";
import DeftDaterange from "../../components/deftDaterange/index";
import moment from "moment-timezone"; // Import moment-timezone
import { changeDate } from "../../utils/appConstant";

export default function index() {
  const { listOfCompanyByAdmin, compnanyTotalCount, companyCount } =
    useSelector((state) => state.onBoarding);
  const loadingBarRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [changePasswordModal, setChangePasswordModal] = useState({});
  const [dateRange, setDateRange] = useState({});
  const [status, setStatus] = useState("");
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(compnanyTotalCount / itemsPerPage);

  useEffect(() => {
    getCompnanyList();
  }, []);

  useEffect(() => {
    getCompnanyList();
  }, [currentPage]);

  useEffect(() => {
    getCompnanyList();
  }, [searchData]);

  useEffect(() => {
    getCompnanyList();
  }, [itemsPerPage]);

  useEffect(() => {
    getCompnanyList();
  }, [dateRange]);

  useEffect(() => {
    getCompnanyList();
  }, [status]);

  const getCompnanyList = () => {
    const utcDateForStart = dateRange[0]?.startDate;
    const utcDateForEnd = dateRange[0]?.endDate;

    const forStartDate = utcDateForStart
      ? moment(utcDateForStart).tz("Asia/Kolkata").format("YYYY-MM-DD")
      : "";
    const forEndDate = utcDateForEnd
      ? moment(utcDateForEnd).tz("Asia/Kolkata").format("YYYY-MM-DD")
      : "";

    const data = {
      startDate: forStartDate,
      endDate: forEndDate,
      accountStatus: status,
      search: searchData,
      page: currentPage,
      limit: itemsPerPage,
    };
    dispatch(getListOfCompanyByAdmin(data));
  };

  const handleClose = (id, flag) => {
    if (flag == "edit") {
      navigate(`/company-edit/${id}`);
    } else if (flag == "add") {
      navigate(`/company-add`);
    } else {
      navigate(`/company-details/${id}`);
    }
  };

  const deleteAccount = () => {
    const data = {
      auth_id: changePasswordModal?.id,
      language: "en",
    };
    dispatch(deleteUser(data, setChangePasswordModal, "company"));
  };

  const suspentAccount = () => {
    const data = {
      auth_id: changePasswordModal?.id,
      status:
        changePasswordModal?.data?.auth_id?.suspend_status == "active"
          ? "suspended"
          : "active",
      language: "en",
    };
    dispatch(suspendUser(data, setChangePasswordModal, "company"));
  };

  return (
    <>
      <div className="card">
        <div class="container">
          <div class="row card-header justify-content-start">
            <div class="col-4 input-group-merge">
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
            <div class="col-4 input-group-merge">
              <DeftDaterange
                placeholder="Search by date range"
                type="text"
                value={searchData}
                onchange={(value) => {
                  setDateRange(value);
                }}
                leftIcon={<i className="bx bx-search"></i>}
              />
            </div>
            <div class="col-2">
              <div className="btn-group">
                <button
                  aria-label="Click me"
                  type="button"
                  className="btn btn-outline-primary dropdown-toggle text-capitalize"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {status ? `${status} Company` : "Company Status"}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      aria-label="dropdown action link"
                      className="dropdown-item"
                      onClick={() => setStatus("active")}
                    >
                      Active
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      aria-label="dropdown action link"
                      className="dropdown-item"
                      onClick={() => setStatus("pending")}
                    >
                      Pending
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      aria-label="dropdown action link"
                      className="dropdown-item"
                      onClick={() => setStatus("suspended")}
                    >
                      Suspend
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      aria-label="dropdown action link"
                      className="dropdown-item"
                      onClick={() => setStatus("")}
                    >
                      All
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-2 d-flex justify-content-end">
              <button
                aria-label="Click me"
                type="submit"
                className="btn btn-primary me-2"
                onClick={() => {
                  handleClose("", "add");

                  dispatch(clearAllState());
                }}
              >
                Add Company
              </button>
            </div>
          </div>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Website</th>
                <th>Address</th>
                <th>Joined On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {listOfCompanyByAdmin?.map((item) => (
                <tr key={item?.id}>
                  <td>
                    <div
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.registered_name ? item.registered_name : "-"}
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td>
                    <div
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.company_website}
                    </div>
                  </td>

                  <td>
                    <div
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.company_address ? item?.company_address : "-"}
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
                      {item?.auth_id?.suspend_status}
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
                          onClick={() => handleClose(item.auth_id._id, "edit")}
                        >
                          <Icon
                            icon="iconamoon:edit-thin"
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Edit Company
                        </a>
                        <a
                          aria-label="dropdown action option"
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleClose(item.auth_id._id, "detail")
                          }
                        >
                          <Icon
                            icon="lsicon:view-outline"
                            height={20}
                            className={"me-1"}
                          />{" "}
                          View Company
                        </a>
                        <a
                          aria-label="dropdown action option"
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setChangePasswordModal((changePasswordModal) => ({
                              ...changePasswordModal,
                              show: true,
                              id: item.auth_id._id,
                              title: `${
                                item?.auth_id?.suspend_status == "active"
                                  ? "Suspend"
                                  : "Enable"
                              } Company`,
                              data: item,
                              message: `Are you sure you want to ${
                                item?.auth_id?.suspend_status == "active"
                                  ? "suspend"
                                  : "enable"
                              } this company`,
                              type: "Disable",
                            }));
                          }}
                        >
                          <Icon
                            icon={
                              item?.auth_id?.suspend_status == "active"
                                ? "lsicon:disable-outline"
                                : "fontisto:radio-btn-active"
                            }
                            height={20}
                            className={"me-1"}
                          />{" "}
                          {item?.auth_id?.suspend_status == "active"
                            ? "Suspend"
                            : "Enable"}{" "}
                          Company
                        </a>
                        <a
                          aria-label="dropdown action option"
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setChangePasswordModal((changePasswordModal) => ({
                              ...changePasswordModal,
                              show: true,
                              id: item.auth_id._id,
                              title: "Delete Company",
                              data: item,
                              message:
                                "Are you sure you want to delete this Company",
                              type: "Delete",
                            }));
                          }}
                        >
                          <Icon
                            icon="mdi-light:delete"
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Delete Company
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {listOfCompanyByAdmin?.length == 0 && (
                <tr
                  style={{
                    height: "20rem",
                    fontSize: "2rem",
                    fontWeight: "600",
                  }}
                >
                  <td colSpan="12" className="text-center">
                    {companyCount == 0
                      ? "No companies have been listed yet!"
                      : "No result available"}
                  </td>
                </tr>
              )}
              <tr></tr>
            </tbody>
          </table>
        </div>

        <div class="container mt-4">
          <div class="row justify-content-center">
            <div class="col">
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

            <div class="col p-1">
              {" "}
              Showing <b>
                {currentPage * itemsPerPage - (itemsPerPage - 1)}
              </b>{" "}
              to <b>{currentPage * itemsPerPage}</b> of{" "}
              <b>{compnanyTotalCount}</b> entries
            </div>

            <div class="col">
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
            changePasswordModal?.type == "Delete"
              ? deleteAccount()
              : suspentAccount()
          }
        />
      )}
    </>
  );
}
