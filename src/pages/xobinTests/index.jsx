// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Pagination } from "react-bootstrap";

import ConfirmationModal from "../../components/confirmationModel/confirmation";
import { getXobinAssessmentListByAdmin } from "../../store/slice/onBoardingSlice";

export default function XobinTests() {
  const dispatch = useDispatch();
  const { xobinAssessmentList, xobinAssessmentTotalCount } = useSelector(
    (state) => state.onBoarding
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedTestJson, setSelectedTestJson] = useState(null);
  const totalPages = Math.max(
    1,
    Math.ceil((xobinAssessmentTotalCount || 0) / itemsPerPage)
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadXobinAssessments();
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchText, sortBy, currentPage, itemsPerPage]);

  const loadXobinAssessments = async (payload = {}) => {
    setLoading(true);
    await dispatch(
      getXobinAssessmentListByAdmin({
        page: currentPage,
        limit: itemsPerPage,
        search: searchText?.trim(),
        sort_by: sortBy,
        language: "en",
        ...payload,
      })
    );
    setLoading(false);
  };

  const dialogData = useMemo(
    () => ({
      title: "Fetch Xobin Tests",
      message: "This will fetch the latest Xobin assessments. Proceed?"
    }),
    []
  );

  const normalizeType = (item) => {
    return (
      item?.test_type ||
      item?.assessment_type ||
      item?.skillLevel ||
      "-"
    );
  };

  const getProctoringStatus = (item) => {
    const proctoring = item?.proctoring_status;
    if (proctoring && typeof proctoring === "object") {
      const anyEnabled = Object.values(proctoring).some((value) => {
        if (typeof value === "boolean") return value;
        if (typeof value === "string") return value.toLowerCase() === "true";
        if (typeof value === "number") return value === 1;
        return false;
      });
      return anyEnabled ? "Proctored" : "Non-Proctored";
    }

    const typeValue = String(
      item?.test_type || item?.assessment_type || item?.type || ""
    ).toLowerCase();
    if (typeValue.includes("proctored")) return "Proctored";
    if (typeValue.includes("non-proctored")) return "Non-Proctored";

    return "Non-Proctored";
  };

  const normalizeId = (item) => {
    return (
      item?.xobin_assessment_id ||
      item?.assessment_id ||
      item?.xobin_id ||
      item?.id ||
      "-"
    );
  };

  const normalizeName = (item) => {
    return (
      item?.test_name ||
      item?.assessment_name ||
      item?.skillLevel ||
      item?.title ||
      "-"
    );
  };

  const handleFetchConfirm = async () => {
    await loadXobinAssessments();
    setConfirmOpen(false);
  };

  const handleResetFilters = () => {
    const hasActiveFilters = searchText?.trim() || sortBy !== 0;
    setSearchText("");
    setSortBy(0);
    setCurrentPage(1);
    if (!hasActiveFilters) {
      loadXobinAssessments({ search: "", sort_by: 0, page: 1 });
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString();
  };

  const toLabel = (key) =>
    String(key || "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const getProctoringItems = (item) => {
    const proctoring = item?.proctoring_status;
    if (!proctoring || typeof proctoring !== "object") return [];

    return Object.entries(proctoring).map(([key, value]) => {
      const enabled =
        value === true ||
        value === 1 ||
        String(value).toLowerCase() === "true";
      return { key, label: toLabel(key), enabled };
    });
  };

  return (
    <>
      <div className="card">
        <div className="p-3 d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
          <div>
            <h4 className="mb-1">Xobin Tests / Assessments</h4>
            <div className="text-muted small">
              Manage synced Xobin test catalog for company inquiries.
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark d-flex align-items-center gap-2"
            disabled={loading}
            onClick={() => setConfirmOpen(true)}
          >
            <Icon icon="bx:cloud-download" height={18} />
            {loading ? "Fetching..." : "Fetch Xobin Test"}
          </button>
        </div>

        <div className="container pb-4">
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label mb-1">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Test ID or Test Name"
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
                <option value={3}>Assessment Primary Skills (A-Z)</option>
                <option value={4}>Assessment Primary Skills (Z-A)</option>
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
                  <th>Test ID</th>
                  <th>Test Name</th>
                  <th>Skill Level</th>
                  <th>Proctoring</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {xobinAssessmentList?.map((test, index) => (
                  <tr key={normalizeId(test) !== "-" ? normalizeId(test) : index}>
                    <td className="fw-semibold">{normalizeId(test)}</td>
                    <td>{normalizeName(test)}</td>
                    <td>
                     
                         {normalizeType(test)}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          getProctoringStatus(test) === "Proctored"
                            ? "bg-dark"
                            : "bg-label-secondary"
                        }`}
                      >
                        {getProctoringStatus(test)}
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
                            onClick={() => setSelectedTestJson(test)}
                          >
                            <Icon icon="mdi:eye" height={20} className={"me-1"} /> View
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {xobinAssessmentList?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      No Xobin tests available.
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
              <b>{xobinAssessmentTotalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</b>{" "}
              to{" "}
              <b>
                {Math.min(currentPage * itemsPerPage, xobinAssessmentTotalCount || 0)}
              </b>{" "}
              of <b>{xobinAssessmentTotalCount || 0}</b> entries
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
      </div>

      <ConfirmationModal
        open={confirmOpen}
        handleClose={() => setConfirmOpen(false)}
        dialogData={dialogData}
        handleSubmit={handleFetchConfirm}
      />

      <Modal
        show={!!selectedTestJson}
        onHide={() => setSelectedTestJson(null)}
        centered
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Assessment Details</Modal.Title>
          <button
            type="button"
            className="btn-close shadow-none"
            aria-label="Close"
            onClick={() => setSelectedTestJson(null)}
          ></button>
        </Modal.Header>
        <Modal.Body>
          {selectedTestJson ? (
            <>
              <div className="row g-3">
                <div className="col-md-6">
                  <small className="text-muted">Test ID</small>
                  <div className="fw-semibold">{normalizeId(selectedTestJson)}</div>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">Assessment ID</small>
                  <div>{selectedTestJson?.assessment_id || "-"}</div>
                </div>
                <div className="col-12">
                  <small className="text-muted">Test Name</small>
                  <div className="fw-semibold">{normalizeName(selectedTestJson)}</div>
                </div>
                <div className="col-md-4">
                  <small className="text-muted">Skill Level</small>
                  <div>{selectedTestJson?.skillLevel || "-"}</div>
                </div>
                <div className="col-md-4">
                  <small className="text-muted">Skill Type</small>
                  <div>{selectedTestJson?.skillType || "-"}</div>
                </div>
                <div className="col-md-4">
                  <small className="text-muted">Test Type</small>
                  <div>{selectedTestJson?.testType ?? "-"}</div>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">Duration</small>
                  <div>
                    {selectedTestJson?.assessment_duration
                      ? `${selectedTestJson.assessment_duration} min`
                      : "-"}
                  </div>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">Questions</small>
                  <div>{selectedTestJson?.number_of_questions || "-"}</div>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">Created By</small>
                  <div>{selectedTestJson?.created_by || "-"}</div>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">Company ID</small>
                  <div>{selectedTestJson?.company_id || "-"}</div>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">Created At</small>
                  <div>{formatDateTime(selectedTestJson?.createdAt)}</div>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">Updated At</small>
                  <div>{formatDateTime(selectedTestJson?.updatedAt)}</div>
                </div>
              </div>

              <hr />

              <div>
                <small className="text-muted d-block mb-2">Proctoring</small>
                <div className="d-flex flex-wrap gap-2">
                  {getProctoringItems(selectedTestJson).length > 0 ? (
                    getProctoringItems(selectedTestJson).map((item) => (
                      <span
                        key={item.key}
                        className={`badge ${item.enabled ? "bg-label-success" : "bg-label-secondary"}`}
                      >
                        {item.label}: {item.enabled ? "Enabled" : "Disabled"}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted">No proctoring details available</span>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}
