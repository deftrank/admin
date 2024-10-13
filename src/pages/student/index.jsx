import { useEffect, useState } from "react";
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

export default function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listOfUserByAdmin, userTotalCount } = useSelector(
    (state) => state.onBoarding
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(userTotalCount / itemsPerPage);
  const [changePasswordModal, setChangePasswordModal] = useState({});

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

  const getStudentList = () => {
    const data = {
      search: searchData,
      page: currentPage,
      limit: itemsPerPage,
    };
    dispatch(getListOfUserByAdmin(data));
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
        <div className="my-3 col-6 card-header">
          <DeftInput
            placeholder="Search be name"
            type="text"
            value={searchData}
            onchange={(value) => {
              setCurrentPage(1);
              setSearchData(value);
            }}
            inputGroupText={<Icon icon="line-md:search" height={30} />}
          />
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Course</th>
                <th>College</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {listOfUserByAdmin?.map((item) => (
                <tr key={item?.id}>
                  <td>
                    {" "}
                    {item?.first_name
                      ? item?.first_name + " " + item?.last_name
                      : "-"}
                  </td>
                  <td>{item?.auth_id?.email ? item?.auth_id?.email : "-"}</td>
                  <td>
                    {item?.auth_id?.phone
                      ? item?.auth_id?.country_code + item?.auth_id?.phone
                      : "-"}
                  </td>
                  <td>
                    <p className="mb-0">
                      {item?.current_course ? item?.current_course : "-"}
                    </p>
                  </td>
                  <td>
                    <div
                      style={{
                        width: "20rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.college_name ? item?.college_name : "-"}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        item?.auth_id?.suspend_status == "active"
                          ? "bg-label-success"
                          : "bg-label-danger"
                      } me-1`}
                    >
                      {item?.auth_id?.suspend_status == "active"
                        ? "Active"
                        : "Suspended"}
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
                          Edit Account
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
                          View Account
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
                              title: "Disable Account",
                              data: item,
                              message:
                                "Are you sure you want to disable this account",
                              type: "Disable",
                            }));
                          }}
                        >
                          <Icon
                            icon="lsicon:disable-outline"
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Disable Account
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
                              title: "Delete Account",
                              data: item,
                              message:
                                "Are you sure you want to delete this account",
                              type: "Delete",
                            }));
                          }}
                        >
                          <Icon
                            icon="mdi-light:delete"
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Delete Account
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                {listOfUserByAdmin?.length == 0 ? (
                  <td colSpan="12" className="text-center">
                    No result found
                  </td>
                ) : (
                  ""
                )}
              </tr>
              <tr>
                <td colSpan="4"></td>
                <td>
                  Items per page: {itemsPerPage} &nbsp; &nbsp;&nbsp; &nbsp;
                  &nbsp; &nbsp;{" "}
                  {currentPage * itemsPerPage - (itemsPerPage - 1)} –{" "}
                  {currentPage * itemsPerPage} of {userTotalCount}
                </td>
                <td colSpan="3">
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
                </td>
              </tr>
            </tbody>
          </table>
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
