// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  clearAllState,
  deleteUser,
  getListOfCompanyByAdmin,
  suspendUser,
} from "../../store/slice/onBoardingSlice";
import { forgotPassword } from "../../store/slice/authSlice";
import DeftInput from "../../components/deftInput/deftInput";
import CompanyDefault from "../../assets/img/companyDefaul.png";
import Confirmation from "../../components/confirmationModel/confirmation";
import DeftDaterange from "../../components/deftDaterange/index";
import moment from "moment-timezone"; // Import moment-timezone
import { changeDate } from "../../utils/appConstant";
import LoadingBar from "react-top-loading-bar";
import { isEmailValidAllowGmail } from "../../utils/appValidation";

export default function index() {
  const { listOfCompanyByAdmin, compnanyTotalCount, companyCount } =
    useSelector((state) => state.onBoarding);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [changePasswordModal, setChangePasswordModal] = useState({});
  const [dateRange, setDateRange] = useState({});
  const [status, setStatus] = useState("");
  const [rejectModal, setRejectModal] = useState({
    show: false,
    id: "",
    reason: "",
    error: "",
  });
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetFormData, setResetFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [resetFormErrors, setResetFormErrors] = useState({});
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const loadingBarRef = useRef(null);
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
    dispatch(getListOfCompanyByAdmin(data, loadingBarRef));
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
      status: changePasswordModal?.nextStatus || "active",
      language: "en",
    };
    if (
      (data.status === "inactive" || data.status === "reject") &&
      changePasswordModal?.reason
    ) {
      data.reason = changePasswordModal?.reason;
    }
    dispatch(suspendUser(data, setChangePasswordModal, "company"));
  };

  const handleRejectSubmit = () => {
    const reason = rejectModal?.reason?.trim();
    if (!reason) {
      setRejectModal((prev) => ({
        ...prev,
        error: "Rejection reason is required",
      }));
      return;
    }
    const data = {
      auth_id: rejectModal?.id,
      status: "reject",
      language: "en",
      reason,
    };
    dispatch(suspendUser(data, setRejectModal, "company"));
  };

  const normalizeStatus = (rawStatus) => {
    const statusValue = (rawStatus || "").toLowerCase();
    if (statusValue === "active") return "approved";
    if (statusValue === "pending") return "pending";
    if (
      statusValue === "inactive" ||
      statusValue === "suspended" ||
      statusValue === "reject"
    ) {
      return "rejected";
    }
    return statusValue || "pending";
  };

  const statusBadgeClass = (rawStatus) => {
    const mappedStatus = normalizeStatus(rawStatus);
    if (mappedStatus === "approved") return "bg-label-success";
    if (mappedStatus === "pending") return "bg-label-warning";
    return "bg-label-danger";
  };

  const openResetModal = (item) => {
    setResetFormData({
      email: item?.auth_id?.email || "",
      phone: item?.contact_person_number || "",
      password: "",
      confirmPassword: "",
    });
    setResetFormErrors({});
    setIsResetModalOpen(true);
  };

  const handleResetSubmit = () => {
    const errors = {};
    const emailValue = resetFormData?.email?.trim() || "";
    const phoneValue = resetFormData?.phone?.trim() || "";

    if (!emailValue && !phoneValue) {
      errors.email = "Email or phone is required";
      errors.phone = "Email or phone is required";
    } else {
      if (emailValue && !isEmailValidAllowGmail(emailValue)) {
        errors.email = "Please enter a valid email";
      }
      if (phoneValue && !/^\+?\d{6,15}$/.test(phoneValue.replace(/\s/g, ""))) {
        errors.phone = "Please enter a valid phone number";
      }
    }

    if (!resetFormData?.password) {
      errors.password = "Please enter password";
    } else if (resetFormData?.password?.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!resetFormData?.confirmPassword) {
      errors.confirmPassword = "Please confirm password";
    } else if (resetFormData?.confirmPassword?.length < 8) {
      errors.confirmPassword = "Password must be at least 8 characters long";
    } else if (resetFormData?.password !== resetFormData?.confirmPassword) {
      errors.confirmPassword = "Password does not match";
    }

    if (Object.keys(errors).length) {
      setResetFormErrors(errors);
      return;
    }

    const payload = {
      email: resetFormData?.email ? resetFormData?.email : "",
      phone: resetFormData?.phone ? resetFormData?.phone : "",
      password: resetFormData?.password,
    };

    dispatch(
      forgotPassword(payload, () => {
        setIsResetModalOpen(false);
        setResetFormData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));
      })
    );
  };

  return (
    <>
      <div className="card">
        <div class="p-3">
          <h4>Companies</h4>
          <div class="d-flex justify-content-between">
            <div class="row w-100 g-2 g-md-3">
              <div class="col-12 col-md-6 col-lg-5 input-group-merge">
                <DeftInput
                placeholder="Search by name, company, or email"
                  type="text"
                  value={searchData}
                  onchange={(value) => {
                    setCurrentPage(1);
                    setSearchData(value);
                  }}
                  leftIcon={<i className="bx bx-search"></i>}
                />
              </div>
              <div class="col-12 col-md-6 col-lg-4 p-0 input-group-merge">
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
              <div class="col-12 col-md-6 col-lg-3">
                <div className="btn-group">
                  <button
                    aria-label="Click me"
                    type="button"
                    className="btn btn-outline-primary dropdown-toggle text-capitalize"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {!status
                      ? "All Company"
                      : status === "active"
                      ? "Approved"
                      : status === "pending"
                      ? "Pending"
                      : status === "reject"
                      ? "Rejected"
                      : status}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        style={{ cursor: "pointer" }}
                        aria-label="dropdown action link"
                        className="dropdown-item"
                        onClick={() => setStatus("active")}
                      >
                        Approved
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
                        onClick={() => setStatus("reject")}
                      >
                        Rejected
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
            </div>

            <div class="d-flex text-end">
              <button
                aria-label="Click me"
                type="submit"
                className="btn btn-primary btn-sm px-3 py-2 me-2"
                style={{ minWidth: "122px" }}
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
                <th>Company Name</th>
                <th>Company Email</th>
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
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item.contact_person_name ? item.contact_person_name : ""}
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.contact_person_name ? item.contact_person_name : "-"}
                    </div>
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item.registered_name ? item.registered_name : ""}
                      style={{
                        width: "10vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.registered_name ? item.registered_name : "-"}
                    </div>
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item?.auth_id?.email ? item?.auth_id?.email : ""}
                      style={{
                        width: "12vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.auth_id?.email ? item?.auth_id?.email : "-"}
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item.company_website}
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
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item?.company_address ? item?.company_address : ""}
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
                      className={`badge ${statusBadgeClass(
                        item?.auth_id?.suspend_status
                      )} me-1 text-capitalize`}
                    >
                      {normalizeStatus(item?.auth_id?.suspend_status)}
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
                          onClick={() => openResetModal(item)}
                        >
                          <Icon
                            icon="ic:baseline-lock-reset"
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Reset Password
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
                              title: "Approve Company",
                              data: item,
                              message:
                                "Are you sure you want to approve this company?",
                              nextStatus: "active",
                              type: "Disable",
                            }));
                          }}
                        >
                          <Icon
                            icon={"fontisto:radio-btn-active"}
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Approve Company
                        </a>
                        <a
                          aria-label="dropdown action option"
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setRejectModal({
                              show: true,
                              id: item.auth_id._id,
                              reason: "",
                              error: "",
                            })
                          }
                        >
                          <Icon
                            icon={"lsicon:disable-outline"}
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Reject Company
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
                                "Are you sure you want to delete this Company?",
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
                      : "No companies have been listed yet!"}
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
      <Modal
        show={isResetModalOpen}
        onHide={() => setIsResetModalOpen(false)}
        centered
        backdrop="static"
        className="otp-radius "
      >
        <Modal.Header className={"border-0 p-3"}>
          <Modal.Title>Reset Password</Modal.Title>
          <button
            onClick={() => setIsResetModalOpen(false)}
            type="button"
            className="btn-close  shadow-none"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
            
        </Modal.Header>
        <Modal.Body className={"container"}>
      
          <div className="my-3 ">
            <DeftInput
              label="Email"
              placeholder="Enter email"
                            disabled={true}

              readOnly={true}
              value={resetFormData.email}
              onchange={(value) => {
                setResetFormData((prev) => ({ ...prev, email: value }));
                setResetFormErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={resetFormErrors.email}
            />
          </div>
          <div className="my-3 ">
            <DeftInput
              label="Phone"
              placeholder="Enter phone"
               readOnly={true}
               disabled={true}
              value={resetFormData.phone}
              onchange={(value) => {
                setResetFormData((prev) => ({ ...prev, phone: value }));
                setResetFormErrors((prev) => ({ ...prev, phone: "" }));
              }}
              error={resetFormErrors.phone}
            />
          </div>
          <div className="my-3 ">
            <DeftInput
              label="New Password"
              placeholder="Enter new password"
              type="password"
              value={resetFormData.password}
              onchange={(value) => {
                setResetFormData((prev) => ({ ...prev, password: value }));
                setResetFormErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={resetFormErrors.password}
            />
          </div>
          <div className="my-3 ">
            <DeftInput
              label="Confirm Password"
              placeholder="Re-enter new password"
              type="password"
              value={resetFormData.confirmPassword}
              onchange={(value) => {
                setResetFormData((prev) => ({
                  ...prev,
                  confirmPassword: value,
                }));
                setResetFormErrors((prev) => ({
                  ...prev,
                  confirmPassword: "",
                }));
              }}
              error={resetFormErrors.confirmPassword}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className={"border-0"}>
          <Button variant="primary w-100" onClick={handleResetSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={rejectModal?.show}
        onHide={() =>
          setRejectModal({
            show: false,
            id: "",
            reason: "",
            error: "",
          })
        }
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Reject Company</Modal.Title>
          <button
            onClick={() =>
              setRejectModal({
                show: false,
                id: "",
                reason: "",
                error: "",
              })
            }
            type="button"
            className="btn-close shadow-none"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <label className="form-label">Reason</label>
          <textarea
            className="form-control"
            rows={4}
            placeholder="Enter rejection reason"
            value={rejectModal?.reason || ""}
            onChange={(e) =>
              setRejectModal((prev) => ({
                ...prev,
                reason: e.target.value,
                error: "",
              }))
            }
          />
          {rejectModal?.error ? (
            <small className="text-danger">{rejectModal?.error}</small>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() =>
              setRejectModal({
                show: false,
                id: "",
                reason: "",
                error: "",
              })
            }
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRejectSubmit}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
      <LoadingBar color={"#0b0b7c"} height="0.5rem" ref={loadingBarRef} />
    </>
  );
}
