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
  getCityList,
  getCompanyCategoryList,
  getCountryList,
  getSkillList,
  getStateList,
  registerCompany,
  updateCompanyProfile,
} from "../../../store/slice/onBoardingSlice";
import {
  isEmailValid,
  isWebsiteValid,
  islinkedinValid,
} from "../../../utils/appValidation";
import { Form } from "react-bootstrap";
import profile from "../../../assets/img/companyDefaul.png";

// @ts-nocheck
export default function index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDataError, setFormDataError] = useState({});
  const [locationData, setLocationData] = useState({});
  const { loginUserData } = useSelector((state) => state.auth);
  const {
    companyCategoryList,
    skillListData,
    countryListData,
    stateListData,
    cityListData,
    userAccountDetails,
  } = useSelector((state) => state.onBoarding);
  const { id } = useParams();

  const search = useLocation().search;
  const phone = new URLSearchParams(search).get("phone");
  // const id = new URLSearchParams(search).get("id");

  let phoneData = {
    countryCode: +91,
    phone: phone ?? loginUserData?.phone,
  };

  useEffect(() => {
    fetchCompanyCategories();
    fetchSkillData();
    fetchCountryData();
    getAccountDetails();
  }, []);

  useEffect(() => {
    if (locationData?.country) {
      fetchStateData();
    }
    if (locationData?.state) {
      fetchCityData();
    }
  }, [locationData]);

  useEffect(() => {
    userAccountDetails?.accountData ? showAccountDetails() : "";
  }, [userAccountDetails]);

  const showAccountDetails = () => {
    const accountData = userAccountDetails?.accountData;
    setFormData((formData) => ({
      ...formData,
      company_name: accountData?.registered_name,
      category_id: accountData?.category_id?._id,
      category_Name: accountData?.category_id?.name,
      company_person_name: accountData?.contact_person_name,
      email: accountData?.auth_id?.email,
      phone: accountData?.contact_person_number,
      countryCode: accountData?.countryCode ? accountData?.countryCode : "+91",
      company_website: accountData?.company_website,
      linkedin_url: accountData?.linkedin_url,
      skill_ids: accountData?.skills_id[0],
      skill_names: accountData?.most_hired_skills[0],
      company_address: accountData?.company_address,
      country_id: accountData?.country_id,
      country_name: accountData?.country,
      city_id: accountData?.city_id,
      city_name: accountData?.city,
      state_id: accountData?.state_id,
      state_name: accountData?.state,
      pin_code: accountData?.pin_code,
      about: accountData?.about_company,
    }));

    setLocationData((formData) => ({
      ...formData,
      country: accountData?.country_id,
      state: accountData?.state_id,
      city: accountData?.city_id,
    }));
  };

  const fetchStateData = (id, search) => {
    let request = {
      country_id: Number(locationData?.country),
      page: 0,
      limit: 0,
      search: "",
    };
    dispatch(getStateList(request));
  };

  const fetchCompanyCategories = () => {
    const data = {
      page: 0,
      limit: 0,
      search: "",
    };
    dispatch(getCompanyCategoryList(data));
  };

  const fetchSkillData = () => {
    let request = {
      page: 0,
      limit: 0,
      search: "",
    };
    dispatch(getSkillList(request));
  };

  const fetchCountryData = (search) => {
    let request = {
      page: 0,
      limit: 0,
      search: search,
    };
    dispatch(getCountryList(request));
  };
  const fetchCityData = (id, search) => {
    let request = {
      state_id: Number(locationData?.state),
      page: 0,
      limit: 0,
      search: search,
    };
    dispatch(getCityList(request));
  };

  const getAccountDetails = () => {
    const data = {
      auth_id: id,
      language: "en",
    };
    dispatch(accountDetails(data));
  };

  const handleSubmit = () => {
    if (!formData?.company_name) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        company_name: "Please enter your company  name.",
      }));
      return;
    }
    if (!formData?.category_id) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        category_id: "Please select category.",
      }));
      return;
    }
    if (!formData?.company_person_name) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        company_person_name: "Please enter company person name .",
      }));
      return;
    }
    if (!formData?.email) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        email: "Please enter company official mail id",
      }));
      return;
    }
    if (!isEmailValid(formData?.email)) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        email: "Please enter a valid email address",
      }));
      return;
    }

    if (!formData?.phone) {
      setFormDataError((prevError) => ({
        ...prevError,
        phone: "Please enter your contact number",
      }));
      return;
    }
    if (formData.phone.length < 10) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        phone: "Please enter your correct phone number.",
      }));
      return;
    }

    if (!formData?.company_website) {
      setFormDataError((prevError) => ({
        ...prevError,
        company_website: "Please enter your company website URL",
      }));
      return;
    }
    if (!isWebsiteValid(formData?.company_website)) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        company_website: "Company website must be a valid URL",
      }));
      return;
    }
    if (!formData?.linkedin_url) {
      setFormDataError((prevError) => ({
        ...prevError,
        linkedin_url: "Please enter your Linkedin URL",
      }));
      return;
    }
    if (!islinkedinValid(formData?.linkedin_url)) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        linkedin_url: "LinkedIn URL must be a valid URL",
      }));
      return;
    }
    if (!formData?.skill_ids || formData?.skills?.length < 0) {
      setFormDataError((prevError) => ({
        ...prevError,
        skill_ids: "Please  select most hired skills",
      }));
      return;
    }
    if (!formData?.company_address) {
      setFormDataError((prevError) => ({
        ...prevError,
        company_address: "Please enter your company address",
      }));
      return;
    }
    if (!formData?.country_id) {
      setFormDataError((prevError) => ({
        ...prevError,
        country: "Please select your country",
      }));
      return;
    }
    if (!formData?.state_id) {
      setFormDataError((prevError) => ({
        ...prevError,
        state: "Please select your state",
      }));
      return;
    }
    if (!formData?.city_id) {
      setFormDataError((prevError) => ({
        ...prevError,
        city: "Please select your city",
      }));
      return;
    }
    if (!formData?.pin_code) {
      setFormDataError((prevError) => ({
        ...prevError,
        pin_code: "Please enter your area pin code ",
      }));
      return;
    }

    if (!formData?.about) {
      setFormDataError((prevError) => ({
        ...prevError,
        about: "Please enter about your company. ",
      }));
      return;
    }

    const data = {
      companyId: userAccountDetails?.accountData?._id
        ? userAccountDetails?.accountData?._id
        : "",
      role_type: 2,
      login_type: 2,
      email: formData?.email,
      countryCode: formData?.countryCode,
      phone: formData?.phone,
      category_id: formData?.category_id,
      skills_id: [formData?.skill_ids],
      registered_name: formData?.company_name,
      category: formData?.category_Name,
      contact_person_name: formData?.company_person_name,
      contact_person_number: formData.phone,
      company_website: formData?.company_website,
      linkedin_url: formData?.linkedin_url,
      most_hired_skills: [formData?.skill_names],
      company_address: formData?.company_address,
      city: formData?.city_name,
      state: formData?.state_name,
      country: formData?.country_name,
      pin_code: formData?.pin_code,
      about_company: formData?.about,
      company_logo: "https://examplecompany.com/logo.png",
      language: "en",
      country_id: formData?.country_id,
      state_id: formData?.state_id,
      city_id: formData?.city_id,
    };
    if (id) {
      dispatch(updateCompanyProfile(data, navigate));
    } else {
      dispatch(registerCompany(data, navigate));
    }
  };
  return (
    <>
      <h5 className="mb-4">
        <span
          className="text-muted fw-light cursor-pointer"
          onClick={() => navigate("/company")}
        >
          <span className="text-decoration-underline">Company</span> /
        </span>{" "}
        <span className="text-decoration-underline">
          {" "}
          {id ? "Edit" : "Add"}
        </span>
      </h5>
      <div className="card mb-4">
        <h5 className="card-header">{id ? "Edit" : "Add"} Company Details</h5>
        <div className="card-body">
          <div className="d-flex align-items-start align-items-sm-center gap-4">
            <img
              src={profile}
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
                <span className="d-none d-sm-block">Upload Logo</span>
                <i className="bx bx-upload d-block d-sm-none"></i>
                <input
                  type="file"
                  id="upload"
                  className="account-file-input"
                  hidden
                  accept="image/png, image/jpeg"
                />
              </label>
              {/* <button
                aria-label="Click me"
                type="button"
                className="btn btn-outline-secondary account-image-reset mb-4"
              >
                <i className="bx bx-reset d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Reset</span>
              </button> */}
              <p className="text-muted mb-0">
                Allowed JPG, JPEG or PNG. Max size of 800K
              </p>
              <small>
                Note: Upload Logo launching soon! Stay tuned for more
                information
              </small>
            </div>
          </div>
        </div>
        <hr className="my-0" />
        <div className="card-body">
          <div className="row">
            <div className="mb-3 col-md-6">
              <DeftInput
                label="REGISTERED COMPANY NAME"
                placeholder="Enter Registered Company Name"
                error={formDataError?.company_name}
                value={formData?.company_name}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    company_name: val,
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
                placeholder="Select Category *"
                error={formDataError?.category_id}
                options={
                  companyCategoryList &&
                  companyCategoryList?.map((item) => ({
                    label: `${item.name}`,
                    value: item._id,
                  }))
                }
                value={formData?.category_id}
                onChange={(val) => {
                  const index = companyCategoryList?.findIndex(
                    (item) => item._id === val
                  );
                  setFormData((formData) => ({
                    ...formData,
                    category_id: val,
                    category_Name: companyCategoryList[index]?.name,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    category_id: "",
                  }));
                }}
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                label="Contact Person Name"
                placeholder="Enter Contact Person Name"
                error={formDataError?.company_person_name}
                value={formData?.company_person_name}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    company_person_name: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    company_person_name: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                readOnly={
                  id && userAccountDetails?.accountData?.auth_id?.email
                    ? true
                    : false
                }
                label="Official Mail Id"
                placeholder="Enter Official Mail Id"
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
                readOnly={
                  id && userAccountDetails?.accountData?.auth_id?.phone
                    ? true
                    : false
                }
                label="Contact Number"
                value={JSON.stringify(formData?.countryCode + formData.phone)}
                error={formDataError?.phone}
                PhoneData={phoneData || formData}
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
              <DeftInput
                label="Company Website"
                placeholder="Enter Company Website"
                error={formDataError?.company_website}
                value={formData?.company_website}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    company_website: val.trimStart(),
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    company_website: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                label="Linkedin URL"
                placeholder="Enter Linkedin URL"
                error={formDataError?.linkedin_url}
                value={formData?.linkedin_url}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    linkedin_url: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    linkedin_url: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="Most Hired Skills"
                error={formDataError?.skill_ids}
                options={skillListData?.map((item) => ({
                  label: item?.name,
                  value: item?._id,
                }))}
                value={formData?.skill_ids}
                onChange={(val) => {
                  const index = skillListData?.findIndex(
                    (item) => item._id === val
                  );
                  setFormData((formData) => ({
                    ...formData,
                    skill_ids: val,
                    skill_names: skillListData[index]?.name,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    skill_ids: "",
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
                error={formDataError?.company_address}
                value={formData?.company_address}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    company_address: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    company_address: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="Country"
                error={formDataError?.country}
                options={
                  countryListData &&
                  countryListData?.map((item) => ({
                    label: `${item.name}`,
                    value: item.id,
                  }))
                }
                value={formData?.country_id}
                onChange={(val) => {
                  const index = countryListData?.findIndex(
                    (item) => item.id == val
                  );
                  setFormData((formData) => ({
                    ...formData,
                    country_id: val,
                    country_name: countryListData[index]?.name,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    country: "",
                  }));
                  setLocationData((formData) => ({
                    ...formData,
                    country: val,
                  }));
                }}
                placeholder="Select Country"
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="State"
                placeholder="Select State"
                error={formDataError?.state}
                options={
                  stateListData &&
                  stateListData?.map((item) => ({
                    label: `${item.name}`,
                    value: item.id,
                  }))
                }
                value={formData?.state_id}
                onChange={(val) => {
                  const index = stateListData?.findIndex(
                    (item) => item.id == val
                  );
                  setFormData((formData) => ({
                    ...formData,
                    state_id: val,
                    state_name: stateListData[index]?.name,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    state: "",
                  }));
                  setLocationData((formData) => ({
                    ...formData,
                    state: val,
                  }));
                }}
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="City"
                placeholder="Select City"
                error={formDataError?.city}
                options={
                  cityListData &&
                  cityListData?.map((item) => ({
                    label: `${item.name}`,
                    value: item.id,
                  }))
                }
                value={formData?.city_id}
                onChange={(val) => {
                  const index = cityListData?.findIndex(
                    (item) => item.id == val
                  );
                  setFormData((formData) => ({
                    ...formData,
                    city_id: val,
                    city_name: cityListData[index]?.name,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    city: "",
                  }));
                  setLocationData((formData) => ({
                    ...formData,
                    city: val,
                  }));
                }}
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftInput
                label="Pin Code"
                placeholder="Enter Pin Code"
                error={formDataError?.pin_code}
                value={formData?.pin_code}
                maxLength={6}
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    pin_code: val.replace(/[^0-9.]/g, ""),
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    pin_code: "",
                  }));
                }}
              />
            </div>
            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-11">
                  <label htmlFor="email" className="form-label">
                    About Company
                    {/* <span className="text-end">ss</span> */}
                  </label>
                </div>
                <div className="col-1">
                  {formData?.about ? formData?.about?.length : 0}/500
                </div>
              </div>
              <Form.Control
                as="textarea"
                className="rounded-2"
                maxLength={500}
                value={formData?.about}
                placeholder="About Company * (Do not exceed more than 500 characters)"
                style={{ height: "100px" }}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    about: e.target.value?.trimStart(),
                  });
                  setFormDataError((prev) => ({ ...prev, about: "" }));
                }}
              />
              {formDataError.about && (
                <div className="text-danger">{formDataError.about}</div>
              )}
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
              onClick={() => navigate("/company")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
