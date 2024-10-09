// @ts-nocheck
import React, { useEffect, useState } from "react";
// import Stepper from "@keyvaluesystems/react-stepper";
import { color } from "../../themes/color/color";
import Logo from "../../assets/img/black_logo.svg";
import { useResponsive } from "../../hooks/useResponsive";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Table } from "react-bootstrap";
import { userData } from "../../component/jsonData";
import { Icon } from "@iconify/react/dist/iconify.js";
import DeftOutlineButton from "../../component/deftButton/deftOutlineButton";
import { getListOfUserByAdmin } from "../../store/slice/onBoardingSlice";
// import { stepsArray } from "./stepperConstant";

export default function index() {
  const { screenType } = useResponsive();
  const { listOfUserByAdmin } = useSelector((state) => state.onBoarding);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 10;
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = userData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    getStudentList();
  }, []);

  const handleClose = () => {
    console.log("e");
    navigate("/student-profile");
  };

  const getStudentList = () => {
    const data = {
      search: "",
      page: 1,
      limit: 10,
    };
    dispatch(getListOfUserByAdmin(data));
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
            <th className="font-size-14">Name</th>
            <th className="font-size-14">Email</th>
            <th className="font-size-14">Phone Number</th>
            <th className="font-size-14">Skill Rank</th>
            <th className="font-size-14">All India Rank</th>
            <th className="font-size-14">Total Comp Test Passed</th>
            <th className="font-size-14">Total Test Passed</th>
            <th className="font-size-14">View Details</th>
          </tr>
        </thead>
        <tbody className="bg-white leader-body">
          {listOfUserByAdmin?.map((item) => (
            <tr key={item?.id}>
              <td className="font-size-14">
                {" "}
                {item?.first_name + " " + item?.last_name}
              </td>
              <td className="font-size-14">{item?.auth_id?.email}</td>
              <td className="font-size-14">
                {item?.auth_id?.country_code + item?.auth_id?.phone}
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

      {listOfUserByAdmin?.length == 0 ? (
        <div className="comingSoon h2">No result found</div>
      ) : (
        ""
      )}
      {listOfUserByAdmin?.length > 0 ? (
        <>
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
        </>
      ) : (
        ""
      )}
    </div>
  );
}
