// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  getListOfUserByAdmin,
  suspendUser,
} from "../../store/slice/onBoardingSlice";
import { Pagination } from "react-bootstrap";
import DeftInput from "../../components/deftInput/deftInput";
import { Icon } from "@iconify/react";
import Confirmation from "../../components/confirmationModel/confirmation";
import DeftDaterange from "../../components/deftDaterange/index";
import moment from "moment-timezone"; // Import moment-timezone
import { changeDate } from "../../utils/appConstant";
import LoadingBar from "react-top-loading-bar";

export default function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listOfUserByAdmin, userTotalCount, userCount } = useSelector(
    (state) => state.onBoarding
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [sort, setSort] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(userTotalCount / itemsPerPage);
  const [changePasswordModal, setChangePasswordModal] = useState([]);
  const [dateRange, setDateRange] = useState({});
  const [status, setStatus] = useState("");
  const loadingBarRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getStudentList();
  }, []);

  useEffect(() => {
    getStudentList();
  }, [currentPage]);

  useEffect(() => {
    getStudentList();
  }, [searchData]);

  useEffect(() => {
    getStudentList();
  }, [itemsPerPage]);

  useEffect(() => {
    getStudentList();
  }, [dateRange]);

  useEffect(() => {
    getStudentList();
  }, [status]);

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
    if (flag == "edit") {
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
        changePasswordModal?.data?.auth_id?.suspend_status == "active"
          ? "suspended"
          : "active",
      language: "en",
    };
    dispatch(suspendUser(data, setChangePasswordModal));
  };

  return (
    <>
      <div className="card">
        <div class="p-3">
          <h4>Students</h4>
          <div class="d-flex justify-content-between">
            <div class="row">
              <div class="col-5 input-group-merge">
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
              <div class="col-4 p-0 input-group-merge">
                <DeftDaterange
                  placeholder="Filter by Date"
                  type="text"
                  value={searchData}
                  onchange={(value) => {
                    setDateRange(value);
                  }}
                  leftIcon={<i className="bx bx-search"></i>}
                />
              </div>
              <div class="col-3">
                <div className="btn-group">
                  <button
                    style={{ minWidth: 120 }}
                    aria-label="Click me"
                    type="button"
                    className="btn btn-outline-primary dropdown-toggle text-capitalize"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {status ? `${status}` : "All Users"}
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
                        onClick={() => setStatus("suspended")}
                      >
                        Suspended
                      </a>
                    </li>
                    <li>
                      <a
                        style={{ cursor: "pointer" }}
                        aria-label="dropdown action link"
                        className="dropdown-item"
                        onClick={() => setStatus("")}
                      >
                        All Users
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive text-nowrap">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Course</th>
                <th>College</th>
                <th>Joined On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {listOfUserByAdmin?.map((item) => (
                <tr key={item?.id}>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={
                        item?.first_name
                          ? item?.first_name + " " + item?.last_name
                          : ""
                      }
                      style={{
                        width: "8vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.first_name
                        ? item?.first_name + " " + item?.last_name
                        : "-"}
                    </div>
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item?.auth_id?.email ? item?.auth_id?.email : ""}
                      style={{
                        width: "8vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.auth_id?.email ? item?.auth_id?.email : "-"}
                    </div>
                  </td>
                  <td>
                    {item?.auth_id?.phone
                      ? item?.auth_id?.country_code + item?.auth_id?.phone
                      : "-"}
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item?.current_course ? item?.current_course : ""}
                      style={{
                        width: "8vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.current_course ? item?.current_course : "-"}
                    </div>
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item?.college_name ? item?.college_name : ""}
                      style={{
                        width: "8vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.college_name ? item?.college_name : "-"}
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
                          Edit User
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
                          View User
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
                              } User`,
                              data: item,
                              message: `Are you sure you want to ${
                                item?.auth_id?.suspend_status == "active"
                                  ? "suspend"
                                  : "enable"
                              } this user?`,
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
                          User
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
                              message:
                                "Are you sure you want to delete this user?",
                              type: "Delete",
                            }));
                          }}
                        >
                          <Icon
                            icon="mdi-light:delete"
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Delete User
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {listOfUserByAdmin?.length == 0 && (
                <tr
                  style={{
                    height: "20rem",
                    fontSize: "2rem",
                    fontWeight: "600",
                  }}
                >
                  <td colSpan="12" className="text-center">
                    {userCount == 0
                      ? "No students have been listed yet!"
                      : "No students have been listed yet!"}
                  </td>
                </tr>
              )}
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
              to <b>{currentPage * itemsPerPage}</b> of <b>{userTotalCount}</b>{" "}
              entries
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
      <LoadingBar color={"#0b0b7c"} height="0.5rem" ref={loadingBarRef} />
    </>
  );
}
