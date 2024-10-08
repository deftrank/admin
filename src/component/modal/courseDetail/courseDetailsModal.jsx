import React from "react";
import { Modal, Table } from "react-bootstrap";
// import Chart from "react-apexcharts";
import { color } from "../../../themes/color/color";
import { Icon } from "@iconify/react/dist/iconify.js";
import defaultImg from "../../../assets/img/default.jpg";
import hambar from "../../../assets/img/icons/hambar.png";
import DeftOutlineButton from "../../deftButton/deftOutlineButton";
import DeftButton from "../../deftButton/deftButton";
import { useResponsive } from "../../../hooks/useResponsive";
export default function CourseDetailsModal(props) {
    const {screenType}=useResponsive()
  const { open, handleClose, options, series, Programming } = props;
  const headers = [
    { label: "Name" },
    { label: "Java" },
    { label: "PHP" },
    { label: "Python" },
    { label: "Dotnet" },
  ];
  const currentItems = [
    {
      id: 1,
      Name: "Complexity",
      Backend: "High",
      Frontend: "Medium",
      Cloud: "High",
      Mobile: "Medium",
    },
    {
      id: 2,
      Name: "Avg. Learning Time",
      Backend: "3 months",
      Frontend: "6 months",
      Cloud: "3 months",
      Mobile: "9 months",
    },
    {
      id: 3,
      Name: "Avg. Salary (p.a)",
      Backend: "5-6 LPA",
      Frontend: "7-8 LPA",
      Cloud: "5-6 LPA",
      Mobile: "15-18 LPA",
    },
    {
      id: 4,
      Name: "Market Demand",
      Backend: "High",
      Frontend: "Moderate",
      Cloud: "Low",
      Mobile: "High",
    },
  ];
  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        centered
        size="xl"
        backdrop="static"
      >
        <Modal.Body className={"container my-3"}>
          <div className="row">
            <div className="col-lg-6">
              <h6 className="fs-6" style={{ fontWeight: 600 }}>
                Java Average Salary Statistics
              </h6>

              <div>
                {/* <Chart
                  options={options}
                  series={series}
                  type="line"
                  height={280}
                /> */}
              </div>
              <div className="">
                <h6 className="fs-6 my-4" style={{ fontWeight: 600 }}>
                  Comparison Chart
                </h6>
                <Table
                  responsive="sm"
                  className="thead"
                  style={{
                    background: "var(--Chip-Purple, rgba(65, 105, 224, 0.12))",
                  }}
                >
                  <thead className="thead rounded-0">
                    <tr>
                      {headers.map((header, index) => (
                        <th className="font-size-14 text-start" key={index}>
                          {header.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white leader-body">
                    {currentItems.length == 0 && (
                      <>
                        <tr>
                          <td colSpan={8} className={"text-center py-4 fs-4"}>
                            No data found
                          </td>
                        </tr>
                      </>
                    )}
                    {currentItems.map((item) => (
                      <tr key={item?.id}>
                        <td
                          className="font-size-14 text-start"
                          style={{ fontSize: 14 }}
                        >
                          {" "}
                          {item?.Name}
                        </td>
                        <td className=" text-start" style={{ fontSize: 14 }}>
                          {item.Backend}
                        </td>
                        <td className=" text-start" style={{ fontSize: 14 }}>
                          {item.Frontend}
                        </td>

                        <td style={{ fontSize: 14 }} className={"text-start"}>
                          {item?.Cloud}
                        </td>
                        <td className=" text-start" style={{ fontSize: 14 }}>
                          {item?.Mobile}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
            {/* here is course details  */}
            <div className="col-lg-6">
              <h5 style={{ fontSize: 30, fontWeight: 600 }}>
                Java Programming
              </h5>
              <h6 className="fs-6" style={{ fontWeight: 400 }}>
                24,783 learners are using Java{" "}
              </h6>
              <div
                className="rounded-1 p-3 my-3"
                style={{ background: color.neon }}
              >
                <div className="row align-items-center">
                  <div className={"col-6"}>
                    <p className="font-size-14" style={{ fontWeight: 400 }}>
                      To become a proficient Java Developer, one must learn the
                      below modules
                    </p>
                  </div>
                  <div className={"col-6"}>
                    {Programming?.map((item) => {
                      return (
                        <>
                          <div className="d-flex gap-2 mb-1" key={item}>
                            <Icon
                              icon="teenyicons:tick-circle-outline"
                              style={{ color: color.green }}
                            />{" "}
                            <p
                              className="font-size-14 mb-0"
                              style={{ fontWeight: 400, fontSize: 12 }}
                            >
                              {item?.label}
                            </p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="row my-3 justify-content-center">
                <div className={`mt-3 ${screenType==="MOBILE"?"col-6":"col-md-4   "} `}>
                  <div className="d-flex flex-column">
                    <h6 className={"mb-0"} style={{ fontWeight: 500 }}>
                      Time To Learn
                    </h6>
                    <h6 className="font-size-20" style={{ fontWeight: 600 }}>
                      3 months
                    </h6>
                  </div>
                </div>
                <div className={`mt-3 ${screenType==="MOBILE"?"col-6":"col-md-4   "} `}>
                  <div className="d-flex flex-column">
                    <h6 className={"mb-0"} style={{ fontWeight: 500 }}>
                      Complexity
                    </h6>
                    <h6 className="font-size-20" style={{ fontWeight: 600 }}>
                      High
                    </h6>
                  </div>
                </div>
                <div className={`mt-3 ${screenType==="MOBILE"?"col-6":"col-md-4   "} `}>
                  <div className="d-flex flex-column">
                    <h6 className={"mb-0"} style={{ fontWeight: 500 }}>
                      Demand
                    </h6>
                    <h6 className="font-size-20" style={{ fontWeight: 600 }}>
                      High
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-2">
                  <img
                    src={defaultImg}
                    alt=""
                    style={{ width: 50, height: 50 }}
                    className={"rounded-circle"}
                  />
                </div>
                <div className="col-lg-8 col-md-10 pe-5">
                  <h6 className="font-size-20 mb-1" style={{ fontWeight: 600 }}>
                    Yamini Singh
                  </h6>
                  <h6
                    className={`fs-6 `}
                    style={{ fontWeight: 600, color: color.grey }}
                  >
                    Java Developer at Gophers Lab
                  </h6>
                  <p
                    className={`fs-6 text-start text-black my-3`}
                    style={{ fontWeight: 400 }}
                  >
                    “Adept Rank is finally addressing a long time problem we had
                    while learning coding It’s ease of use and workflow seems
                    really intuitive.
                  </p>
                  <div className="d-flex mb-3 align-items-center gap-3">
                    <img src={hambar} style={{ width: 20, height: 20 }} />
                    <h6
                      className="fs-5 mb-0 "
                      style={{ color: color.grey, fontWeight: 600 }}
                    >
                      A dept Rank user since 2 years
                    </h6>
                  </div>
                 
                </div>
              </div>
              <div className="d-flex justify-content-end gap-3 mt-5">
                    <DeftOutlineButton btnName="Cancel" btnClass="text-black shadow-none" onClick={handleClose}/>
                    <DeftButton btnName="Take your first practice test" btnClass="h-75 rounded-2 shadow-none"/>
                  </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
