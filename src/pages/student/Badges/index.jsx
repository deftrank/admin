// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Pagination } from "react-bootstrap";

import { Icon } from "@iconify/react";

import moment from "moment-timezone"; // Import moment-timezone

import LoadingBar from "react-top-loading-bar";
import DeftInput from "../../../components/deftInput/deftInput";
import DeftDateRange from "../../../components/deftDaterange";
import { getBadgeListByAdmin } from "../../../store/slice/onBoardingSlice";

export default function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { badgeListByAdmin,badgeCountByAdmin, } = useSelector(
    (state) => state.onBoarding
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [sort, setSort] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(badgeCountByAdmin / itemsPerPage);
  const [changePasswordModal, setChangePasswordModal] = useState([]);
  const [dateRange, setDateRange] = useState({});
  const [status, setStatus] = useState("");
  const loadingBarRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getBadgeList()
  }, []);

  useEffect(() => {getBadgeList();}, [currentPage]);

  useEffect(() => {getBadgeList();}, [searchData]);

  useEffect(() => {getBadgeList();}, [itemsPerPage]);

  useEffect(() => {getBadgeList();}, [dateRange]);

  useEffect(() => {getBadgeList();}, [status]);

  const getBadgeList = () => {
    const utcDateForStart = dateRange[0]?.startDate;
    const utcDateForEnd = dateRange[0]?.endDate;

    const forStartDate = utcDateForStart
      ? moment(utcDateForStart).tz("Asia/Kolkata").format("YYYY-MM-DD")
      : "";
    const forEndDate = utcDateForEnd
      ? moment(utcDateForEnd).tz("Asia/Kolkata").format("YYYY-MM-DD")
      : "";

 
    let data = {
      language: "en",
      page: currentPage,
      limit: itemsPerPage,
      search: searchData,
    };
    dispatch(getBadgeListByAdmin(data, loadingBarRef));
  };

  const handleClose = (id, flag) => {
    if (flag == "edit") {
      navigate(`/student-edit/${id}`);
    } else {
      navigate(`/student-details/${id}`);
    }
  };

  return (
    <>
      <div className="card">
        <div class="p-3">
          <h4>Students</h4>
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
        <div className="row">
           <h1 className={"text-center h-100"}>Ui is coming soon</h1>
        </div>
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
              to <b>{currentPage * itemsPerPage}</b> of <b>{badgeCountByAdmin}</b>{" "}
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
