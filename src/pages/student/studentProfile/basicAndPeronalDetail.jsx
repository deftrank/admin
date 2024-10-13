// @ts-nocheck
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment/moment";
import { color } from "../../../themes/color/color";

const index = (props) => {
  const { studentDetail } = props;

  const intToRoman = (/** @type {number} */ num) => {
    if (num < 1 || num > 12) {
      return "Number must be between 1 and 12.";
    }

    const val = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const syms = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
    ];

    return syms[val.indexOf(num)];
  };

  return (
    <>
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
                <h6 style={{ color: color.secondaryGray }} className="mb-0">
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
                <h6 style={{ color: color.secondaryGray }} className="mb-0">
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
                <h6 style={{ color: color.secondaryGray }} className="mb-0">
                  {studentDetail?.accountData?.birth_date
                    ? moment(studentDetail?.accountData?.birth_date).format(
                        "DD MMM YYYY"
                      )
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
                <h6 style={{ color: color.secondaryGray }} className="mb-0">
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
                <h6 style={{ color: color.secondaryGray }} className="mb-0">
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
                <h6 style={{ color: color.secondaryGray }} className="mb-0">
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
            <h6 style={{ color: color.secondaryGray }} className="mb-0">
              {studentDetail?.accountData?.current_location ||
              studentDetail?.accountData?.current_location ||
              studentDetail?.accountData?.country ||
              studentDetail?.accountData?.pin_code
                ? `${
                    studentDetail?.accountData?.current_location
                      ? studentDetail?.accountData?.current_location + ","
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
                <h6 style={{ color: color.secondaryGray }} className="mb-0">
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
                <h6 style={{ color: color.secondaryGray }} className="mb-0">
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
                <h6 style={{ color: color.secondaryGray }} className="mb-0">
                  {studentDetail?.accountData?.linkedin_url
                    ? studentDetail?.accountData?.linkedin_url
                    : "-"}
                </h6>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
