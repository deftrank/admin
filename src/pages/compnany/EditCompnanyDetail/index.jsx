// @ts-nocheck
import { useEffect, useState } from "react";
import DeftInput from "../../../components/deftInput/deftInput";
import PhoneInputField from "../../../components/phoneInput/phoneInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DeftSelect from "../../../components/dropdown";
import { sem } from "../../../components/jsonData";
import {
  getCityList,
  getCompanyCategoryList,
  getCountryList,
  getSkillList,
} from "../../../store/slice/onBoardingSlice";
import { isEmailValid } from "../../../utils/appValidation";
import { Form } from "react-bootstrap";
import profile from "../../../assets/img/companyDefaul.png";

// @ts-nocheck
export default function index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDataError, setFormDataError] = useState({});
  const { loginUserData } = useSelector((state) => state.auth);
  const {
    companyCategoryList,
    skillListData,
    countryListData,
    stateListData,
    cityListData,
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
    handleCompanyCategoriesList();
    fetchSkillData();
    fetchCountryData();
    fetchCityData();
  }, []);

  const handleCompanyCategoriesList = () => {
    const data = {
      page: 1,
      limit: 100,
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
      state_id: id ? id : formData?.state_id,
      page: 0,
      limit: 0,
      search: search,
    };
    dispatch(getCityList(request));
  };

  const handleSubmit = () => {
    if (!formData?.company_name) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        company_name: "Please enter your company  name.",
      }));
      return;
    }
    if (!formData?.Company_categories) {
      setFormDataError((formDataError) => ({
        ...formDataError,
        Company_categories: "Please enter your course name.",
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
        company_website: "Please enter your company website url",
      }));
      return;
    }
    if (!formData?.linkedin_url) {
      setFormDataError((prevError) => ({
        ...prevError,
        linkedin_url: "Please enter your Linkedin url",
      }));
      return;
    }
    if (!formData?.skills || formData?.skills?.length < 0) {
      setFormDataError((prevError) => ({
        ...prevError,
        skills: "Please  select most hired skills",
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
    if (!formData?.country) {
      setFormDataError((prevError) => ({
        ...prevError,
        country: "Please select your country",
      }));
      return;
    }
    if (!formData?.state) {
      setFormDataError((prevError) => ({
        ...prevError,
        state: "Please select your state",
      }));
      return;
    }
    if (!formData?.city) {
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
      auth_id: id ? id : "",
      registered_name: formData?.company_name,
      category: formData?.Company_categories[0]?.label,
      contact_person_name: formData?.company_person_name,
      contact_person_number: formData?.phone,
      company_website: formData?.company_website,
      linkedin_url: formData?.linkedin_url,
      most_hired_skills: formData?.skills, // Corrected this line
      company_address: formData?.company_address,
      city: formData?.city,
      state: formData?.state,
      country: formData?.country,
      countryCode: formData?.countryCode,
      pin_code: formData?.pin_code,
      about_company: formData?.about,
      country_id: formData?.country_id,
      state_id: formData?.state_id,
      city_id: formData?.city_id,
      company_logo: "https://examplecompany.com/logo.png",
      language: "en",
    };

    console.log("data == ", data);

    // dispatch(register(data, navigate));
  };

  return (
    <>
      <div className="card mb-4">
        <h5 className="card-header">Edit Company Details</h5>
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
                label="Company Registered Name"
                placeholder="Enter Company Registered Name"
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
                error={formDataError?.Company_categories}
                options={
                  companyCategoryList &&
                  companyCategoryList?.map((item) => ({
                    label: `${item.full_name}`,
                    id: item._id,
                  }))
                }
                value={formData?.Company_categories}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    Company_categories: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    Company_categories: "",
                  }));
                }}
                placeholder="Select Category *"
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
                label="Contact Number"
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
                error={formDataError?.skills}
                options={skillListData?.map((item) => ({
                  label: item?.name,
                  value: item?._id,
                }))}
                value={formData?.skills}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    skills: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    skills: "",
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
                options={countryListData}
                value={formData?.country}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    country: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    country: "",
                  }));
                }}
                placeholder="Country"
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="City"
                error={formDataError?.city}
                options={cityListData}
                value={formData?.city}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    city: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    city: "",
                  }));
                }}
                dropdownHeight="200px"
                multi={false}
              />
            </div>
            <div className="mb-3 col-md-6">
              <DeftSelect
                label="State"
                error={formDataError?.state}
                options={stateListData}
                value={formData?.state}
                onChange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    state: val,
                  }));
                  setFormDataError((formDataError) => ({
                    ...formDataError,
                    state: "",
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
                type="text"
                onchange={(val) => {
                  setFormData((formData) => ({
                    ...formData,
                    pin_code: val,
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
