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
            className="text-muted fw-light"
            onClick={() => navigate("/company")}
          >
            Company /
          </span>{" "}
          Detail
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
              src={profile}
              alt=""
              className="img-fluid position-absolute rounded-circle top-25"
              style={{
                width: 100,
                height: 100,
                transform: "translate(40px, -50px)",
              }}
            />
            <div className="mt-5 pb-4 ">
              <div className="container-fluid px-4">
                <div className="row">
                  <div className="col-6">
                    <h6 className="font-size-20 mt-3">
                      {studentDetail?.accountData?.first_name
                        ? studentDetail?.accountData?.first_name +
                          studentDetail?.accountData?.last_name
                        : "-"}
                    </h6>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-4 pt-2">
                      <div className="row align-items-center">
                        <div className="col-1">
                          <Icon
                            icon="mdi:email-outline"
                            className="fs-2"
                            style={{ color: color.secondaryGray }}
                          />
                        </div>
                        <div className="col-11">
                          <h6
                            style={{ color: color.secondaryGray }}
                            className="mb-0"
                          >
                            {studentDetail?.authData?.email
                              ? studentDetail?.authData?.email
                              : "-"}
                          </h6>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="col-4 pt-2">
                      <div className="row mt-2 align-items-center">
                        <div className="col-1">
                          <Icon
                            icon="mdi:phone-outline"
                            className="fs-2"
                            style={{ color: color.secondaryGray }}
                          />
                        </div>
                        <div className="col-11">
                          <h6
                            style={{ color: color.secondaryGray }}
                            className="mb-0"
                          >
                            {studentDetail?.authData?.phone
                              ? studentDetail?.authData?.country_code +
                                studentDetail?.authData?.phone
                              : "-"}
                          </h6>
                        </div>
                      </div>
                    </div>{" "}
                    <div className="col-4 pt-2">
                      <div className="row align-items-center">
                        <div className="col-1">
                          <Icon
                            icon="mdi:calendar-outline"
                            className="fs-2"
                            style={{ color: color.secondaryGray }}
                          />
                        </div>
                        <div className="col-11">
                          <h6
                            style={{ color: color.secondaryGray }}
                            className="mb-0"
                          >
                            {studentDetail?.accountData?.birth_date
                              ? moment(
                                  studentDetail?.accountData?.birth_date
                                ).format("DD MMM YYYY")
                              : "-"}
                          </h6>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="col-4 pt-2">
                      <div className="row align-items-center">
                        <div className="col-1">
                          <Icon
                            icon="mdi:book-open-outline"
                            className="fs-2"
                            style={{ color: color.secondaryGray }}
                          />
                        </div>
                        <div className="col-11">
                          <h6
                            style={{ color: color.secondaryGray }}
                            className="mb-0"
                          >
                            {studentDetail?.accountData?.current_course
                              ? studentDetail?.accountData?.current_course
                              : "-"}
                          </h6>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="col-4 pt-2">
                      <div className="row align-items-center">
                        <div className="col-1">
                          <Icon
                            icon="mdi:school-outline"
                            className="fs-2"
                            style={{ color: color.secondaryGray }}
                          />
                        </div>
                        <div className="col-11">
                          <h6
                            style={{ color: color.secondaryGray }}
                            className="mb-0"
                          >
                            {studentDetail?.accountData?.college_name
                              ? studentDetail?.accountData?.college_name
                              : "-"}
                          </h6>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="col-4 pt-2">
                      <div className="row align-items-center">
                        <div className="col-1">
                          <Icon
                            icon="mdi:calendar-month-outline"
                            className="fs-2"
                            style={{ color: color.secondaryGray }}
                          />
                        </div>
                        <div className="col-11">
                          <h6
                            style={{ color: color.secondaryGray }}
                            className="mb-0"
                          >
                            {studentDetail?.accountData?.semester
                              ? `${intToRoman(
                                  studentDetail?.accountData?.semester
                                )} semester`
                              : "-"}
                          </h6>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="col-8 d-flex align-items-center pt-2">
                      <Icon
                        icon="mdi:map-marker-outline"
                        className="fs-2"
                        style={{ color: color.secondaryGray }}
                      />
                      <h6
                        style={{ color: color.secondaryGray }}
                        className="mb-0"
                      >
                        {studentDetail?.accountData?.current_location ||
                        studentDetail?.accountData?.current_location ||
                        studentDetail?.accountData?.country ||
                        studentDetail?.accountData?.pin_code
                          ? `${
                              studentDetail?.accountData?.current_location
                                ? studentDetail?.accountData?.current_location +
                                  ","
                                : ""
                            } ${
                              studentDetail?.accountData?.state
                                ? studentDetail?.accountData?.state + ","
                                : ""
                            } ${
                              studentDetail?.accountData?.country
                                ? studentDetail?.accountData?.country + ","
                                : ""
                            } ${studentDetail?.accountData?.pin_code}`
                          : "-"}
                      </h6>
                    </div>
                    <div className="col-4 pt-2">
                      <div className="row align-items-center">
                        <div className="col-1">
                          <Icon
                            icon="mdi:gender-male-female-variant"
                            className="fs-2"
                            style={{ color: color.secondaryGray }}
                          />
                        </div>
                        <div className="col-11">
                          <h6
                            style={{ color: color.secondaryGray }}
                            className="mb-0"
                          >
                            {studentDetail?.accountData?.gender
                              ? studentDetail?.accountData?.gender
                              : "-"}
                          </h6>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="col-4 pt-2">
                      <div className="row mt-2 align-items-center">
                        <div className="col-1">
                          <Icon
                            icon="mdi:github"
                            className="fs-2"
                            style={{ color: color.secondaryGray }}
                          />
                        </div>
                        <div className="col-11">
                          <h6
                            style={{ color: color.secondaryGray }}
                            className="mb-0"
                          >
                            {studentDetail?.accountData?.github_url
                              ? studentDetail?.accountData?.github_url
                              : "-"}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 pt-2">
                      <div className="row align-items-center">
                        <div className="col-1">
                          <Icon
                            icon="mdi:linkedin"
                            className="fs-2"
                            style={{ color: color.secondaryGray }}
                          />
                        </div>
                        <div className="col-11">
                          <h6
                            style={{ color: color.secondaryGray }}
                            className="mb-0"
                          >
                            {studentDetail?.accountData?.linkedin_url
                              ? studentDetail?.accountData?.linkedin_url
                              : "-"}
                          </h6>
                        </div>
                      </div>{" "}
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
