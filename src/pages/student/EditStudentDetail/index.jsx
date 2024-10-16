// @ts-nocheck
import { useEffect, useState } from "react";
import DeftInput from "../../../components/deftInput/deftInput";
import PhoneInputField from "../../../components/phoneInput/phoneInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DeftSelect from "../../../components/dropdown";
import { sem } from "../../../components/jsonData";
import {
  accountDetails,
  getCollageList,
  getCourseList,
  updateProfile,
} from "../../../store/slice/onBoardingSlice";
import { isEmailValid } from "../../../utils/appValidation";

// @ts-nocheck
export default function index() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [formDataError, setFormDataError] = useState({});
  const { loginUserData } = useSelector((state) => state.auth);
  const { collageList, courseList, userAccountDetails } = useSelector(
    (state) => state.onBoarding
  );
  const dispatch = useDispatch();

  const search = useLocation().search;
  const phone = new URLSearchParams(search).get("phone");
  // const id = new URLSearchParams(search).get("id");
  const { id } = useParams();

  let phoneData = {
    countryCode: +91,
    phone: phone ?? loginUserData?.phone,
  };

  useEffect(() => {
    handleCourseList();
    handleCollageList();
    getAccountDetails();
  }, []);

  useEffect(() => {
    userAccountDetails ? showAccountDetails() : "";
  }, [userAccountDetails]);

  const handleCollageList = () => {
    const data = {
      page: 1,
      limit: 100,
      search_type: 1,
      search: "",
    };
    dispatch(getCollageList(data));
  };

  const handleCourseList = () => {
    const data = {
      page: 1,
      limit: 20,
      search: "",
    };
    dispatch(getCourseList(data));
  };

  const getAccountDetails = () => {
    const data = {
      auth_id: id,
      language: "en",
    };
    dispatch(accountDetails(data));
  };

  const showAccountDetails = () => {
    const accountData = userAccountDetails?.accountData;
    const authdata = userAccountDetails?.authData;
    setFormData((formData) => ({
      ...formData,
      first_name: accountData?.first_name,
      last_name: accountData?.last_name,
      email: authdata?.email,
      phone: authdata?.phone,
      countryCode: authdata?.country_code,
      courseName: accountData?.current_course
        ? accountData?.current_course
        : "",
      semester: accountData?.semester,
      collage: accountData?.college_name,
    }));
  };

  const handleSubmit = () => {
    console.log("registered");
    setFormDataError({});
    if (!formData?.first_name) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        first_name: "Please enter your first name.",
      }));
      return;
    }
    if (!formData?.last_name) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        last_name: "Please enter your last name.",
      }));
      return;
    }
    if (!formData?.courseName) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        courseName: "Please select your course name",
      }));
      return;
    }
    if (!formData?.semester) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        semester: "Please select your semester",
      }));
      return;
    }
    if (!formData?.collage) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        collage: "Please select your college",
      }));
      return;
    }
    const data = {
      userId: userAccountDetails?.accountData?._id
        ? userAccountDetails?.accountData?._id
        : "",
      first_name: formData?.first_name,
      last_name: formData?.last_name,
      course_name: formData?.courseName,
      semester: formData?.semester,
      college_name: formData?.collage,
      language: "en",
    };
    dispatch(updateProfile(data, navigate));
  };

  return (
    <>
      <div className="card mb-4">
        <h5 className="card-header">Edit Student Details</h5>
        <hr className="my-0" />
        <div className="card-body">
          <div className="row">
            <div className="mb-3 col-md-6">
              <DeftInput
                label="First Name"
                placeholder="Enter First Name"
                error={formDataError?.first_name}
                value={formData?.first_name}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    first_name: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    first_name: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                label="Last Name"
                placeholder="Enter Last Name"
                error={formDataError?.last_name}
                value={formData?.last_name}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    last_name: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    last_name: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                readOnly={true}
                label="Email Id"
                placeholder="Enter Email Id"
                error={formDataError?.email}
                value={formData?.email}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    email: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    email: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <PhoneInputField
                readOnly={true}
                label="Phone Number"
                error={formDataError?.phone}
                value={JSON.stringify(formData?.countryCode + formData.phone)}
                setPhoneData={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    ...val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    phone: "",
                  }));
                }}
                setFormDataError={setFormDataError}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="Current Course Name"
                placeholder="Select current Course Name"
                error={formDataError?.courseName}
                options={
                  courseList &&
                  courseList?.map((item) => ({
                    label: `${item.full_name}`,
                    id: item._id,
                  }))
                }
                value={formData?.courseName}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    courseName: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    courseName: "",
                  }));
                }}
                placeholder="Current Course Name *"
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="Semester"
                placeholder="Select Semester"
                error={formDataError?.semester}
                options={sem}
                value={formData?.semester}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    semester: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    semester: "",
                  }));
                }}
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="College Name"
                placeholder="Select College Name"
                error={formDataError?.collage}
                options={
                  collageList &&
                  collageList?.map((item) => ({
                    label: `${item.university_name}`,
                    id: item._id,
                  }))
                }
                value={formData?.collage}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    collage: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    collage: "",
                  }));
                }}
                placeholder="College Name *"
                dropdownHeight="200px"
                multi={false}
              />
            </div>
          </div>
          <div className="mt-2">
            <button
              aria-label="Click me"
              type="submit"
              className="btn btn-primary me-2"
              onClick={handleSubmit}
            >
              Save changes
            </button>
            <button
              aria-label="Click me"
              type="reset"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/students")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
