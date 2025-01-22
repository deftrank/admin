// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Pagination } from "react-bootstrap";

import { Icon } from "@iconify/react";

import moment from "moment-timezone"; // Import moment-timezone

import LoadingBar from "react-top-loading-bar";


import DeftInput from "../../components/deftInput/deftInput";
import { getPlanListByAdmin } from "../../store/slice/onBoardingSlice";
import { changeDate } from "../../utils/appConstant";

export default function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { planListByAdmin,planListCount, } = useSelector(
    (state) => state.onBoarding
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [sort, setSort] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // const totalPages = Math.ceil(planListByAdmin.length/ itemsPerPage);
  const [changePasswordModal, setChangePasswordModal] = useState([]);
  const [dateRange, setDateRange] = useState({});
  const [status, setStatus] = useState("");
  const loadingBarRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {

    dispatch(getPlanListByAdmin())
  }, []);

  useEffect(() => {getPlanListByAdmin();}, [currentPage,searchData,itemsPerPage,dateRange,status]);





  const handleClose = (id, flag) => {
    if (flag == "edit") {
      navigate(`/subscription-plan/${id}`);
    } else {
      navigate(`/student-details/${id}`);
    }
  };

  return (
    <>
      <div className="card">
        <div class="p-3">
          <h4>Subscription Plans</h4>
          <div class="d-flex justify-content-between">
            <div class="row">
              <div class=" input-group-merge">
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
            
            </div>
          </div>
        </div>

     <div className="container">
     <div className="table-responsive text-nowrap">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>title</th>
                <th>Description</th>
                <th>Discount</th>
                <th>Create</th>
                <th>Amount</th>
              
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {planListByAdmin?.map((item) => (
                <tr key={item?._id}>
                  {console.log(item?.name)}
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                    
                      data-bs-placement="top"
                      title={
                        item?.name
                          ?     item?.name
                          : ""
                      }
                      style={{
                        width: "8vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        
                      }}
                    >
                      {item?.name
                        ? item?.name
                        : "-"}
                    </div>
                  </td>
                  <td>
                  <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item?.title ? item?.title : ""}
                      style={{
                        width: "8vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.title ? item?.title : "-"}
                    </div>
                   
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item?.description ? item?.description : ""}
                      style={{
                        width: "8vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.description ? item?.description : "-"}
                    </div>
                  </td>
                 
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item?.discount ? item?.discount : ""}
                      style={{
                        width: "8vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.discount ? item?.discount : "-"}
                    </div>
                  </td>
                  
                  <td>
                    <p className="mb-0">
                      {item?.createdAt ? changeDate(item?.createdAt) : "-"}
                    </p>
                  </td>
                  <td>
                    <div
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item?.amount ? item?.amount : ""}
                      style={{
                        width: "8vw",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.amount ? item?.amount : "-"}
                    </div>
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
                          onClick={() => handleClose(item?._id, "edit")}
                        >
                          <Icon
                            icon="iconamoon:edit-thin"
                            height={20}
                            className={"me-1"}
                          />{" "}
                          Edit Plan
                        </a>
                        {/* <a
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
                        </a> */}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {planListByAdmin?.length == 0 && (
                <tr
                  style={{
                    height: "20rem",
                    fontSize: "2rem",
                    fontWeight: "600",
                  }}
                >
                  <td colSpan="12" className="text-center">
                    { planListCount== 0
                      ? "No Students listed yet!"
                      : "No result available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
     </div>

        {/* <div class="container mt-4">
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
              to <b>{currentPage * itemsPerPage}</b> of <b>{planListCount}</b>{" "}
              entries
            </div>

            <div class="col">
              <div className="d-flex justify-content-end">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages).keys()]?.map((page) => (
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
        </div> */}
      </div>
      {/* 
      {changePasswordModal && (
        <Con
          dialogData={changePasswordModal}
          open={changePasswordModal?.show}
          handleClose={() => setChangePasswordModal(false)}
          handleSubmit={() =>
            changePasswordModal?.type == "Delete"
              ? deleteAccount()
              : suspentAccount()
          }
        />
      )} */}
      <LoadingBar color={"#0b0b7c"} height="0.5rem" ref={loadingBarRef} />
    </>
  );
}
