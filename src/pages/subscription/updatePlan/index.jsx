// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";

import DeftInput from "../../../components/deftInput/deftInput";
import api from "../../../service";
import { DEFT_RANK_API } from "../../../service/apiConstant";

const PLAN_META = {
  "company-connect": {
    title: "Edit Company Connect Plan",
    listEndpoint: DEFT_RANK_API.plans.companyConnectList,
    updateEndpoint: DEFT_RANK_API.plans.companyConnectUpdate,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      {
        key: "priceInr",
        label: "Price (INR)",
        type: "number",
        required: true,
        maxLength: 7,
      },
      { key: "connects", label: "Connects", type: "number", required: true },
      {
        key: "validityDays",
        label: "Validity Days",
        type: "number",
        required: true,
        maxLength: 4,
      },
      { key: "taxRules", label: "Tax Rules", type: "text", required: true },
      {
        key: "visibility",
        label: "Visibility",
        type: "select",
        options: ["Visible", "Hidden"],
        required: true,
      },
      { key: "enterprise", label: "Enterprise", type: "boolean" },
      { key: "bestseller", label: "Bestseller", type: "boolean" },
      { key: "recommended", label: "Recommended", type: "boolean" },
      { key: "resumeDownloads", label: "Resume Downloads", type: "boolean" },
      { key: "contactUnlock", label: "Contact Unlock", type: "boolean" },
      { key: "testRequest", label: "Test Request", type: "boolean" },
      { key: "discountEligible", label: "Discount Eligible", type: "boolean" },
      { key: "dedicatedRm", label: "Dedicated RM", type: "boolean" },
      { key: "tags", label: "Tags (comma separated)", type: "text" },
    ],
  },
  "student-test-credits": {
    title: "Edit Student Test Credit Plan",
    listEndpoint: DEFT_RANK_API.plans.studentTestCreditsList,
    updateEndpoint: DEFT_RANK_API.plans.studentTestCreditsUpdate,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "priceInr", label: "Price (INR)", type: "number", required: true },
      {
        key: "testsIncluded",
        label: "Tests Included",
        type: "number",
        required: true,
      },
      {
        key: "bgCampusCredits",
        label: "BG Campus Credits",
        type: "number",
        required: true,
      },
      {
        key: "validityDays",
        label: "Validity Days",
        type: "number",
        required: true,
      },
      { key: "freeQuota", label: "Free Quota", type: "number", required: true },
      {
        key: "visibility",
        label: "Visibility",
        type: "select",
        options: ["Visible", "Hidden"],
        required: true,
      },
    ],
  },
  "ai-mentor-packs": {
    title: "Edit AI Mentor Pack",
    listEndpoint: DEFT_RANK_API.plans.aiMentorPacksList,
    updateEndpoint: DEFT_RANK_API.plans.aiMentorPacksUpdate,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "priceInr", label: "Price (INR)", type: "number", required: true },
      { key: "credits", label: "Credits", type: "number", required: true },
      {
        key: "validityMonths",
        label: "Validity Months",
        type: "number",
        required: true,
      },
    ],
  },
  "on-demand-tests": {
    title: "Edit On-demand Test Plan",
    listEndpoint: DEFT_RANK_API.plans.onDemandTestsList,
    updateEndpoint: DEFT_RANK_API.plans.onDemandTestsUpdate,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      {
        key: "basePriceInr",
        label: "Base Price (INR)",
        type: "number",
        required: true,
      },
      {
        key: "validityMonths",
        label: "Validity Months",
        type: "number",
        required: true,
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Enabled", "Disabled"],
        required: true,
      },
    ],
  },
};

const getArrayFromResult = (result) => {
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.data)) return result.data.data;
  if (Array.isArray(result)) return result;
  return [];
};

const toBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (value === "true" || value === "1" || value === 1) return true;
  return false;
};

const getPlanId = (plan) => plan?.id || plan?._id;

export default function UpdatePlan() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planType = searchParams.get("type");
  const meta = PLAN_META[planType];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const title = useMemo(() => (meta ? meta.title : "Edit Plan"), [meta]);
  const navigateToPlanList = () => {
    navigate("/subscription-plans", {
      state: {
        focusSection: planType,
        updatedPlanId: id,
        refreshAt: Date.now(),
      },
    });
  };

  useEffect(() => {
    if (!meta) return;
    const statePlan = location?.state?.plan;
    if (statePlan && `${getPlanId(statePlan)}` === `${id}`) {
      setFormData(buildInitialForm(statePlan, planType));
      return;
    }
    fetchPlanById();
  }, [id, planType]);

  const fetchPlanById = async () => {
    if (!meta) return;
    setLoading(true);
    try {
      const response = await api.get(`${meta.listEndpoint}/en`);
      const result = response?.data;
      const list = getArrayFromResult(result);
      const selected = list.find((item) => `${getPlanId(item)}` === `${id}`);
      if (!selected) {
        toast.error("Plan not found.");
        navigateToPlanList();
        return;
      }
      setFormData(buildInitialForm(selected, planType));
    } catch (e) {
      console.error(e.message);
      toast.error("Failed to load plan details.");
      navigateToPlanList();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    if (!meta) return false;
    const nextErrors = {};
    meta.fields.forEach((field) => {
      if (!field.required) return;
      const value = formData?.[field.key];
      if (
        value === undefined ||
        value === null ||
        `${value}`.trim() === "" ||
        value?.trim() == 0
      ) {
        nextErrors[field.key] = `${field.label} is required`;
      }
      // ✅ Number validation
      if (field.type === "number" && value) {
        if (!/^\d+$/.test(value)) {
          nextErrors[
            field.key
          ] = `${field.label} must contain positive numbers only`;
          return;
        }

        // Optional: prevent negative
        if (Number(value) < 0) {
          nextErrors[field.key] = `${field.label} cannot be negative`;
          return;
        }
      }

      // ✅ Max length validation
      if (field.maxLength && value && value.length > field.maxLength) {
        nextErrors[
          field.key
        ] = `${field.label} cannot exceed ${field.maxLength} digits`;
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = () => {
    switch (planType) {
      case "company-connect":
        return {
          name: formData?.name || "",
          priceInr: formData?.priceInr || "",
          connects: formData?.connects || "",
          validityDays: formData?.validityDays || "",
          taxRules: formData?.taxRules || "",
          enterprise: toBoolean(formData?.enterprise),
          visibility: formData?.visibility || "Visible",
          bestseller: toBoolean(formData?.bestseller),
          recommended: toBoolean(formData?.recommended),
          resumeDownloads: toBoolean(formData?.resumeDownloads),
          contactUnlock: toBoolean(formData?.contactUnlock),
          testRequest: toBoolean(formData?.testRequest),
          discountEligible: toBoolean(formData?.discountEligible),
          dedicatedRm: toBoolean(formData?.dedicatedRm),
          tags: `${formData?.tags || ""}`
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        };
      case "student-test-credits":
        return {
          name: formData?.name || "",
          priceInr: formData?.priceInr || "",
          testsIncluded: formData?.testsIncluded || "",
          bgCampusCredits: formData?.bgCampusCredits || "",
          validityDays: formData?.validityDays || "",
          freeQuota: formData?.freeQuota || "",
          visibility: formData?.visibility || "Visible",
        };
      case "ai-mentor-packs":
        return {
          name: formData?.name || "",
          priceInr: formData?.priceInr || "",
          credits: formData?.credits || "",
          validityMonths: formData?.validityMonths || "",
        };
      case "on-demand-tests":
        return {
          name: formData?.name || "",
          basePriceInr: formData?.basePriceInr || "",
          validityMonths: formData?.validityMonths || "",
          status: formData?.status || "Enabled",
        };
      default:
        return {};
    }
  };

  const handleSave = async () => {
    if (!meta) {
      toast.error("Unknown plan type.");
      return;
    }
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = buildPayload();
      const response = await api.put(
        `${meta.updateEndpoint}/${id}/en`,
        payload
      );
      const result = response?.data;
      if (result?.success === false || result?.status === false) {
        toast.error(result?.message || "Failed to update plan.");
        return;
      }
      toast.success("Plan updated successfully.");
      navigateToPlanList();
    } catch (e) {
      console.error(e.message);
      toast.error("Failed to update plan.");
    } finally {
      setLoading(false);
    }
  };

  if (!meta) {
    return (
      <div className="card">
        <div className="p-3">
          <h4>Edit Plan</h4>
          <div className="text-danger">Invalid plan type.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="p-3">
        <h4>{title}</h4>
      </div>
      <div className="container px-2 pb-4">
        <div className="row">
          {meta.fields.map((field) => (
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
                  checked={toBoolean(formData?.[field.key])}
                  onChange={(event) =>
                    handleChange(field.key, event.target.checked)
                  }
                />
              ) : field.type === "select" ? (
                <>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Select
                    value={formData?.[field.key] || ""}
                    onChange={(event) =>
                      handleChange(field.key, event.target.value)
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
                  {errors?.[field.key] && (
                    <div className="text-danger font-size-14">
                      {errors[field.key]}
                    </div>
                  )}
                </>
              ) : (
                <DeftInput
                  label={field.label}
                  type={field.type}
                  value={formData?.[field.key] || ""}
                  error={errors?.[field.key]}
                  onchange={(value) => handleChange(field.key, value)}
                />
              )}
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={navigateToPlanList}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function buildInitialForm(plan, planType) {
  const base = { ...plan, id: getPlanId(plan) };
  if (planType === "company-connect") {
    return {
      ...base,
      enterprise: toBoolean(plan?.enterprise),
      bestseller: toBoolean(plan?.bestseller),
      recommended: toBoolean(plan?.recommended),
      resumeDownloads: toBoolean(plan?.resumeDownloads),
      contactUnlock: toBoolean(plan?.contactUnlock),
      testRequest: toBoolean(plan?.testRequest),
      discountEligible: toBoolean(plan?.discountEligible),
      dedicatedRm: toBoolean(plan?.dedicatedRm),
      tags: Array.isArray(plan?.tags) ? plan.tags.join(", ") : "",
      visibility: plan?.visibility || "Visible",
    };
  }
  if (planType === "student-test-credits") {
    return { ...base, visibility: plan?.visibility || "Visible" };
  }
  if (planType === "on-demand-tests") {
    return { ...base, status: plan?.status || "Enabled" };
  }
  return base;
}
