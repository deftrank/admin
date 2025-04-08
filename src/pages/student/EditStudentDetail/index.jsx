// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import DeftInput from "../../../components/deftInput/deftInput";
import PhoneInputField from "../../../components/phoneInput/phoneInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DeftSelect from "../../../components/dropdown";
import {
  accountDetails,
  getCollageList,
  getCourseList,
  updateProfile,
} from "../../../store/slice/onBoardingSlice";
import { isEmailValid } from "../../../utils/appValidation";
import LoadingBar from "react-top-loading-bar";

// @ts-nocheck
export default function index() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [sem, setSem] = useState([]);
  const [formDataError, setFormDataError] = useState({});
  const { loginUserData } = useSelector((state) => state.auth);
  const { collageList, courseList, userAccountDetails } = useSelector(
    (state) => state.onBoarding
  );
  const dispatch = useDispatch();
  const loadingBarRef = useRef(null);

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
    dispatch(accountDetails(data, loadingBarRef));
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
      countryCode: authdata?.country_code ? authdata?.country_code : "+91",
    
    }));


  };

  const handleSubmit = () => {
    console.log("registered");
    setFormDataError({});
    if (!formData?.first_name) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        first_name: "Please enter your first name",
      }));
      return;
    }
    if (!formData?.last_name) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        last_name: "Please enter your last name",
      }));
      return;
    }
  
    const data = {
      userId: userAccountDetails?.accountData?._id
        ? userAccountDetails?.accountData?._id
        : "",
      first_name: formData?.first_name,
      last_name: formData?.last_name,
    
      language: "en",
    };
    dispatch(updateProfile(data, navigate));
  };

  return (
    <>
      <h5 className="mb-4">
        <span
          className="text-muted fw-light cursor-pointer"
          onClick={() => navigate("/students")}
        >
          <span className="text-decoration-underline">Student</span> /
        </span>{" "}
        <span className="text-decoration-underline"> Edit</span>
      </h5>
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
                    first_name: val.trimStart(),
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
                    last_name: val.trimStart(),
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
                readOnly={
                  id && userAccountDetails?.authData?.email ? true : false
                }
                label="Email Id"
                placeholder="Enter Email Id"
                error={formDataError?.email}
                value={formData?.email}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    email: val.trimStart(),
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
                readOnly={
                  id && userAccountDetails?.authData?.phone ? true : false
                }
                label="Phone Number"
                error={formDataError?.phone}
                value={JSON.stringify(formData?.countryCode + formData.phone)}
                setPhoneData={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    ...valval.trimStart(),
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    phone: "",
                  }));
                }}
                setFormDataError={setFormDataError}
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
      <LoadingBar color={"#0b0b7c"} height="0.5rem" ref={loadingBarRef} />
    </>
  );
}
