// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Table } from "react-bootstrap";
import { deleteUser, getListOfUserByAdmin } from "../../store/slice/onBoardingSlice";
import DeftInput from "../../component/deftInput/deftInput";
import Confirmation from "../../component/modal/confirmationModel/confirmation";
import { Icon } from "@iconify/react/dist/iconify.js";
import DeftOutlineButton from "../../component/deftButton/deftOutlineButton";

export default function index() {
  const { listOfUserByAdmin, userTotalCount } = useSelector(
    (state) => state.onBoarding
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [authId, setAuthId] = useState(null);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 10;
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
    dispatch(getListOfUserByAdmin(data));
  };

  const deleteAccount = () => {
    const data = {
      auth_id: authId,
      language: "en",
    };
    dispatch(deleteUser(data,setChangePasswordModal));
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
            <th className="font-size-14">View Details</th>
            <th className="font-size-14">Action</th>
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
                <p className="mb-0">{item?.current_course}</p>
              </td>
              <td className="font-size-14">
                <div style={{ width: "200px" }}>{item?.college_name}</div>
              </td>
              <td className="font-size-14">{item.location}</td>
              <td className="font-size-14">
                <DeftOutlineButton
                  btnName="View"
                  btnClass="rounded-pill px-4 text-success"
                  onClick={() => handleClose(item.auth_id._id)}
                />
              </td>
              <td>
                <Icon
                  icon="ic:baseline-delete"
                  height={30}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setChangePasswordModal(true);
                    setAuthId(item.auth_id._id);
                  }}
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
      {userTotalCount > itemsPerPage ? (
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

      {changePasswordModal && (
        <Confirmation
          dialogData={{
            title: "Delete Account",
            message: "Are you sure you want to delete this account",
            buttonData: "Delete",
          }}
          open={changePasswordModal}
          handleClose={() => setChangePasswordModal(false)}
          handleSubmit={deleteAccount}
        />
      )}
    </div>
  );
}
