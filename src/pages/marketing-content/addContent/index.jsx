// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import DeftInput from "../../../components/deftInput/deftInput";
import DeftSelect from "../../../components/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import profile from "../../../assets/img/companyDefaul.png";
import {
  getImageUpload,
  getMarketingContentAddByAdmin,
  getMarketingContentDetailByAdmin,
  getMarketingContentEditByAdmin,
} from "../../../store/slice/onBoardingSlice";
import { toast } from "react-toastify";

export default function CompanyForm() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(null);
  const { marketingContentDetails } = useSelector((state) => state.onBoarding);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [formDataError, setFormDataError] = useState({});
  const loadingBarRef = useRef(null);
  console.log(id);
  const options = [
    { value: "1", label: "Active" },
    { value:"0", label: "Deactive" },
  ];
  console.log(marketingContentDetails);
  useEffect(() => {
    let data = {
      bannerid: id,
      language: "en",
    };
    dispatch(getMarketingContentDetailByAdmin(data));
  }, [id]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    let data = {
      foldername: "marketingBannerImage",
      type: "image",
    };

    if (file) {
      dispatch(getImageUpload(data, file, setFormData, setCurrentImage));
    }
  };

  const handleSubmit = () => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!formData?.image) {
      toast.error("Please upload an image");
      return;
    }
    if (!formData?.title) {
      setFormDataError({ title: "Title is required" });
      return;
    }
    if (!formData?.description) {
      setFormDataError({ description: "Description is required" });
      return;
    }
    // if (!formData?.is_active) {
    //   setFormDataError({ is_active: "Status is required" });
    //   return;
    // }
    if (!formData?.url) {
      setFormDataError((prev) => ({ ...prev, url: "Please enter url" }));
      return;
    }
    else if (!urlRegex.test(formData?.url)){
      setFormDataError((prev) => ({ ...prev, url: "Invalid url" }));
      return;
    }
    else{
      setFormDataError((prev) => ({ ...prev, url: "" }));
    }
    
    if (id) {
      dispatch(getMarketingContentEditByAdmin(formData,navigate));
    } else {
      dispatch(getMarketingContentAddByAdmin(formData, navigate));
    }
  };
  // here is fetch the data
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      bannerId: marketingContentDetails?.id,
      title: marketingContentDetails?.title,
      description: marketingContentDetails?.description,
      is_active: marketingContentDetails?.is_active,
      image: marketingContentDetails?.image,
      url: marketingContentDetails?.url,
    }));
    setCurrentImage(marketingContentDetails?.image);
  }, [marketingContentDetails]);
  return (
    <>
      <h5 className="mb-4">
        <span
          className="text-muted fw-light cursor-pointer"
          onClick={() => navigate("/marketing-banner")}
        >
          <span className="text-decoration-underline">Marketing Content </span> /
        </span>{" "}
        <span className="text-decoration-underline">{id ? "Edit" : "Add"}</span>
      </h5>
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex align-items-start align-items-sm-center gap-4">
            <img
              src={currentImage ? currentImage : profile}
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
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-muted mb-0">
                Allowed JPG, JPEG or PNG. 
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
            <div className="col-md-6 col-12 mb-4">
              <DeftInput
                error={formDataError?.title}
                maxLength={100}
                name="title"
                placeholder="Enter the title"
                label="Title"
                value={formData?.title}
                onchange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    title: e,
                  }));
                }}
              />
            </div>
            <div className="col-md-6 col-12 mb-4">
              <DeftInput
                error={formDataError?.description}
                name="description"
                maxLength={250}
                placeholder="Enter the description"
                label="Description"
                value={formData?.description}
                onchange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    description: e,
                  }));
                }}
              />
            </div>
            <div className="col-md-6 col-12 mb-4">
              <DeftSelect
                error={formDataError?.is_active}
                name="status"
                options={options}
                label={"Status"}
                value={formData?.is_active ? 1 : 0}
                placeholder={"Please select Content Status"}
                onChange={(e) => {
                  console.log("ee", typeof e);
                  setFormData((prev) => ({
                    ...prev,
                    is_active: Boolean(parseInt(e)),
                  }));
                }}
              />
            </div>
            <div className="col-md-6 col-12 mb-4">
              <DeftInput
                error={formDataError?.url}
                name="description"
                placeholder="Enter the your url"
                label="Link url "
                value={formData?.url}
                onchange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    url: e,
                  }));
                }}
              />
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
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/marketing-banner")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <LoadingBar color={"#0b0b7c"} height="0.5rem" ref={loadingBarRef} />
    </>
  );
}
