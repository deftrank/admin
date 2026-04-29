// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { getStudentAssessmentListByAdmin } from "../../../store/slice/onBoardingSlice";

export default function StudentAssessmentList() {
  const dispatch = useDispatch();
  const { studentAssessmentList, studentAssessmentTotalCount, studentAssessmentDashboard } = useSelector(
    (state) => state.onBoarding
  );

  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(1);
  const [inviteStatus, setInviteStatus] = useState("");
  const [testType, setTestType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.max(
    1,
    Math.ceil((studentAssessmentTotalCount || 0) / itemsPerPage)
  );
  const PAGE_WINDOW = 5;
  const hasActiveFilters =
    searchText.trim() !== "" ||
    sortBy !== 1 ||
    inviteStatus !== "" ||
    testType !== "";

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        getStudentAssessmentListByAdmin({
          page: currentPage,
          limit: itemsPerPage,
          search: searchText?.trim(),
          sort_by: sortBy,
          invite_status: inviteStatus,
          test_type: testType,
          language: "en",
        })
      );
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [dispatch, currentPage, itemsPerPage, searchText, sortBy, inviteStatus, testType]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const getVisiblePages = () => {
    if (totalPages <= PAGE_WINDOW) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(PAGE_WINDOW / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = PAGE_WINDOW;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - PAGE_WINDOW + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const fullName = (item) => {
    const first = item?.student?.first_name || "";
    const last = item?.student?.last_name || "";
    return `${first} ${last}`.trim() || item?.name || "-";
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="p-3 p-md-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h2
            className="mb-1"
            style={{ fontSize: 22, fontWeight: 800, color: "#334a68", lineHeight: 1.2 }}
          >
            Assessments
          </h2>
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
            <Icon icon="solar:clipboard-list-outline" width="18" height="18" />
            {studentAssessmentDashboard?.total_assessment_count || 0} total assessments
          </div>
        </div>

        <div className="row g-2 g-md-3 mb-3">
          <div className="col-6 col-md-4 col-xl">
            <div className="rounded-3 p-2 p-md-3 h-100 border" style={{ backgroundColor: "#EEF4FF", borderColor: "#C9D8F5" }}>
              <div className="small fw-semibold" style={{ color: "#3D5A80" }}>Total Assessment</div>
              <div className="fs-4 fw-bold" style={{ color: "#1D3557" }}>{studentAssessmentDashboard?.total_assessment_count || 0}</div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl">
            <div className="rounded-3 p-2 p-md-3 h-100 border" style={{ backgroundColor: "#EAF8F8", borderColor: "#BCE4E8" }}>
              <div className="small fw-semibold" style={{ color: "#2A6F77" }}>Xobin Test</div>
              <div className="fs-4 fw-bold" style={{ color: "#0F4C5C" }}>{studentAssessmentDashboard?.xobin_test_count || 0}</div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl">
            <div className="rounded-3 p-2 p-md-3 h-100 border" style={{ backgroundColor: "#F5F7FA", borderColor: "#D8DEE9" }}>
              <div className="small fw-semibold" style={{ color: "#4A5568" }}>Company Test</div>
              <div className="fs-4 fw-bold" style={{ color: "#1A202C" }}>{studentAssessmentDashboard?.company_test_count || 0}</div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl">
            <div className="rounded-3 p-2 p-md-3 h-100 border" style={{ backgroundColor: "#EDF9F1", borderColor: "#CBEAD4" }}>
              <div className="small fw-semibold" style={{ color: "#2F855A" }}>Completed Assessment</div>
              <div className="fs-4 fw-bold" style={{ color: "#276749" }}>{studentAssessmentDashboard?.completed_count || 0}</div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl">
            <div className="rounded-3 p-2 p-md-3 h-100 border" style={{ backgroundColor: "#FFF7EA", borderColor: "#F2DEC0" }}>
              <div className="small fw-semibold" style={{ color: "#975A16" }}>Pending Assessment</div>
              <div className="fs-4 fw-bold" style={{ color: "#7B341E" }}>{studentAssessmentDashboard?.pending_count || 0}</div>
            </div>
          </div>
        </div>

        <div className="row g-2 g-md-3 mb-3">
          <div className="col-12 col-lg-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bx bx-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by student, email, assessment"
                value={searchText}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearchText(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => {
                setCurrentPage(1);
                setSortBy(Number(e.target.value));
              }}
            >
              <option value={1}>Newest</option>
              <option value={2}>Oldest</option>
              <option value={9}>Highest Score</option>
              <option value={10}>Lowest Score</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-2">
            <select
              className="form-select"
              value={inviteStatus}
              onChange={(e) => {
                setCurrentPage(1);
                setInviteStatus(e.target.value);
              }}
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-2">
            <select
              className="form-select"
              value={testType}
              onChange={(e) => {
                setCurrentPage(1);
                setTestType(e.target.value);
              }}
            >
              <option value="">All Test Type</option>
              <option value="1">Xobin Test</option>
              <option value="2">Comp Test</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-1">
            <button
              type="button"
              className={`btn w-100 ${hasActiveFilters ? "btn-primary" : "btn-outline-secondary"}`}
              disabled={!hasActiveFilters}
              onClick={() => {
                setCurrentPage(1);
                setSearchText("");
                setSortBy(1);
                setInviteStatus("");
                setTestType("");
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Assessment</th>
                <th>Type</th>
                <th>Status</th>
                <th>Percentage</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {studentAssessmentList?.map((item) => (
                <tr key={item?._id}>
                  <td>{fullName(item)}</td>
                  <td>{item?.account?.email || item?.email || "-"}</td>
                  <td className="fw-semibold">{item?.assessment_name || "-"}</td>
                  <td>{item?.testType == 2 ? "Comp Test" : "Xobin Test"}</td>
                  <td>{item?.invite_status || item?.reportDetails?.invite_status || "-"}</td>
                  <td>{item?.reportDetails?.overall_percentage ?? item?.score ?? "-"}</td>
                  <td>{formatDate(item?.reportDetails?.completed_date || item?.updatedAt)}</td>
                </tr>
              ))}
              {studentAssessmentList?.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    No student assessments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="row mt-3 g-2 align-items-center">
          <div className="col-12 col-lg-3">
            <span className="me-2">Show</span>
            <select
              className="form-select d-inline-block"
              style={{ width: "90px" }}
              value={itemsPerPage}
              onChange={(e) => {
                setCurrentPage(1);
                setItemsPerPage(Number(e.target.value));
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="ms-2">entries</span>
          </div>
          <div className="col-12 col-lg-5 text-muted">
            Showing{" "}
            <b>{studentAssessmentTotalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</b>{" "}
            to{" "}
            <b>{Math.min(currentPage * itemsPerPage, studentAssessmentTotalCount || 0)}</b>{" "}
            of <b>{studentAssessmentTotalCount || 0}</b> entries
          </div>
          <div className="col-12 col-lg-4">
            <div className="d-flex justify-content-lg-end">
              <Pagination className="mb-0 flex-wrap">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {getVisiblePages().map((page) => (
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
      </div>
    </div>
  );
}
