import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getDashboardByAdmin } from "../store/slice/onBoardingSlice";

const cardConfig = [
  {
    key: "company_count",
    title: "Total Companies",
    icon: "mdi:company",
    to: "/company",
    tone: "#1f49b6",
    bg: "linear-gradient(135deg, #e9f1ff 0%, #ffffff 70%)",
  },
  {
    key: "student_count",
    title: "Total Students",
    icon: "ph:student",
    to: "/students",
    tone: "#006f7d",
    bg: "linear-gradient(135deg, #e8fbff 0%, #ffffff 70%)",
  },
  {
    key: "job_count",
    title: "Total Jobs",
    icon: "marketeq:job",
    to: "/job",
    tone: "#7a4d00",
    bg: "linear-gradient(135deg, #fff5e8 0%, #ffffff 70%)",
  },
  {
    key: "internship_count",
    title: "Total Internships",
    icon: "clarity:id-badge-line",
    to: "/internship",
    tone: "#6a3aa7",
    bg: "linear-gradient(135deg, #f3edff 0%, #ffffff 70%)",
  },
  {
    key: "assessment_count",
    title: "Total Assessments",
    icon: "fluent:notepad-edit-16-regular",
    to: null,
    tone: "#085f4a",
    bg: "linear-gradient(135deg, #e8fff7 0%, #ffffff 70%)",
  },
  {
    key: "compt_test_count",
    title: "Total Comp Tests",
    icon: "fluent:clipboard-code-16-filled",
    to: "/query-test-list",
    tone: "#5f4f14",
    bg: "linear-gradient(135deg, #fffbe6 0%, #ffffff 70%)",
  },
  {
    key: "active_job_count",
    title: "Active Jobs",
    icon: "hugeicons:permanent-job",
    to: "/job",
    tone: "#1d6075",
    bg: "linear-gradient(135deg, #e7f9ff 0%, #ffffff 70%)",
  },
  {
    key: "active_internship_count",
    title: "Active Internships",
    icon: "fluent-emoji-high-contrast:man-student",
    to: "/internship",
    tone: "#7d3357",
    bg: "linear-gradient(135deg, #ffeaf4 0%, #ffffff 70%)",
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

  return (
    <div className="container-fluid py-3">
      <div
        className="card border-0 shadow-sm mb-4"
        style={{
          background:
            "linear-gradient(120deg, #0b1f57 0%, #1a56db 45%, #23a4a8 100%)",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <div className="card-body py-4 position-relative">
          <div
            style={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.14)",
              right: -40,
              top: -60,
            }}
          />
          <h4 className="text-white mb-1">Admin Overview</h4>
          <p className="mb-3" style={{ color: "rgba(255,255,255,0.85)" }}>
            Quick snapshot of companies, students, tests, jobs, and internships.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-light text-dark px-3 py-2">
              Listings: {totalListings}
            </span>
            <span className="badge bg-light text-dark px-3 py-2">
              Students: {dashboardCount?.student_count || 0}
            </span>
            <span className="badge bg-light text-dark px-3 py-2">
              Companies: {dashboardCount?.company_count || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {cardConfig.map((item) => {
          const value = dashboardCount?.[item.key] ?? 0;
          return (
            <div key={item.key} className="col-12 col-sm-6 col-xl-3">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  background: item.bg,
                  borderRadius: 16,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-3"
                      style={{
                        width: 48,
                        height: 48,
                        background: "#fff",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                      }}
                    >
                      <Icon icon={item.icon} style={{ fontSize: 28, color: item.tone }} />
                    </div>
                    {item.to ? (
                      <NavLink
                        aria-label={`View ${item.title}`}
                        to={item.to}
                        className="text-decoration-none fw-semibold"
                        style={{ color: item.tone, fontSize: 13 }}
                      >
                        View
                      </NavLink>
                    ) : (
                      <span style={{ fontSize: 13, color: "#9aa6bc" }}>Overview</span>
                    )}
                  </div>

                  <span className="text-muted fw-semibold" style={{ fontSize: 17 }}>
                    {item.title}
                  </span>
                  <h2
                    className="mb-0 mt-2"
                    style={{
                      fontWeight: 700,
                      color: "#233452",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {value}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
