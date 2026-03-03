// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Pagination } from "react-bootstrap";

import { getCompTestListingByAdmin } from "../../store/slice/onBoardingSlice";
import { changeDate } from "../../utils/appConstant";

export default function CompTest() {
  const dispatch = useDispatch();
  const { compTestListingByAdmin, compTestListingTotalCount } = useSelector(
    (state) => state.onBoarding
  );
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCompTestJson, setSelectedCompTestJson] = useState(null);
  const totalPages = Math.max(
    1,
    Math.ceil((compTestListingTotalCount || 0) / itemsPerPage)
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadCompTests();
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchText, sortBy, currentPage, itemsPerPage]);

  const loadCompTests = async (payload = {}) => {
    setLoading(true);
    await dispatch(
      getCompTestListingByAdmin({
        page: currentPage,
        limit: itemsPerPage,
        search: searchText?.trim(),
        sort_by: sortBy,
        skills: [],
        company_id: "",
        language: "en",
        ...payload,
      })
    );
    setLoading(false);
  };

  const handleResetFilters = () => {
    const hasActiveFilters = searchText?.trim() || sortBy !== 0;
    setSearchText("");
    setSortBy(0);
    setCurrentPage(1);
    if (!hasActiveFilters) {
      loadCompTests({ search: "", sort_by: 0, page: 1 });
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const normalizeId = (item) => item?.id || item?._id || "-";
  const normalizeTitle = (item) => item?.title || item?.job_title || "-";
  const normalizeCompany = (item) =>
    item?.companyData?.firstName || item?.company_name || "-";
  const normalizeSkills = (item) => {
    if (Array.isArray(item?.primary_skills) && item?.primary_skills?.length) {
      return item.primary_skills.join(", ");
    }
    return "-";
  };
  const getProctoringStatus = (item) => {
    const proctoring = item?.proctoring_status || item?.assessmentDetails?.proctoring_status;
    if (proctoring && typeof proctoring === "object") {
      const anyEnabled = Object.values(proctoring).some((value) => {
        if (typeof value === "boolean") return value;
        if (typeof value === "string") return value.toLowerCase() === "true";
        if (typeof value === "number") return value === 1;
        return false;
      });
      return anyEnabled ? "Proctored" : "Non-Proctored";
    }

    const typeValue = String(item?.comp_test_type || item?.testType || item?.test_type || "")
      .toLowerCase();
    if (typeValue.includes("proctored")) return "Proctored";
    if (typeValue.includes("non-proctored")) return "Non-Proctored";

    return "Non-Proctored";
  };

  return (
    <div className="card">
      <div className="p-3">
        <h4 className="mb-1">Comp Test</h4>
        <div className="text-muted small">
          Manage company test listing requests.
        </div>
      </div>

      <div className="container pb-4">
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label mb-1">Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Job Title"
              value={searchText}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchText(e.target.value);
              }}
            />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label mb-1">Filters</label>
            <select
              className="form-select"
              value={sortBy === 0 ? "" : sortBy}
              onChange={(e) => {
                setCurrentPage(1);
                setSortBy(Number(e.target.value));
              }}
            >
              <option value="" disabled>
                Select filter
              </option>
              <option value={1}>Date Posted (Newest)</option>
              <option value={2}>Date Posted (Oldest)</option>
              <option value={3}>Primary Skills (A-Z)</option>
              <option value={4}>Primary Skills (Z-A)</option>
            </select>
          </div>
          <div className="col-12 col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={handleResetFilters}
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="table-responsive text-nowrap">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Inquiry ID</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Primary Skills</th>
                <th>Proctoring</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {compTestListingByAdmin?.map((item, index) => (
                <tr key={normalizeId(item) !== "-" ? normalizeId(item) : index}>
                  <td className="fw-semibold">{normalizeId(item)}</td>
                  <td>{normalizeTitle(item)}</td>
                  <td>{normalizeCompany(item)}</td>
                  <td>{normalizeSkills(item)}</td>
                  <td>
                    <span
                      className={`badge ${
                        getProctoringStatus(item) === "Proctored"
                          ? "bg-dark"
                          : "bg-label-secondary"
                      }`}
                    >
                      {getProctoringStatus(item)}
                    </span>
                  </td>
                  <td>{item?.createdAt ? changeDate(item?.createdAt) : "-"}</td>
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
                          onClick={() => setSelectedCompTestJson(item)}
                        >
                          <Icon icon="mdi:eye" height={20} className={"me-1"} /> View
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {compTestListingByAdmin?.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    No comp test records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="row mt-3 align-items-center">
          <div className="col-12 col-md-4 mb-2 mb-md-0">
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
          <div className="col-12 col-md-4 mb-2 mb-md-0">
            Showing{" "}
            <b>{compTestListingTotalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</b>{" "}
            to{" "}
            <b>{Math.min(currentPage * itemsPerPage, compTestListingTotalCount || 0)}</b>{" "}
            of <b>{compTestListingTotalCount || 0}</b> entries
          </div>
          <div className="col-12 col-md-4">
            <div className="d-flex justify-content-md-end">
              <Pagination className="mb-0">
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

      <Modal
        show={!!selectedCompTestJson}
        onHide={() => setSelectedCompTestJson(null)}
        centered
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Comp Test JSON Details</Modal.Title>
          <button
            type="button"
            className="btn-close shadow-none"
            aria-label="Close"
            onClick={() => setSelectedCompTestJson(null)}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <pre
            className="mb-0"
            style={{
              maxHeight: "60vh",
              overflow: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {selectedCompTestJson ? JSON.stringify(selectedCompTestJson, null, 2) : ""}
          </pre>
        </Modal.Body>
      </Modal>
    </div>
  );
}
