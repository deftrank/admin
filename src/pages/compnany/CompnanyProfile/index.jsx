// @ts-nocheck
import { useEffect } from "react";
import profile from "../../../assets/img/default.jpg";
import profileBg from "../../../assets/img/bg/profileBg.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetailById } from "../../../store/slice/onBoardingSlice";
import { Icon } from "@iconify/react";
import { color } from "../../../themes/color/color";
import moment from "moment/moment";

export default function index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { studentDetail } = useSelector((state) => state.onBoarding);
  const dispatch = useDispatch();

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

  return (
    <>
      <section className="py-4 container-fluid">
        <h5 className="mb-4">
          <span
            className="text-muted fw-light cursor-pointer"
            onClick={() => navigate("/company")}
          >
            <span className="text-decoration-underline">Company</span> /
          </span>{" "}
          <span className="text-decoration-underline"> Details</span>
        </h5>
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
    </>
  );
}
