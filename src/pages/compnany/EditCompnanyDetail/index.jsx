// @ts-nocheck
import { useEffect, useState } from "react";
import DeftInput from "../../../components/deftInput/deftInput";
import PhoneInputField from "../../../components/phoneInput/phoneInput";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DeftSelect from "../../../components/dropdown";
import { sem } from "../../../components/jsonData";

// @ts-nocheck
export default function index() {
  const [formData, setFormData] = useState({});
  const [formDataError, setFormDataError] = useState({});
  const { loginUserData } = useSelector((state) => state.auth);
  const { collageList, courseList } = useSelector((state) => state.onBoarding);

  const search = useLocation().search;
  const phone = new URLSearchParams(search).get("phone");
  const id = new URLSearchParams(search).get("id");

  let phoneData = {
    countryCode: +91,
    phone: phone ?? loginUserData?.phone,
  };

  useEffect(() => {
    if (loginUserData) {
      if (loginUserData?.phone != "null") {
        setFormData((formData) => ({
          ...formData,
          phone: loginUserData?.phone * 1,
        }));
      }
      if (loginUserData?.email != "null") {
        setFormData((formData) => ({
          ...formData,
          email: loginUserData?.email,
        }));
      }
    }
  }, [loginUserData]);

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

    if (!checkIsEmpty(formData.email)) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        email: "Please enter your email address",
      }));
      return;
    }
    if (!formData?.phone || formData.phone.length < 10) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        phone: "Please enter your phone number.",
      }));
      return;
    }
    if (!formData?.courseName) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        courseName: "please select your course name",
      }));
      return;
    }
    if (!formData?.semester) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        semester: "please select your semester",
      }));
      return;
    }
    if (!formData?.collage) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        collage: "please select your college",
      }));
      return;
    }
    const data = {
      auth_id: loginUserData?.id,
      first_name: formData?.first_name,
      last_name: formData?.last_name,
      course_name: formData?.courseName[0]?.label,
      semester: formData?.semester[0]?.label,
      college_name: formData?.collage[0]?.label,
    };

    dispatch(register(data, navigate));
  };

  return (
    <>
      <div className="card mb-4">
        <h5 className="card-header">Edit Company Details</h5>
        <div className="card-body">
          <div className="d-flex align-items-start align-items-sm-center gap-4">
            <img
              src="../assets/img/avatars/1.png"
              alt="user-avatar"
              className="d-block rounded"
              height="100"
              width="100"
              aria-label="Account image"
              id="uploadedAvatar"
            />
            <div className="button-wrapper">
              <label
                htmlFor="upload"
                className="btn btn-primary me-2 mb-4"
                tabIndex="0"
              >
                <span className="d-none d-sm-block">Upload new photo</span>
                <i className="bx bx-upload d-block d-sm-none"></i>
                <input
                  type="file"
                  id="upload"
                  className="account-file-input"
                  hidden
                  accept="image/png, image/jpeg"
                />
              </label>
              <button
                aria-label="Click me"
                type="button"
                className="btn btn-outline-secondary account-image-reset mb-4"
              >
                <i className="bx bx-reset d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Reset</span>
              </button>
              <p className="text-muted mb-0">
                Allowed JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
          </div>
        </div>
        <hr className="my-0" />
        <div className="card-body">
          <div className="row">
            <div className="mb-3 col-md-6">
              <DeftInput
                label="Company Registered Name"
                placeholder="Enter Company Registered Name"
                error={formDataError?.company_name}
                value={formData?.company_name}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    company_name: val.target.value,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    company_name: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="Category"
                error={formDataError?.category}
                options={courseList}
                value={formData?.category}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    category: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    category: "",
                  }));
                }}
                placeholder="Current Course Name *"
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                label="Contact Person Name"
                placeholder="Enter Contact Person Name"
                error={formDataError?.contactPersonName}
                value={formData?.contactPersonName}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    contactPersonName: val.target.value,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    last_contactPersonNamename: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                label="Official Mail Id"
                placeholder="Enter Official Mail Id"
                error={formDataError?.email}
                value={formData?.email}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    email: val.target.value,
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
                label="Contact Number"
                error={formDataError?.phone}
                PhoneData={phoneData || formData}
                setPhoneData={setFormData}
                setFormDataError={setFormDataError}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                label="Company Website"
                placeholder="Enter Company Website"
                error={formDataError?.companyWebsite}
                value={formData?.companyWebsite}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    companyWebsite: val.target.value,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    companyWebsite: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                label="Linkedin URL"
                placeholder="Enter Linkedin URL"
                error={formDataError?.linkedinURL}
                value={formData?.linkedinURL}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    linkedinURL: val.target.value,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    linkedinURL: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="Most Hired Skills"
                error={formDataError?.mostHiredSkills}
                options={courseList}
                value={formData?.mostHiredSkills}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    mostHiredSkills: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    mostHiredSkills: "",
                  }));
                }}
                placeholder="Current Course Name *"
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-12">
              <DeftInput
                label="Company Address"
                placeholder="Enter Company Address"
                error={formDataError?.companyAddress}
                value={formData?.companyAddress}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    companyAddress: val.target.value,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    companyAddress: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="City"
                error={formDataError?.City}
                options={sem}
                value={formData?.City}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    City: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    City: "",
                  }));
                }}
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="State"
                error={formDataError?.State}
                options={sem}
                value={formData?.State}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    State: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    State: "",
                  }));
                }}
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="Country"
                error={formDataError?.Country}
                options={collageList}
                value={formData?.Country}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    Country: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    Country: "",
                  }));
                }}
                placeholder="Country"
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                label="Pin Code"
                placeholder="Enter Pin Code"
                error={formDataError?.pinCode}
                value={formData?.pinCode}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    pinCode: val.target.value,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    pinCode: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label htmlFor="email" className="form-label">
                About Company
              </label>
              <br />
              <textarea name="" id="" cols="178" rows="8"></textarea>
            </div>
          </div>
          <div className="mt-2">
            <button
              aria-label="Click me"
              type="submit"
              className="btn btn-primary me-2"
              onClick={() => {
                handleSubmit;
              }}
            >
              Save changes
            </button>
            <button
              aria-label="Click me"
              type="reset"
              className="btn btn-outline-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
