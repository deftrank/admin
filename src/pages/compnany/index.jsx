// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  deleteUser,
  getListOfCompanyByAdmin,
  suspendUser,
} from "../../store/slice/onBoardingSlice";
import DeftInput from "../../components/deftInput/deftInput";
import CompanyDefault from "../../assets/img/companyDefaul.png";
import Confirmation from "../../components/confirmationModel/confirmation";

export default function index() {
  const { listOfCompanyByAdmin, compnanyTotalCount } = useSelector(
    (state) => state.onBoarding
  );
  const loadingBarRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [changePasswordModal, setChangePasswordModal] = useState({});
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 5;
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

  const getCompnanyList = () => {
    const data = {
      search: searchData,
      page: currentPage,
      limit: itemsPerPage,
    };
    dispatch(getListOfCompanyByAdmin(data));
  };

  const handleClose = (id, flag) => {
    if (flag == "edit") {
      navigate(`/company-edit/${id}`);
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
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Website</th>
                <th>Most hired skills</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {listOfCompanyByAdmin?.map((item) => (
                <tr key={item?.id}>
                  <td>
                    {/* <img
                  src={item.company_logo ? item.company_logo : Logo}
                  style={{ width: 40, height: 40 }}
                /> */}
                    <img
                      src={CompanyDefault}
                      style={{ width: 50, height: 50 }}
                    />
                  </td>
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
                  <td>{item.company_website}</td>
                  <td>
                    <div
                      style={{
                        width: "10vw",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {item.most_hired_skills?.map((skill, index) => (
                        <span key={index}>
                          {skill?.label}
                          {index < item.most_hired_skills.length - 1 &&
                          skill?.label
                            ? ", "
                            : ""}
                        </span>
                      ))}
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
                              title: "Disable Company",
                              data: item,
                              message:
                                "Are you sure you want to disable this company",
                              type: "Disable",
                            }));
                          }}
                        >
                          <Icon
                            icon="lsicon:disable-outline"
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Disable Company
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
              <tr>
                {listOfCompanyByAdmin?.length == 0 ? (
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
                  {currentPage * itemsPerPage} of {compnanyTotalCount}
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
