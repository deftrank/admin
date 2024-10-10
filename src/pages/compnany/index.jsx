// @ts-nocheck
import React, { useEffect, useState } from "react";
// import Stepper from "@keyvaluesystems/react-stepper";
import { color } from "../../themes/color/color";
import Logo from "../../assets/img/companyDefaul.png";
import { useResponsive } from "../../hooks/useResponsive";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Pagination, Table } from "react-bootstrap";
import Confirmation from "../../component/modal/confirmationModel/confirmation";
import { userData } from "../../component/jsonData";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  deleteUser,
  getListOfCompanyByAdmin,
  suspendUser,
} from "../../store/slice/onBoardingSlice";
import DeftInput from "../../component/deftInput/deftInput";
import DeftOutlineButton from "../../component/deftButton/deftOutlineButton";
// import { stepsArray } from "./stepperConstant";

export default function index() {
  const { listOfCompanyByAdmin, compnanyTotalCount } = useSelector(
    (state) => state.onBoarding
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [changePasswordModal, setChangePasswordModal] = useState({});
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 5;
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

  const deleteAccount = () => {
    const data = {
      auth_id: changePasswordModal?.id,
      language: "en",
    };
    dispatch(deleteUser(data, setChangePasswordModal));
  };

  const suspentAccount = () => {
    const data = {
      auth_id: changePasswordModal?.id,
      status:
        changePasswordModal?.data?.auth_id?.suspend_status == "active"
          ? "suspended"
          : "active",
      language: "en",
    };
    dispatch(suspendUser(data, setChangePasswordModal));
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
            {/* <th className="font-size-14">Status</th>
            <th className="font-size-14">Action</th> */}
          </tr>
        </thead>
        <tbody className="bg-white leader-body">
          {listOfCompanyByAdmin?.map((item) => (
            <tr key={item?.id}>
              <td>
                {/* <img
                  src={item.company_logo ? item.company_logo : Logo}
                  style={{ width: 40, height: 40 }}
                /> */}
                <img src={Logo} style={{ width: 50, height: 50 }} />
              </td>
              <td>{item.registered_name}</td>
              <td>{item.category}</td>
              <td>{item.company_website}</td>
              <td>
                <div style={{ width: "150px" }}>
                  {item?.most_hired_skills && item.most_hired_skills.length > 0
                    ? item.most_hired_skills.join(", ")
                    : "No Feedback"}
                </div>
              </td>
              <td>{item?.company_address}</td>
              {/* <td>
                <DeftOutlineButton
                  btnName={
                    item?.auth_id?.suspend_status == "active"
                      ? "Enabled"
                      : "Disabled"
                  }
                  btnClass={
                    item?.auth_id?.suspend_status == "active"
                      ? "rounded-pill text-success"
                      : "rounded-pill text-danger"
                  }
                  onClick={() => handleClose(item.auth_id._id)}
                />
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    as="div"
                    style={{
                      cursor: "pointer",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <Icon icon="nimbus:ellipsis" height={30} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleClose(item.auth_id._id)}
                    >
                      <Icon
                        icon="lsicon:view-outline"
                        height={30}
                        className={"p-1"}
                        style={{ cursor: "pointer" }}
                      />
                      View Account
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setChangePasswordModal((changePasswordModal) => ({
                          ...changePasswordModal,
                          show: true,
                          id: item.auth_id._id,
                          title: "Disable Account",
                          data: item,
                          message:
                            "Are you sure you want to disable this account",
                          type: "Disable",
                        }));
                      }}
                    >
                      <Icon
                        icon="lsicon:disable-outline"
                        height={25}
                        className={"p-1"}
                        style={{ cursor: "pointer" }}
                      />
                      Disable Account
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setChangePasswordModal((changePasswordModal) => ({
                          ...changePasswordModal,
                          show: true,
                          id: item.auth_id._id,
                          title: "Delete Account",
                          data: item,
                          message:
                            "Are you sure you want to delete this account",
                          type: "Delete",
                        }));
                      }}
                    >
                      <Icon
                        icon="mdi-light:delete"
                        height={30}
                        className={"p-1"}
                        style={{ cursor: "pointer" }}
                      />
                      Delete Account
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td> */}
            </tr>
          ))}
          <tr>
            <td colSpan="4"></td>
            <td>
              Items per page: {itemsPerPage} &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
              &nbsp; 1 – 5 of {compnanyTotalCount}
            </td>
            <td colSpan="3">
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
            </td>
          </tr>
        </tbody>
      </Table>
      {listOfCompanyByAdmin?.length == 0 ? (
        <div className="comingSoon h2">No result found</div>
      ) : (
        ""
      )}
      {/* {compnanyTotalCount > itemsPerPage ? (
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
      )} */}
      {changePasswordModal && (
        <Confirmation
          dialogData={changePasswordModal}
          open={changePasswordModal?.show}
          handleClose={() => setChangePasswordModal(false)}
          handleSubmit={() =>
            changePasswordModal?.type == "Delete"
              ? deleteAccount()
              : suspentAccount()
          }
        />
      )}
    </div>
  );
}
