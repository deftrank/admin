// @ts-nocheck

import { useDispatch, useSelector } from "react-redux";
import { getCtcList } from "../../../store/slice/onBoardingSlice";
import { useEffect } from "react";
import DeftSelect from "../../../components/dropdown";

const index = (props) => {
  const { studentDetail } = props;
  const { jobCtcList, internshipCtcList } = useSelector(
    (state) => state.onBoarding
  );
  const dispatch = useDispatch();
  console.log(
    "studentDetail?.college_education == dssddff",
    studentDetail?.accountData?.employability
  );
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
            <div className="row">
              <div className="d-flex align-items-center gap-3">
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
            <div className="row my-3 align-items-center">
              <div className="col-6">
                <DeftSelect
                  options={noc}
                  disabled={item?.noc_avail}
                  value={item?.noc_avail}
                  dis
                  dropdownHeight="200px"
                  multi={false}
                />
              </div>
              <div className="col-6">
                {console.log("here us the job list ")}

                <h5 className={"mb-0 text-capitalize"}>
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
                </h5>
              </div>
              <div className="col-6">
                
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
