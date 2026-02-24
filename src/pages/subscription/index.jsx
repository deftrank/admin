// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";

import DeftInput from "../../components/deftInput/deftInput";
import api from "../../service";
import { DEFT_RANK_API } from "../../service/apiConstant";
import "./subscription.css";

const SECTION_CONFIG = [
  {
    id: "company-connect",
    group: "company",
    title: "Company Connect Plans",
    description: "Plans that unlock hiring actions for companies.",
    listEndpoint: DEFT_RANK_API.plans.companyConnectList,
    columns: [
      { key: "name", label: "Plan" },
      { key: "priceInr", label: "Price (INR)", type: "currency" },
      { key: "connects", label: "Connects" },
      { key: "validityDays", label: "Validity (days)" },
      { key: "visibility", label: "Visibility" },
      { key: "features", label: "Features" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  {
    id: "student-test-credits",
    group: "student",
    title: "Student Test Credit Plans",
    description: "Student plans with tests and BG Campus credits.",
    listEndpoint: DEFT_RANK_API.plans.studentTestCreditsList,
    columns: [
      { key: "name", label: "Plan" },
      { key: "priceInr", label: "Price (INR)", type: "currency" },
      { key: "testsIncluded", label: "Tests Included" },
      { key: "bgCampusCredits", label: "BG Campus Credits" },
      { key: "validityDays", label: "Validity (days)" },
      { key: "visibility", label: "Visibility" },
    ],
  },
  {
    id: "ai-mentor-packs",
    group: "student",
    title: "AI Mentor On-Demand Packs",
    description: "Standalone packs that stack with plan credits.",
    listEndpoint: DEFT_RANK_API.plans.aiMentorPacksList,
    columns: [
      { key: "name", label: "Pack" },
      { key: "priceInr", label: "Price (INR)", type: "currency" },
      { key: "credits", label: "Credits" },
      { key: "validityMonths", label: "Validity (months)" },
    ],
  },
  {
    id: "on-demand-tests",
    group: "student",
    title: "On-Demand Test Pricing",
    description: "Per-test pricing configuration for students.",
    listEndpoint: DEFT_RANK_API.plans.onDemandTestsList,
    columns: [
      { key: "name", label: "Name" },
      { key: "basePriceInr", label: "Base Price (INR)", type: "currency" },
      { key: "validityMonths", label: "Validity (months)" },
      { key: "status", label: "Status" },
    ],
  },
];

const formatValue = (value) => {
  if (value === undefined || value === null || value === "") return "-";
  return value;
};

const formatCurrency = (value) => {
  if (value === undefined || value === null || value === "") return "-";
  return `INR ${value}`;
};

const normalize = (value) => `${value || ""}`.toLowerCase();

const getArrayFromResult = (result) => {
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.data)) return result.data.data;
  if (Array.isArray(result)) return result;
  return [];
};

const normalizePlanItem = (item) => ({
  ...item,
  id: item?.id || item?._id || "",
  tags: Array.isArray(item?.tags) ? item.tags : [],
});

const buildFeatureBadges = (item) => {
  const features = [];
  if (item.resumeDownloads) features.push("Resume downloads");
  if (item.contactUnlock) features.push("Contact unlock");
  if (item.testRequest) features.push("Test request");
  if (item.discountEligible) features.push("Discount eligible");
  if (item.dedicatedRm) features.push("Dedicated RM");

  if (features.length === 0) return <span className="text-muted">-</span>;
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

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchData, setSearchData] = useState("");
  const [planScope, setPlanScope] = useState("all");
  const [highlightedPlanId, setHighlightedPlanId] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState(
    SECTION_CONFIG.map((item, index) => ({
      ...item,
      items: [],
      filteredItems: [],
      open: index === 0,
    }))
  );

  useEffect(() => {
    fetchPlanSections();
  }, []);

  useEffect(() => {
    const focusSection = location?.state?.focusSection;
    const updatedPlanId = location?.state?.updatedPlanId;
    const scopeFromSection = SECTION_CONFIG.find(
      (section) => section.id === focusSection
    )?.group;

    if (scopeFromSection) {
      setPlanScope(scopeFromSection);
    }
    if (updatedPlanId) {
      setHighlightedPlanId(`${updatedPlanId}`);
      const timer = setTimeout(() => setHighlightedPlanId(""), 3500);
      return () => clearTimeout(timer);
    }
  }, [location?.state]);

  const fetchPlanSections = async () => {
    setLoading(true);
    try {
      const responses = await Promise.all(
        SECTION_CONFIG.map((section) =>
          api.get(`${section.listEndpoint}/en?t=${Date.now()}`)
        )
      );

      const nextSections = SECTION_CONFIG.map((section, index) => {
        const result = responses[index]?.data;
        const data = getArrayFromResult(result).map(normalizePlanItem);
        return {
          ...section,
          items: data,
          filteredItems: data,
          open: section.id === (location?.state?.focusSection || SECTION_CONFIG[0].id),
        };
      });

      setSections(nextSections);
    } catch (e) {
      console.error(e.message);
      setSections(
        SECTION_CONFIG.map((section) => ({
          ...section,
          items: [],
          filteredItems: [],
          open: section.id === (location?.state?.focusSection || SECTION_CONFIG[0].id),
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  const searchTerm = searchData.trim().toLowerCase();
  const isSearchActive = searchTerm.length > 0;

  const filteredSections = useMemo(() => {
    return sections
      .filter((section) => planScope === "all" || section.group === planScope)
      .map((section) => {
        const filteredItems = section.items.filter((item) => {
          const haystack = [
            section.title,
            item.name,
            item.id,
            item.visibility,
            item.status,
            item.taxRules,
            ...(item.tags || []),
          ]
            .map(normalize)
            .join(" ");
          return normalize(haystack).includes(searchTerm);
        });
        return { ...section, filteredItems };
      });
  }, [planScope, sections, searchTerm]);

  const totalMatches = filteredSections.reduce(
    (sum, section) => sum + section.filteredItems.length,
    0
  );

  const handleToggleSection = (sectionId) => {
    if (isSearchActive) return;
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, open: !section.open }
          : section
      )
    );
  };

  const handleEdit = (sectionId, plan) => {
    navigate(`/subscription-plan/${plan.id}?type=${sectionId}`, {
      state: { plan },
    });
  };

  const renderCell = (item, column) => {
    if (column.type === "currency") return formatCurrency(item[column.key]);
    if (column.type === "tags") return buildTagBadges(item[column.key]);
    if (column.key === "features") return buildFeatureBadges(item);
    return formatValue(item[column.key]);
  };

  return (
    <div className="card">
      <div className="p-3">
        <h4>Monetization Plans</h4>
        <div className="d-flex gap-2 flex-wrap mt-2 mb-3">
          <button
            type="button"
            className={`btn btn-sm ${
              planScope === "all" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setPlanScope("all")}
          >
            All Plans
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              planScope === "company" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setPlanScope("company")}
          >
            Company Plans
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              planScope === "student" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setPlanScope("student")}
          >
            Student Plans
          </button>
        </div>
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
            {loading
              ? "Loading..."
              : isSearchActive
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
              : section.open;
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
                        {section.filteredItems.map((item, index) => (
                          <tr
                            key={item.id || `${section.id}-${index}`}
                            className={`subscription-row ${
                              `${item.id}` === highlightedPlanId
                                ? "subscription-row--highlight"
                                : ""
                            }`}
                          >
                            {section.columns.map((column) => (
                              <td key={`${item.id}-${column.key}`}>
                                {renderCell(item, column)}
                              </td>
                            ))}
                            <td>
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
                                    onClick={() => handleEdit(section.id, item)}
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
                              {loading
                                ? "Loading plans..."
                                : isSearchActive
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
  );
}
