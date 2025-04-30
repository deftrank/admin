// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import { getCtcList } from "../../../store/slice/onBoardingSlice";
import { useEffect, useState } from "react";
import DeftSelect from "../../../components/dropdown";
import DeftDateRange from "../../../components/deftDaterange";
import DeftInput from "../../../components/deftInput/deftInput";
import moment from "moment";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { MultiSelect } from "primereact/multiselect";
import { useResponsive } from "../../../hooks/useResponsive";
const index = (props) => {
  const { studentDetail } = props;
  const { jobCtcList, internshipCtcList } = useSelector(
    (state) => state.onBoarding
  );
  const {screenType}=useResponsive()

  const dispatch = useDispatch();
    const [option] = useState(Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i })));

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
    if (
      studentDetail?.accountData?.employability[0]?.employ_type == 1 &&
      studentDetail?.accountData?.employability[1]?.job_search
    ) {
      dispatch(getCtcList(jobData));
    } else {
      dispatch(getCtcList(internshipData));
    }
  };

  const noc = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];
  useEffect(() => {
    fetchCtcList();
  }, []);

  return (
    <>
      {studentDetail?.accountData?.employability?.length > 0 ? (
        studentDetail?.accountData?.employability?.map((item) => (
          <>
             <h1
          className="text-black font-size-20"
          style={{ fontSize: 24, fontWeight: 700 }}
        >
         Employability Details
        </h1>
            <div className={`row my-2 ${item?.employ_type == 2 && "mt-5"}`}>
              <div className="d-flex align-items-center gap-3 mt-2">
                <h5 className={"mb-0"}>
                  {item?.employ_type === 1
                    ? "Ready For Internship"
                    : "Ready For Job "}
                </h5>
                <div>
                  {item?.employ_type === 1 ? (
                    <>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input checked shadow-none"
                          type="checkbox"
                          checked={item?.job_search}
                          role="switch"
                          style={{ width: 40, height: 20, opacity: 1 }}
                          readOnly
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input checked shadow-none"
                          type="checkbox"
                          checked={item?.job_search}
                          role="switch"
                          style={{ width: 40, height: 20, opacity: 1 }}
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="row my-2 align-items-center">
              {item?.employ_type === 1 ? (
                <>
              <div className={`col-12 col-md-6 d-flex align-items-center ${screenType=="MOBILE" && "my-2"}`}>
                    <DeftInput
                      type="date"
                      value={moment(item?.start_date).format("YYYY-MM-DD")}
                      readOnly={true}
                    />
                  </div>
                  <div className={`col-12 col-md-6 d-flex align-items-center ${screenType=="MOBILE" && "my-2"}`}>
                    <DeftInput
                      type="date"
                      value={moment(item?.end_date).format("YYYY-MM-DD")}
                      readOnly={true}
                    />
                  </div>
                </>
              ) : (
                <div className={`col-12 col-md-6 d-flex align-items-center ${screenType=="MOBILE" && "my-2"}`}>
                <DeftInput
                    type="date"
                    value={moment(item?.start_date).format("YYYY-MM-DD")}
                    readOnly={true}
                  />
                </div>
              )}
            </div>
            <div className="row my-2 align-items-center">
              <div className={`col-12 col-md-6 d-flex align-items-center ${screenType=="MOBILE" && "my-2"}`}>
                <DeftSelect
                  options={noc}
                  disabled={item?.noc_avail}
                  value={item?.noc_avail}
                  dis
                  dropdownHeight="200px"
                  multi={false}
                />
              </div>
              <div className={`col-12 col-md-6 d-flex align-items-center ${screenType=="MOBILE" && "my-2"}`}>
              

                  {item?.employ_type == 1 ? (
                    <DeftSelect
                      disabled={true}
                      options={internshipCtcList?.map((data) => ({
                        value: data?.id, // Full object for 'value'
                        label: data?.value, // Assuming 'value' is the label
                      }))}
                      value={item?.salary}
                    />
                  ) : (
                    <DeftSelect
                      options={jobCtcList?.map((data) => ({
                        value: data?.id, // Full object for 'value'
                        label: data?.value, // Assuming 'value' is the label
                      }))}
                      value={item?.salary}
                      disabled={true}
                    />
                  )}
        
              </div>
              <div className="col-12 col-md-6 ">
            <h6 className={"my-3"}>  Preferred Location : {item?.employ_type==1?item?.location.join(","):item?.location.join(",")}</h6>
              </div>
            </div>
          </>
        ))
      ) : (
        <div className="comingSoon" style={{ height: "6rem" }}>
          <h4>No detail added</h4>
        </div>
      )}
    </>
  );
};

export default index;
