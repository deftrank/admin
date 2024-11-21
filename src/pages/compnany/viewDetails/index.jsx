// @ts-nocheck
import { color } from "../../../themes/color/color";
import { useLocation } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate, useParams } from "react-router-dom";
import { useResponsive } from "../../../hooks/useResponsive";
import headerBg from "../../../assets/img/bg/particular.webp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminInternShipDetails,
  getAdminJobDetails,
  getCtcList,
} from "../../../store/slice/onBoardingSlice";
import { STATUS_TYPE } from "../../../utils/appEnums";
import moment from "moment";
export default function ViewDetails() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { id } = useParams();
  const { screenType } = useResponsive();
  const dispatch = useDispatch();

  const [data, setData] = useState(null); // Local state for storing job/internship data
  const { adminJobDetails, internshipDetail, jobCtcList, internshipCtcList } =
    useSelector((state) => state.onBoarding);

  // Extract the base path (e.g., '/job-details/')
  const segments = path.split("/").filter(Boolean);
  const urlPath = `/${segments[0]}/`;

  // Fetch job details when the component is mounted or `id` changes
  useEffect(() => {
    if (id) {
      if (urlPath === "/job-details/") {
        dispatch(getAdminJobDetails(id));
      } else {
        dispatch(getAdminInternShipDetails(id));
      }

      // Fetch job details if an `id` exists
    }
    fetchCtcList();
  }, [id, dispatch]);

  // Set data based on the type of the path (job or internship)
  useEffect(() => {
    if (urlPath === "/job-details/") {
      setData(adminJobDetails); // Use `adminJobDetails` for jobs
    } else {
      setData(adminJobDetails); // Use `internshipDetail` for internships
    }
  }, [urlPath, adminJobDetails]); // Trigger effect on path or details change

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fetchCtcList = () => {
    const jobData = {
      language: "en",
      page: 0,
      limit: 0,
      search: "",
      type: 1,
    };
    const internshipData = {
      language: "en",
      page: 0,
      limit: 0,
      search: "",
      type: 2,
    };
    if (urlPath == "/job-details/") {
      dispatch(getCtcList(jobData));
    } else {
      dispatch(getCtcList(internshipData));
    }
  };
  console.log("sfdsf", jobCtcList);

  return (
    <>
      <div
        className="d-flex justify-content-start mt-3 cursor-pointer"
        onClick={() =>
          navigate(urlPath === "/job-details/" ? "/job" : "/internship")
        }
      >
        <div className="d-flex align-items-center">
          <Icon
            icon="material-symbols-light:keyboard-arrow-left"
            className={"fs-3 fw-bold"}
            style={{ color: color?.primary }}
          />
          <h5 className="m-0 fs-6 fw-bold" style={{ color: color?.primary }}>
            {urlPath === "/job-details/"
              ? "Back To Jobs"
              : "Back To Internships"}
          </h5>
        </div>
      </div>

      <div
        className="p-2 pb-3 mt-3 position-relative"
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          minHeight: "14rem",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="d-flex align-items-center justify-content-between mb-3 position-absolute translate-middle w-100 start-50 px-2"
          style={{ top: screenType === "MOBILE" ? "75%" : "70%" }}
        >
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* <img
              src={data?.profile ? data?.profile : brand}
              alt=""
              className={"rounded-3"}
              style={{
                width: screenType === "MOBILE" ? 60 : 100,
                height: screenType === "MOBILE" ? 60 : 100,
              }}
            /> */}
            <h3
              className={`text-white ${screenType === "MOBILE" ? "fs-6" : ""}`}
            >
              {data?.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div
          className={`col-lg-6 col-md-12 ${
            screenType === "MOBILE" ? "col-12" : "col-7"
          }`}
        >
          <h6 className="fs-5 text-start">
            {urlPath == "/job-details/"
              ? "Job Description"
              : "Internship Description "}
          </h6>
          <div
            className="mt-5 flex-wrap d-flex"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></div>
        </div>
        <div
          className={`col-lg-6 col-md-12 ${
            screenType === "MOBILE" ? "col-12" : "col-5"
          }`}
        >
          <div className="row">
            <div className="col-6 col-lg-6">
              <h6 className="fs-5 text-start">
                {" "}
                {urlPath == "/job-details/"
                  ? "Job Details"
                  : "Internship Details "}
              </h6>
            </div>
            <div className="col-6 col-lg-6">
              <div className="d-flex gap-3 align-items-center">
                <h6 className="fs-5 text-start mb-0">
                  {" "}
                  {urlPath == "/job-details/"
                    ? "Job Posting Status"
                    : "Internship Posting Status"}
                </h6>
                <div class="form-check form-switch">
                  <input
                    className="form-check-input checked shadow-none"
                    type="checkbox"
                    onChange={(e) => {
                      changeStatus(e.target.checked);
                    }}
                    checked={data?.status === STATUS_TYPE?.active}
                    role="switch"
                    style={{ width: 60, height: 32, opacity: 1 }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="row ">
              <div className="col-6">
                <h6 className={"fs-6 mb-1"}>
                  {data?.job_id ? "Job Id" : " Internship Id"}{" "}
                </h6>
                <h6 className="fs-6 text-secondary mv-0">
                  {data?.job_id ? data?.job_id : data?.internship_id}
                </h6>
              </div>
              <div className="col-6">
                <h6 className={"fs-6 mb-1"}>
                  {" "}
                  {urlPath === "/job-details/"
                    ? "Job Title"
                    : "Internship Title"}
                </h6>
                <h6 className="fs-6 text-secondary mb-0">{data?.title}</h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <h6 className={"fs-6 mb1"}>Who Can Apply</h6>
                <h6 className="fs-6 text-secondary mb-0">
                  {data?.who_can_apply == 1
                    ? "Job Ready Badge in Primary Skill"
                    : data?.who_can_apply == 2
                    ? "Job Ready Badge in Any Skill"
                    : "Job Ready Badge in not required"}
                </h6>
              </div>
              <div className="col-6">
                <h6 className={"fs-6 mb1"}>Primary skill</h6>
                <h6 className="fs-6 text-secondary mb-0">
                  {" "}
                  {data?.primary_skills[0]?.name === "Not Mentioned"
                    ? data.other_skills
                    : data?.data?.primary_skills?.length > 0
                    ? data.primary_skills[0]?.name
                    : "No primary skill available"}
                </h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <h6 className={"fs-6 mb1"}>
                  {" "}
                  {urlPath == "/job-details/" ? "CTC" : "Stipend"}
                </h6>
                <h6 className="fs-6 text-secondary mb-0">
                  {urlPath === "/job-details/"
                    ? (() => {
                        const maxCtcObj = jobCtcList?.find(
                          (item) => item?.id === parseInt(data?.maximum_ctc)
                        );
                        const minCtcObj = jobCtcList?.find(
                          (item) => item?.id === parseInt(data?.minimum_ctc)
                        );
                        console.log(maxCtcObj, "max");
                        return minCtcObj && maxCtcObj
                          ? `${minCtcObj?.value} to ${maxCtcObj?.value}`
                          : "Stipend not found";
                      })()
                    : (() => {
                        const stipendObj = internshipCtcList?.find(
                          (item) => item?.id === parseInt(data?.stipend)
                        );
                        console.log(stipendObj);
                        return stipendObj
                          ? `${stipendObj?.value} per month`
                          : "Stipend not found";
                      })()}{" "}
                </h6>
              </div>
              <div className="col-6">
                <h6 className={"fs-6 mb1"}>Supporting skills</h6>
                <h6 className="fs-6 text-secondary mb-0">
                  {data?.supporting_skills?.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index < data.supporting_skills.length - 1 && ", "}
                    </span>
                  ))}
                </h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <h6 className={"fs-6 mb1"}>Expected Joining Date</h6>
                <h6 className="fs-6 text-secondary mb-0">
                  {moment(data?.expected_joining_date).format("DD/MM/YYYY")}
                </h6>
              </div>
              <div className="col-6">
                <h6 className={"fs-6 mb1"}>
                  {" "}
                  {urlPath == "/job-details/" ? "Job" : "Internship"} Location
                </h6>
                <h6 className="fs-6 text-secondary mb-0">
                  {data?.job_mode == 1 || data?.internship_mode
                    ? "Remote"
                    : data?.office_location?.map((item, index) => {
                        return (
                          <span key={index}>
                            {item}
                            {index < data.supporting_skills.length - 1 && ", "}
                          </span>
                        );
                      })}
                </h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <h6 className={"fs-6 mb1"}>Interview Mode</h6>
                <h6 className="fs-6 text-secondary mb-0">
                  {data?.interview_mode == 1
                    ? "online"
                    : "Offline or face to face"}
                </h6>
              </div>
              <div className="col-6">
                <h6 className={"fs-6 mb1"}>No. of Round</h6>
                <h6 className="fs-6 text-secondary mb-0">
                  {data?.interview_stages?.length}
                </h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <h6 className={"fs-6 mb1"}>NOC from College </h6>
                <h6 className="fs-6 text-secondary mb-0">
                  {data?.noc_avail ? "Yes" : "No"}
                </h6>
              </div>
              <div className="col-6">
                <h6 className={"fs-6 mb1"}>No. of Vacancies</h6>
                <h6 className="fs-6 text-secondary mb-0">
                  {data?.number_of_vacancies}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
