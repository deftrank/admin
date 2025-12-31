// @ts-nocheck
import { useEffect, useState } from "react";
import profile from "../../../assets/img/default.jpg";
import profileBg from "../../../assets/img/bg/profileBg.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetailById } from "../../../store/slice/onBoardingSlice";
import { Icon } from "@iconify/react";
import { color } from "../../../themes/color/color";
import moment from "moment/moment";
import { Button, Modal } from "react-bootstrap";
import DeftInput from "../../../components/deftInput/deftInput";
import { forgotPassword } from "../../../store/slice/authSlice";
import { isEmailValidAllowGmail } from "../../../utils/appValidation";

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
  });
  const [formErrors, setFormErrors] = useState({});

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
        setFormData((prev) => ({ ...prev, password: "" }));
      })
    );
  };

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
            <span className="text-decoration-underline"> Details</span>
          </h5>
          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menu
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={openResetModal}>
                  Reset Password
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className=" py-3 ">
          <div className="shadow-lg position-relative rounded-4">
            <div
              style={{
                backgroundImage: `url(${profileBg})`,
                height: 140,

                backgroundSize: "cover",
              }}
              className=" rounded-top-4"
            ></div>
            <img
              src={studentDetail?.accountData?.company_logo?studentDetail?.accountData?.company_logo:profile}
              alt=""
              className="img-fluid position-absolute rounded-circle top-25"
              style={{
                width: 100,
                height: 100,
                transform: "translate(40px, -50px)",
              }}
            />
            <div className="mt-5 pb-4 ">
              <div className="px-5 col-12">
                <div className="row mb-3">
                  <div className="col-12">
                    <h6 className="font-size-20 mt-2 text-capitalize">
                      {" "}
                      {/* Reduced margin-top from mt-3 to mt-2 */}
                      {studentDetail?.accountData?.registered_name
                        ? studentDetail.accountData.registered_name
                        : "-"}
                    </h6>
                    <p style={{ marginTop: "-0.5rem" }}>
                      {" "}
                      {/* Adjusted margin-top for the paragraph */}
                      {studentDetail?.accountData?.about_company
                        ? studentDetail?.accountData?.about_company
                        : ""}
                    </p>
                  </div>
                </div>
                <div>
                <div className="row">
  {/* Email */}
  <div className="col-lg-4 col-sm-6 col-12 pt-2">
    <div className="d-flex align-items-center">
      <Icon
        icon="mdi:tag"
        className="fs-2 me-3"
        style={{ color: color.secondaryGray }}
      />
      <h6 style={{ color: color.secondaryGray }} className="mb-0">
        {studentDetail?.accountData?.category || "-"}
      </h6>
    </div>
  </div>

  {/* Contact Person Name */}
  <div className="col-lg-4 col-sm-6 col-12 pt-2">
    <div className="d-flex align-items-center">
      <Icon
        icon="mdi:account"
        className="fs-2 me-3"
        style={{ color: color.secondaryGray }}
      />
      <h6 style={{ color: color.secondaryGray }} className="mb-0">
        {studentDetail?.accountData?.contact_person_name || "-"}
      </h6>
    </div>
  </div>

  {/* Email */}
  <div className="col-lg-4 col-sm-6 col-12 pt-2">
    <div className="d-flex align-items-center">
      <Icon
        icon="mdi:email"
        className="fs-2 me-3"
        style={{ color: color.secondaryGray }}
      />
      <h6 style={{ color: color.secondaryGray }} className="mb-0">
        {studentDetail?.authData?.email || "-"}
      </h6>
    </div>
  </div>

  {/* Phone Number */}
  <div className="col-lg-4 col-sm-6 col-12 pt-2">
    <div className="d-flex align-items-center">
      <Icon
        icon="mdi:phone"
        className="fs-2 me-3"
        style={{ color: color.secondaryGray }}
      />
      <h6 style={{ color: color.secondaryGray }} className="mb-0">
        {studentDetail?.accountData?.contact_person_number
          ? `${studentDetail?.accountData?.countryCode} ${studentDetail?.accountData?.contact_person_number}`
          : "-"}
      </h6>
    </div>
  </div>

  {/* College Website (empty for now) */}
  <div className="col-lg-4 col-sm-6 col-12 pt-2">
    <div className="d-flex align-items-center">
      <Icon
        icon="mdi:web"
        className="fs-2 me-3"
        style={{ color: color.secondaryGray }}
      />
      <h6 style={{ color: color.secondaryGray }} className="mb-0">
        {studentDetail?.accountData?.company_website || "-"}
      </h6>
    </div>
  </div>

  {/* LinkedIn */}
  <div className="col-lg-4 col-sm-6 col-12 pt-2">
  <div className="d-flex align-items-start  text-break">
    <Icon
      icon="mdi:linkedin"
      className="fs-1 me-3 flex-shrink-0"
      style={{ color: color.secondaryGray }}
    />
    <h6
      style={{ color: color.secondaryGray, wordBreak: 'break-word' }}
      className="mb-0"
    >
      {studentDetail?.accountData?.linkedin_url || "-"}
    </h6>
  </div>
</div>


  {/* Location */}
  <div className="col-lg-4 col-sm-6 col-12 pt-2 d-flex align-items-center">
    <Icon
      icon="mdi:map-marker"
      className="fs-2 me-3"
      style={{ color: color.secondaryGray }}
    />
    <h6 style={{ color: color.secondaryGray }} className="mb-0">
      {studentDetail?.accountData?.current_location ||
      studentDetail?.accountData?.state ||
      studentDetail?.accountData?.country ||
      studentDetail?.accountData?.pin_code
        ? `${studentDetail?.accountData?.current_location ? studentDetail.accountData.current_location + "," : ""} 
           ${studentDetail?.accountData?.state ? studentDetail.accountData.state + "," : ""} 
           ${studentDetail?.accountData?.country ? studentDetail.accountData.country + "," : ""} 
           ${studentDetail?.accountData?.pin_code || ""}`
        : "-"}
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
          <div className="my-3 ">
            <DeftInput
              label="Email"
              placeholder="Enter email"
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
        </Modal.Body>
        <Modal.Footer className={"border-0"}>
          <Button variant="primary w-100" onClick={handleResetSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
