// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";

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
      item?.type ||
      "-"
    );
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
      item?.name ||
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
                  <th>Test Type</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {xobinAssessmentList?.map((test, index) => (
                  <tr key={normalizeId(test) !== "-" ? normalizeId(test) : index}>
                    <td className="fw-semibold">{normalizeId(test)}</td>
                    <td>{normalizeName(test)}</td>
                    <td>
                      <span
                        className={`badge ${
                          normalizeType(test) === "Proctored"
                            ? "bg-dark"
                            : "bg-label-secondary"
                        }`}
                      >
                        {normalizeType(test)}
                      </span>
                    </td>
                  </tr>
                ))}
                {xobinAssessmentList?.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-muted">
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
    </>
  );
}
