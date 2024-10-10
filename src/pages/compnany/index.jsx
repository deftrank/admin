// @ts-nocheck
import React, { useEffect, useState } from "react";
// import Stepper from "@keyvaluesystems/react-stepper";
import { color } from "../../themes/color/color";
import Logo from "../../assets/img/companyDefaul.png";
import { useResponsive } from "../../hooks/useResponsive";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Table } from "react-bootstrap";
import { userData } from "../../component/jsonData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getListOfCompanyByAdmin } from "../../store/slice/onBoardingSlice";
import DeftInput from "../../component/deftInput/deftInput";
// import { stepsArray } from "./stepperConstant";

export default function index() {
  const { listOfCompanyByAdmin, compnanyTotalCount } = useSelector(
    (state) => state.onBoarding
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 10;
  const totalPages = Math.ceil(compnanyTotalCount / itemsPerPage);

  useEffect(() => {
    getCompnanyList();
  }, []);

  useEffect(() => {
    getCompnanyList();
  }, [currentPage]);

  useEffect(() => {
    getCompnanyList();
  }, [searchData]);

  const getCompnanyList = () => {
    const data = {
      search: searchData,
      page: currentPage,
      limit: itemsPerPage,
    };
    dispatch(getListOfCompanyByAdmin(data));
  };

  return (
    <div className="container-fliud">
      <div className="my-3 col-6">
        <DeftInput
          placeholder="Search be name"
          type="text"
          value={searchData}
          onKeyUp={(value) => {
            setCurrentPage(1);
            setSearchData(value);
          }}
          inputGroupText={<Icon icon="line-md:search" height={30} />}
        />
      </div>
      <Table
        responsive="sm"
        className="thead"
        style={{
          background: "var(--Chip-Purple, rgba(65, 105, 224, 0.12))",
        }}
      >
        <thead className="thead">
          <tr>
            <th className="font-size-14"></th>
            <th className="font-size-14">Name</th>
            <th className="font-size-14">Category</th>
            <th className="font-size-14">Website</th>
            <th className="font-size-14">Most hired skills</th>
            <th className="font-size-14">Address</th>
          </tr>
        </thead>
        <tbody className="bg-white leader-body">
          {listOfCompanyByAdmin?.map((item) => (
            <tr key={item?.id}>
              <td className="font-size-14">
                {/* <img
                  src={item.company_logo ? item.company_logo : Logo}
                  style={{ width: 40, height: 40 }}
                /> */}
                <img src={Logo} style={{ width: 50, height: 50 }} />
              </td>
              <td className="font-size-14">{item.registered_name}</td>
              <td className="font-size-14">{item.category}</td>
              <td className="font-size-14">{item.company_website}</td>
              <td className="font-size-14">
                <div style={{ width: "150px" }}>
                  {item?.most_hired_skills && item.most_hired_skills.length > 0
                    ? item.most_hired_skills.join(", ")
                    : "No Feedback"}
                </div>
              </td>
              <td className="font-size-14">{item?.company_address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {listOfCompanyByAdmin?.length == 0 ? (
        <div className="comingSoon h2">No result found</div>
      ) : (
        ""
      )}
      {compnanyTotalCount > itemsPerPage ? (
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
