// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Pagination, Table } from "react-bootstrap";
import {
  deleteUser,
  getListOfUserByAdmin,
  suspendUser,
} from "../../store/slice/onBoardingSlice";
import DeftInput from "../../component/deftInput/deftInput";
import Confirmation from "../../component/modal/confirmationModel/confirmation";
import { Icon } from "@iconify/react/dist/iconify.js";
import DeftOutlineButton from "../../component/deftButton/deftOutlineButton";
import LoadingBar from "react-top-loading-bar";

export default function index() {
  const { listOfUserByAdmin, userTotalCount } = useSelector(
    (state) => state.onBoarding
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [changePasswordModal, setChangePasswordModal] = useState({});
  const loadingBarRef = useRef(null);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 5;
  const totalPages = Math.ceil(userTotalCount / itemsPerPage);

  useEffect(() => {
    getStudentList();
  }, []);

  useEffect(() => {
    getStudentList();
  }, [currentPage]);

  useEffect(() => {
    getStudentList();
  }, [searchData]);

  const handleClose = (id) => {
    navigate(`/student-profile/${id}`);
  };

  const getStudentList = () => {
    const data = {
      search: searchData,
      page: currentPage,
      limit: itemsPerPage,
    };
    dispatch(getListOfUserByAdmin(data,loadingBarRef));
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
        style={{ background: "var(--Chip-Purple, rgba(65, 105, 224, 0.12))" }}
      >
        <thead className="thead">
          <tr>
            <th className="font-size-14">Name</th>
            <th className="font-size-14">Email</th>
            <th className="font-size-14">Phone Number</th>
            <th className="font-size-14">Course</th>
            <th className="font-size-14">College</th>
            <th className="font-size-14">Location</th>
            <th className="font-size-14">Status</th>
            <th className="font-size-14">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white leader-body">
          {listOfUserByAdmin?.map((item) => (
            <tr key={item?.id}>
              <td> {item?.first_name + " " + item?.last_name}</td>
              <td>{item?.auth_id?.email}</td>
              <td>{item?.auth_id?.country_code + item?.auth_id?.phone}</td>

              <td>
                <p className="mb-0">{item?.current_course}</p>
              </td>
              <td>
                <div style={{ width: "200px" }}>{item?.college_name}</div>
              </td>
              <td>{item.location}</td>
              <td>
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
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4"></td>
            <td>
              Items per page: {itemsPerPage} &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
              &nbsp; {currentPage * itemsPerPage - (itemsPerPage - 1)} –{" "}
              {currentPage * itemsPerPage} of {userTotalCount}
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

      {listOfUserByAdmin?.length == 0 ? (
        <div className="comingSoon h2">No result found</div>
      ) : (
        ""
      )}

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

      <LoadingBar color={"#f11946"} ref={loadingBarRef} />
    </div>
  );
}
