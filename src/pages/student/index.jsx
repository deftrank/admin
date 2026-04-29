// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react";
import moment from "moment-timezone";
import LoadingBar from "react-top-loading-bar";
import {
  deleteUser,
  getListOfUserByAdmin,
  suspendUser,
} from "../../store/slice/onBoardingSlice";
import DeftInput from "../../components/deftInput/deftInput";
import DeftDaterange from "../../components/deftDaterange/index";
import Confirmation from "../../components/confirmationModel/confirmation";
import { changeDate } from "../../utils/appConstant";

export default function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listOfUserByAdmin, userTotalCount, userCount } = useSelector(
    (state) => state.onBoarding
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [changePasswordModal, setChangePasswordModal] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [status, setStatus] = useState("");
  const loadingBarRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil((userTotalCount || 0) / itemsPerPage));
  const currentPageSize = listOfUserByAdmin?.length || 0;
  const startEntry = currentPageSize === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endEntry = currentPageSize === 0 ? 0 : startEntry + currentPageSize - 1;

  useEffect(() => {
    getStudentList();
  }, []);

  useEffect(() => {
    getStudentList();
  }, [currentPage, searchData, itemsPerPage, dateRange, status]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const getStudentList = () => {
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

    dispatch(getListOfUserByAdmin(data, loadingBarRef));
  };

  const handleClose = (id, flag) => {
    if (flag === "edit") {
      navigate(`/student-edit/${id}`);
    } else {
      navigate(`/student-details/${id}`);
    }
  };

  const deleteAccount = () => {
    const data = {
      auth_id: changePasswordModal?.id,
      language: "en",
    };
    dispatch(deleteUser(data, setChangePasswordModal, "student"));
  };

  const suspentAccount = () => {
    const data = {
      auth_id: changePasswordModal?.id,
      status:
        changePasswordModal?.data?.auth_id?.suspend_status === "active"
          ? "suspended"
          : "active",
      language: "en",
    };
    dispatch(suspendUser(data, setChangePasswordModal));
  };

  const getPageNumbers = () => {
    if (totalPages <= 0) return [];
    const pages = [];
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);

    if (end - start < 4) {
      start = Math.max(end - 4, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const tableHeaderStyle = {
    fontSize: 12.5,
    fontWeight: 800,
    letterSpacing: "0.08em",
    color: "#f8fafc",
    border: "none",
    whiteSpace: "nowrap",
    padding: "13px 14px",
    background: "#24364c",
  };

  const tableCellStyle = {
    padding: "12px 14px",
    verticalAlign: "middle",
    borderColor: "#e2e8f0",
    color: "#64748b",
    fontSize: 14,
    background: "#fff",
  };

  const contentInset = 18;

  return (
    <>
      <div
        className="card border-0"
        style={{
          borderRadius: 20,
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.07)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: `16px ${contentInset}px 10px` }}>
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
            <div>
              <h2
                className="mb-1"
                style={{ fontSize: 22, fontWeight: 800, color: "#334a68", lineHeight: 1.2 }}
              >
                Students
              </h2>
              
            </div>
            <div
              className="d-inline-flex align-items-center gap-2 rounded-pill ms-xl-auto"
              style={{
                padding: "8px 12px",
                background: "#f8fbff",
                border: "1px solid #dbe7f3",
                color: "#47627f",
                fontSize: 12.5,
                fontWeight: 700,
              }}
            >
              <Icon icon="solar:users-group-rounded-outline" width="18" height="18" />
              {userTotalCount || 0} total students
            </div>
          </div>

          <div className="row g-2 align-items-center" style={{ marginTop: 0 }}>
            <div className="col-12 col-xl-4">
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
            <div className="col-12 col-xl-4">
              <DeftDaterange
                placeholder="Filter by Date"
                value={dateRange}
                onchange={(value) => {
                  setCurrentPage(1);
                  setDateRange(value);
                }}
                leftIcon={<i className="bx bx-calendar"></i>}
                allowSingleDate={true}
              />
            </div>
            <div className="col-12 col-xl-4 d-flex justify-content-xl-end">
              <div className="w-100" style={{ maxWidth: 156 }}>
                <select
                  aria-label="Filter by user status"
                  className="form-select text-capitalize"
                  style={{
                    minHeight: 38,
                    borderRadius: 12,
                    borderColor: "#c7d4e5",
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "#243b63",
                    boxShadow: "none",
                    paddingLeft: 12,
                    paddingRight: 34,
                  }}
                  value={status}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setStatus(e.target.value);
                  }}
                >
                  <option value="">All Users</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ minWidth: 980 }}>
            <thead>
              <tr>
                <th style={{ ...tableHeaderStyle, width: "20%" }}>NAME</th>
                <th style={{ ...tableHeaderStyle, width: "26%" }}>EMAIL</th>
                <th style={{ ...tableHeaderStyle, width: "15%" }}>PHONE NUMBER</th>
                <th style={{ ...tableHeaderStyle, width: "12%" }}>JOINED ON</th>
                <th style={{ ...tableHeaderStyle, width: "9%" }}>STATUS</th>
                <th style={{ ...tableHeaderStyle, width: "8%", textAlign: "center" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {listOfUserByAdmin?.map((item) => {
                const fullName = item?.first_name
                  ? `${item?.first_name || ""} ${item?.last_name || ""}`.trim()
                  : "-";
                const email = item?.auth_id?.email || "-";

                return (
                  <tr key={item?.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={tableCellStyle}>
                      <div
                        title={fullName}
                        style={{
                          color: "#516b8d",
                          fontWeight: 600,
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          lineHeight: 1.35,
                        }}
                      >
                        {fullName}
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <div
                        title={email}
                        style={{
                          color: "#516b8d",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          lineHeight: 1.35,
                        }}
                      >
                        {email}
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      {item?.auth_id?.phone
                        ? item?.auth_id?.country_code + item?.auth_id?.phone
                        : "-"}
                    </td>
                    <td style={tableCellStyle}>{item?.createdAt ? changeDate(item?.createdAt) : "-"}</td>
                    <td style={tableCellStyle}>
                      <span
                        className={`badge ${
                          item?.auth_id?.suspend_status === "active"
                            ? "bg-label-success"
                            : "bg-label-danger"
                        } text-capitalize`}
                        style={{ padding: "6px 10px", fontSize: 13, fontWeight: 700 }}
                      >
                        {item?.auth_id?.suspend_status}
                      </span>
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "center" }}>
                      <div className="dropdown">
                        <button
                          aria-label="Click me"
                          type="button"
                          className="btn p-0 border-0 bg-transparent dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded" style={{ fontSize: 20, color: "#64748b" }}></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end" style={{ minWidth: 156, fontSize: 12.5 }}>
                          <a
                            aria-label="dropdown action option"
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClose(item?.auth_id?._id, "edit")}
                          >
                            <Icon icon="iconamoon:edit-thin" height={20} className="me-1" /> Edit User
                          </a>
                          <a
                            aria-label="dropdown action option"
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClose(item.auth_id._id, "detail")}
                          >
                            <Icon icon="lsicon:view-outline" height={20} className="me-1" /> View User
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
                                  item?.auth_id?.suspend_status === "active" ? "Suspend" : "Enable"
                                } User`,
                                data: item,
                                message: `Are you sure you want to ${
                                  item?.auth_id?.suspend_status === "active" ? "suspend" : "enable"
                                } this user?`,
                              }));
                            }}
                          >
                            <Icon
                              icon={
                                item?.auth_id?.suspend_status === "active"
                                  ? "lsicon:disable-outline"
                                  : "fontisto:radio-btn-active"
                              }
                              height={20}
                              className="me-1"
                            />
                            {item?.auth_id?.suspend_status === "active" ? "Suspend" : "Enable"} User
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
                                title: "Delete User",
                                data: item,
                                message: "Are you sure you want to delete this user?",
                                type: "Delete",
                              }));
                            }}
                          >
                            <Icon icon="mdi-light:delete" height={20} className="me-1" /> Delete User
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {listOfUserByAdmin?.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                    style={{
                      height: "16rem",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "#64748b",
                    }}
                  >
                    {userCount === 0
                      ? "No students have been listed yet!"
                      : "No students have been listed yet!"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="border-top"
          style={{
            borderColor: "#e2e8f0",
            padding: `12px ${contentInset}px 20px`,
            background: "#fff",
          }}
        >
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span style={{ color: "#64748b", fontSize: 13, fontWeight: 600 }}>Show</span>
              <select
                className="form-select"
                style={{ width: 84, minHeight: 38, borderRadius: 10, borderColor: "#cbd5e1", fontSize: 13 }}
                value={itemsPerPage}
                onChange={(e) => {
                  setCurrentPage(1);
                  setItemsPerPage(Number(e.target.value));
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span style={{ color: "#64748b", fontSize: 13, fontWeight: 600 }}>entries</span>
            </div>

            <div style={{ color: "#64748b", fontSize: 13, fontWeight: 600 }}>
              Showing <b>{startEntry}</b> to <b>{endEntry}</b> of <b>{userTotalCount}</b> entries
            </div>

            <Pagination className="mb-0 flex-wrap">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {getPageNumbers().map((page) => (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
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

      {changePasswordModal && (
        <Confirmation
          dialogData={changePasswordModal}
          open={changePasswordModal?.show}
          handleClose={() => setChangePasswordModal(false)}
          handleSubmit={() =>
            changePasswordModal?.type === "Delete" ? deleteAccount() : suspentAccount()
          }
        />
      )}
      <LoadingBar color={"#0b0b7c"} height="0.5rem" ref={loadingBarRef} />
    </>
  );
}
