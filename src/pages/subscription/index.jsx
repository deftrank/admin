// @ts-nocheck
import React, { useMemo, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";

import DeftInput from "../../components/deftInput/deftInput";
import { monetizationSections } from "../../data/monetizationPlans";
import "./subscription.css";

const formatValue = (value) => {
  if (value === undefined || value === null || value === "") {
    return "-";
  }
  return value;
};

const formatCurrency = (value) => {
  if (value === undefined || value === null || value === "") {
    return "-";
  }
  return `INR ${value}`;
};

const normalize = (value) => `${value || ""}`.toLowerCase();

const buildTagBadges = (tags = []) => (
  <div className="d-flex flex-wrap gap-1">
    {tags.length === 0 ? (
      <span className="text-muted">-</span>
    ) : (
      tags.map((tag) => (
        <span key={tag} className="badge bg-label-primary">
          {tag}
        </span>
      ))
    )}
  </div>
);

const buildFeatureBadges = (item) => {
  const features = [];
  if (item.resumeDownloads) features.push("Resume downloads");
  if (item.contactUnlock) features.push("Contact unlock");
  if (item.testRequest) features.push("Test request");
  if (item.discountEligible) features.push("Discount eligible");
  if (item.dedicatedRm) features.push("Dedicated RM");

  if (features.length === 0) {
    return <span className="text-muted">-</span>;
  }

  return (
    <div className="d-flex flex-wrap gap-1">
      {features.map((feature) => (
        <span key={feature} className="badge bg-label-info">
          {feature}
        </span>
      ))}
    </div>
  );
};

export default function SubscriptionPlans() {
  const [searchData, setSearchData] = useState("");
  const [sections, setSections] = useState(() =>
    JSON.parse(JSON.stringify(monetizationSections))
  );
  const [openSections, setOpenSections] = useState(() =>
    new Set(monetizationSections.slice(0, 1).map((section) => section.id))
  );
  const [editSectionId, setEditSectionId] = useState(null);
  const [editPlanId, setEditPlanId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const searchTerm = searchData.trim().toLowerCase();
  const isSearchActive = searchTerm.length > 0;

  const filteredSections = useMemo(() => {
    return sections.map((section) => {
      const filteredItems = section.items.filter((item) => {
        const haystack = [
          section.title,
          item.name,
          item.id,
          item.visibility,
          item.status,
          ...(item.tags || [])
        ]
          .map(normalize)
          .join(" ");
        return normalize(haystack).includes(searchTerm);
      });

      return {
        ...section,
        filteredItems
      };
    });
  }, [sections, searchTerm]);

  const totalMatches = filteredSections.reduce(
    (sum, section) => sum + section.filteredItems.length,
    0
  );

  const handleToggleSection = (sectionId) => {
    if (isSearchActive) return;
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleEditOpen = (sectionId, planId) => {
    const section = sections.find((item) => item.id === sectionId);
    if (!section) return;
    const plan = section.items.find((item) => item.id === planId);
    if (!plan) return;
    setEditSectionId(sectionId);
    setEditPlanId(planId);
    setEditForm({ ...plan });
  };

  const handleEditClose = () => {
    setEditSectionId(null);
    setEditPlanId(null);
    setEditForm(null);
  };

  const handleEditChange = (key, value) => {
    setEditForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const applyCompanyTags = (plan) => {
    if (editSectionId !== "company-connect") return plan;
    const tags = [];
    if (plan.bestseller) tags.push("Bestseller");
    if (plan.recommended) tags.push("Recommended");
    if (plan.enterprise) tags.push("Enterprise");
    return {
      ...plan,
      tags
    };
  };

  const handleEditSave = () => {
    if (!editForm || !editSectionId || !editPlanId) return;
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== editSectionId) return section;
        return {
          ...section,
          items: section.items.map((item) => {
            if (item.id !== editPlanId) return item;
            return applyCompanyTags(editForm);
          })
        };
      })
    );
    handleEditClose();
  };

  const renderCell = (item, column) => {
    if (column.type === "currency") {
      return formatCurrency(item[column.key]);
    }
    if (column.type === "tags") {
      return buildTagBadges(item[column.key]);
    }
    if (column.key === "features") {
      return buildFeatureBadges(item);
    }
    return formatValue(item[column.key]);
  };

  return (
    <>
      <div className="card">
        <div className="p-3">
          <h4>Monetization Plans</h4>
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
            <div className="input-group-merge subscription-search">
              <DeftInput
                placeholder="Search plans, tags, or sections"
                type="text"
                value={searchData}
                onchange={(value) => setSearchData(value)}
                leftIcon={<i className="bx bx-search"></i>}
              />
            </div>
            <div className="text-muted align-self-md-center">
              {isSearchActive
                ? `${totalMatches} result${totalMatches === 1 ? "" : "s"}`
                : "Browse plans by folder"}
            </div>
          </div>
        </div>

        <div className="container pb-4">
          <div className="subscription-folders">
            {filteredSections.map((section) => {
              const isOpen = isSearchActive
                ? section.filteredItems.length > 0
                : openSections.has(section.id);
              return (
                <details
                  key={section.id}
                  className="subscription-folder"
                  open={isOpen}
                >
                  <summary
                    className="subscription-folder__summary"
                    onClick={(event) => {
                      if (isSearchActive) return;
                      // Prevent the native <details> toggle; we control it via state.
                      event.preventDefault();
                      handleToggleSection(section.id);
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <Icon icon="bx:folder" height={20} />
                      <div>
                        <div className="fw-semibold">{section.title}</div>
                        <div className="small text-muted">
                          {section.description}
                        </div>
                      </div>
                    </div>
                    <span className="badge bg-label-secondary">
                      {section.filteredItems.length}
                    </span>
                  </summary>

                  <div className="subscription-folder__body">
                    <div className="table-responsive text-nowrap">
                      <table className="table table-hover align-middle">
                        <thead className="table-dark">
                          <tr>
                            {section.columns.map((column) => (
                              <th key={column.key}>{column.label}</th>
                            ))}
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                          {section.filteredItems.map((item) => (
                            <tr
                              key={item.id}
                              className="subscription-row"
                              onClick={() => handleEditOpen(section.id, item.id)}
                            >
                              {section.columns.map((column) => (
                                <td key={`${item.id}-${column.key}`}>
                                  {renderCell(item, column)}
                                </td>
                              ))}
                              <td onClick={(event) => event.stopPropagation()}>
                                <div className="dropdown">
                                  <button
                                    aria-label="Plan actions"
                                    type="button"
                                    className="btn p-0 dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown"
                                  >
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                  </button>
                                  <div className="dropdown-menu">
                                    <button
                                      type="button"
                                      className="dropdown-item"
                                      onClick={() =>
                                        handleEditOpen(section.id, item.id)
                                      }
                                    >
                                      <Icon
                                        icon="iconamoon:edit-thin"
                                        height={20}
                                        className="me-1"
                                      />
                                      Edit Plan
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {section.filteredItems.length === 0 && (
                            <tr>
                              <td
                                colSpan={section.columns.length + 1}
                                className="text-center py-4 text-muted"
                              >
                                {isSearchActive
                                  ? "No matching plans"
                                  : "No plans configured yet"}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>

      <Modal show={!!editForm} centered backdrop="static" size="lg">
        <Modal.Header>
          <h5 className="modal-title">Edit Plan</h5>
          <button
            onClick={handleEditClose}
            type="button"
            className="btn-close shadow-none"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          {editForm && (
            <div className="row">
              {sections
                .find((section) => section.id === editSectionId)
                ?.fields.map((field) => (
                  <div
                    className={`col-12 ${
                      field.type === "boolean" ? "" : "col-md-6"
                    } mb-3`}
                    key={field.key}
                  >
                    {field.type === "boolean" ? (
                      <Form.Check
                        type="switch"
                        id={`${field.key}-switch`}
                        label={field.label}
                        checked={Boolean(editForm[field.key])}
                        onChange={(event) =>
                          handleEditChange(field.key, event.target.checked)
                        }
                      />
                    ) : field.type === "select" ? (
                      <>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Select
                          value={editForm[field.key] || ""}
                          onChange={(event) =>
                            handleEditChange(field.key, event.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select {field.label}
                          </option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Select>
                      </>
                    ) : (
                      <DeftInput
                        label={field.label}
                        value={editForm[field.key]}
                        type={field.type === "number" ? "number" : "text"}
                        onchange={(value) => handleEditChange(field.key, value)}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <button className="btn btn-outline-secondary" onClick={handleEditClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleEditSave}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
