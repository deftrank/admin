import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getDashboardByAdmin } from "../store/slice/onBoardingSlice";

const cardConfig = [
  {
    key: "company_count",
    title: "Companies",
    description: "Registered hiring partners",
    icon: "mdi:office-building-outline",
    to: "/company",
    actionLabel: "Open companies",
    tone: "#1f49b6",
    softBg: "linear-gradient(135deg, rgba(31,73,182,0.14) 0%, rgba(31,73,182,0.04) 100%)",
    glow: "0 24px 60px rgba(31,73,182,0.12)",
  },
  {
    key: "student_count",
    title: "Students",
    description: "Learners in the ecosystem",
    icon: "ph:student",
    to: "/students",
    actionLabel: "Open students",
    tone: "#0e7490",
    softBg: "linear-gradient(135deg, rgba(14,116,144,0.14) 0%, rgba(14,116,144,0.04) 100%)",
    glow: "0 24px 60px rgba(14,116,144,0.12)",
  },
  {
    key: "job_count",
    title: "Jobs",
    description: "Published job opportunities",
    icon: "solar:case-minimalistic-outline",
    to: "/job",
    actionLabel: "Open jobs",
    tone: "#9a6700",
    softBg: "linear-gradient(135deg, rgba(154,103,0,0.14) 0%, rgba(154,103,0,0.04) 100%)",
    glow: "0 24px 60px rgba(154,103,0,0.12)",
  },
  {
    key: "internship_count",
    title: "Internships",
    description: "Live internship opportunities",
    icon: "hugeicons:briefcase-02",
    to: "/internship",
    actionLabel: "Open internships",
    tone: "#7c3aed",
    softBg: "linear-gradient(135deg, rgba(124,58,237,0.14) 0%, rgba(124,58,237,0.04) 100%)",
    glow: "0 24px 60px rgba(124,58,237,0.12)",
  },
  {
    key: "assessment_count",
    title: "Assessments",
    description: "Total assessments in the system",
    icon: "fluent:notepad-edit-16-regular",
    to: null,
    actionLabel: "System total",
    tone: "#0f766e",
    softBg: "linear-gradient(135deg, rgba(15,118,110,0.14) 0%, rgba(15,118,110,0.04) 100%)",
    glow: "0 24px 60px rgba(15,118,110,0.12)",
  },
  {
    key: "compt_test_count",
    title: "Comp Tests",
    description: "Company-led test inventory",
    icon: "fluent:clipboard-code-16-filled",
    to: "/query-test-list",
    actionLabel: "Open comp tests",
    tone: "#8a6a00",
    softBg: "linear-gradient(135deg, rgba(138,106,0,0.14) 0%, rgba(138,106,0,0.04) 100%)",
    glow: "0 24px 60px rgba(138,106,0,0.12)",
  },
  {
    key: "active_job_count",
    title: "Active Jobs",
    description: "Currently open job listings",
    icon: "mdi:briefcase-check-outline",
    to: "/job",
    actionLabel: "Review active jobs",
    tone: "#0f6d8c",
    softBg: "linear-gradient(135deg, rgba(15,109,140,0.14) 0%, rgba(15,109,140,0.04) 100%)",
    glow: "0 24px 60px rgba(15,109,140,0.12)",
  },
  {
    key: "active_internship_count",
    title: "Active Internships",
    description: "Currently open internship listings",
    icon: "streamline:internship-apprenticeship-solid",
    to: "/internship",
    actionLabel: "Review active internships",
    tone: "#be185d",
    softBg: "linear-gradient(135deg, rgba(190,24,93,0.14) 0%, rgba(190,24,93,0.04) 100%)",
    glow: "0 24px 60px rgba(190,24,93,0.12)",
  },
];

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const { dashboardCount } = useSelector((state) => state.onBoarding);

  useEffect(() => {
    dispatch(getDashboardByAdmin({ language: "en" }));
  }, [dispatch]);

  const totalListings =
    (dashboardCount?.job_count || 0) + (dashboardCount?.internship_count || 0);
  const activeListings =
    (dashboardCount?.active_job_count || 0) +
    (dashboardCount?.active_internship_count || 0);
  const totalUsers =
    (dashboardCount?.student_count || 0) + (dashboardCount?.company_count || 0);

  const heroStats = [
    {
      label: "Total Listings",
      value: totalListings,
      note: `${activeListings} active right now`,
      icon: "solar:case-round-outline",
    },
    {
      label: "Students",
      value: dashboardCount?.student_count || 0,
      note: "Learners on platform",
      icon: "ph:student",
    },
    {
      label: "Companies",
      value: dashboardCount?.company_count || 0,
      note: "Recruiting partners",
      icon: "mdi:office-building-outline",
    },
    {
      label: "Assessments",
      value: dashboardCount?.assessment_count || 0,
      note: "Skill evaluation volume",
      icon: "fluent:notepad-edit-16-regular",
    },
  ];

  return (
    <div className="container-fluid py-3">
      <div
        className="position-relative overflow-hidden mb-4"
        style={{
          borderRadius: 20,
          padding: "18px 22px",
          background:
            "radial-gradient(circle at top right, rgba(96, 225, 255, 0.24) 0, rgba(96, 225, 255, 0.24) 12%, transparent 12%), linear-gradient(135deg, #081a4b 0%, #1543b7 46%, #1aa3b2 100%)",
          boxShadow: "0 28px 80px rgba(11, 26, 75, 0.28)",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 36%, rgba(255,255,255,0.08) 100%)",
            pointerEvents: "none",
          }}
        />
        <div className="row g-3 align-items-stretch position-relative">
          <div className="col-12 col-xl-6">
            <div className="h-100 d-flex flex-column justify-content-between">
              <div>
                <div
                  className="d-inline-flex align-items-center gap-2 rounded-pill mb-2"
                  style={{
                    padding: "6px 12px",
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  <Icon icon="solar:widget-5-bold-duotone" width="16" height="16" />
                  Dashboard Summary
                </div>
                <h2
                  className="mb-2"
                  style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.15, color: "#fff", maxWidth: 420 }}
                >
                  Modern control center for Deft Rank operations
                </h2>
                <p
                  className="mb-0"
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.82)",
                    maxWidth: 560,
                  }}
                >
                  Track platform growth, hiring activity, and assessment volume from one cleaner admin overview.
                </p>
              </div>

              <div
                className="d-flex flex-wrap gap-4 mt-3"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                <div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>Total Users</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{totalUsers}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>Open Listings</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{activeListings}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-6">
            <div className="row g-2">
              {heroStats.map((item) => (
                <div key={item.label} className="col-12 col-sm-6">
                  <div
                    className="h-100"
                    style={{
                      borderRadius: 18,
                      padding: "14px 14px 12px",
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="d-flex align-items-start justify-content-between gap-3">
                      <div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.76)" }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.1 }}>
                          {item.value}
                        </div>
                      </div>
                      <div
                        className="d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 14,
                          background: "rgba(255,255,255,0.16)",
                        }}
                      >
                        <Icon icon={item.icon} width="22" height="22" />
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}
                    >
                      {item.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 px-1">
        <div>
          <h4 className="mb-1" style={{ fontWeight: 800, color: "#0f172a" }}>
            Key Metrics
          </h4>
          <p className="mb-0" style={{ color: "#64748b", fontSize: 14 }}>
            Core platform counters with direct shortcuts into the admin sections.
          </p>
        </div>
        <div
          className="d-inline-flex align-items-center gap-2 rounded-pill"
          style={{
            padding: "10px 14px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 12px 28px rgba(15, 23, 42, 0.05)",
            color: "#475569",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          <Icon icon="solar:chart-square-outline" width="18" height="18" />
          Live admin snapshot
        </div>
      </div>

      <div className="row g-3">
        {cardConfig.map((item) => {
          const value = dashboardCount?.[item.key] ?? 0;
          return (
            <div key={item.key} className="col-12 col-sm-6 col-xl-3">
              <div
                className="card h-100 border-0"
                style={{
                  borderRadius: 20,
                  background: "#ffffff",
                  boxShadow: item.glow,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 5,
                    background: `linear-gradient(90deg, ${item.tone} 0%, color-mix(in srgb, ${item.tone}, white 35%) 100%)`,
                  }}
                />
                <div className="card-body p-3 d-flex flex-column">
                  <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-4"
                      style={{
                        width: 52,
                        height: 52,
                        background: item.softBg,
                        color: item.tone,
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.7)",
                      }}
                    >
                      <Icon icon={item.icon} style={{ fontSize: 26 }} />
                    </div>
                    {item.to ? (
                      <NavLink
                        aria-label={item.actionLabel}
                        to={item.to}
                        className="d-inline-flex align-items-center gap-1 text-decoration-none"
                        style={{
                          color: item.tone,
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "7px 11px",
                          borderRadius: 999,
                          background: item.softBg,
                        }}
                      >
                        View
                        <Icon icon="mdi:arrow-top-right" width="16" height="16" />
                      </NavLink>
                    ) : (
                      <span
                        className="d-inline-flex align-items-center"
                        style={{
                          fontSize: 12.5,
                          color: "#94a3b8",
                          fontWeight: 700,
                          padding: "7px 11px",
                          borderRadius: 999,
                          background: "#f8fafc",
                        }}
                      >
                        Overview
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: 14, fontWeight: 700, color: item.tone }}>
                    {item.title}
                  </div>
                  <div
                    className="mt-2"
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color: "#0f172a",
                    }}
                  >
                    {value}
                  </div>
                  <p
                    className="mb-0 mt-2"
                    style={{ color: "#64748b", fontSize: 13.5, lineHeight: 1.5 }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
