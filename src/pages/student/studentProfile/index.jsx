// @ts-nocheck
import { useEffect } from "react";
import profile from "../../../assets/img/default.jpg";
import profileBg from "../../../assets/img/bg/profileBg.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetailById } from "../../../store/slice/onBoardingSlice";
import BasicAndPeronalDetail from "./basicAndPeronalDetail";
import EducationalDetails from "./educationalDetails";
import EmployabilityDetails from "./employabilityDetails";
import CareerPath from "./careerPath";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

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

  console.log("here is my ",studentDetail?.accountData?.profile_url);
  

  return (
    <section className="py-4 container-fluid">
      <h5 className="mb-4">
        <span
          className="text-muted fw-light cursor-pointer"
          onClick={() => navigate("/students")}
        >
          <span className="text-decoration-underline">Student</span> /
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
            src={studentDetail?.accountData
?.profile_url?studentDetail?.accountData?.profile_url:profile}
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
              <BasicAndPeronalDetail studentDetail={studentDetail} />
              <div className="mt-5 d-none">
                <Tabs
                  defaultActiveKey="home"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="home" title="Educational Details">
                    <EducationalDetails studentDetail={studentDetail} />
                  </Tab>
                  <Tab eventKey="profile" title="Employability Details" className={"p-0"}>
                    <EmployabilityDetails studentDetail={studentDetail} />
                  </Tab>
                  <Tab eventKey="contact" title="Career Path">
                    <CareerPath />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
