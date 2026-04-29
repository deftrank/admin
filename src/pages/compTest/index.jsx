// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Pagination } from "react-bootstrap";

import { getCompTestListingByAdmin } from "../../store/slice/onBoardingSlice";
import { changeDate } from "../../utils/appConstant";

/* ─── Detail label-value row ─── */
function DetailRow({ label, value, fullWidth }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className={fullWidth ? "col-12 mb-3" : "col-12 col-md-6 mb-3"}>
      <div className="text-muted small mb-1">{label}</div>
      <div className="fw-semibold" style={{ wordBreak: "break-word" }}>
        {value}
      </div>
    </div>
  );
}

/* ─── Section header ─── */
function SectionHeader({ icon, title }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-3 mt-2">
      <Icon icon={icon} height={20} style={{ color: "#696cff" }} />
      <h6 className="fw-bold mb-0">{title}</h6>
    </div>
  );
}

/* ─── Parsed Comp Test Detail View ─── */
function CompTestDetailView({ data }) {
  const company = data?.companyData || {};
  const assessment = data?.assessmentDetails || {};
  const proctoring = data?.proctoring_status || assessment?.proctoring_status;

  const statusMap = { 1: "Active", 0: "Inactive", 2: "Pending" };
  const complexityMap = { 1: "Easy", 2: "Medium", 3: "Hard" };
  const testTypeMap = { 1: "Comp Test", 2: "Skill Test" };

  const formatList = (val) => {
    if (Array.isArray(val)) return val.filter(Boolean).join(", ");
    if (typeof val === "string") return val;
    return null;
  };

  const proctoringEntries = proctoring && typeof proctoring === "object"
    ? Object.entries(proctoring).filter(([, v]) => v !== null && v !== undefined)
    : [];

  return (
    <div>
      {/* ── Test Info ── */}
      <SectionHeader icon="mdi:clipboard-text-outline" title="Test Information" />
      <div className="row">
        <DetailRow label="Inquiry ID" value={data?.id || data?._id} />
        <DetailRow label="Title" value={data?.title || data?.job_title} />
        <DetailRow label="Status" value={statusMap[data?.status] || data?.status} />
        <DetailRow label="Test Type" value={testTypeMap[data?.comp_test_type] || data?.comp_test_type} />
        <DetailRow label="Complexity" value={complexityMap[data?.complexity_level] || data?.complexity_level} />
        <DetailRow label="Skills" value={formatList(data?.skills || data?.primary_skills)} />
        <DetailRow label="Description" value={data?.description} fullWidth />
      </div>

      <hr className="my-3" />

      {/* ── Company Info ── */}
      {Object.keys(company).length > 0 && (
        <>
          <SectionHeader icon="mdi:office-building" title="Company Information" />
          <div className="row">
            <DetailRow label="Company Name" value={company?.firstName || company?.company_name} />
            <DetailRow label="Category" value={company?.category} />
            <DetailRow label="Contact Person" value={company?.contact_person_name} />
            <DetailRow label="Contact Number" value={company?.contact_person_number} />
            <DetailRow label="Phone Verified" value={company?.is_phone_verified ? "Yes" : "No"} />
            <DetailRow label="Website" value={company?.company_website} />
            <DetailRow
              label="Most Hired Skills"
              value={formatList(company?.most_hired_skills)}
              fullWidth
            />
          </div>
          <hr className="my-3" />
        </>
      )}

      {/* ── Assessment Details ── */}
      {Object.keys(assessment).length > 0 && (
        <>
          <SectionHeader icon="mdi:file-document-check-outline" title="Assessment Details" />
          <div className="row">
            <DetailRow label="Assessment ID" value={assessment?.assessment_id || assessment?.id} />
            <DetailRow label="Assessment Name" value={assessment?.name || assessment?.assessment_name} />
            <DetailRow label="Duration" value={assessment?.duration ? `${assessment.duration} mins` : null} />
            <DetailRow label="Total Questions" value={assessment?.total_questions} />
            <DetailRow label="Passing Score" value={assessment?.passing_score != null ? `${assessment.passing_score}%` : null} />
          </div>
          <hr className="my-3" />
        </>
      )}

      {/* ── Proctoring ── */}
      {proctoringEntries.length > 0 && (
        <>
          <SectionHeader icon="mdi:shield-check-outline" title="Proctoring Settings" />
          <div className="row">
            {proctoringEntries.map(([key, val]) => (
              <div className="col-6 col-md-4 mb-2" key={key}>
                <div className="d-flex align-items-center gap-2">
                  <Icon
                    icon={val ? "mdi:check-circle" : "mdi:close-circle"}
                    height={18}
                    style={{ color: val ? "#28a745" : "#adb5bd" }}
                  />
                  <span className="small" style={{ color: val ? "inherit" : "#adb5bd" }}>
                    {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-3" />
        </>
      )}

      {/* ── Timestamps ── */}
      {(data?.createdAt || data?.updatedAt) && (
        <>
          <SectionHeader icon="mdi:calendar-clock" title="Timestamps" />
          <div className="row">
            <DetailRow label="Created At" value={data?.createdAt ? changeDate(data.createdAt) : null} />
            <DetailRow label="Updated At" value={data?.updatedAt ? changeDate(data.updatedAt) : null} />
          </div>
        </>
      )}

      {/* ── Extra Fields (catch-all for unknown keys) ── */}
      {(() => {
        const knownKeys = new Set([
          "id", "_id", "__v", "title", "job_title", "description", "skills", "primary_skills",
          "comp_test_type", "complexity_level", "status", "companyData", "assessmentDetails",
          "proctoring_status", "createdAt", "updatedAt", "category_id", "skills_id",
        ]);
        const extra = Object.entries(data).filter(
          ([k, v]) => !knownKeys.has(k) && v !== null && v !== undefined && typeof v !== "object"
        );
        if (extra.length === 0) return null;
        return (
          <>
            <SectionHeader icon="mdi:information-outline" title="Additional Details" />
            <div className="row">
              {extra.map(([key, val]) => (
                <DetailRow
                  key={key}
                  label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  value={String(val)}
                />
              ))}
            </div>
          </>
        );
      })()}
    </div>
  );
}

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
              placeholder="Search by Job Title and Company"
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
          <Modal.Title className="fw-bold">Comp Test Details</Modal.Title>
          <button
            type="button"
            className="btn-close shadow-none"
            aria-label="Close"
            onClick={() => setSelectedCompTestJson(null)}
          ></button>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {selectedCompTestJson && (
            <CompTestDetailView data={selectedCompTestJson} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
