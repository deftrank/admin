import React, { useEffect, useState } from "react";
// import Stepper from "@keyvaluesystems/react-stepper";
import { color } from "../../themes/color/color";
import Logo from "../../assets/img/black_logo.svg";
import { useResponsive } from "../../hooks/useResponsive";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Pagination, Table } from "react-bootstrap";
import { userData } from "../../component/jsonData";
import { Icon } from "@iconify/react/dist/iconify.js";
import DeftOutlineButton from "../../component/deftButton/deftOutlineButton";
// import { stepsArray } from "./stepperConstant";

export default function index() {
  const { screenType } = useResponsive();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 10;
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = userData.slice(startIndex, startIndex + itemsPerPage);

  const handleClose = () => {
    console.log("e");
    navigate("/student-profile");
  };

  return (
    <div className="container-fliud">
      <Table
        responsive="sm"
        className="thead"
        style={{ background: "var(--Chip-Purple, rgba(65, 105, 224, 0.12))" }}
      >
        <thead className="thead">
          <tr>
            <th className="font-size-14">First Name</th>
            <th className="font-size-14">Location</th>
            <th className="font-size-14">Internship Feedback Availability</th>
            <th className="font-size-14">Skill Rank</th>
            <th className="font-size-14">All India Rank</th>
            <th className="font-size-14">Total Comp Test Passed</th>
            <th className="font-size-14">Total Test Passed</th>
            <th className="font-size-14">View Details</th>
          </tr>
        </thead>
        <tbody className="bg-white leader-body">
          {userData.map((item) => (
            <tr key={item?.id}>
              <td className="font-size-14"> {item?.First_Name}</td>
              <td className="font-size-14">{item.Location}</td>
              <td className="font-size-14">
                {item?.Feedback
                  ? Array.from({ length: item.Feedback }).map((_, i) => (
                      <Icon
                        key={i}
                        icon="ic:round-star"
                        className="text-warning"
                      />
                    ))
                  : "No Feedback"}
              </td>

              <td style={{ fontSize: 14 }}>
                <p className="mb-0">Java- {item?.rank?.java}</p>
                <p className="mb-0">Php- {item?.rank?.php}</p>
                <p className="mb-0">.Net- {item?.rank?.dotnet}</p>
              </td>
              <td className="font-size-14">{item?.Air}</td>
              <td className="font-size-14">{item.TCPT}</td>
              <td className="font-size-14">{item.TTP}</td>
              <td className="font-size-14">
                <DeftOutlineButton
                  btnName="View"
                  btnClass="rounded-pill px-4 text-success"
                  onClick={handleClose}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
}
