// @ts-nocheck
import { useEffect, useState } from "react";
import profile from "../../../assets/img/default.jpg";
import profileBg from "../../../assets/img/bg/profileBg.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getStudentDetailById,
} from "../../../store/slice/onBoardingSlice";
import { Icon } from "@iconify/react";
import { color } from "../../../themes/color/color";
import moment from "moment/moment";
import { Button, Modal } from "react-bootstrap";
import DeftInput from "../../../components/deftInput/deftInput";
import { forgotPassword } from "../../../store/slice/authSlice";
import { isEmailValidAllowGmail } from "../../../utils/appValidation";
import Confirmation from "../../../components/confirmationModel/confirmation";

export default function index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { studentDetail } = useSelector((state) => state.onBoarding);
  const dispatch = useDispatch();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [companyActionModal, setCompanyActionModal] = useState(null);
  const [logoFallback, setLogoFallback] = useState(false);

  useEffect(() => {
    getStudentDetail();
  }, []);

  const getStudentDetail = () => {
    const data = {
      auth_id: id,
      language: "en",
    };
    dispatch(getStudentDetailById(data));
  };

  const openResetModal = () => {
    setFormData({
      email: studentDetail?.authData?.email || "",
      phone: studentDetail?.accountData?.contact_person_number || "",
      password: "",
      confirmPassword: "",
    });
    setFormErrors({});
    setIsResetModalOpen(true);
  };

  const handleResetSubmit = () => {
    const errors = {};
    const emailValue = formData?.email?.trim() || "";
    const phoneValue = formData?.phone?.trim() || "";

    if (!emailValue && !phoneValue) {
      errors.email = "Email or phone is required";
      errors.phone = "Email or phone is required";
    } else {
      if (emailValue && !isEmailValidAllowGmail(emailValue)) {
        errors.email = "Please enter a valid email";
      }
      if (phoneValue && !/^\+?\d{6,15}$/.test(phoneValue.replace(/\s/g, ""))) {
        errors.phone = "Please enter a valid phone number";
      }
    }

    if (!formData?.password) {
      errors.password = "Please enter password";
    } else if (formData?.password?.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!formData?.confirmPassword) {
      errors.confirmPassword = "Please confirm password";
    } else if (formData?.confirmPassword?.length < 8) {
      errors.confirmPassword = "Password must be at least 8 characters long";
    } else if (formData?.password !== formData?.confirmPassword) {
      errors.confirmPassword = "Password does not match";
    }

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      email: formData?.email ? formData?.email : "",
      phone: formData?.phone ? formData?.phone : "",
      password: formData?.password,
    };

    dispatch(
      forgotPassword(payload, () => {
        setIsResetModalOpen(false);
        setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      })
    );
  };

  const handleDeleteCompany = () => {
    const data = {
      auth_id: id,
      language: "en",
    };
    dispatch(deleteUser(data, setCompanyActionModal, "company"));
  };

  const accountData = studentDetail?.accountData || {};
  const authData = studentDetail?.authData || {};
  const companyStatus = (authData?.suspend_status || "pending").toLowerCase();
  const statusLabel =
    companyStatus === "active"
      ? "Approved"
      : companyStatus === "pending"
      ? "Pending"
      : companyStatus === "reject" ||
        companyStatus === "inactive" ||
        companyStatus === "suspended"
      ? "Rejected"
      : companyStatus;

  const statusClass =
    statusLabel === "Approved"
      ? "bg-label-success"
      : statusLabel === "Pending"
      ? "bg-label-warning"
      : "bg-label-danger";

  const joinedDate = authData?.createdAt
    ? moment(authData.createdAt).format("DD MMM YYYY")
    : accountData?.createdAt
    ? moment(accountData.createdAt).format("DD MMM YYYY")
    : "-";

  const locationText =
    accountData?.current_location ||
    accountData?.state ||
    accountData?.country ||
    accountData?.pin_code
      ? `${accountData?.current_location ? `${accountData.current_location}, ` : ""}${
          accountData?.state ? `${accountData.state}, ` : ""
        }${accountData?.country ? `${accountData.country}, ` : ""}${
          accountData?.pin_code || ""
        }`
      : "-";

  const companyLogo =
    !logoFallback && accountData?.company_logo ? accountData.company_logo : profile;

  return (
    <>
      <section className="py-4 container-fluid">
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <h5 className="mb-0">
            <span
              className="text-muted fw-light cursor-pointer"
              onClick={() => navigate("/company")}
            >
              <span className="text-decoration-underline">Company</span> /
            </span>{" "}
            <span className="text-decoration-underline">Details</span>
          </h5>

          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Settings
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={openResetModal}>
                  Reset Password
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate(`/company-edit/${id}`)}
                >
                  Edit Company
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() =>
                    setCompanyActionModal({
                      show: true,
                      title: "Delete Company",
                      message: "Are you sure you want to delete this Company?",
                      type: "Delete",
                    })
                  }
                >
                  Delete Company
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-3">
          <div className="shadow-lg position-relative rounded-4 overflow-hidden bg-body">
            <div
              style={{
                backgroundImage: `url(${profileBg})`,
                height: 180,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="rounded-top-4"
            ></div>

            <div className="position-absolute top-0 end-0 m-3">
              <span className={`badge ${statusClass} text-capitalize px-3 py-2`}>
                {statusLabel}
              </span>
            </div>

            <div className="px-4 px-md-5 pb-4" style={{ marginTop: -50 }}>
              <div className="d-flex flex-column flex-md-row align-items-md-end gap-3">
                <img
                  src={companyLogo}
                  alt="Company logo"
                  onError={() => setLogoFallback(true)}
                  className="img-fluid rounded-circle border border-4 border-white shadow-sm bg-white"
                  style={{
                    width: 110,
                    height: 110,
                    objectFit: "cover",
                  }}
                />
                <div className="d-flex flex-column gap-1 pb-md-1">
                  <h4 className="mb-0 text-capitalize">{accountData?.registered_name || "-"}</h4>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-label-primary px-3 py-2">
                      {accountData?.category || "Uncategorized"}
                    </span>
                    <span className="badge bg-label-info px-3 py-2">Joined {joinedDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-muted mb-0">
                  {accountData?.about_company || "No company description added yet."}
                </p>
              </div>

              <div className="row g-3 mt-1">
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="border rounded-3 p-3 h-100 bg-white">
                    <p className="text-muted mb-2 small">Contact Person</p>
                    <h6 className="mb-0">{accountData?.contact_person_name || "-"}</h6>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="border rounded-3 p-3 h-100 bg-white">
                    <p className="text-muted mb-2 small">Email</p>
                    <h6 className="mb-0 text-break">{authData?.email || "-"}</h6>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="border rounded-3 p-3 h-100 bg-white">
                    <p className="text-muted mb-2 small">Phone</p>
                    <h6 className="mb-0">
                      {accountData?.contact_person_number
                        ? `${accountData?.countryCode || ""} ${accountData?.contact_person_number}`
                        : "-"}
                    </h6>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="border rounded-3 p-3 h-100 bg-white">
                    <p className="text-muted mb-2 small">Pincode</p>
                    <h6 className="mb-0">{accountData?.pin_code || "-"}</h6>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="row">
                  <div className="col-lg-4 col-sm-6 col-12 pt-2">
                    <div className="d-flex align-items-center">
                      <Icon
                        icon="mdi:web"
                        className="fs-2 me-3"
                        style={{ color: color.secondaryGray }}
                      />
                      <h6 style={{ color: color.secondaryGray }} className="mb-0 text-break">
                        {accountData?.company_website || "-"}
                      </h6>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 col-12 pt-2">
                    <div className="d-flex align-items-center">
                      <Icon
                        icon="mdi:linkedin"
                        className="fs-2 me-3"
                        style={{ color: color.secondaryGray }}
                      />
                      <h6 style={{ color: color.secondaryGray }} className="mb-0 text-break">
                        {accountData?.linkedin_url || "-"}
                      </h6>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 col-12 pt-2">
                    <div className="d-flex align-items-center">
                      <Icon
                        icon="mdi:map-marker"
                        className="fs-2 me-3"
                        style={{ color: color.secondaryGray }}
                      />
                      <h6 style={{ color: color.secondaryGray }} className="mb-0 text-break">
                        {locationText}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        show={isResetModalOpen}
        onHide={() => setIsResetModalOpen(false)}
        centered
        backdrop="static"
        className="otp-radius "
      >
        <Modal.Header className={"border-0 p-3"}>
          <Modal.Title>Reset Password</Modal.Title>
          <button
            onClick={() => setIsResetModalOpen(false)}
            type="button"
            className="btn-close  shadow-none"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body className={"container"}>
          <p className="text-muted mb-3">
            Use the company contact details below and set a new password.
          </p>
          <div className="my-3 ">
            <DeftInput
              label="Email"
              placeholder="Enter email"
              readOnly
              value={formData.email}
              onchange={(value) => {
                setFormData((prev) => ({ ...prev, email: value }));
                setFormErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={formErrors.email}
            />
          </div>
          <div className="my-3 ">
            <DeftInput
              label="Phone"
              placeholder="Enter phone"
              readOnly
              value={formData.phone}
              onchange={(value) => {
                setFormData((prev) => ({ ...prev, phone: value }));
                setFormErrors((prev) => ({ ...prev, phone: "" }));
              }}
              error={formErrors.phone}
            />
          </div>
          <div className="my-3 ">
            <DeftInput
              label="New Password"
              placeholder="Enter new password"
              type="password"
              value={formData.password}
              onchange={(value) => {
                setFormData((prev) => ({ ...prev, password: value }));
                setFormErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={formErrors.password}
            />
          </div>
          <div className="my-3 ">
            <DeftInput
              label="Confirm Password"
              placeholder="Re-enter new password"
              type="password"
              value={formData.confirmPassword}
              onchange={(value) => {
                setFormData((prev) => ({ ...prev, confirmPassword: value }));
                setFormErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              error={formErrors.confirmPassword}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className={"border-0"}>
          <Button variant="primary w-100" onClick={handleResetSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {companyActionModal?.show && (
        <Confirmation
          dialogData={companyActionModal}
          open={companyActionModal?.show}
          handleClose={() => setCompanyActionModal(null)}
          handleSubmit={() => handleDeleteCompany()}
        />
      )}
    </>
  );
}
